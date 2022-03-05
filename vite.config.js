import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import commonjsExternals from "vite-plugin-commonjs-externals";
import { builtinModules } from "module";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: builtinModules,
  },
  plugins: [
    react(),
    commonjsExternals({
      externals: builtinModules,
    }),
  ],
  build: {
    assetsDir: ".",
    rollupOptions: {
      output: {
        format: "cjs",
      },
      external: builtinModules,
    },
  },
});
