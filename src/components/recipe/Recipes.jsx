import React from "react";
import { Link } from "react-router-dom";
import { projectFireStore } from "../../firebase/config";

const Recipes = ({ data }) => {
  const deleteRecipe = async (id) => {
    await projectFireStore.collection("recipes").doc(id).delete();
  };

  const updateRecipe = (id) =>{

  }
  return (
    <div className="grid">
      {data?.length > 0 ? (
        data.map((d) => (
          <div className="recp" key={d.id}>
            <i
              className="fa-solid fa-trash"
              onClick={() => deleteRecipe(d.id)}
            ></i>
            <Link to={`/update-recipe/${d.id}`} className="update-link">
              <i className="fa-solid fa-pen" onClick={() => updateRecipe(d.id)}></i>
            </Link>
            <h3>{d.title}</h3>
            <p>{d.cookingTime}</p>
            <Link to={`/recipe/${d.id}`} className="a">
              Cook This
            </Link>
          </div>
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Recipes;
