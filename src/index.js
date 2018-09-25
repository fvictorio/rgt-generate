const { Command, flags } = require('@oclif/command')
const csv = require('csv')
const generateDataset = require('./generateDataset')

class RgtGenerateCommand extends Command {
  async run() {
    const { flags } = this.parse(RgtGenerateCommand)
    const clusters = flags.clusters || 4
    const pointsPerCluster = flags.pointsPerCluster || 10
    const dataset = generateDataset(clusters, pointsPerCluster)
    return new Promise((resolve, reject) => {
      csv.stringify(dataset, { header: true, quoted: true }, (err, output) => {
        if (err) return reject(err)

        this.log(output.trimRight())
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
