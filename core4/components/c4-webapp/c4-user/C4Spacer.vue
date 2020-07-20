<template>
  <v-row
    style=""
    @mouseover="visible = true"
    @mouseout="visible = false"
  >
    <v-spacer class="c4-dotted"></v-spacer>
    <strong v-if="visible">
      {{version}}
    </strong>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {

  },
  computed: {
    ...mapGetters([
      'version'
    ])
  }
}
</script>

<style lang="scss" scoped>
.row {
  position: relative;
}
strong {
  pointer-events: none;
  position: absolute;
  right: 20px;
  padding-left: 12px;
  top: -6px;
}

.theme--dark,
.theme--light {
  .spacer.c4-dotted {
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 3px;
    opacity: 0.2;
    height: 10px;
    background: radial-gradient(
      ellipse at center,
      var(--v-secondary-lighten5) 0%,
      var(--v-secondary-lighten5) 20%,
      transparent 0%
    );
    background-size: 20px 20px;
    background-repeat: repeat-x;
    background-position: 5px center;
  }
}
.theme--dark {
  strong {
    color: var(--v-secondary-lighten5);
    background-color: #212121;
  }
}
.theme--light {
  strong {
    color: rgba(255,255,255, 0.5);
  }
}
.theme--light {
  .spacer.c4-dotted {
    opacity: .2;

  }
}
</style>
