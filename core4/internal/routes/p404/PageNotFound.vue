<template>
  <v-container>
    <v-layout align-center>
      <v-flex class="text-center">
        <v-card>
          <v-card-text class="pa-5 text-xs-center">
            <h1 class="py-9" style="font-size: 84px; font-weight: bold;">404</h1>
            <h6 class="pt-3uc headline">The page you requested could not be found</h6>
          </v-card-text>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn
              to="/"
              color="primary"
              text
            >Entry page</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
}
</script>
<style lang="css" scoped>
</style>
