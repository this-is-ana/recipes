<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-grid>
            <ion-row>
              <div class="toolbar-img-container">
                <ion-img
                  :src="'src/assets/icons/icon-plate.png'"
                  slot="start"
                  class="toolbar-img"
                ></ion-img>
              </div>
              <ion-title class="ion-text-start">Search results</ion-title>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>
      <ion-grid class="cards-list-grid">
        <ion-row
          class="ion-justify-content-center"
          v-for="recipe of recipes"
          :key="recipe.idMeal"
          size="6"
        >
          <ion-card
            @click="navigateToRecipeDetails(recipe.strCategory, recipe.idMeal)"
          >
            <ion-col size="3">
              <span class="card-img-container">
                <ion-img
                  class="card-img"
                  :src="recipe.strMealThumb"
                  alt="Category Image"
                ></ion-img>
              </span>
            </ion-col>
            <ion-col size="9">
              <ion-card-title>{{ recipe.strMeal }}</ion-card-title>
            </ion-col>
          </ion-card>
        </ion-row>
        <span id="no-result"></span>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-content {
  --background: url("src/assets/images/background.jpg") no-repeat center/cover;
}
ion-toolbar {
  margin-top: 55px;
  padding: 0;
  display: flex;
  flex-direction: row;
  --background: var(--card-image-background);
}
.toolbar-img-container {
  background-color: transparent;
  filter: var(--img-filter);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 30px;
  padding: 3px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.toolbar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
ion-title {
  margin: 0;
  padding-left: 10px;
  font-size: 1.4em;
  background-color: transparent;
}
.cards-list-grid {
  padding: 30px;
}

ion-card {
  --background: var(--color-card-list);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
  display: flex;
  width: 100%;
  padding: 5px;
  flex-direction: row;
  height: fit-content;
  max-width: 400px;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 0;
  align-items: center;
}

.card-img-container {
  background-color: var(--card-image-background);
  margin: 5px;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  width: 45px;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

ion-card-title {
  font-size: 1em;
  text-align: left;
  padding-left: 0px;
}

ion-img {
  width: cover;
  height: cover;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Recipes } from "@/model/recipe-model";
import { fetchFilterByName } from "@/services/recipes_api_service";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardTitle,
} from "@ionic/vue";

export default defineComponent({
  name: "RecipesListByName",
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonCardTitle,
  },
  mounted() {
    setInterval(this.initializeValues, 100);
  },
  data() {
    const route = useRoute();
    const router = useRouter();
    let searchQuery = ref<string>("");
    let recipes = ref<Recipes[]>([]);
    const navigateToRecipeDetails = (categoryName: string, idMeal: string) => {
      router.push({
        name: "RecipeDetailsPage",
        params: { categoryName, idMeal },
      });
    };
    return {
      route,
      router,
      recipes,
      searchQuery,
      navigateToRecipeDetails,
    };
  },
  methods: {
    async initializeValues() {
      this.searchQuery = this.route.params.searchQuery as string;
      this.recipes = await fetchFilterByName(this.searchQuery);
      let span = document.querySelector("#no-result");

      if (this.recipes == null || this.recipes.length == 0) {
        if(span != null) {
          span!.innerHTML = '<h1 class="ion-text-center">No results found</h1>';
        }
      } else {
        if(span != null) {
          span!.innerHTML = "";
        }
      }
    },
  },
});
</script>
