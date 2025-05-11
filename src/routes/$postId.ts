import { createFileRoute } from "@tanstack/react-router";
import PostDetails from "../pages/PostDetails.tsx";

export const Route = createFileRoute("/$postId")({
	component: PostDetails,
});
