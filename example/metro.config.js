const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path')
/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      stream: require.resolve('readable-stream'),
      buffer: require.resolve('@craftzdog/react-native-buffer'),
      events: require.resolve('events'),
      process: require.resolve('process'),
      url: require.resolve('url'),
      os: require.resolve('react-native-os'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      querystring: require.resolve('querystring'),
      util: require.resolve('util'),
      assert: require.resolve('assert')
    },

  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [
    path.resolve(__dirname, 'node_modules'), // Ensure it watches `node_modules`
  ],
};

// Ensure `@polkadot` is included in Babel transformation

// Add crypto resolver override
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'crypto') {
    return context.resolveRequest(
      context,
      'react-native-quick-crypto',
      platform,
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = mergeConfig(defaultConfig, config);
