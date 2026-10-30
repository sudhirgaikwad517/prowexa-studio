import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_lib/db.js";
import { requireAdmin } from "./_lib/auth.js";
import { getBody, handleServerError, queryParam, requireDatabase, sendError, str } from "./_lib/http.js";

const TABLES = {
  leads: "leads",
  blogs: "blogs",
  testimonials: "testimonials",
  "case-studies": "case_studies",
} as const;
type Resource = keyof typeof TABLES;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LEAD_STATUSES = ["new", "contacted", "archived"];

function strList(value: unknown, maxItems = 30) {
  return Array.isArray(value) ? value.map((v) => str(v, 500)).filter(Boolean).slice(0, maxItems) : [];
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

// GET    /api/admin?resource=...            -> all rows
// PATCH  /api/admin?resource=...&id=...     -> { status } for leads, { is_published } otherwise
// DELETE /api/admin?resource=...&id=...
// POST   /api/admin?resource=case-studies   -> create or update a case study
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (!requireDatabase(res)) return;

  try {
    if (!(await requireAdmin(req, res))) return;

    const resource = queryParam(req, "resource") as Resource;
    const table = TABLES[resource];
    if (!table) return sendError(res, 400, "Unknown resource");
    const id = queryParam(req, "id");

    if (req.method === "GET") {
      return res.json({ success: true, data: await query(`SELECT * FROM ${table} ORDER BY created_at DESC`) });
    }

    if (req.method === "PATCH" || req.method === "DELETE") {
      if (!UUID_RE.test(id)) return sendError(res, 400, "Invalid id");

      if (req.method === "DELETE") {
        await query(`DELETE FROM ${table} WHERE id = $1`, [id]);
        return res.json({ success: true });
      }

      const body = getBody(req);
      if (resource === "leads") {
        const status = str(body.status, 20);
        if (!LEAD_STATUSES.includes(status)) return sendError(res, 400, "Invalid status");
        await query("UPDATE leads SET status = $2 WHERE id = $1", [id, status]);
      } else {
        await query(`UPDATE ${table} SET is_published = $2 WHERE id = $1`, [id, Boolean(body.is_published)]);
      }
      return res.json({ success: true });
    }

    if (req.method === "POST" && resource === "case-studies") {
      const body = getBody(req);
      const title = str(body.title, 300);
      const required = { client: str(body.client, 200), industry: str(body.industry, 200), summary: str(body.summary, 2000) };
      if (!title || !required.client || !required.industry || !required.summary) {
        return sendError(res, 400, "Title, client, industry and summary are required.");
      }
      const metrics =
        body.metrics && typeof body.metrics === "object" && !Array.isArray(body.metrics)
          ? Object.fromEntries(
              Object.entries(body.metrics as Record<string, unknown>)
                .slice(0, 10)
                .map(([k, v]) => [str(k, 100), str(v, 100)]),
            )
          : {};
      const values = [
        title,
        slugify(str(body.slug, 120) || title),
        required.client,
        required.industry,
        required.summary,
        str(body.challenge, 5000),
        str(body.solution, 5000),
        strList(body.results),
        strList(body.tech_stack),
        JSON.stringify(metrics),
        str(body.cover_image, 500) || null,
        body.is_published === undefined ? true : Boolean(body.is_published),
      ];

      const existingId = str(body.id, 60);
      const rows = UUID_RE.test(existingId)
        ? await query(
            `UPDATE case_studies SET title=$2, slug=$3, client=$4, industry=$5, summary=$6, challenge=$7,
               solution=$8, results=$9, tech_stack=$10, metrics=$11, cover_image=$12, is_published=$13
             WHERE id = $1 RETURNING *`,
            [existingId, ...values],
          )
        : await query(
            `INSERT INTO case_studies (title, slug, client, industry, summary, challenge, solution,
               results, tech_stack, metrics, cover_image, is_published)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
            values,
          );
      return res.json({ success: true, data: rows[0] });
    }

    return sendError(res, 405, "Method not allowed");
  } catch (err: any) {
    if (err?.code === "23505") return sendError(res, 409, "A record with this slug already exists.");
    return handleServerError(res, err);
  }
}
