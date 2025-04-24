import react from "@vitejs/plugin-react";
import "dotenv/config";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react(), tsConfigPaths()],
});
