import { openDB } from 'idb';

const DB_NAME = 'jate';
const STORE_NAME = 'entries';

const initdb = async () => {
  await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log(`${STORE_NAME} object store created`);
      } else {
        console.log(`${STORE_NAME} object store already exists`);
      }
    },
  });
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB(DB_NAME, 1);
    const tx = jateDb.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put({ value: content });
    await tx.done;
    console.log('Text entry has been saved to the database!');
  } catch (error) {
    console.error('Error putting data into database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB(DB_NAME, 1);
    const tx = jateDb.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const result = await store.getAll();
    console.log('Text has been retrieved from the database.');
    return result;
  } catch (error) {
    console.error('Error getting data from database:', error);
    return null;
  }
};

initdb();

