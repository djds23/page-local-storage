class ArgumentError extends Error {
  constructor (methodName, expectedArgCount, recievedArgCount) {
    super()
    this.message = ` - ${methodName} - recieved ${expectedArgCount.toString()} arguments when it requires ${recievedArgCount.toString()}`
  }
}

class ReadOnlyError extends Error {
  constructor (methodName) {
    super()
    this.message = ` - ${methodName} - is a read-only property. Therefore it cannot be set.`
  }
}

export { ArgumentError, ReadOnlyError };

