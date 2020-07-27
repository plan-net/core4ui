export const mapDict = {
  per_page: 'itemsPerPage',
  itemsPerPage: 'per_page',
  label: 'text',
  text: 'label',
  value: 'name',
  name: 'value'
}

export const initialTranslation = {
  cancel: 'Cancel',
  save: 'Save',
  dataLoading: 'Data loading ...',
  itemsPerPageAllText: 'All',
  itemsPerPageText: 'Rows per page',
  advancedOptions: 'Advanced options',
  show: 'Show',
  dragDropColumn: 'Drag & Drop columns',
  resetOptions: 'Reset options',
  dense: 'Dense',
  download: 'Download',
  downloadTitle: 'Stream the table content to a CSV file',
  downloadSwitchLabel: 'Ignore the current column ordering and visibility',
  fullscreen: 'Fullscreen',
  fullscreen_exit: 'Fullscreen exit'
}

export const OPTIONS = {
  page: null,
  itemsPerPage: 0,
  sortBy: [],
  sortDesc: [],
  groupBy: [],
  groupDesc: [],
  // mustSort: null,
  multiSort: true,

  option: {
    advanced_options: null,
    dense: null,
    fixed_header: null,
    footer: null,
    height: null,
    hide_header: null,
    info: null,
    search: null
  },

  paging: {
    count: 0,
    page: 0,
    page_count: 0,
    per_page: 0,
    total_count: 0
  }
}
