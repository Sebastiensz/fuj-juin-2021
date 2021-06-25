module.exports = {
  apps: [
    {
      script: 'build/src/index.js',
      watch: '.',
      name: 'gestion-stock',
      env: {
        NODE_ENV: 'production',
        ORSYS_PORT: 4444,
        ORSYS_MONGO_URL: 'mongodb://MW35:27017/gestion-stock',
      },
    },
  ],
};
