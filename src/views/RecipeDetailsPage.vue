<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ recipe?.strMeal }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid class="content-grid">
        <ion-row class="ion-justify-content-center">
          <ion-card>
            <ion-grid class="ion-padding">
              <ion-row>
                <ion-card-header>
                  <ion-card-title
                    class="ion-text-center ion-margin-bottom card-title"
                  >
                    <h1>{{ recipe?.strMeal }}</h1>
                  </ion-card-title>
                  <div class="ion-text-center">
                    <img :src="recipe?.strMealThumb" alt="recipe-image" />
                  </div>
                  <ion-card-subtitle class="ion-margin-top"
                    >Origin: {{ recipe?.strArea }}</ion-card-subtitle
                  >
                  <ion-card-subtitle
                    >Category: {{ recipe?.strCategory }}</ion-card-subtitle
                  >
                </ion-card-header>
              </ion-row>
              <ion-row>
                <ion-card-content>
                  <ion-card-title class="ion-margin-bottom"
                    >Ingredients</ion-card-title
                  >
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
                  <ion-card-title class="ion-margin-bottom"
                    >Instructions</ion-card-title
                  >
                  <p>{{ recipe?.strInstructions }}</p>
                </ion-card-content>
              </ion-row>
              <ion-row
                class="ion-justify-content-center ion-margin-vertical ion-padding-horizontal"
              >
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
} from "@ionic/vue";
import { useRouter, RouteLocationNormalized, useRoute } from "vue-router";
import { ref, defineComponent, onMounted, Ref } from "vue";
import { fetchRecipeDetails } from "@/services/recipes_api_service";
import { Ingredients, Recipe } from "@/model/recipe-model";

export default defineComponent({
  name: "RecipeDetails",
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
  },
  data() {
    return {
      recipe: ref<Recipe>(),
    };
  },
  mounted() {
    const route = useRoute();
    const idMeal = ref<string>("");
    idMeal.value = (route.params as RouteLocationNormalized["params"])
      .idMeal as string;
    this.getRecipe(idMeal.value);
  },
  methods: {
    async getRecipe(idMeal: string) {
      let recipeObj = await fetchRecipeDetails(idMeal);
      //console.log("recipeObj");
      //console.log(recipeObj);
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
    },
  },
});
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
.content-grid {
  padding: 20px;
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
  --background: url("src/assets/images/background.jpg") no-repeat center/cover
    fixed;
}
</style>
