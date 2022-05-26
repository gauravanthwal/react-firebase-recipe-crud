import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { projectFireStore } from "../../firebase/config";

const NewRecipe = ({ edit }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFornData] = useState({
    title: "",
    method: "",
    cookingTime: "",
    ingredients: "",
  });
  const { title, method, cookingTime, ingredients } = formData;

  useEffect(() => {
    if (edit) {
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
    }
  }, []);

  useEffect(() => {
    if (edit) {
      console.log(data);
      setFornData({
        title: data?.title,
        cookingTime: data?.cookingTime.split(" minutes")[0],
        method: data?.method,
        ingredients: data?.ingredients.join(","),
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFornData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      ...formData,
      cookingTime: cookingTime + " minutes",
      ingredients: ingredients.split(",").map((el) => el.trim()),
    };

    try {
      if (edit) {
        await projectFireStore.collection("recipes").doc(id).update(doc);
      } else {
        await projectFireStore.collection("recipes").add(doc);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <Link to="/" className="btn">
        Back To Home
      </Link>
      <div className="new-recipe">
        <form onSubmit={onSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Recipe Name"
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              name="cookingTime"
              value={cookingTime}
              onChange={onChange}
              placeholder="Cooking Time (minutes)"
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="ingredients"
              value={ingredients}
              onChange={onChange}
              placeholder="Ingredients seperated by comma ( , )"
            />
          </div>
          <div className="input-container">
            <textarea
              type="text"
              name="method"
              value={method}
              onChange={onChange}
              placeholder="Method"
            />
          </div>

          <button>{edit ? "Update" : "Save"}</button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewRecipe;
