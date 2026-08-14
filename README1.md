# OpenWeatherMap One Call API 4.0 — Current Weather

> **Endpoint:** `https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}`

---

## Overview

The **One Call API 4.0** is OpenWeatherMap's latest unified weather intelligence API. Unlike the previous 3.0 version which returned a massive all-in-one response, version 4.0 uses a **modular endpoint design** — you call only the specific data slice you need. The `/current` endpoint returns an instant snapshot of current weather conditions for any location on Earth.

---

## What This Endpoint Does

Returns **current weather conditions** for a specific latitude/longitude, including:
- Temperature, feels-like temperature, dew point
- Atmospheric pressure, humidity, cloud cover
- UV index, visibility
- Wind speed, gust, and direction
- Rain and snow precipitation (where available)
- Sunrise/sunset times
- Weather condition descriptions with icons

---

## Authentication & Subscription

| Requirement | Details |
|-------------|---------|
| **API Key** | Required. Get one free at [openweathermap.org](https://openweathermap.org) |
| **Subscription** | **"One Call by Call"** plan only (separate from other plans) |
| **Free Tier** | **1,000 API calls/day** included for free |
| **Billing** | Pay-per-use beyond the free limit |

> **Important:** If you have a One Call 3.0 subscription, you must subscribe to 4.0 separately.

---

## Request Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `lat` | ✅ | Latitude, decimal (−90 to 90) | `52.2297` |
| `lon` | ✅ | Longitude, decimal (−180 to 180) | `21.0122` |
| `appid` | ✅ | Your API key | `{YOUR_API_KEY}` |
| `units` | ❌ | Unit system: `metric`, `imperial`, or default (Kelvin) | `metric` |
| `lang` | ❌ | Language code for localized descriptions | `en`, `zh_cn`, `es` |

### Units Parameter

| Value | Temperature | Wind Speed |
|-------|-------------|------------|
| *(none)* | Kelvin | metre/sec |
| `metric` | Celsius | metre/sec |
| `imperial` | Fahrenheit | miles/hour |

### Supported Languages (47+)

`en`, `zh_cn`, `zh_tw`, `es`, `fr`, `de`, `ja`, `ru`, `ar`, `hi`, `pt`, `it`, `ko`, and many more.

---

## Example API Calls

### Basic Request (Default: Kelvin)
```http
GET https://api.openweathermap.org/data/4.0/onecall/current?lat=52.2297&lon=21.0122&appid={YOUR_API_KEY}
```

### Metric Units (Celsius)
```http
GET https://api.openweathermap.org/data/4.0/onecall/current?lat=52.2297&lon=21.0122&units=metric&appid={YOUR_API_KEY}
```

### Imperial Units + Chinese Language
```http
GET https://api.openweathermap.org/data/4.0/onecall/current?lat=30.489772&lon=-99.771335&units=imperial&lang=zh_cn&appid={YOUR_API_KEY}
```

---

## Example JSON Response

```json
{
  "lat": 52.2297,
  "lon": 21.0122,
  "timezone": "Europe/Warsaw",
  "timezone_offset": 7200,
  "data": {
    "dt": 1723478400,
    "sunrise": 1723428000,
    "sunset": 1723482000,
    "temp": 22.5,
    "feels_like": 21.8,
    "pressure": 1015,
    "humidity": 60,
    "dew_point": 14.2,
    "clouds": 20,
    "uvi": 5.2,
    "visibility": 10000,
    "wind_speed": 3.5,
    "wind_gust": 5.1,
    "wind_deg": 180,
    "rain": {
      "1h": 0.5
    },
    "weather": [
      {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02d"
      }
    ]
  }
}
```

---

## Response Field Reference

### Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `lat` | float | Latitude of the requested location |
| `lon` | float | Longitude of the requested location |
| `timezone` | string | Timezone name (e.g., `Europe/Warsaw`) |
| `timezone_offset` | int | Shift in **seconds** from UTC |

### `data` Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `dt` | int | Current time, **Unix timestamp, UTC** |
| `sunrise` | int | Sunrise time, Unix UTC *(omitted in polar night/midnight sun)* |
| `sunset` | int | Sunset time, Unix UTC *(omitted in polar night/midnight sun)* |
| `temp` | float | Temperature (unit depends on `units` param) |
| `feels_like` | float | "Feels like" temperature (human perception) |
| `pressure` | int | Atmospheric pressure at sea level, **hPa** |
| `humidity` | int | Humidity, **%** |
| `dew_point` | float | Dew point temperature |
| `clouds` | int | Cloudiness, **%** |
| `uvi` | float | Current UV index |
| `visibility` | int | Average visibility, **metres** (max: 10,000m) |
| `wind_speed` | float | Wind speed |
| `wind_gust` | float | Wind gust *(where available)* |
| `wind_deg` | int | Wind direction, **degrees (meteorological)** |
| `rain.1h` | float | Rain volume last hour, **mm/h** *(where available)* |
| `snow.1h` | float | Snow volume last hour, **mm/h** *(where available)* |

### `weather` Array (inside `data`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Weather condition ID |
| `main` | string | Group (e.g., `Rain`, `Clouds`, `Snow`) |
| `description` | string | Human-readable condition (localized if `lang` set) |
| `icon` | string | Icon ID (e.g., `02d`). Use `https://openweathermap.org/img/wn/{icon}@2x.png` |

---

## Key Differences from One Call 3.0

| Feature | 3.0 | 4.0 |
|---------|-----|-----|
| **Structure** | Single massive response with `current`, `hourly`, `daily`, `minutely`, `alerts` | Modular endpoints: `/current`, `/timeline/hourly`, `/timeline/daily`, `/alerts`, etc. |
| **Minutely Data** | Removed from free tier | Available via dedicated `/timeline/1min` endpoint |
| **History + Forecast** | Separate endpoints | Unified timeline endpoints |
| **Pagination** | Not supported | Supported on timeline endpoints |
| **Response Path** | `current.temp` | `data.temp` |

---

## Other One Call 4.0 Endpoints

The `/current` endpoint is just one part of the 4.0 family. Other available endpoints include:

| Endpoint | Purpose |
|----------|---------|
| `/onecall/timeline/1min` | Minute-by-minute forecast (next 60 min) |
| `/onecall/timeline/15min` | 15-minute forecast (next 48 hours) |
| `/onecall/timeline/hourly` | Hourly history (47 years) + forecast (48 hours) |
| `/onecall/timeline/daily` | Daily history (47 years) + forecast (1.5 years) |
| `/onecall/alerts` | Weather alerts from national agencies |
| `/onecall/overview` | Human-readable weather summary (AI-powered) |
| `/onecall/assistant` | AI Weather Assistant for conversational queries |

---

## Usage Tips

1. **Missing fields?** If a field (like `rain` or `wind_gust`) is absent, that weather phenomenon simply hasn't occurred or isn't measured at that location/time.

2. **Time formats:** All times are **Unix timestamps in UTC**. Use `timezone_offset` to convert to local time.

3. **Polar areas:** `sunrise` and `sunset` are omitted during midnight sun or polar night periods.

4. **Rate limiting:** Monitor your call count. The free tier resets daily.

5. **Icons:** Weather icons follow the pattern `https://openweathermap.org/img/wn/{icon_id}@2x.png`

---

## Quick Start Checklist

- [ ] Sign up at [openweathermap.org](https://openweathermap.org)
- [ ] Generate an API key in your account dashboard
- [ ] Subscribe to the **"One Call by Call"** plan
- [ ] Get coordinates for your target location (use their Geocoding API or Google Maps)
- [ ] Make your first call to `/data/4.0/onecall/current`
- [ ] Parse the `data` object for current conditions

---

## Official Resources

- **Full 4.0 Docs:** [openweathermap.org/api/one-call-4](https://openweathermap.org/api/one-call-4)
- **Pricing:** [openweathermap.org/full-price](https://openweathermap.org/full-price)
- **Weather Condition Codes:** [openweathermap.org/weather-conditions](https://openweathermap.org/weather-conditions)
- **Migration Guide from 3.0:** Available in the official docs

---

*Last updated: August 2026*
