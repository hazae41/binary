export function assert(condition: boolean, message = "Expected condition to be true") {
  if (!condition) throw new Error(message)
}

export function throws(wrapper: () => unknown) {
  try {
    wrapper()
    return false
  } catch (e: unknown) {
    return true
  }
}