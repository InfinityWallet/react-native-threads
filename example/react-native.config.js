const disableAutoLink = {
    ios: [],
    android: ['react-native-threads'],
  };
  
  const dependencies = [
    ...disableAutoLink.ios,
    ...disableAutoLink.android,
  ].reduce((acc, lib) => {
    const platforms = {};
    if (disableAutoLink.ios.includes(lib)) {
      platforms.ios = null;
    }
    if (disableAutoLink.android.includes(lib)) {
      platforms.android = null;
    }
  
    acc[lib] = {platforms};
    return acc;
  }, {});
  
  module.exports = {
    dependencies,
  };