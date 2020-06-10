<template>
  <v-dialog scrollable
            max-width="720"
            v-model="open"
            persistent>
    <v-card tile
            class="pa-0">
      <template v-if="errorData">
        <v-app-bar class="px-0"
                   dense
                   flat
                   dark
                   color="error">
          <v-toolbar-title class="title">{{i18n.t('error')}}</v-toolbar-title>
          <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  bottom
                  color="white"
                  height="2"
          ></v-progress-linear>
          <v-spacer></v-spacer>
          <v-btn icon
                 v-if="errorData.close"
                 @click="open = !open">
            <v-icon>close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="px-4 py-3">
          <p v-if="errorData.html"
             v-html="errorData.html"
          >
          </p>
          <div v-if="errorData.json">
            <pre class="mt-2 pa-1">{{errorData.json}}</pre>
          </div>
          <div v-else>
            <pre class="mt-2 pa-1">{{errorData.data}}</pre>
          </div>

          <transition name="slide-fade">
            <div v-if="showTechInfo" class="response">
              <pre>{{errorData.error.response || errorData.error}}</pre>
            </div>
          </transition>
        </v-card-text>
        <v-card-actions class="pl-3 pr-3 pb-3 pt-0">
          <v-btn class="ma-2"
                 color="grey lighten-1"
                 @click="showTechInfo = !showTechInfo"
                 text>
            <v-icon>{{showTechInfo ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon> technical details
          </v-btn>
          <v-spacer></v-spacer>
          <template v-for="(btn, index) in errorData.actions">
            <v-btn :color="btn.main ? 'primary' : 'grey lighten-1'"
                   xxxtext="!btn.main"
                   @click="btn.action">
              {{btn.name}}
            </v-btn>
          </template>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>

</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    mixins: [],
    props: {},
    created () {},
    mounted () {
    },
    computed: {
      ...mapGetters(['error', 'loading'])
    },
    watch: {
      error: function (newVal) {
        if (newVal != null) {
          this.errorData = newVal
          this.open = true
        } else {
          this.open = false
        }
      }
    },
    data () {
      return {
        errorData: null,
        open: false,
        showTechInfo: false
      }
    },
    methods: {
      ...mapActions(['hideError', 'logout', 'setLoading'])
    }
  }
</script>

<style scoped lang="scss">
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .response {
    max-width: 720px;
    max-height: 250px;
    overflow-y: scroll;
  }

  .wrap {
    word-wrap: break-word;
    white-space: initial;
  }

  .title {
    text-transform: uppercase;
  }
</style>
