<template>
  <v-text-field v-model="text"
                ref="searchRef"
                class="search"
                hide-details
                filled
                dense
                single-line
                clearable
                prepend-inner-icon="mdi-magnify"
                append-icon="mdi-send"
                v-on:keyup.enter="submit"
                v-on:keyup.esc="esc"
                @click:append="submit"
                @click:clear="clear">
  </v-text-field>
</template>

<script>
export default {
  name: 'Search',
  props: {
    searchActive: Boolean
  },
  data () {
    return {
      text: ''
    }
  },
  created () {
    this.$nextTick(function () {
      this.$refs.searchRef.focus()
    })
  },
  methods: {
    submit () {
      this.$emit('closeInput', { type: (this.text.length) ? 'submit' : 'clear', text: this.text })
    },
    clear () {
      this.$emit('closeInput', { type: 'clear' })
    },
    esc () {
      this.$emit('closeInput', { type: 'esc' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search.v-text-field.v-input--dense {
    margin-left: -16px !important;
    margin-right: -16px !important;
    height: 48px;
    ::v-deep .v-input__slot {
      height: 48px;
    }
  }

  ::v-deep
  .search.v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--single-line
  .v-input__prepend-inner,
  ::v-deep
  .search.v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo)
  .v-input__append-inner {
    margin-top: 14px;
  }

  ::v-deep
  .search.v-text-field--filled.v-text-field--single-line.v-input--dense
  input {
    margin-top: 12px;
  }
</style>
