module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.database/strapi-data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
