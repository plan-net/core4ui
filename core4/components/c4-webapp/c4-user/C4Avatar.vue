<template>
  <div
    class="card vue-avatar-cropper-demo text-center"
    style=""
  >
    <div class="card-body">
      <v-row
        align="center"
        justify="space-around"
      >
        <v-icon
          v-if="defaultAvatar"
          x-large
          style="font-size: 130px;"
          color="primary"
          class="mb-3"
        >mdi-account-circle</v-icon>
        <img
          v-else
          id="uploader-avatar"
          :src="userImage"
          class="card-img avatar"
        />
        <v-btn
          color="primary"
          id="pick-avatar"
        >
          <v-icon left>mdi-cloud-upload</v-icon>Upload image
        </v-btn>
      </v-row>
    </div>
    <div
      v-if="error"
      class="card-footer error--textmt-3"
      v-html="error"
    ></div>
    <avatar-cropper
      @uploading="handleUploading"
      @uploaded="handleUploaded"
      @completed="handleCompleted"
      @error="handlerError"
      :labels="{ submit: 'Submit', cancel: 'Cancel'}"
      trigger="#pick-avatar"
      :upload-url="url"
    />
  </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
import axios from 'axios'

const axiosInternal = axios.create({
  baseURL: 'core4/api/v1'
})

axiosInternal.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInternal.interceptors.request.use(
  request => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user != null) {
      request.headers.Authorization = `Bearer ${user.token}`
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  components: { AvatarCropper },
  async mounted () {
    const check = await axiosInternal.get(this.url)
    console.log(check.data.includes('No avatar'))
    if (check.data.includes('No avatar') === false) {
      this.userImage = this.url
      this.defaultAvatar = false
    } else {
      this.defaultAvatar = true
    }
  },
  computed: {
    local () {
      return window.location.href.includes('localhost') ? 'http://0.0.0.0:5001/' : ''
    },
    url () {
      const user = JSON.parse(window.localStorage.getItem('user') || {})
      const token = `?token=${user.token || -1}`
      return `${this.local}core4/api/v1/avatar${token}`
    }

  },
  data () {
    return {
      defaultAvatar: true,
      message: 'ready',
      error: null,
      userImage: 'data:image/png;base64,'
    }
  },
  methods: {
    handleUploading (form, xhr) {
      this.message = 'uploading...'
    },
    handleUploaded (response) {
      if (response.status === 'success') {
        this.message = 'user avatar updated.'
      }
    },
    async handleCompleted (response, form, xhr) {
      this.userImage = 'data:image/png;base64,'
      this.message = 'upload completed.'
      await this.$nextTick()
      this.defaultAvatar = false
      this.userImage = this.url
    },
    handlerError (message, type, xhr) {
      console.log(message, type, xhr)
      this.message = 'Oops! Something went wrong...'
      this.error = message
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}
.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  min-height: 90px;
  margin: 20px auto;
}
::v-deep .avatar-cropper-btn {
  font-weight: 500;
  &:hover {
    background-color: var(--v-primary-base) !important;
  }
}
</style>
