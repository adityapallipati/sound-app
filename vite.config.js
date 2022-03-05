import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import commonjsExternals from "vite-plugin-commonjs-externals";
import {builtinModules} from 'module';

export default defineConfig({
  server: {
    fs: {
      strict: false,
      allow: [searchForWorkspaceRoot(process.cwd()), "/sounds"],
    },
  },
  plugins: [
    react(),
    commonjsExternals({
      externals: builtinModules,
    }),
  ],
});
