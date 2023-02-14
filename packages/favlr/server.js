// Load environment variables
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

// Import Express and utilities
const express = require("express");
const fetch = require("node-fetch");
const { createApi } = require("unsplash-js");

// Declare PORT from env variable
const PORT = process.env.PROXY_SERVER_PORT;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Initialize Express
const app = express();

// Initialize Unsplash
const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
  fetch,
});

// Get images from Unsplash
app.get("/images/:imageId", async (req, res) => {
  const photoId = req.params.imageId;

  try {
    const { type, response: photo } = await unsplash.photos.get({
      photoId,
    });

    if (type === "success") {
      const imageResponse = await fetch(photo.urls.regular);
      const imageBuffer = await imageResponse.buffer();

      res.set("Content-Type", "image/jpeg");
      res.send(imageBuffer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching image from Unsplash.");
  }
});

// Start the server
app.listen(PORT, () =>
  console.info(`🌐 Listening on http://localhost:${PORT}`)
);
