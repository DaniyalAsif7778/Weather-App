// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        forecast: "forecast.html",
        sevenDay: "seven-day.html",
        details: "details.html",
        cities: "cities.html",
        settings: "settings.html",
      },
    },
  },
});
