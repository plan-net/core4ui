<template>
  <v-alert
    :value="true"
    color="warning"
    icon="warning"
  >
        <!-- @slot optional for custom content -->
    <slot></slot>
    <span v-if="text"
      class="grey--text"
    >{{text}}</span>
  </v-alert>
</template>

<script>

export default {
  name: 'c4-empty',
  props: {
    /**
     * Just a string
     */
    text: {
      type: [String, null],
      default: 'No data available.',
      required: false
    }

  },
  computed: {

  }
}
</script>

<style lang="css" scoped>
.warning {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>

<docs>
### Usage

Show this component if no content is available. For example in datatable etc.

```jsx
<c4-empty text="No data available"></c4-empty>
```
</docs>
