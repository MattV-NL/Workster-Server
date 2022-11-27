const typeorm = require('typeorm');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const datasource = new typeorm.DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_SERVER || 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_USER_DATABASE,
  synchronize: true,
  entities: [
    require('./Entities/users'),
    require('./Entities/workLocations'),
    require('./Entities/workInformation'),
    require('./Entities/userSettings'),
  ],
});

datasource.initialize().then(() => console.log('ran'));
