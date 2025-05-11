import { createFileRoute } from "@tanstack/react-router";
import CreatePost from "../pages/CreatePost.tsx";

export const Route = createFileRoute("/create")({
	component: CreatePost,
});
