import { Recipe, Category, Recipes } from "@/model/recipe-model";
import { ref } from "vue";

const API_Url = 'https://www.themealdb.com/api/json/v1/1/'
const allCategoriesUrl = 'categories.php';

const randomRecipeUrl = 'random.php';
const recipesByCategoryUrl = 'filter.php?c=';
const recipeDetails = 'lookup.php?i=';
const recipesByName = 'search.php?s=';

let categoriesList = ref<Category[]>([]);
const recipe = ref<Recipe>();
const recipesListByCategory = ref<Recipes[]>([]);

const selectedCategory = ref<Category>();

fetchRandomRecipe()
fetchCategoriesList()

export async function fetchRandomRecipe() {
  const response = await fetch(API_Url + randomRecipeUrl);
  let randomRecipe = await response.json();
  return randomRecipe;
};

export async function fetchCategoriesList() {
  const response = await fetch(API_Url + allCategoriesUrl);
  let categoriesResponse = await response.json();
  categoriesList.value = categoriesResponse.categories;
  //console.log("categoriesList")
  //console.log(categoriesList)
  return categoriesList.value;
};

export async function fetchRecipesListByCategory(categoryName: string) {
  //console.log(`categoryName= ${categoryName}`)
  const response = await fetch(`${API_Url}${recipesByCategoryUrl}${categoryName}`);
  let categoriesResponse = await response.json();
  recipesListByCategory.value= categoriesResponse.meals;
  //console.log('recipesListByCategory');
  //console.log(recipesListByCategory.value);
  return recipesListByCategory.value;
}

export async function fetchRecipeDetails(recipeId: string) {
  //console.log(recipeId)
  const response = await fetch(`${API_Url}${recipeDetails}${recipeId}`);
  let recipe = await response.json();
  //console.log(recipe)
  return recipe;
}

export async function fetchFilterByName(name: string) {
  const response = await fetch(`${API_Url}${recipesByName}${name}`);
  let filterRecipes = await response.json();
  let recipes = filterRecipes.meals;
  
  return recipes;
}