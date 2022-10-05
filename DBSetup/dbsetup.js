const typeorm = require('typeorm');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const datasource = new typeorm.DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PW,
  database: 'TypeOrmTutorial',
  synchronize: true,
  entities: [
    require('./Entities/users'),
    require('./Entities/workLocations'),
    require('./Entities/workInformation'),
    require('./Entities/userSettings'),
  ],
});

datasource.initialize().then(() => console.log('ran'));
