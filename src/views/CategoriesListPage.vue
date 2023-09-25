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
              <ion-title>Categories</ion-title>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>
      <ion-grid class="cards-list-grid">
        <ion-row
          class="ion-justify-content-center"
          v-for="category in categoriesList"
          :key="category.idCategory"
          size="6"
        >
          <ion-card @click="navigateToRecipesListByCategory(category)">
            <div class="card-topside">
              <span class="card-img-container"
                ><ion-img
                  class="card-img"
                  :src="category.strCategoryThumb"
                  alt="Category Image"
                ></ion-img
              ></span>
              <ion-card-title>{{ category.strCategory }}</ion-card-title>
            </div>
            <ion-card-content>
              <ion-card-subtitle
                v-html="extractDescription(category.strCategoryDescription)"
              >
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
import { onMounted, ref } from "vue";
import { fetchCategoriesList } from "@/services/recipes_api_service";
import { Category } from "@/model/recipe-model";

export default {
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
  setup() {
    let categoriesList = ref<Category[]>([]);

    onMounted(async () => {
      categoriesList.value = await fetchCategoriesList();
    });

    function extractDescription(string: string) {
      let description: string = "";
      if (string.includes("[")) {
        description = string
          .replace("[1]", " ")
          .replace("[2]", " ")
          .replace("[3]", " ")
          .replace("[4]", " ")
          .replace("[b]", " ")
          .replace("[c]", " ")
          .replace("[d]", " ")
          .replace("[", " ");
      } else {
        description = string;
      }
      return description;
    }
    return {
      categoriesList,
      extractDescription,
    };
  },
  methods: {
    navigateToRecipesListByCategory(category: Category) {
      this.$router.push({
        name: "RecipesListByCategory",
        params: {
          categoryName: category.strCategory,
        },
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
ion-content {
  --background: url("src/assets/images/background.jpg") no-repeat right/cover
    fixed;
}
ion-toolbar {
  margin-top: 55px;
  display: flex;
  flex-direction: row;
  --background: var(--card-image-background);
}
.toolbar-img {
  width: cover;
  height: cover;
}
.toolbar-img-container {
  background-color: transparent;
  filter: var(--img-filter);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 3px;
  margin-left: 30px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
ion-title {
  margin: 0;
  padding-left: 10px;
  font-size: 1.4em;
  background-color: transparent;
}

.cards-list-grid {
  padding: 20px;
}
ion-card {
  --background: var(--color-card-list);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
  display: flex;
  width: 100%;
  padding: 0px;
  flex-direction: column;
  height: fit-content;
  max-width: 400px;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 5px;
}

.card-topside {
  background-color: var(--card-top-side-background);
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 0;
  width: 100%;
  align-items: center;
  justify-content: start;
  font-size: 1em;
}
.card-img-container {
  background-color: var(--card-image-background);
  margin: 5px;
  display: flex;
  padding-bottom: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.card-img {
  width: cover;
  height: cover;
}

ion-card-content {
  padding: 10px;
  padding-top: 0;
}

ion-card-title {
  background-color: transparent;
  padding: 0;
  padding-left: 5px;
  margin: 0;
  font-size: 1em;
  text-align: center;
}

ion-card-subtitle {
  margin-top: 4px;
  text-align: left;
  font-size: 0.7em;
}
</style>
