import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../pages/Login.tsx";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});
