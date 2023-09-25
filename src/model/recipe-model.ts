export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;

}

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    ingredients: Ingredients[];
}

export interface Recipes {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
}

export interface Ingredients {
    name: string;
    measure: string;
}