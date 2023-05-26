import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["sword.png"],
      manifest: {
        name: "Munchkin Stufen Counter",
        short_name: "StufenCounter",
        description: "To count Stufen for Munchkin the game.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "sword.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
