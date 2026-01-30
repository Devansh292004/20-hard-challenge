import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'mock_persistence.json');

const loadData = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      return data;
    }
  } catch (err) {
    console.error('Error loading mock data:', err);
  }
  return { users: [], challenges: [] };
};

const savedData = loadData();

export const users = savedData.users;
export const challenges = savedData.challenges;

export const saveMockDb = () => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users, challenges }, null, 2));
  } catch (err) {
    console.error('Error saving mock data:', err);
  }
};

export const generateMockId = () => [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
