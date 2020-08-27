<template>
  <v-dialog
    persistent
    v-model="dialog"
    max-width="500px"
  >
    <v-card>

      <!-- Title -->
      <v-card-title>
        <span>{{translation.advancedOptions}}</span>
        <v-spacer></v-spacer>
      </v-card-title>

      <!-- Draggable table -->
      <v-card-text>
        <v-simple-table class="px-3 pt-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{translation.dragDropColumn}}</th>
                <th class="text-left">{{translation.show}}</th>
              </tr>
            </thead>
            <draggable
              tag="tbody"
              :componentData="componentData"
              :list="internalColumn"
              :disabled="!enabled"
              :animation="100"
              @start="dragging = true"
              @end="dragging = false"
            >
              <template v-for="element in internalColumn">
                <tr
                  v-if="!element.key"
                  :key="element.value"
                >
                  <td :class="{ unclickable: !element.editable }">
                    <v-btn
                      style="cursor: move"
                      icon
                      class="sortHandle"
                      v-if="element.editable"
                    >
                      <v-icon>mdi-drag</v-icon>
                    </v-btn>
                    <span>{{element.text}}</span>
                  </td>
                  <td>
                    <v-checkbox
                      v-model="element.hide"
                      :true-value="false"
                      :false-value="true"
                      color="primary"
                    >
                    </v-checkbox>
                  </td>
                </tr>
              </template>
            </draggable>
          </template>
        </v-simple-table>
      </v-card-text>

      <!-- Action buttons -->
      <v-card-actions>
        <!-- Reset btn -->
        <v-btn
          text
          small
          color="primary"
          @click="reset"
        >{{translation.resetOptions}}</v-btn>

        <v-spacer></v-spacer>

        <!-- Cancel btn -->
        <v-btn
          text
          small
          color="primary"
          @click="cancel"
        >{{translation.cancel}}</v-btn>

        <!-- Save btn -->
        <v-btn
          text
          small
          color="primary"
          @click="save"
        >{{translation.save}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import { clone } from '../../helper/helper.js'

export default {
  name: 'advanced-options',
  components: {
    draggable
  },
  props: {
    dialog: Boolean,
    column: Array,
    translation: Object
  },
  data: function () {
    return {
      internalColumn: [],
      panel: [0, 1],

      enabled: true,
      dragging: false,
      componentData: {
        props: {
          type: 'transition',
          name: 'flip-list'
        }
      }
    }
  },
  created () {
    this.internalColumn = clone(this.column)
  },
  methods: {
    save () {
      this.$emit('closeDialog', { column: this.internalColumn })
    },
    reset () {
      this.$emit('closeDialog', { reset: true })
    },
    cancel () {
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style scoped lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.unclickable {
  pointer-events: none;
}
</style>
