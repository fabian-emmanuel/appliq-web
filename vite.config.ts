import react from "@vitejs/plugin-react";
import "dotenv/config";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";


// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin(), tsConfigPaths()],
});
