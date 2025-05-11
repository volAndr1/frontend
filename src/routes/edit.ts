import { createFileRoute } from "@tanstack/react-router";
import EditPost from "../pages/EditPost.tsx";

export const Route = createFileRoute("/edit")({
	component: EditPost,
});
