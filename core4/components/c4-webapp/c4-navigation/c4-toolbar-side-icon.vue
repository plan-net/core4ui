<template>
  <v-row class="circle-container">
    <v-icon>more_vert</v-icon>
    <v-icon>more_vert</v-icon>
    <v-icon>more_vert</v-icon>
  </v-row>
</template>

<style scoped>
  div.circle-container{
    position:relative;
    left:23px;
    width: 24px;
    height: 24px;
    overflow: hidden;
  }
  div >>> .v-icon{
    width: 9px !important;
    font-size: 34px !important;
    font-weight: bold;
  }
</style>
