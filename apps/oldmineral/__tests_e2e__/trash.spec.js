import 'expect-puppeteer';
import { activateShortcuts, cleanList, makeUrl } from './utils';

describe('Bin page', () => {
  beforeAll(async () => {
    await page.goto(makeUrl('/'));
    await cleanList(page);
  });

  it('allows to visit the bin page from a button', async () => {
    await page.goto(makeUrl('/'));
    await page.waitForTimeout(1000);
    await expect(page.url()).toMatch('/notes');
    await expect(page).toClick('[data-test="bin"]');
    await page.waitForNavigation();
    await expect(page.url()).toMatch('/bin');
    await expect(page).toMatch('Your Bin is empty.');
    await expect(page).toMatch('Click here');
  });

  // TO-DO:  Isolate this test from the 'delete' functionality by
  // creating a fixture that contains a deleted file
  it('displays files deleted from the list', async () => {
    await page.goto(makeUrl('/'));
    await page.waitForTimeout(1000);
    await expect(page.url()).toMatch('/notes');
    await expect(page).toMatchElement('.list-inbox .list-group-item', {
      visible: true,
    });
    const elems = await page.$$('.list-inbox .list-group-item');
    expect(elems.length).toBe(3);
    const firstInBin = await expect(page).toMatchElement(
      '.list-group .list-group-item:first-child'
    );
    expect(firstInBin).toBeDefined();
    expect(firstInBin).toMatch('aaaaaa');
    await expect(firstInBin).toClick('.icon');
    await page.waitForTimeout(100);
    const elems2 = await page.$$('.list-group .list-group-item');
    expect(elems2.length).toBe(2);
    await expect(page).toClick('[data-test="bin"]');
    await page.waitForNavigation();
    await expect(page.url()).toMatch('/bin');
    // TO-DO: Soooooo slow
    await page.waitForTimeout(1000);
    const elemsBin = await page.$$('.list-group .list-group-item');
    expect(elemsBin.length).toBe(1);
    const firstInBin2 = await expect(page).toMatchElement(
      '.list-group .list-group-item:first-child'
    );
    await expect(firstInBin2).toMatch('aaaaaa');
  });

  it('can visit list from keyboard shortcut', async () => {
    await page.goto(makeUrl('/bin'));
    await expect(page).toMatchElement('.list-bin');
    await activateShortcuts(page);
    await expect(page).toMatchElement('.kbshortcuts', { visible: true });
    await page.keyboard.press('l', { delay: 100 });
    await expect(page).toMatchElement('.kbshortcuts', { visible: false });
    await expect(page).toMatchElement('.list-inbox', { visible: true });
    await expect(page).not.toMatchElement('.list-bin');
    await expect(page.url()).toMatch('/notes');
  });
});
