import { createRouter, createWebHistory } from 'vue-router';
import TrendingRecipe from '@/views/TrendingRecipePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/trending',
  },
  {
    path: '/trending',
    name: 'TrendingRecipe',
    component: TrendingRecipe,
  },
  {
    path: '/categories',
    name: 'CategoriesList',
    component: () => import ('@/views/CategoriesListPage.vue'),
  
  },
  {
    path: '/categories/:categoryName',
    name: 'RecipesListByCategory',
    component: () => import ('@/views/RecipesListPage.vue'),
  },
  {
    path: '/categories/:categoryName/:idMeal',
    name: 'RecipeDetailsPage',
    component: () => import ('@/views/RecipeDetailsPage.vue'),
  },
  {
    path: '/search=:searchQuery',
    name: 'RecipesListByName',
    component: () => import ('@/views/FilterRecipes.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;