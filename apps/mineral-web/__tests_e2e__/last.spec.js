import 'expect-puppeteer';
import { cleanList, makeUrl } from './utils';

describe('Visit last open page', () => {
  beforeAll(async () => {
    await page.goto(makeUrl('/'));
    await cleanList(page);
  });

  it('visits the most recent file when naviagtin to /last', async () => {
    await page.goto(makeUrl('/'));
    await expect(page).toMatch('aaaaaa');
    await expect(page).toMatch('cccccc');
    await page.goto(makeUrl('/last'));
    await page.waitForTimeout(2000);
    await expect(page.url()).toMatch('/file?id=tx_113');
  });
});
