import * as mongoose from 'mongoose';
const env = require('../../../env.json')['database'];

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<mongoose.Connection> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(`mongodb://${env['host']}/${env['db_name']}`, {
        useMongoClient: true,
        poolSize: 10,
        autoReconnect: true
      });
    },
  },
];