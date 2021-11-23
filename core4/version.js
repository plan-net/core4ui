var fs = require('fs')

fs.readFile('../../__init__.py', 'utf8', function(err, data) {
  if (err) throw err
  data = data.split("'").join('"')

  const tmp = data.split('\n').filter(val => val !== '')
  let version = tmp.find(val => val.includes('__version'))
  version = version
    .split(' = ')[1]
    .split('"')
    .join('')
  let name = tmp.find(val => val.includes('name ='))
  name = name
    .split(' = ')[1]
    .split('"')
    .join('')
  let built = tmp.find(val => val.includes('__built__'))
  built = built
    .split(' = ')[1]
    .split('"')
    .join('')
  version = 'v. ' + name + '/' + version + '/' + built

  /*   data = data.split("'").join('"')

  const s1 = data.substring(data.indexOf('name = ') + 7)
  const name = s1
    .substring(0, s1.indexOf('title'))
    .split('"')
    .join('')
    .replace('\n', '')

  const s3 = data.substring(data.indexOf('__version__ =') + 14)
  const version = s3
    .substring(0, s3.indexOf('__built__'))
    .split('"')
    .join('')
    .replace('\n', '')
  const all = name + '/' + version*/
  const date = new Date()

  fs.readFile('./dist/index.html', 'utf8', function(err, data) {
    if (err) throw err
    const tmp = data.split('</head>')
    const v =
      '<script>window.__VERSION__ ="v.' +
      version +
      '"; window.__CACHEB__ = "' +
      date +
      '"</script></head>'

    const res = tmp[0] + v + tmp[1]

    fs.writeFile('./dist/index.html', res, function(err) {
      if (err) {
        return console.log(err)
      }
    })
  })
})
