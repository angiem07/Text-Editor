import { openDB } from 'idb';


const initdb = async () => {
  console.log('Initializing database...');
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains('jate')) {
          console.log('Jate database already exists.');
          return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate database created.');
    },
  });
    console.log('Database initialized successfully:', db);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Contect added to database:', content);
  try {
    const txDb = await openDB('jate', 1);
    const txt = txDb.transaction('jate', 'readwrite');
    const store = txt.objectStore('jate');
    const result = await store.put({ value: content });
    console.log('Content saved to database:', result);
    return result;
  } catch (error) {
    console.error('Error adding content to the database:', error);
    throw error; // propagate the error
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Retrieving content from the database');
  try {
    const txDb = await openDB('jate', 1);
    const tx = txDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.get(1);
    console.log('Retrieved content from the database:', result?.value);
    return result?.value;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    throw error; // propagate the error
  }
};

initdb();

