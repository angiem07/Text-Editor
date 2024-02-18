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
  console.log('Added to Database');
  const txDb = await openDB("jate", 1);
  const Txt = txDb.transaction("jate", "readwrite");
  const Storage = Txt.objectStore("jate");
  const rqt = Storage.put({
    id: 1,
    value: content,
  });
  const rst = await rqt;
  console.log("data saved to Db", rst);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all content from database");
  const txDb = await openDB("jate", 1);
  const Txt = txDb.transaction("jate", "readonly");
  const Storage = Txt.objectStore("jate");
  const rqt = Storage.get(1);
  const rst = await rqt;
  console.log("rst.value", rst);
  return rst?.value;
}

initdb();

