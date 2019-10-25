<template>
  <v-alert
    :value="true"
    class="secondary lighten-4"
    icon="warning"
  >
    <!-- @slot optional for custom content -->
    <slot></slot>
    <span
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
    },
    icon: {
      type: String,
      required: false,
      default: 'warning'
    }

  }
}
</script>

<style lang="css" scoped>
.theme--light .v-alert{
    background-color: rgba(0,0,0,0.1) !important;
    border-color: rgba(0,0,0,0.1) !important;
}
.theme--dark .v-alert{
    background-color: var(--v-secondary-lighten4) !important;
    border-color: var(--v-secondary-lighten4) !important;
}
</style>

<docs>
### Usage

Show this component if no content is available. For example in datatable etc.

```jsx
<c4-empty text="No data available"></c4-empty>
```
</docs>
