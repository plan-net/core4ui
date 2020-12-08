<template>
  <div v-if="menu.length > 0">
    <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn style="margin-top: 6px;" text v-bind="attrs" v-on="on">
          More
        </v-btn>
      </template>
      <v-list dense>
        <template v-for="item in menu">
          <v-list-item
            v-if="item.type !== 'mail'"
            :key="item.label"
            router
            :to="{ name: 'content', params: { type: item.label } }"
          >
            <v-list-item-action>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-else :key="item.label" router :href="item.path">
            <v-list-item-action>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  watch: {},
  computed: {
    ...mapGetters(['menu'])
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="css"></style>
