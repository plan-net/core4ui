<template>
  <v-alert
    :value="true"
    class="secondary lighten-4"
    icon="warning"
  >
    <!-- @slot optional for custom content -->
    <slot></slot>
    <span
      v-if="text"
      class="white--text"
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
      type: String,
      default: 'No data available.',
      required: false
    }

  }
}
</script>

<style lang="css" scoped>
</style>

<docs>
### Usage

Show this component if no content is available. For example in datatable etc.

```jsx
<c4-empty text="No data available"></c4-empty>
```
</docs>
