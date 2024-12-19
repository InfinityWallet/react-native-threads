module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-class-static-block',  // Transforms static blocks
    '@babel/plugin-transform-class-properties',    // Transforms class properties
    '@babel/plugin-transform-private-methods',     // Transforms private methods
    '@babel/plugin-syntax-class-static-block',     // Enables parsing of static blocks
    '@babel/plugin-proposal-private-methods',      // Optional: for private methods
    '@babel/plugin-proposal-private-property-in-object', // Optional: for private properties
  ]
};
