const { getDefaultConfig } = require('expo/metro-config')

// Fallback config for EAS Build without NativeWind
const getFallbackConfig = () => {
  const config = getDefaultConfig(__dirname, {
    projectRoot: __dirname,
    watchFolders: ['./src'],
  })



  return config
}

// Try to use NativeWind, fallback if lightningcss fails
let config
try {
  const { withNativeWind } = require('nativewind/metro')
  config = getFallbackConfig()
  // Check if we're in EAS Build environment
  if (process.env.EAS_BUILD) {
    config = withNativeWind(config, { input: './global-backup.css' })
  } else {
    config = withNativeWind(config, { input: './global.css' })
  }
} catch (error) {
  console.warn('Warning: NativeWind failed to load, using fallback config:', error.message)
  config = getFallbackConfig()
}

module.exports = config 