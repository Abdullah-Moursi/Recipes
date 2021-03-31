import "./index.css";
import React, { useEffect, useState } from "react";
import RecipeList from "./recipeList";

function App() {
  const ID = "04e3284b";
  const KEY = "c0ed1b2606ddec2478b79a592134172e";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getInput = (e) => {
    setSearch(e.target.value);
  };

  const getQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  let id = 1;

  return (
    <>
      <h1>Bon Appétit!</h1>

      <form className="form" onSubmit={getQuery}>
        <input
          className="inp"
          type="text"
          autoComplete="off"
          required
          onChange={getInput}
          value={search}
          placeholder="Enter your favourite food"
        />
        <button className="btn" type="submit">
          YUMMY!
        </button>
      </form>
      <div className="list">
        {recipes.map((recipe) => (
          <RecipeList
            key={recipe.recipe.calories}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredientLines.map((ing) => (
              <li key={id++}>{ing}</li>
            ))}
          />
        ))}
      </div>
    </>
  );
}

export default App;
