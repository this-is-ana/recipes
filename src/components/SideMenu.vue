<template>
  <ion-menu
    menu-id="app-menu"
    content-id="main-content"
    autohide="true"
    type="overlay"
  >
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <div class="toolbar-img-container">
              <ion-img
                :src="'src/assets/icons/icon-book.png'"
                slot="start"
                class="toolbar-img"
              ></ion-img>
            </div>
            <ion-title>Menu</ion-title>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-searchbar
            placeholder="Search"
            inputmode="text"
            @ionInput="handleSearchInput"
          ></ion-searchbar>
        </ion-item>

        <ion-menu-toggle>
          <ion-item>
            <ion-label class="menu-title" @click="navigateMenu('/trending')"
              >Trending Recipe</ion-label
            >
          </ion-item>
          <ion-item>
            <ion-label class="menu-title" @click="navigateMenu('/categories')"
              >Categories</ion-label
            >
          </ion-item>
          <ion-item
            class="categories-menu"
            v-for="category in categoriesList"
            :key="category.strCategory"
            @click="
              navigateToRecipesList(
                category.strCategoryThumb,
                category.strCategory,
                category.strCategoryDescription
              )
            "
          >
            <div class="categorie-container">
              <ion-img
                :src="'src/assets/icons/icon-' + category.strCategory + '.png'"
                slot="start"
                class="categorie-img-menu"
              ></ion-img>
            </div>
            <ion-label class="menu-subitem">{{
              category.strCategory
            }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonMenu,
  IonMenuToggle,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonGrid,
  IonRow,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonImg,
  IonSearchbar,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import { fetchCategoriesList } from "@/services/recipes_api_service";
import { Category } from "@/model/recipe-model";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SideMenu",
  components: {
    IonMenu,
    IonMenuToggle,
    IonMenuButton,
    IonButtons,
    IonHeader,
    IonGrid,
    IonRow,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonImg,
    IonSearchbar,
  },
  setup() {
    const router = useRouter();
    let categoriesList = ref<Category[]>([]);
    let searchQuery = "";

    onMounted(async () => {
      categoriesList.value = await fetchCategoriesList();
    });

    function handleSearchInput(event: CustomEvent) {
      if (event.detail.event) {
        if (event.detail.event.data != null) {
          searchQuery += event.detail.event.data;

          function navigateToFilterRecipes(searchQuery: string) {
            router.push({ name: "RecipesListByName", params: { searchQuery } });
          }

          navigateToFilterRecipes(searchQuery);
        } else {
          searchQuery = searchQuery.substring(0, searchQuery.length - 1);

          function navigateToFilterRecipes(searchQuery: string) {
            router.push({ name: "RecipesListByName", params: { searchQuery } });
          }

          navigateToFilterRecipes(searchQuery);

          if (searchQuery.length == 1) {
            searchQuery = "";
          }
        }
      } else {
        searchQuery = "";
      }
    }

    return {
      categoriesList,
      handleSearchInput,
      searchQuery,
    };
  },
  methods: {
    navigateMenu(url: string) {
      this.$router.push(url);
    },
    navigateToRecipesList(
      categoryImg: string,
      categoryName: string,
      categoryDescription: string
    ) {
      this.$router.push({
        name: "RecipesListByCategory",
        params: { categoryImg, categoryName, categoryDescription },
      });
    },
  },
});
</script>

<style scoped>
ion-grid {
  display: flex;
  flex-direction: row;
}
.toolbar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.toolbar-img-container {
  background-color: transparent;
  filter: var(--img-filter);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
}
ion-title {
  margin: 0;
  padding-left: 0;
}

.menu-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

ion-list {
  justify-items: start;
}

.categories-menu {
  padding-left: 15px;
}

.categorie-container {
  background-color: transparent;
  filter: var(--img-filter);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 5px;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-right: 8px;
}

.categorie-img-menu {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

ion-searchbar {
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.menu-subitem {
  padding-left: 10px;
  font-size: 14px;
  text-align: start;
}
</style>
