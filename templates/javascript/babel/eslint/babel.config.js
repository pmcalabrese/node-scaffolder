module.exports = function(api) {
  api.cache(true)

  const presets = [
      [
          'env',
          {
              targets: {
                  node: 'current',
              },
          },
      ],
      [
          'minify',
          {
              unsafe: {
                  typeConstructors: false,
              },
              keepFnName: false,
          },
      ],
  ]
  const plugins = []

  return {
      presets,
      plugins,
  }
}
