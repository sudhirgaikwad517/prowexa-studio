import { createFileRoute } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";

export const Route = createFileRoute("/blogs_/$slug")({
  component: BlogDetailPage,
});
