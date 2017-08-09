let $ = require('jquery');
let handlebars = require('handlebars');

let keyword = '';
let searchUrl = 'http://recipepuppyproxy.herokuapp.com/api/';


document.getElementById('search-form').addEventListener('submit', function(e){
  e.preventDefault();
  keyword = document.getElementById('entry').value;
  console.log(keyword);
  let $recipeContainer = $('#recipe-container');
  $recipeContainer.empty();
  getRecipes();
});

getRecipes();

function getRecipes(){
  fetch(searchUrl + '?q=' + keyword).then(function(response){
    return response.json();
  }).then(init);
}
function init(data){
    let recipes = data.results;
    recipes.splice(8);
    displayRecipeData(recipes);
    console.log(recipes);
}






function displayRecipeData(recipes){
  let $recipeContainer = $('#recipe-container');
  let source = $('#recipe-template').html();
  let template = handlebars.compile(source);

  recipes.forEach(function(recipe){
    console.log(recipe);
    if (!recipe.thumbnail){
    recipe.thumbnail= "https://cdn3.iconfinder.com/data/icons/travel-and-tourism-3/512/plate-512.png";
  }
    let info = template(recipe);
    $recipeContainer.append(info);
  });
}
