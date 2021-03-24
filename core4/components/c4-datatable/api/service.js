import api from './index'
import { mapDict } from '../helper/obj.js'

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

function propMap (keys = [], obj) {
  keys.forEach(item => {
    if (mapDict[item] && item in obj) {
      obj[mapDict[item]] = obj[item]
      delete obj[item]
    }
  })

  return obj
}

function mapColumns (data) {
  // dataTable vuetify component expect name prop for column
  data.column.map(item => propMap(['label', 'name'], item))

  return data
}

function mapPaging (data) {
  // dataTable vuetify component starts count page from 1,
  // server starts count pages from 0,
  // increase page
  data.page = data.paging.page + 1

  // rename per_page -> itemsPerPage
  propMap(['per_page'], data.paging)

  // check if all items are selected per page
  if (data.paging.itemsPerPage === data.paging.total_count) {
    data.itemsPerPage = -1
  } else {
    data.itemsPerPage = data.paging.itemsPerPage
  }
  return data
}

function mapSort (data) {
  // dataTable component store column sorting in sortBy, sortDesc value,
  // server store column sorting in store
  Object.assign(
    data,
    (function () {
      return data.sort.reduce(
        (newObj, item) => {
          newObj.sortBy.push(item.name)
          newObj.sortDesc.push(!item.ascending)
          return newObj
        },
        { sortBy: [], sortDesc: [] }
      )
    })()
  )

  return data
}

function extractData (data) {
  if (data._id != null && data.code != null && data.data != null) {
    // data is still unwrapped
    return data.data
  }
  return data
}

function buildRequest (options) {
  if (options.reset) return { reset: options.reset }

  const result = {
    per_page: (() => {
      if (options.itemsPerPage === -1) {
        return options.paging.total_count
      } else {
        return options.itemsPerPage || 10
      }
    })(),
    page: (options.page && options.page - 1) || 0
  }

  if (options.sortBy.length) {
    result.sort = options.sortBy.reduce((newArr, item, i) => {
      newArr.push({
        name: item,
        ascending: !options.sortDesc[i]
      })
      return newArr
    }, [])
  }

  if ('column' in options) {
    result.column = options.column.map(item => {
      propMap(['text', 'value'], item)

      return { name: item.name, hide: item.hide }
    })
  }

  if ('dense' in options) {
    result.dense = options.dense
  }

  if ('filter' in options) {
    result.filter = options.filter
  }

  return result
}

export default {
  getTable (url, options, payload = {}) {
    return api
      .get(url, Object.assign(buildRequest(options), payload))
      .then(data => {
        const tmp = pipe(extractData, mapPaging, mapColumns, mapSort)(data)
        return tmp
      })
  },
  downloadTable (url, reset) {
    return api.download(url, reset)
  }
}
