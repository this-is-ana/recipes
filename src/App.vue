<template>
  <ion-app>
    <ion-menu-toggle auto-hide="false" menu="main-menu">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>My Recipe's Book</ion-title>
        </ion-toolbar>
      </ion-header>

      <router-view id="main-content"></router-view>

      <SideMenu />
    </ion-menu-toggle>
  </ion-app>
</template>

<script lang="ts">
import { IonApp } from "@ionic/vue";
import { defineComponent } from "vue";
import SideMenu from "@/components/SideMenu.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    SideMenu,
  },
});
</script>
