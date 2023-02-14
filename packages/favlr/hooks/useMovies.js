import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../firebase";

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    async function getMovies() {
      try {
        const queryCollection = await query(collection(db, "movies"));

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
