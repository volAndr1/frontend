import { createFileRoute } from "@tanstack/react-router";
import Posts from "../pages/Post.tsx";

export const Route = createFileRoute("/posts")({
	component: Posts,
});
