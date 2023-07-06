const extractDependencies = (expression: string): string[] => {
  const dependencies: string[] = []
  const regex = /[A-Z]+\d+/g
  let match

  while ((match = regex.exec(expression)) !== null) {
    dependencies.push(match[0])
  }

  return dependencies
}

export default extractDependencies
