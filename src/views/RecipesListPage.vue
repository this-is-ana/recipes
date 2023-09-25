<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-grid>
            <ion-row>
              <div class="categorie-img-container">
                <ion-img
                  :src="'src/assets/icons/icon-' + categoryName + '.png'"
                  slot="start"
                  class="categorie-img-menu"
                ></ion-img>
              </div>
              <ion-title>{{ categoryName }}</ion-title>
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
          <ion-card @click="navigateToRecipeDetails(recipe.idMeal)">
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
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchRecipesListByCategory } from "@/services/recipes_api_service";
import { Recipes } from "@/model/recipe-model";
import {
  IonMenu,
  IonMenuToggle,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";
import router from "@/router";

export default defineComponent({
  name: "RecipesListByCategory",
  components: {
    IonMenu,
    IonMenuToggle,
    IonMenuButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonPage,
    IonAvatar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonImg,
    IonCardTitle,
    IonCardSubtitle,
  },
  mounted() {
    setInterval(this.getRecipes, 100);
  },
  data() {
    const route = useRoute();
    const router = useRouter();
    const categoryName = ref<string>("");
    let recipes = ref<Recipes[]>([]);

    const navigateToRecipeDetails = (idMeal: string) => {
      router.push({ name: "RecipeDetailsPage", params: { idMeal } });
    };
    return {
      route,
      router,
      recipes,
      categoryName,
      navigateToRecipeDetails,
    };
  },
  methods: {
    async getRecipes() {
      this.categoryName = this.route.params.categoryName as string;
      this.recipes = await fetchRecipesListByCategory(this.categoryName);
      //console.log("recipes on page");
      //console.log(this.recipes);
    },
  },
});
</script>

<style scoped>
ion-content {
  --background: url("src/assets/images/background.jpg") no-repeat right/cover;
}

ion-toolbar {
  margin-top: 55px;
  padding-left: 25px;
  display: flex;
  flex-direction: row;
  --background: var(--card-image-background);
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
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.categorie-img-menu {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cards-list-grid {
  padding: 30px;
}

ion-title {
  margin: 0;
  padding-left: 10px;
  font-size: 1.4em;
  background-color: transparent;
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
ion-img {
  width: cover;
  height: cover;
}
ion-card-title {
  font-size: 1em;
  text-align: left;
  padding-left: 0px;
}
</style>
