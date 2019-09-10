<template>
  <v-menu
    :close-on-content-click="false"
    v-model="dateRangeMenuOpen"
    full-width
    bottom
  >

    <v-layout
      row
      slot="activator"
    >

      <v-flex xs12>
        <v-text-field
          slot="activator"
          v-model="dateFormattedComplete"
          :label="`${labels.start} - ${labels.end}`"
          :name="`${labels.start} - ${labels.end}`"
          :error-messages="errorMessages"
          :error="errorMessages.length > 0"
          prepend-icon="event"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-text>
        <v-layout
          class="date-range"
          column
          wrap
        >
          <v-flex>
            <div class="date-range__pickers">
              <div class="date-range__picker date-range__pickers--start">
                <v-text-field
                  v-model="formattedStartDate"
                  :label="`${labels.start}`"
                  name="startDate"
                  class="date-range__pickers-input"
                  :prepend-icon="prependIcon"
                  readonly
                ></v-text-field>

                <v-date-picker
                  ref="start"
                  :next-icon="nextIcon"
                  :prev-icon="prevIcon"
                  :dark="dark"
                  :events="highlightRange ? dateRange.dates : events"
                  :event-color="highlightRange ? dateRange.colors : eventColor"
                  v-model="dates.startDate"
                  :min="options.minDate"
                  :max="dates.endDate"
                  :locale="locale"
                  :first-day-of-week="firstDayOfWeek"
                  no-title
                  :show-week="true"
                  @change="onDateRangeStartChange"
                ></v-date-picker>
              </div>
              <div class="date-range__picker date-range__picker--end">
                <v-text-field
                  :label="`${labels.end}`"
                  v-model="formattedEndDate"
                  :prepend-icon="prependIcon"
                  name="endDate"
                  class="date-range__pickers-input"
                  readonly
                ></v-text-field>

                <v-date-picker
                  ref="end"
                  :show-week="true"
                  :next-icon="nextIcon"
                  :prev-icon="prevIcon"
                  :dark="dark"
                  :min="dates.startDate"
                  :max="maxDate"
                  :events="highlightRange ? dateRange.dates : events"
                  :event-color="highlightRange ? dateRange.colors : eventColor"
                  v-model="dates.endDate"
                  :locale="locale"
                  :first-day-of-week="firstDayOfWeek"
                  no-title
                  @change="onDateRangeEndChange"
                ></v-date-picker>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <!-- actions -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="primary"
          @click="$emit('close'); dateRangeMenuOpen = false"
        >
          {{labels.close}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import moment from 'moment'
import { dateFormatted, getWeek } from '../../helper.js'

const _util = require('vuetify/es5/components/VDatePicker/util')

export default {
  name: 'c4-daterange',
  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    // neeeded for vee-validate error passing and display inside c4-numbers
    value () {
      return this.dateFormattedComplete
    },
    name () {
      return `${this.labels.start} - ${this.labels.end}`
    }
  },
  props: {
    /**
       * v-model
       */
    value: {
      type: Object,
      required: true,
      default: () => {
        return {
          startDate: null,
          endDate: null
        }
      }
    },
    /**
       * Parent component errorMessages object containing errors for this instance
       */
    errorMessages: {
      type: Array,
      default: () => [],
      required: false
    },
    locale: {
      type: String,
      default: '--' // defaults to YYYY-MM , value can be de-de for example
    },
    options: {
      type: Object,
      required: true
    },
    prependIcon: {
      type: String,
      default: 'event'
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    labels: {
      type: Object,
      default () {
        return {
          start: 'Calendarweek Start',
          end: 'Calendarweek End',
          close: 'OK'
        }
      }
    },
    events: {
      type: [Array, Object, Function],
      default: () => null
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning'
    },
    highlightRange: {
      type: Boolean,
      default: true
    },
    highlightColors: {
      type: String,
      default: ''
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 1
    }
  },
  components: {},
  data () {
    return {
      dateRangeMenuOpen: false,
      format: this.options.format,
      dateRange: {
        dates: [],
        colors: {}
      }
    }
  },
  computed: {
    dark () {
      return this.$store.getters.dark
    },
    internalStartDate () {
      return dateFormatted(this.value.startDate, {
        weekLabel: 'Week ',
        seperator: ', ',
        fallback: null
      })
    },
    internalEndDate () {
      return dateFormatted(this.value.endDate, {
        weekLabel: 'Week ',
        seperator: ', ',
        fallback: null
      })
    },
    dateFormattedComplete: {
      get: function () {
        if (this.internalStartDate != null && this.internalEndDate != null) {
          return `${this.internalStartDate} - ${this.internalEndDate}`
        }
        return null
      },
      set: function (newVal) {
      }
    },
    dates: {
      get: function () {
        const startDate = (this.value.startDate != null) ? moment(this.value.startDate).format('YYYY-MM-DD') : null
        const endDate = (this.value.endDate != null) ? moment(this.value.endDate).format('YYYY-MM-DD') : null
        return {
          startDate,
          endDate
        }
      },
      set: function (newVal) {
        this.$emit('input', { startDate: newVal.startDate, endDate: newVal.endDate })
      }
    },
    formattedStartDate () {
      return dateFormatted(this.dates.startDate)
    },
    formattedEndDate () {
      return dateFormatted(this.dates.endDate)
    },
    highlightColorClasses () {
      if (this.highlightColors) {
        return this.highlightColors
      }
      return this.dark ? 'blue-grey darken-1' : 'blue lighten-5'
    },
    maxDate () {
      return this.options.maxDate || moment().format('YYYY-MM-DD')
    }
  },
  watch: {
    dates () {
      this.setInRangeData()
    }
  },
  created () {
  },
  mounted () {
    this.setInRangeData()
    // we need to override original vuetify datepicker functions here
    // because week calculation in vuetify is wrong
    // so we use our own function here for both datepickers
    const comp1 = this.$refs.start.$children[0].$children[1]
    const comp2 = this.$refs.end.$children[0].$children[1]

    function getDate (year, month, day) {
      return new Date(year + '-' + month + '-' + day)
    }

    function genTBody () {
      var children = []
      var daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate()
      var rows = []
      var day = this.weekDaysBeforeFirstDayOfTheMonth()
      var weekNumbers = this.getWeekNumber()
      this.showWeek && rows.push(this.genWeekNumber(weekNumbers.shift()))
      while (day--) {
        rows.push(this.$createElement('td'))
      }
      for (day = 1; day <= daysInMonth; day++) {
        var date = this.displayedYear + '-' + (0, _util.pad)(this.displayedMonth + 1) + '-' + (0, _util.pad)(day)
        rows.push(this.$createElement('td', [this.genButton(date, true, 'date', this.formatter)]))
        if (rows.length % (this.showWeek ? 8 : 7) === 0) {
          children.push(this.genTR(rows))
          rows = []
          if (day < daysInMonth && this.showWeek) {
            rows.push(this.genWeekNumber(weekNumbers.shift()))
          }
          // day < daysInMonth && this.showWeek && rows.push(this.genWeekNumber(weekNumber++))
        }
      }
      if (rows.length) {
        children.push(this.genTR(rows))
      }
      return this.$createElement('tbody', children)
    }

    function getWeekNumber () {
      const daysInMonth = moment(getDate(this.displayedYear, this.displayedMonth + 1, 1)).daysInMonth()
      const weekNumbers = []
      let day = 1
      while (day <= daysInMonth) {
        const tmpDate = getDate(this.displayedYear, (this.displayedMonth + 1), day)
        const weekNr = getWeek(
          tmpDate
        ).weekNr
        weekNumbers.push(weekNr)
        day++
      }
      const ret = [...new Set(weekNumbers)] // unique
      return ret
    }

    comp1.getWeekNumber = getWeekNumber
    comp2.getWeekNumber = getWeekNumber

    comp1.genTBody = genTBody
    comp2.genTBody = genTBody
  },

  methods: {
    onDateRangeStartChange (val) {
      // always moment - so when user clicks friday. monday will be calculated
      const seconds4h = 14400 // little offset to avoid timezone problems
      const startOfWeek = moment(val).startOf('week').toDate().getTime() / 1000 + seconds4h
      const endOfWeek = (this.value.endDate != null) ? (moment(this.value.endDate).endOf('week').toDate().getTime() / 1000 - seconds4h) : null
      this.$emit('input', { startDate: startOfWeek, endDate: endOfWeek })
      this.setInRangeData()
    },
    onDateRangeEndChange (val) {
      const seconds4h = 14400 // little offset to avoid timezone problems
      const startOfWeek = (this.value.startDate != null) ? (moment(this.value.startDate).startOf('week').toDate().getTime() / 1000 + seconds4h) : null
      const endOfWeek = moment(val).endOf('week').toDate().getTime() / 1000 - seconds4h
      this.$emit('input', { startDate: startOfWeek, endDate: endOfWeek })
      this.setInRangeData()
    },
    setInRangeData () {
      this.$nextTick(function () {
        const inRangeData = {
          dates: [],
          colors: {}
        }
        const startDate = new Date(this.dates.startDate).getTime()
        const endDate = new Date(this.dates.endDate).getTime()
        const diffDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24))
        for (let i = 0; i <= diffDays; i += 1) {
          const date = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
          inRangeData.dates.push(date)
          inRangeData.colors[date] = `date-range__date-in-range ${
            this.highlightColorClasses
          }`

          if (i === 0) {
            inRangeData.colors[date] += ' date-range__range-start'
          }
          if (i === diffDays) {
            inRangeData.colors[date] += ' date-range__range-end'
          }
        }

        this.dateRange = inRangeData
      })
    }
  }
}
</script>

<style scoped>
.date-range {
  display: flex;
}

.date-range__pickers {
  display: flex;
}

.date-range__picker {
  padding: 1rem 1rem 0 1rem;
}

.date-range >>> .v-date-picker-table .v-btn--outline {
  border: none;
}

.date-range >>> .v-date-picker-table table {
  border-collapse: collapse;
}

.date-range >>> .v-date-picker-table .v-btn {
  width: inherit;
  max-width: 33px;
}

.date-range >>> .v-date-picker-table__events {
  height: 32px;
  max-width: 34px;
  width: inherit;
  top: 0;
  z-index: -1;
}

.date-range >>> .v-date-picker-table__events > div {
  margin: 0;
}

.date-range >>> table {
  border-spacing: 0;
}

.date-range >>> .date-range__date-in-range {
  z-index: 0;
  /* override existing settings */
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 0;
}

.date-range >>> .date-range__range-start {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  /* Cover only date button */
  left: 7px;
}

.date-range >>> .date-range__range-end {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

div >>> .v-date-picker-table--date__week {
  color: #d70f16 !important;
}
</style>
<style lang="scss" scoped>
::v-deep .v-dialog,
::v-deep .v-dialog > * {
  overflow: visible;
}

.theme--dark {
  ::v-deep .daterangepicker {
    color: var(--v-secondary-lighten2);
  }
}

.theme--light {
}
</style>
<docs>
### Usage

Component for displaying week range picker

##### Example: Week DateRange Range Picker

```jsx
<c4-daterange
    :error-messages="errors.collect('ComponentName123')"
    data-vv-as="ComponentName123"
    data-vv-name="ComponentName123"
    v-validate="'required'"
    :value="c4DateRange.model"
    @input="c4DateRange.model = $event"
    :options="c4DateRange.rangeOptions"
    :labels="c4DateRange.rangeOptionsLabels"
></c4-daterange>
```

</docs>
