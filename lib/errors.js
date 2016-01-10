
class ArgumentError extends Error {
  constructor (methodName, expectedArgCount, recievedArgCount) {
    super()
    this.message = ` - ${methodName} - recieved ${expectedArgCount.toString()} arguments when it requires ${recievedArgCount.toString()}`
  }
}

export { ArgumentError };
