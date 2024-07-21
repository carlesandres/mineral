export const baseUrl = process.env.BASE_E2E_URL || 'http://localhost:3000';
export const makeUrl = (path) => `${baseUrl}${path}`;

export const activateShortcuts = async (page) => {
  await page.keyboard.down('ControlRight');
  await page.keyboard.press('k');
  await page.keyboard.up('ControlRight');
};

export const isFocused = async (page, containerEl) => {
  const isF = await page.evaluate(
    (el) => el.contains(document.activeElement),
    containerEl
  );
  await page.waitForTimeout(3000);
  return isF;
};

// Example of use of IndexedDB for future reference:
// https://github.com/mdn/to-do-notifications/blob/gh-pages/scripts/todo.js
export const getIndexedDBHandle = async function (page) {
  try {
    const res = await page.evaluateHandle(() => {
      const promise = new Promise((resolve, reject) => {
        const request = window.indexedDB.open('localforage');
        request.onsuccess = function () {
          resolve(request.result);
        };

        request.onerror = function (err) {
          reject(err);
        };

        request.onupgradeneeded = function (event) {
          resolve(request.result);
        };
      });
      return promise;
    });

    return Promise.resolve(res);
  } catch (err) {
    console.log('err2', err); // eslint-disable-line no-console
    return;
  }
};

export const clearDB = async (page) => {
  const db = await getIndexedDBHandle(page);
  await page.evaluateHandle((inDB) => {
    try {
      const list = inDB.objectStoreNames;
      if (!list || !list.contains('keyvaluepairs')) {
        return Promise.resolve();
      }
    } catch (err) {
      return Promise.reject(err);
    }

    const promise = new Promise((resolve, reject) => {
      const transaction = inDB.transaction(['keyvaluepairs'], 'readwrite');
      const objectStore = transaction.objectStore('keyvaluepairs');
      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;

        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };

      transaction.oncomplete = function () {
        resolve();
      };
    });

    return promise;
  }, db);
};

export const repopulateDB = async (page) => {
  const db = await getIndexedDBHandle(page);
  await page.evaluate((inDB) => {
    const promise = new Promise((resolve, reject) => {
      const transaction = inDB.transaction(['keyvaluepairs'], 'readwrite');

      transaction.oncomplete = function () {
        resolve();
      };

      transaction.onerror = function () {
        reject();
      };

      transaction.onabort = function () {
        reject();
      };

      const objectStore = transaction.objectStore('keyvaluepairs');
      objectStore.add(
        {
          id: 'tx_112',
          title: 'cccccc',
          text: 'bbbbb',
          updatedAt: 1542320360326,
        },
        'tx_112'
      );
      objectStore.add(
        {
          id: 'tx_113',
          title: 'aaaaaa',
          text: 'aabbccdd\n -------\n something else\n\n \n------\nslide 2 \n\n------\nslide 3 ',
          updatedAt: 1545827400359,
        },
        'tx_113'
      );
      objectStore.add(
        {
          id: 'tx_114',
          title: 'aaabbb',
          text: 'text for aaabbb',
          updatedAt: 1529935868974,
        },
        'tx_114'
      );
      // objectStore.add({
      //   defaultFontSize: 16,
      //   emptyBinConfirm: true,
      //   initialised: true,
      //   startWithPreview: false
      // },
      //   'textmarkr_user_settings');
    });

    return promise;
  }, db);
};

export const cleanList = async (page) => {
  await clearDB(page);
  await repopulateDB(page);
};

export const countSelectorMatches = (page, selector) =>
  page.$$(selector).length;
