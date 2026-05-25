const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Reanimated 4 / Worklets need inline requires so init runs before other modules load.
config.transformer.getTransformOptions = async () => ({
  transform: {
    inlineRequires: true,
  },
})

module.exports = config
