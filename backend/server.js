
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const frontendDist = path.resolve(__dirname, '../dist');

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'WayGuard backend is running'
  });
});

// Calculate real road routes using OSRM
app.get('/api/route', async (req, res) => {
  const { fromLat, fromLon, toLat, toLon } = req.query;

  const coordinates = [fromLat, fromLon, toLat, toLon].map(Number);

  if (
    [fromLat, fromLon, toLat, toLon].some(
      value => value === undefined || value === ''
    ) ||
    !coordinates.every(Number.isFinite) ||
    Math.abs(coordinates[0]) > 90 ||
    Math.abs(coordinates[2]) > 90 ||
    Math.abs(coordinates[1]) > 180 ||
    Math.abs(coordinates[3]) > 180
  ) {
    return res.status(400).json({
      error: 'Valid origin and destination coordinates are required.'
    });
  }

  try {
    const [lat1, lon1, lat2, lon2] = coordinates;

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${lon1},${lat1};${lon2},${lat2}` +
      '?overview=full&geometries=geojson&alternatives=true';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Routing service request failed');
    }

    const data = await response.json();

    if (data.code !== 'Ok') {
      return res.status(422).json({
        error: 'No road route could be found for these coordinates.'
      });
    }

    res.json({
      routes: data.routes.map((route, index) => ({
        id: `route-${index + 1}`,
        distanceMeters: route.distance,
        durationSeconds: route.duration,
        geometry: route.geometry
      }))
    });
  } catch (error) {
    console.error('Routing error:', error.message);

    res.status(502).json({
      error: 'Unable to calculate routes right now.'
    });
  }
});

// Serve the built React app when deployed as one service.
app.use(express.static(frontendDist));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'), error => error && next(error));
});

app.listen(PORT, () => {
  console.log(`WayGuard backend running at http://localhost:${PORT}`);
});
