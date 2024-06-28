require('dotenv').config();
const mysqldump = require('mysqldump');
const fs = require('fs');

const exportDatabase = async (config, filePath, exportType, minify = false) => {
    try {
      const dumpOptions = {
        connection: {
          host: config.host,
          user: config.user,
          password: config.password,
          database: config.database,
        },
        dumpToFile: filePath,
      };

      // Modify dump options based on export type
      switch (exportType) {
        case 'full':
          // Default behavior, export structure and data
          break;
        case 'structure':
          dumpOptions.dump = {
            data: false,
          };
          break;
        case 'data':
          dumpOptions.dump = {
            schema: false,
          };
          break;
        default:
          throw new Error('Invalid export type. Choose "full", "structure", or "data".');
      }

      // Add minify option if required
      if (minify) {
        dumpOptions.dump = {
          ...dumpOptions.dump,
          minify: true,
        };
      }

      await mysqldump(dumpOptions);

      console.log(`Database dump (${exportType}, minify: ${minify}) successfully saved to ${filePath}`);
    } catch (error) {
      console.error('Error exporting database:', error);
    }
  };

// Configuration for MySQL connection
const dbConfig = {
    connectionLimit: 10,
    port: process.env.dbConfig_port,
    host: '127.0.0.1',
    user: process.env.dbConfig_user,
    password: process.env.dbConfig_password,
    database: 'webdapoer'
};

// Path where the SQL dump will be saved
const filePath = './sql/full.sql';

// Export type options: 'full', 'structure', or 'data'
const exportType = 'full'; // Change to 'structure' or 'data' as needed

// Call the function to export the database
exportDatabase(dbConfig, filePath, exportType, (exportType == 'data' || exportType == 'full'));