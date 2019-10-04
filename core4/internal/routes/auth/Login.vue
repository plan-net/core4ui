  <template>
  <div class="core-background auth-page">
    <v-dialog
      v-model="dialogLogin"
      max-width="520px"
      persistent
    >
      <v-card
        tile
        class="pa-3 auth-form-card"
      >
        <v-form
          @submit.prevent="onLogin"
          ref="form"
          lazy-validation
        >
          <v-card-title class="justify-center py-0">
            <h2 class="c4-headline">{{title}}</h2>
          </v-card-title>
          <v-card-text class="pt-2">
            <v-text-field
              @focus="onFocus"
              clearable
              :label="$t('username')"
              v-model="username"
              :error-messages="errors.collect($t('username'))"
              :data-vv-as="$t('username')"
              :data-vv-name="$t('username')"
              v-validate="'required|min:3|auth'"
              data-vv-delay="100"
            ></v-text-field>
            <v-text-field
              @focus="onFocus"
              clearable
              :label="$t('password')"
              v-model="password"
              :error-messages="errors.collect($t('password'))"
              :data-vv-as="$t('password')"
              :data-vv-name="$t('password')"
              v-validate="'required|min:3|auth'"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              @click:append="passwordVisible = !passwordVisible"
              :type="passwordVisible ? 'text' : 'password'"
              data-vv-delay="100"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-layout column>
              <v-btn
                class="mb-3"
                color="primary"
                block
                :disabled="errors.any()"
                type="submit"
              >Login
              </v-btn>
              <div></div>
              <v-btn
                to="/reset"
                text
                block
              >{{$t('resetPassword')}}
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  created () {
    this.$validator.extend('auth', {
      validate: () => {
        const valid = this.profile.error == null
        return {
          valid
        }
      }
    })
  },
  components: {},
  data () {
    return {
      dialogLogin: false,
      passwordVisible: false,
      username: null,
      password: null
    }
  },
  mounted () {
    this.dialogLogin = true
  },
  watch: {
    username () {
      if (this.profile.error != null) {
        this.onFocus()
      }
    },
    password () {
      if (this.profile.error != null) {
        this.onFocus()
      }
    }
  },
  computed: {
    nextRoute () {
      return this.$route.query.next
    },
    ...mapGetters([
      'profile',
      'title'
    ])
  },
  methods: {
    ...mapActions([
      'login',
      'clearAuthError'
    ]),
    onFocus () {
      window.setTimeout(function () {
        this.clearAuthError()
        this.$validator.validateAll()
      }.bind(this), 10)
    },
    onLogin () {
      const { username, password } = this
      this.login({ username, password }).then(val => {
        if (this.$route.query.next != null) {
          window.location.assign(this.$route.query.next)
        }
        this.$validator.validateAll()
      }, val => {
        this.$validator.validateAll()
      })
    }
  }
}
</script>

<style lang="scss">
</style>
<style lang="css" scoped>
div >>> .fade-enter-active,
div >>> .fade-leave-active {
  transition: all 0.33s ease-out;
}

div >>> .v-btn--block {
  padding: 6px 16px;
}

div >>> .fade-enter,
.fade-leave-to {
  transition: all 0.33s ease-out;
  opacity: 0;
  transform: scale(0.9);
}

footer {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>
