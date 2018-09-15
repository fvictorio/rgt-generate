const { Command, flags } = require('@oclif/command')
const csv = require('csv')
// const chance = require('chance')

function* generateBasePoints() {
  let orbit = 0
  let x = 0
  let y = 0

  yield { x, y }

  while (true) {
    orbit++
    y = 0
    x = orbit
    yield { x, y }

    while (y < x) {
      y++
      yield { x, y }
    }

    while (x > 0) {
      x--
      yield { x, y }
    }
  }
}

function generateCluster(index, pointsPerCluster, basePoints) {
  const basePoint = basePoints.next().value

  const points = []
  for (let i = 0; i < pointsPerCluster; i++) {
    const point = { x: basePoint.x + Math.random(), y: basePoint.y + Math.random(), label: index }
    points.push(point)
  }

  return points
}

function generateDataset(clusters, pointsPerCluster) {
  const basePoints = generateBasePoints()
  const points = []

  for (let clusterIndex = 0; clusterIndex < clusters; clusterIndex++) {
    const cluster = generateCluster(clusterIndex, pointsPerCluster, basePoints)

    points.push.apply(points, cluster)
  }

  return points
}

class RgtGenerateCommand extends Command {
  async run() {
    const { flags } = this.parse(RgtGenerateCommand)
    const clusters = flags.clusters || 4
    const pointsPerCluster = flags.pointsPerCluster || 10
    const dataset = generateDataset(clusters, pointsPerCluster)
    return new Promise((resolve, reject) => {
      csv.stringify(dataset, { header: true, quoted: true }, (err, output) => {
        if (err) return reject(err)

        this.log(output)
        resolve()
      })
    })
  }
}

RgtGenerateCommand.description = `Describe the command here
...
Extra documentation goes here
`

RgtGenerateCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  clusters: flags.string({ char: 'c', description: 'Number of clusters' }),
  pointsPerCluster: flags.string({ char: 'p', description: 'Points per clusters' })
}

module.exports = RgtGenerateCommand
