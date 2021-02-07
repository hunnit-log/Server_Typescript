import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import config from '../config';
import Logger from '../loaders/logger';
// Load models
import Sprint from '../models/sprint';
import User from '../models/user';

const url  = config.databaseURL;

// Connect to DB
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
Logger.info('✌️ [Seeder] DB loaded and connected!');

// Read JSON files
const sprints = JSON.parse(
  fs.readFileSync(`${path.resolve()}/_dummyData/sprints.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${path.resolve()}/_dummyData/users.json`, 'utf-8')
);
// Import into DB
const importData = async () => {
  try {
    await Sprint.create(sprints);
    await User.create(users);

    Logger.info('✅ Data Imported,,,');
    process.exit();
  } catch (err) {
    Logger.error('💥 Data Imported Error');
    Logger.error(err);
    process.exit();
  }
};

// Delete into DB
const deleteData = async () => {
  try {
    await Sprint.deleteMany();
    await User.deleteMany();

    Logger.info('✅ Data deteled,,,');
    process.exit();
  } catch (err) {
    Logger.error('💥 Data Imported Error');
    Logger.error(err);
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
