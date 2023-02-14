require("dotenv").config({ path: ".env.local" });

const SEED_USER_ID = process.env.SEED_USER_ID;
const COLLECTION_NAME = "movies"

const { collection, addDoc } = require("firebase/firestore");
const { db } = require("../../firebase");
const dataCollection = require("../../data/movies.json");

async function firestoreSeed() {
  dataCollection.forEach(async (item) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      userId: SEED_USER_ID,
    });
    console.info("Document added with ID: ", docRef.id);
  });
}

firestoreSeed();
