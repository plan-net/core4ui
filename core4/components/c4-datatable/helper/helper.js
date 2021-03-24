export function clone (element) {
  try {
    element = JSON.parse(JSON.stringify(element))
  } catch (err) {
    console.error(err)
  }
  return element
}
