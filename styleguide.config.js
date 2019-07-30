const path = require('path')
module.exports = {
  // set your styleguidist configuration here
  require: [
    path.join(__dirname, 'global.requires.js'),
    path.join(__dirname, 'styles.css')
  ],
  title: 'core4ui Style Guide',
  renderRootJsx: path.join(__dirname, 'styleguide.root.js'),
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  sections: [
    {
      name: 'Documentation',
      components: 'src/components/[aA-zZ]*/[aA-zZ]*.vue'
    },
    {
      name: 'Components',
      components: 'core4/components/c4-[aA-zZ]*/C4[aA-zZ]*.vue'
      // components: 'src/lib/components/pnbi-[aA-zZ]*/Pnbi[aA-zZ]*.vue'
    }
  ]
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // }
}
