# Aura Weather

## Current stage

The app has completed its Tailwind CSS migration and is now a Vite + TypeScript weather dashboard.

## Implemented

- Tailwind v4 design system with responsive desktop and mobile navigation.
- Desktop sidebar that expands/collapses and remembers its state.
- City search from the opening form or navbar search fields.
- Live Visual Crossing weather data, stored locally for the current session.
- Five live hourly forecast cards on the dashboard, styled with the app's cyan, violet, and sun gradient.
- A dedicated 24-hour forecast page with condition, temperature, feels-like temperature, wind, rain probability, humidity, pressure, and UV data.
- Dedicated seven-day forecast, weather details, My Cities, and settings pages.
- Functional recent-search chips that are saved locally and can reload a city.
- Centralized weather presentation control in `src/ts/weather-state.ts`; it is currently set to `rain` for testing.
- Rain background and ambient audio behavior.

## Run locally

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_KEY` to a Visual Crossing API key.
3. Run `npm install` and then `npm run dev`.

## Production check

Run `npm run build` to type-check the project and create both the dashboard and 24-hour forecast pages.
