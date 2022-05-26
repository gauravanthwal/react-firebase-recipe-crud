import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { projectFireStore } from "../../firebase/config";
import { Link } from "react-router-dom";

const SingleRecipe = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    projectFireStore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setData(doc.data());
          console.log(doc.data());
        }
      });
  }, []);

  return (
    <div>
      <Link to='/' className="btn">Back To Home</Link>
      {data ? (
        <Fragment>
          <h2>{data.title}</h2>
          <p>Time: {data.cookingTime}</p>
          <p>method: {data.method}</p>
          <ul>
            {data.ingredients.map((inc, index) => (
              <li key={index}>{inc}</li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default SingleRecipe;
