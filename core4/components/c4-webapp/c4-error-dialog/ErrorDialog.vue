<template>
  <v-dialog
    v-model="open"
    max-width="960"
    min-width="480"
    persistent
    scrollable
  >
    <v-card
      class="pa-0"
      tile
    >
      <template v-if="errorData">
        <v-app-bar
          class="px-0"
          color="error"
          dark
          dense
          flat
        >
          <v-toolbar-title class="title">{{ i18n.t('error') }}</v-toolbar-title>
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="white"
            height="2"
          ></v-progress-linear>
          <v-spacer></v-spacer>
          <v-btn
            v-if="errorData.close"
            icon
            @click="open = !open"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="px-4 py-3">
          <template v-if="errorData.customErrorContentHtml">


            <transition name="slide-fade">
              <div
                class="customErrorContentHtml">
                <div v-html="errorData.customErrorContentHtml"></div>
              </div>
            </transition>
          </template>
          <template v-else>
            <p
              v-if="errorData.html"
              v-html="errorData.html"
            >
            </p>
            <div v-if="errorData.json">
              <pre class="mt-2 pa-1">{{ errorData.json }}</pre>
            </div>
            <div v-else>
              <pre class="mt-2 pa-1">{{ errorData.data }}</pre>
            </div>
          </template>

          <transition name="slide-fade">
            <div
              v-if="showTechInfo"
              class="response"
            >
              <pre>{{ errorData.error.response || errorData.error }}</pre>
            </div>
          </transition>
        </v-card-text>
        <v-card-actions class="pl-3 pr-3 pb-3 pt-0">
          <v-btn
            class="ma-2"
            color="grey lighten-1"
            text
            @click="showTechInfo = !showTechInfo"
          >
            <v-icon>{{ showTechInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            {{i18n.t('technicaldetails')}}
            <!--technical details-->
          </v-btn>
          <v-spacer></v-spacer>
          <template v-for="(btn, index) in errorData.actions">
            <v-btn
              :key="index"
              :color="btn.main ? 'primary' : 'grey'"
              text
              @click="btn.action"
            >
              {{ btn.name }}
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

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}

.response {
  max-width: 720px;
  max-height: 250px;
  overflow-y: scroll;
}
.customErrorContentHtml {
  max-width: 100%;
  max-height: 720px;
  overflow-y: auto;
}

.wrap {
  word-wrap: break-word;
  white-space: initial;
}

.title {
  text-transform: uppercase;
}
</style>
