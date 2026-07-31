import { createFileRoute } from "@tanstack/react-router";
import { BlogsPage } from "@/components/blogs-page";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
});
