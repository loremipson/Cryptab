const fetch = require('node-fetch')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  const assets = await fetch('https://api.coincap.io/v2/assets?limit=2000').then(res => res.json())

  const processAsset = asset => {
    const nodeId = createNodeId(`coincap-asset-${asset.symbol}`)
    const nodeContent = JSON.stringify(asset)
    const nodeData = {
      ...asset,
      id: nodeId,
      children: [],
      internal: {
        type: 'CoinCapAsset',
        content: nodeContent,
        contentDigest: createContentDigest(asset),
      },
    }

    return nodeData
  } 

  assets.data.forEach(asset => createNode(processAsset(asset)))

  return
}