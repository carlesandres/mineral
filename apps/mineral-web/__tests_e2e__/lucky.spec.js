import 'expect-puppeteer';
import { cleanList, makeUrl } from './utils';

describe('Lucky page', () => {
  beforeAll(async () => {
    await page.goto(makeUrl('/'));
    await cleanList(page);
  });

  describe('If a file matching the search is found', () => {
    it('opens the most recent file that matches the search', async () => {
      const searchTerm = 'aaa';
      await page.goto(makeUrl(`/lucky?search=${searchTerm}`));
      //   tO-DO: Test this
      //   cy.contains(`Searching for a file matching ${searchTerm} `);
      await expect(page).toMatchElement('.notearea', { visible: true });
      await expect(page.url()).toMatch('/file?id=tx_113');
    });
  });

  describe('If a file matching the search is NOT found', () => {
    it('opens the list with the search term populated', async () => {
      const searchTerm = 'zzz';
      await page.goto(makeUrl(`/lucky?search=${searchTerm}`));
      await expect(page).toMatchElement('.list-inbox', { visible: true });
      await expect(page.url()).toMatch(`/notes?search=${searchTerm}`);
    });
  });
});
