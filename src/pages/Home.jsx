import React, { useEffect, useState } from "react";
import { projectFireStore } from "../firebase/config";
import Recipes from "../components/recipe/Recipes";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFireStore
      .collection("recipes")
      // .collection("recipes").get().then((snapshot) => {
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError("No recipes to load");
            setIsPending(false);
            setIsEmpty(true);
          } else {
            let results = [];
            snapshot.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() });
            });
            setData(results);
            setIsPending(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
          console.log(err.message);
        }
      );

    return () => unsub();
  }, []);
  return (
    <div>
      {isEmpty ? <h2>There is no recipe to show</h2> : <Recipes data={data} />}
    </div>
  );
};

export default Home;
