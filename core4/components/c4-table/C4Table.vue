<template> <!-- :class="{'uc': this.uppercaseLabels}" Not working correctly, everything is uppercase -->

  <div class="c4-datatable dark elevation-1" >
    <!--  flat" :class="{'elevation-1': !flat}" -->
    <v-toolbar flat color="white" class="c4-datatable__toolbar pb-3 pt-3">
      <h3 class="accent--text card-headline">{{label}}</h3>
      <v-spacer></v-spacer>

      <!-- primary controls for additional filters and controls -->
      <slot name="primary-controls">
      </slot>

      <!-- customize button for c4-datatable-plus -->
      <div v-if="customizeLabel">
        <v-btn small color="accent"
          @click.stop="$bus.$emit('customizeEvent')">{{customizeLabel}}</v-btn>
      </div>
      <v-flex xs3>
        <v-text-field clearable class="c4-datatable__search" solo-inverted flat v-model="search" append-icon="search"></v-text-field>
      </v-flex>
      <v-btn v-if="buttonLabel !== false" small color="primary" dark @click="$emit('new')">
        <v-icon class="mr-1" dark left>mdi-plus-box</v-icon>
        {{buttonLabel}}
      </v-btn>
    </v-toolbar>

    <!-- optional secondary slot for even more additional filters and controls (underneath primary controls) -->
    <slot v-if="$slots['secondary-controls']" name="secondary-controls"></slot>
    <!-- default slot -->
    <slot></slot>

  </div>
</template>

<script>
import ContentContainerMixin from '../../internal/ContentContainerMixin'

export default {
  name: 'c4-datatable',
  mixins: [ContentContainerMixin],
  props: {
    /**
    * Use for text in creation button.
    * set is to false if button should be hidden
    */
    buttonLabel: {
      type: [String, Boolean],
      default: 'Neu',
      required: true
    },
    /**
    * The customize button is used to control elements in c4-datatable-plus.
    * If a value is set, the it will be displayed as button label.
    * Emits a custom event on click: customizeEvent
    */
    customizeLabel: {
      typ: [String, Boolean],
      required: false,
      default: false
    },
    /**
     * Set to false to display lowercase labels
     */
    uppercaseLabels: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Removes card elevation from datatable for better integration in other components
     */
    flat: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted () {
    if (this.flat === false) {
      this.$el.classList.add('elevation-1')
    } else {
      this.$el.classList.remove('elevation-1')
      this.$el.classList.add('flat')
    }
  },
  watch: {
    search (newValue) {
      this.$emit('search', newValue)
    }
  },
  data () {
    return {
      search: null
    }
  }
}
</script>
<style lang="scss">
.c4-button-bar {
  .v-btn {
    margin-right: -1px;
    margin-left: -1px;
  }
}
</style>
<style lang="scss" scoped>
div >>> .c4-button-bar {
  border: 1px solid red;
  >>> .v-btn {
    margin-right: -1px;
    margin-left: -1px;
  }
}
.c4-secondary-controls {
  background-color: #fff;
}
</style>
<style lang="css">
.c4-webapp table.v-table thead tr {
  height: 36px;
}
/* .application.c4-webapp table.v-table thead tr th {
  font-weight: 600;
  text-transform: uppercase;
} */
.application.c4-webapp .v-icon.c4-icon {
  color: rgb(158, 158, 158);
  font-size: 16px;
}
</style>

<style lang="css" scoped>
.flat >>> .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
}
div >>> .c4-datatable__toolbar .v-toolbar__content {
  height: 54px !important;
}
div >>> .v-input.c4-datatable__search .v-input__slot {
    background: rgba(0,0,0,.1);
    margin: 0 !important;
}
div >>> .v-input.c4-datatable__search .v-label {
  font-size: 14px;
}
div >>> .v-input.c4-datatable__search .v-input__control {
  min-height: 32px;
}
.c4-datatable >>> thead tr {
  height: 34px;
}
.c4-datatable >>> thead tr th {
  font-weight: 600;
}
.c4-datatable >>> thead tr th:first-letter {
  text-transform: capitalize;
}
.c4-datatable.uc >>> thead .column {
  text-transform: uppercase;
}
.c4-datatable .v-alert.warning {
  margin-top: 0px;
  margin-left: -24px;
  margin-right: -24px;
}
.c4-datatable.dark >>> thead tr th {
  color: #3f515d;
}
.c4-datatable.dark tbody tr:hover {
  /*background: #ccd4da !important;*/
  background: rgba(204, 212, 218, 0.5) !important;
}

/*light theme ?*/

.c4-datatable tr.active {
  background: rgba(204, 212, 218, 0.6) !important;
}
.c4-datatable tr.active + tr.datatable__expand-row .card {
  background-color: rgba(204, 212, 218, 0.6) !important;
}
.c4-child-table .table {
  background-color: rgba(204, 212, 218, 0.6) !important;
}
</style>
