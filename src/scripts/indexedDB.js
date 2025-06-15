// File: src/utils/indexedDBHelper.js

const DB_NAME = 'CeritaDB';
const DB_VERSION = 1;
const STORE_NAME = 'heroImages';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveHeroImages(images) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  images.forEach((img, index) => store.put({ id: index, url: img }));
  await tx.done;
}

export async function loadHeroImages() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const allImages = [];
  return new Promise((resolve) => {
    const cursor = store.openCursor();
    cursor.onsuccess = (event) => {
      const cur = event.target.result;
      if (cur) {
        allImages.push(cur.value.url);
        cur.continue();
      } else {
        resolve(allImages);
      }
    };
  });
}
