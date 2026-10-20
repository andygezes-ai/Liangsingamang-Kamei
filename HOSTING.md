# Hosting WayGuard

WayGuard can be deployed as one Node.js web service. The Express server serves the built React app and the `/api` endpoints from the same origin.

## Requirements

- Node.js 20 or newer
- Outbound HTTPS access to `router.project-osrm.org` for route calculation

## Build and start

From the repository root, run:

```sh
npm ci
npm ci --prefix backend
npm run build
npm start
```

Set the service's build command to `npm ci && npm ci --prefix backend && npm run build` and its start command to `npm start`. The server uses the hosting provider's `PORT` environment variable automatically (port 5000 locally).

After deployment, check `/api/health` to confirm the server is running. The web app is served from `/`, and routes are calculated at `/api/route`.

## Local development

Install the root and backend dependencies using the commands above. Start the API with `npm start --prefix backend`; in a second terminal start Vite with `npm run dev`. For local Vite development, use the production app (`npm run build` then `npm start`) to exercise same-origin API calls, or configure a Vite proxy if you want hot reload while using the API.

## Current data limitations

Route geometry, distance, and duration come from the public OSRM demo service. Its availability and usage limits are outside this project. Safety indicators, hazard reports, and facility data remain demo/local browser data; the current app does not have a database or persistent report API. Do not present the safety score as live or authoritative data.
