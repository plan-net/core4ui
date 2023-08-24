<template>
  <v-text-field
    :disabled="disabled"
    :error="errorMessages.length > 0"
    :error-messages="errorMessages"
    :label="label"
    :suffix="suffix"
    :value="internalValue"
    autocomplete="off"
    @input="internalValue = $event"
    @keydown.native.stop="onKeyDown"
  ></v-text-field>
</template>

<script>
import is from 'is'

const countDecimals = function (value) {
  if ((value % 1) != 0) {
    return value.toString().split('.')[1].length
  }
  return 0
}
export default {
  name: 'c4-numbers',

  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    // neeeded for vee-validate error passing and display inside c4-numbers
    value () {
      return this.value
    },
    name () {
      return this.label
    }
  },
  props: {
    /**
     * v-model
     */
    value: {
      type: Number,
      default: null
    },
    /**
     * See v-text-field docs
     */
    label: {
      type: String,
      default: null,
      required: false
    },
    /**
     * See v-text-field docs
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Displayed after v-text-field.
     * See v-text-field docs
     */
    suffix: {
      type: String,
      required: false,
      default: '€'
    },
    /**
     * Parent component errorMessages object containing errors for this instance
     */
    errorMessages: {
      type: Array,
      default: () => [],
      required: false
    },
    /**
     * Value by which the v-model is multiplied.<br>
     * Example: unit=1000, v-model=1000000; displayed value: <strong>1.000</strong>
     * Suffix should be set to <strong>>T€</strong> (ThousandsEuro) if unit=1000
     */
    unit: {
      type: Number,
      required: false,
      default: 1
    },
    mantissa: {
      type: Number,
      required: false,
      default: 0
    }
  },

  // mounted () {
  /*     console.warn('TODO: check c4-numbers implementation. Remove error, remove type, use suffix for type')
    this.$nextTick(function () {
      this.$validator.validateAll()
    }) */
  // },
  methods: {
    /** Triggered onKeyDown in component.
     * Supported keyboard keys (only digits): 1234567890, down,up,left,right arrow
     * On up/down click v-model is incremented, decremented
     * @event keydown
     * @type {Event}
     */
    onKeyDown (event) {
      const decSeperator = this.language === 'DE' ? 188 : 190
      const isNumberKeycode = (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105)
      const isSpecialKeyCode = event.keyCode === 8 ||
        event.keyCode === 9 ||
        event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 46 ||
        event.keyCode === 110 ||
        (event.keyCode === decSeperator && this.mantissa > 0) || // komma, point / decimal seperator for lang
        event.keyCode === 35 ||
        event.keyCode === 36

      if (
        isNumberKeycode || isSpecialKeyCode
      ) {
        const dec = countDecimals(this.value / this.unit)
        if (isNumberKeycode) {
          // wenn mantissa 0  ist, dann beliebig viele normale zahlen erlauben
          if ((this.mantissa != 0 && dec >= this.mantissa)
          ) {
            event.preventDefault()
          }
        }

        // continue
      } else {
        event.preventDefault()
      }
    }
  },
  computed: {
    nachkommastellen () {
      /*       0 > 1
      1 > 10
      2 > 100
      3 > 1000
      4 > 10000 */
      return Math.pow(10, Math.abs(this.mantissa || 0))
    },
    language() {
      return this.$store.getters.language || 'DE'
    },
    internalValue: {
      get: function () {
        if (is.number(this.value)) {
          const nst = this.nachkommastellen
          const number = Math.round(((this.value / this.unit) + Number.EPSILON) * nst) / nst
          let formattedNumber;
          if (this.language === 'DE') {
            let splitted = number.toString().split('.')
            splitted[0] = parseInt(splitted[0]).toLocaleString('de-DE')
            formattedNumber = splitted.join(',')
          } else {
            let splitted = number.toString().split('.')
            splitted[0] = parseInt(splitted[0]).toLocaleString('en-GB')
            formattedNumber = splitted.join('.')
          }

          return formattedNumber
        }
        return null
      },
      set: function (newValue) {
        if (newValue === '') {
          this.$emit('input', null)
          return
        }

        let valueToEmit;

        if (is.number(newValue)) {
          valueToEmit = newValue
        } else {
          if (this.language === 'DE') {
            valueToEmit = Number(newValue.replace(/\./g, '').replace(/,/g, '.'))
          } else {
              valueToEmit = Number(newValue.replace(/,/g, ''))
          }
        }

        this.$emit('input', valueToEmit * this.unit)
      }
    },
    incrementor () {
      return (this.unit === 1) ? 1000 : 1
    }
  }
}
</script>

<style scoped>
</style>
