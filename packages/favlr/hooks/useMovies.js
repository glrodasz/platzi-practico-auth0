import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db, auth, signInWithCustomToken } from "../firebase";

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    async function getMovies() {
      try {
        const { firebaseToken, userClaims } = await fetch("/api/firebase").then(
          (data) => data.json()
        );

        await signInWithCustomToken(auth, firebaseToken);

        const queryCollection = await query(
          collection(db, "movies"),
          where("genre", "in", userClaims.genres)
        );

        unsubscribe = onSnapshot(queryCollection, (querySnapshot) => {
          setMovies(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
      } catch (error) {
        console.error(error);
      }
    }

    getMovies();

    return () => unsubscribe();
  }, []);

  return { movies };
};

export default useMovies;
