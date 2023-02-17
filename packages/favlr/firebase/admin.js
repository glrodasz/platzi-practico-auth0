const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccountKey = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: `https://${serviceAccountKey.project_id}.firebaseio.com`,
  });
}
