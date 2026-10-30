import type { VercelRequest, VercelResponse } from "@vercel/node";
import { query } from "./_lib/db.js";
import { getBody, handleServerError, queryParam, requireDatabase, sendError, str } from "./_lib/http.js";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

// GET  /api/content?type=blogs|testimonials|case-studies  -> published items
// POST /api/content?type=blogs|testimonials               -> public submission (hidden until approved)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireDatabase(res)) return;
  const type = queryParam(req, "type");

  try {
    if (req.method === "GET") {
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      if (type === "blogs") {
        return res.json({
          success: true,
          data: await query("SELECT * FROM blogs WHERE is_published = true ORDER BY published_at DESC"),
        });
      }
      if (type === "testimonials") {
        return res.json({
          success: true,
          data: await query("SELECT * FROM testimonials WHERE is_published = true ORDER BY created_at DESC"),
        });
      }
      if (type === "case-studies") {
        return res.json({
          success: true,
          data: await query("SELECT * FROM case_studies WHERE is_published = true ORDER BY created_at DESC"),
        });
      }
      return sendError(res, 400, "Unknown content type");
    }

    if (req.method === "POST") {
      const body = getBody(req);

      if (type === "testimonials") {
        const name = str(body.name, 200);
        const role = str(body.role, 200);
        const quote = str(body.quote, 2000);
        if (!name || !role || !quote) return sendError(res, 400, "Name, role and review are required.");
        const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
        await query(
          `INSERT INTO testimonials (name, role, type, quote, company_or_course, rating, avatar_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            name,
            role,
            body.type === "academy" ? "academy" : "client",
            quote,
            str(body.company_or_course, 200) || null,
            rating,
            str(body.avatar_url, 500) || null,
          ],
        );
        return res.status(201).json({ success: true });
      }

      if (type === "blogs") {
        const title = str(body.title, 300);
        const description = str(body.description, 1000);
        const content = str(body.content, 100000);
        if (!title || !description || !content) return sendError(res, 400, "Title, summary and content are required.");
        // Suffix keeps slugs unique even when two submissions share a title.
        const slug = `${slugify(str(body.slug, 120) || title)}-${Date.now().toString(36)}`;
        await query(
          `INSERT INTO blogs (title, slug, description, content, cover_image, author)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [title, slug, description, content, str(body.cover_image, 500) || null, str(body.author, 200) || "Guest Author"],
        );
        return res.status(201).json({ success: true });
      }

      return sendError(res, 400, "Unknown content type");
    }

    return sendError(res, 405, "Method not allowed");
  } catch (err) {
    return handleServerError(res, err);
  }
}
