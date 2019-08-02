<template>
  <v-alert
    :value="show"
    :type="type"
    :transition="transition"
    :dismissible="dismissible"
  >
    {{message}}
    <slot></slot>
  </v-alert>
</template>

<script>
export default {
  name: 'c4-notification',
  props: {
    /**
       * Show/hide notification.
       */
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
       * Type of notifications. Possible types are: success, info, warning and error.
       */
    type: {
      type: String,
      required: false,
      default: 'error'
    },
    /**
       * Notification message.
       */
    message: {
      type: String,
      required: false,
      default: ''
    },
    /**
       * Sets the component transition.
       * Can be one of the built in transitions or your own.
       * Build in transitions:
       *    - slide-x-transition
       *    - slide-y-transition
       *    - scale-transition
       *    - fade-transition
       *    - expand-transition
       *
       */
    transition: {
      type: String,
      required: false,
      default: 'slide-y-transition'
    },
    /**
       * Show/hide close icon.
       */
    dismissible: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
       * Time (in milliseconds) to wait until snackbar is automatically hidden.
       * Use 0 to keep open indefinitely.
       */
    timeout: {
      type: Number,
      required: false,
      default: 0
    },
    /**
       *  ToDo: add description
       * Identifier?
       */
    name: {
      type: String, // socket_reconnect_error
      required: true
    }
  },
  data () {
    return {
      timerId: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      // element has definitely been added to the DOM
      if (this.timeout) {
        this.timerId = setTimeout(() => {
          /** Triggered when timeout is called
           * @event click
           * @type {Event}
           * @argument {name}
           * @argument {Object State}
           */
          this.$emit('timeout-handler', this.name, { state: false })
        }, this.timeout)
      }
    })
  },
  beforeDestroy () {
    clearTimeout(this.timerId)
  }
}
</script>

<style scoped>
</style>

<docs>
### Usage

Component for displaying notifications

##### Example: Notification with message

```jsx
<c4-notification :name="c4Notification.name"
                 :show="c4Notification.show"
                 :type="c4Notification.type"
                 :message="c4Notification.message"
                 :dismissible="c4Notification.dismissible"
                 :timeout="c4Notification.timeout"
                 @timeout-handler="c4Notification.timeoutHandler">
</c4-notification>
```
##### Example: Notification with component slot

```jsx
<c4-notification :name="c4Notification.name"
                 :show="c4Notification.show"
                 type="error"
                 message="Something happened."
                 :dismissible="false"
                 :timeout="c4Notification.timeout">
                  <v-btn
                    small
                    icon
                  >
                    <v-icon
                      v-text="'visibility'"
                      ripple
                    >
                    </v-icon>
                  </v-btn>
</c4-notification>
```
</docs>
