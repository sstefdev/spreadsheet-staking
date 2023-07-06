const removeLeadingZeros = (value: string) => {
  return value.replace(/([A-Z])(0*)(\d+)/g, (_match, letter, _zeros, number) => {
    const formattedNumber = parseInt(number, 10).toString()
    return `${letter}${formattedNumber}`
  })
}

export default removeLeadingZeros
