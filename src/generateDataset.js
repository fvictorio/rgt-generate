function* generateBasePoints() {
  let orbit = 0
  let x = 0
  let y = 0

  yield { x, y }

  while (true) {
    orbit += 2
    y = 0
    x = orbit
    yield { x, y }

    while (y < x) {
      y += 2
      yield { x, y }
    }

    while (x > 0) {
      x -= 2
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

module.exports = generateDataset
