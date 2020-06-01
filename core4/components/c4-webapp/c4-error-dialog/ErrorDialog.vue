<template>
  <v-dialog
          scrollable
          max-width="720"
          v-model="open"
          persistent
  >
    <v-card
            tile
            class="pa-0"
    >
      <template v-if="alertMessage">
        <v-app-bar
                class="px-0"
                dense
                flat
                color="error"
        >
          <v-toolbar-title>
            ERROR
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon
                 v-if="alertMessage.close"
                 @click="open = !open">
            <v-icon>close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="px-4 py-3">
          <p
                  v-if="alertMessage.html"
                  v-html="alertMessage.html"
          ></p>
          <div v-if="alertMessage.json">
            <pre class="mt-2 pa-1">{{alertMessage.json}}</pre>
          </div>
          <div v-else>
            <pre class="mt-2 pa-1">{{alertMessage.data}}</pre>
          </div>

          <transition name="slide-fade">
            <div v-if="showTechInfo" class="response">
              <pre>{{response}}</pre>
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
          <template v-for="(btn, index) in alertMessage.actions">
            <v-btn
                    :color="btn.main ? 'primary' : 'grey lighten-1'"
                    :text="!btn.main"
                    @click="btn.action">
              {{btn.name}}
            </v-btn>
          </template>
          <!--          <v-btn text>-->
          <!--            Reload page-->
          <!--          </v-btn>-->
          <!--          <v-btn-->
          <!--            type="button"-->
          <!--            alertMessage.status_code-->
          <!--            v-if="alertMessage.status_code === 401"-->
          <!--            @click="logout(); open = false"-->
          <!--            color="primary"-->
          <!--          >-->
          <!--            Zum Login-->
          <!--          </v-btn>-->
          <!--          <v-btn-->
          <!--            type="button"-->
          <!--            v-else-->
          <!--            @click="open = false; alertMessage.action()"-->
          <!--            color="primary"-->
          <!--          >-->
          <!--            To the main page-->
          <!--          </v-btn>-->
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
      ...mapGetters([
        'error'
      ])
    },
    watch: {
      error: function (newVal) {
        if (newVal != null) {
          this.alertMessage = newVal
          this.open = true
          this.hideError()
        }
      }
    },
    data () {
      return {
        alertMessage: null,
        open: false,
        showTechInfo: false,
        response: {"timestamp": "2020-05-28T14:07:12.670283 | 2020-05-28T14:07:12.670283 | 2020-05-28T14:07:12.670283 | 2020-05-28T14:07:12.670283 | 2020-05-28T14:07:12.670283", "version": "xo360/0.1.7", "code": 200, "message": "OK", "_id": "5ecfc590c1f4cfc182c86139", "data": ["Amazon", "Analytics", "SEO"]}
      }
    },
    methods: {
      ...mapActions(['hideError', 'logout'])
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
</style>
