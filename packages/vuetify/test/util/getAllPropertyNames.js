export default function getAllPropertyNames (obj) {
  const props = new Set()
  do {
    Object.getOwnPropertyNames(obj)
      .forEach(p => props.add(p))
    obj = Object.getPrototypeOf(obj)
  } while (obj)
  return Array.from(props)
}
