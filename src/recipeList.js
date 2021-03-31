import React from 'react';
import './index.css'

function RecipeList({title, calories, image, ingredients}) {
    return (
        <div>
            <h2> {title} </h2>
            <h4> {parseInt(calories)} calories </h4>
            <ul> <i class="far fa-edit"></i> Ingredients:  <hr/> {ingredients}  </ul> 
            <img src={image} alt='' />
        </div>
    )
}

export default RecipeList
  