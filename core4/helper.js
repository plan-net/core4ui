export function clone (element) {
  try {
    element = JSON.parse(JSON.stringify(element))
  } catch (err) {
    console.error(err)
  }
  return element
}
export function flatten (arr) {
  return [].concat.apply([], arr)
}
export function unique (arr) {
  return [...new Set(arr)]
}
export function removeDollar (obj) {
  const isObj = myVar => {
    return myVar !== null && typeof myVar === 'object'
  }
  for (const key in obj) {
    if (key.indexOf('$') === 0) {
      delete obj[key]
    } else if (isObj(obj[key])) {
      removeDollar(obj[key])
    }
  }
  return obj
}
export function camelize (str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}
export function pad (n, width, z = '0') {
  n = String(n)
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}
export function deepFreeze (o) {
  Object.freeze(o)

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (
      o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop])
    }
  })
  return o
}
import moment from 'moment'
// test unit heloer.spec.js
/**
 * Formats datestring (30.12.2019 08:44)
 * into iso format: >> 12-30-2019 08:44 <<
 * @param {String} 30.12.2019 08:44
 * @return {String} 12-30-2019 08:44
 */
export function stringToDate (value) {
  let retVal = null
  try {
    const tmpTs = value.split('.')
    const yearHour = tmpTs[2].split(' ')
    const hour = (yearHour[1] != null) ? yearHour[1] : '00:00'
    const tmp = `${tmpTs[1]}-${tmpTs[0]}-${yearHour[0]} ${hour}`
    const m = moment(new Date(tmp))
    retVal = m.format('MM-DD-YYYY HH:mm')
  } catch (err) {
    // console.warn(err)
  }
  return retVal
}

/**
 * Formats a js date (Date)
 * into: >> weekNr, year <<
 * @param {Date} value usef for week year calculation
 * @return {Object}
 */
export function getWeek (d) {
  if (moment(d).isValid() === false) {
    return {
      weekNr: null,
      year: null
    }
  }
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  // Return array of year and week number
  // return [d.getUTCFullYear(), weekNo];

  const ret = {
    weekNr: weekNo,
    year: d.getUTCFullYear()
  }
  return ret
}

/**
 * Formats a timestamp or datestring (1577660400000, 2019-12-30)
 * into: >> Woche 04, 2020 <<
 * @param {Number|String} value that should be formatted as calendarweek, year
 * @param {Object} config that holds formatting information
 * @return {String}
 */
export function dateFormatted (value, config = {
  weekLabel: 'Woche ',
  seperator: ', ',
  fallback: ''
}) {
  if (value != null) {
    const weekYear = getWeek(new Date(value))

    return `${config.weekLabel}${pad(weekYear.weekNr, 1)}${config.seperator}${weekYear.year}`
    // return displayWeek
  }
  return config.fallback
}

export default {
  stringToDate,
  getWeek,
  dateFormatted,
  flatten,
  unique,
  removeDollar,
  camelize,
  pad,
  clone,
  deepFreeze
}
