<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-grid>
            <ion-row>
              <div class="categorie-img-container">
                <ion-img :src="'src/assets/icons/icon-trending.png'" slot="start" class="categorie-img-menu"></ion-img>
              </div>
              <ion-title>Trending Recipe</ion-title>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-card>
            <ion-grid class="ion-padding-horizontal">
              <ion-row>
                <ion-card-header>
                  <ion-card-title class="ion-text-center ion-margin-bottom">
                    <h1>{{ recipe?.strMeal }}</h1>
                  </ion-card-title>

                  <div class="ion-text-center">
                    <img :src="recipe?.strMealThumb" alt="recipe-image" />
                  </div>
                  <ion-card-subtitle class="ion-margin-top">Origin: {{ recipe?.strArea }}</ion-card-subtitle>
                  <ion-card-subtitle>Category: {{ recipe?.strCategory }}</ion-card-subtitle>
                </ion-card-header>
              </ion-row>
              <ion-row>
                <ion-card-content>
                  <ion-card-title class="ion-margin-bottom">Ingredients</ion-card-title>
                  <ul>
                    <li v-for="ingredient of recipe?.ingredients">
                      {{ ingredient.measure }}
                      {{ ingredient.name.toLowerCase() }}
                    </li>
                  </ul>
                </ion-card-content>
              </ion-row>
              <ion-row>
                <ion-card-content>
                  <ion-card-title class="ion-margin-bottom">Instructions</ion-card-title>
                  <p>{{ recipe?.strInstructions }}</p>
                </ion-card-content>
              </ion-row>
              <ion-row class="ion-justify-content-center ion-margin-vertical ion-padding-horizontal ion-padding-bottom">
                <div class="video-container">
                  <iframe :src="recipe?.strYoutube"></iframe>
                </div>
              </ion-row>
            </ion-grid>
          </ion-card>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonImg,
} from "@ionic/vue";

import { ref, defineComponent } from "vue";
import { fetchRandomRecipe } from "@/services/recipes_api_service";
import { Recipe } from "@/model/recipe-model";
import { Preferences } from "@capacitor/preferences";

export default defineComponent({
  name: "Recipe-single",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonImg,
  },
  data() {
    return {
      recipe: ref<Recipe>(),
    };
  },
  mounted() {
    this.getRecipe();
  },
  methods: {
    async getRecipe() {
      let storedDate = (await Preferences.get({ key: "date" })).value;

      if (storedDate != null) {
        let currentDate = new Date().toLocaleString().slice(0, 10);

        if (storedDate < currentDate) { //New date, new recipe
          const setDate = async () => {
            await Preferences.set({
              key: "date",
              value: currentDate,
            });
          };

          setDate();

          let recipeObj = await fetchRandomRecipe();
          let recipe = ref<Recipe>();
          let ingredientsList: string[] = [];
          let measuresList: string[] = [];
          let recipeIngredients = [];
          let youtube = "";

          recipe.value = recipeObj.meals[0];
          this.recipe = recipe.value;

          youtube = this.recipe!.strYoutube;
          youtube = "https://www.youtube.com/embed/" + youtube.substring(youtube.search("v=") + 2);

          for (let [key, value] of Object.entries(recipeObj.meals[0])) {
            if (
              key.includes("strIngredient") &&
              value != "" &&
              value != "null" &&
              value != null
            ) {
              ingredientsList.push(`${value}`);
            }
            if (
              key.includes("strMeasure") &&
              value != "" &&
              value != "null" &&
              value != null
            ) {
              measuresList.push(`${value}`);
            }
          }

          for (let i = 0; i < ingredientsList.length; i++) {
            recipeIngredients.push({
              name: ingredientsList[i],
              measure: measuresList[i],
            });
          }

          this.recipe!.ingredients = recipeIngredients;
          this.recipe!.strYoutube = youtube;

          const setRecipe = async () => {
            await Preferences.set({
              key: "recipe",
              value: JSON.stringify(this.recipe),
            });
          };

          setRecipe();
        } else {
          //Same date, same recipe
          let recipe = (await Preferences.get({ key: "recipe" })).value;

          if (recipe != null) {
            this.recipe = JSON.parse(recipe);
          }
        }
      } else {
        //First access
        const setDate = async () => {
          await Preferences.set({
            key: "date",
            value: new Date().toLocaleString().slice(0, 10),
          });
        };

        setDate();

        let recipeObj = await fetchRandomRecipe();
        let recipe = ref<Recipe>();
        let ingredientsList: string[] = [];
        let measuresList: string[] = [];
        let recipeIngredients = [];
        let youtube = "";

        recipe.value = recipeObj.meals[0];
        this.recipe = recipe.value;

        youtube = this.recipe!.strYoutube;
        youtube =
          "https://www.youtube.com/embed/" +
          youtube.substring(youtube.search("v=") + 2);

        for (let [key, value] of Object.entries(recipeObj.meals[0])) {
          if (
            key.includes("strIngredient") &&
            value != "" &&
            value != "null" &&
            value != null
          ) {
            ingredientsList.push(`${value}`);
          }
          if (
            key.includes("strMeasure") &&
            value != "" &&
            value != "null" &&
            value != null
          ) {
            measuresList.push(`${value}`);
          }
        }

        for (let i = 0; i < ingredientsList.length; i++) {
          recipeIngredients.push({
            name: ingredientsList[i],
            measure: measuresList[i],
          });
        }

        this.recipe!.ingredients = recipeIngredients;
        this.recipe!.strYoutube = youtube;

        const setRecipe = async () => {
          await Preferences.set({
            key: "recipe",
            value: JSON.stringify(this.recipe),
          });
        };

        setRecipe();
      }
    },
  },
});
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

ion-toolbar {
  margin-top: 55px;
  display: flex;
  flex-direction: row;
  --background: var(--card-image-background);
}

ion-title {
  margin: 0;
  padding-left: 10px;
  font-size: 1.4em;
  background-color: transparent;
}

.categorie-img-container {
  background-color: transparent;
  filter: var(--img-filter);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  margin-left: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.categorie-img-menu {
  width: cover;
  height: cover;
}

ion-card {
  --background: var(--color-card-list);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

h1 {
  font-size: 1.2em;
}

img {
  aspect-ratio: 1;
  width: 100%;
  max-width: 500px;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
}

p {
  width: 100%;
  max-width: 500px;
}

.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

ion-content {
  --background: url("src/assets/images/background.jpg") no-repeat center/cover fixed;
}
</style>
