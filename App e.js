import "./index.css";
import React, { useEffect, useState } from "react";
import RecipeList from "./recipeList";

function App() {
  const ID = "04e3284b";
  const KEY = "c0ed1b2606ddec2478b79a592134172e";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);

  const getRecipe = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
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

  // You can use the index provided by the map() func instead of setting it manually, check Line 62
  // let id = 1;

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
        {/* loading effect while query is being fetched */}
        {loading ? (
          <div>Loading...</div>
        ) : // try typing random characters, recipes array will be empty and so we need to add a fallback for this case
        recipes.length === 0 ? (
          <div>
            Sorry, we can't find this recipe. Please try a different one
          </div>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeList
              key={recipe.recipe.calories}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredientLines.map((ing) => (
                // here index starts at 0, and increments by 1 with each iteration
                <li key={index}>{ing}</li>
              ))}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
