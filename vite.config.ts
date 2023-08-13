import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  publicDir: "../public/",
  envDir: "./environments",
  server: {
    open: true,
    hmr: { overlay: true },
    port: 3000,
  },
  preview: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: "../build",
    assetsDir: "static",
    sourcemap: true,
    manifest: "asset-manifest.json",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `static/js/main.[hash].js`,
        chunkFileNames: `static/js/[hash].chunk.js`,
        assetFileNames: `static/media/[name].[hash].[ext]`,
      },
    },
    minify: true,
  },
  plugins: [
    tsConfigPaths(),
    react(),
    splitVendorChunkPlugin(),
    checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      app: resolve(__dirname, "src/app"),
      assets: resolve(__dirname, "src/assets"),
    },
  },
});
