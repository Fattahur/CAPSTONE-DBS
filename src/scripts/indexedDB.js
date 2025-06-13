import { openDB } from 'idb';

const DB_NAME = 'CeritaBudayaDB';
const DB_VERSION = 1;
const LIKE_STORE = 'likes';
const FAVORIT_STORE = 'favorit';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(LIKE_STORE)) {
      db.createObjectStore(LIKE_STORE, { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains(FAVORIT_STORE)) {
      db.createObjectStore(FAVORIT_STORE, { keyPath: 'id' });
    }
  },
});

// === LIKE ===
export const LikeDB = {
  async tambah(cerita) {
    return (await dbPromise).put(LIKE_STORE, cerita);
  },
  async hapus(id) {
    return (await dbPromise).delete(LIKE_STORE, id);
  },
  async semua() {
    return (await dbPromise).getAll(LIKE_STORE);
  },
  async cek(id) {
    return Boolean(await (await dbPromise).get(LIKE_STORE, id));
  },
};

// === FAVORIT ===
export const FavoritDB = {
  async tambah(cerita) {
    return (await dbPromise).put(FAVORIT_STORE, cerita);
  },
  async hapus(id) {
    return (await dbPromise).delete(FAVORIT_STORE, id);
  },
  async semua() {
    return (await dbPromise).getAll(FAVORIT_STORE);
  },
  async cek(id) {
    return Boolean(await (await dbPromise).get(FAVORIT_STORE, id));
  },
};
