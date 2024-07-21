import 'expect-puppeteer';
import { clearDB, makeUrl } from './utils';

describe('List page', () => {
  describe('When urls contains a search param', () => {
    beforeEach(async () => {
      await page.goto(makeUrl('/'));
      await clearDB(page);
    });

    it('Populates the searchbox with the param', async () => {
      await page.goto(makeUrl('/notes?search=%23asdasd'));
      await page.waitForTimeout(1000);
      await expect(page).toMatchElement('input.search-box[value="#asdasd"]');
    });

    it('Does not break on unsafe RegExp chars', async () => {
      await page.goto(makeUrl('/notes?search=%3F'));
      await page.waitForTimeout(1000);
      await expect(page).toMatchElement('input.search-box[value="?"]');
    });
  });
});
