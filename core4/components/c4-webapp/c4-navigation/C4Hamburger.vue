<template>
  <div class="c4-hamburger">
    <v-btn
      text
      icon
      @click="$bus.$emit('toggleSidenav')"
    >
      <v-row class="circle-container">
        <v-icon>mdi-dots-vertical</v-icon>
        <v-icon>mdi-dots-vertical</v-icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-row>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.c4-hamburger{
  border-right: 1px solid #ddd;
  height: 100%;
  padding-top: 9px;
  padding-right: 9px;
  .v-btn{
    position: relative;
    margin-left: -8px;
  }
}
.theme--dark {
.c4-hamburger{
  border-right: 1px solid #000;
}
}
.circle-container {
  position: relative;
  left: 26px;
  width: 24px;
  height: 24px;
  overflow: hidden;
}
::v-deep .v-icon {
  color: var(--v-primary-base) !important;
  width: 7px !important;
  min-width: 7px !important;
  font-size: 26px !important;
  font-weight: bold;
}
</style>
