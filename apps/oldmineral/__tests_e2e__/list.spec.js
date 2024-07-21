import 'expect-puppeteer';
import {
  activateShortcuts,
  cleanList,
  clearDB,
  isFocused,
  makeUrl,
} from './utils';

describe('List page', () => {
  describe('When empty', () => {
    beforeEach(async () => {
      await page.goto(makeUrl('/'));
      await clearDB(page);
    });

    it('Redirects to the empty list page', async () => {
      await page.goto(makeUrl('/'));
      await page.waitForTimeout(1000);
      await expect(page.url()).toMatch('/notes');
      await expect(page).toMatch('This is your file list');
      await expect(page).toMatch('Check our introduction');
    });

    it('allows to create a new file', async () => {
      await expect(page).toClick('.entry');
      await page.waitForNavigation();
      await page.waitForTimeout(3000);
      await expect(page.url()).not.toMatch('/notes');
      await expect(page.url()).toMatch('/file');
    });

    it('can navigate to /bin from keyboard shortcut', async () => {
      await activateShortcuts(page);
      await expect(page).toMatchElement('.kbshortcuts', { visible: true });
      await page.keyboard.press('b', { delay: 100 });
      await expect(page).toMatchElement('.kbshortcuts', { visible: false });
      // TO-DO: Review this 1s await
      await page.waitForTimeout(1000);
      await expect(page.url()).toMatch('/bin');
    });

    //
    // it('can navigate to /settings from keyboard shortcut', () => {
    //   cy.activateShortcuts();
    //   cy.get('.kbshortcuts').should('be.visible');
    //   cy.sendKey(keyCodes.s);
    //   cy.get('.kbshortcuts').should('not.be.visible');
    //   cy.url().should('include', '/settings');
    // });
  });

  describe('When not empty', () => {
    beforeAll(async () => {
      await page.goto(makeUrl('/'));
      await cleanList(page);
    });

    it('searchbox should be focused by default', async () => {
      await page.goto(makeUrl('/'));
      await expect(page).toMatchElement('.list-inbox', { visible: true });
      const searchBox = await expect(page).toMatchElement('.search-box', {
        visible: true,
      });
      const focused = await isFocused(page, searchBox);
      expect(focused).toBe(true);
    });

    it.skip('can refocus on searchbox with a keyboard shortcut', async () => {
      await page.goto(makeUrl('/'));
      await page.waitForTimeout(3000);
      await expect(page).toMatchElement('.list-inbox', { visible: true });
      await expect(page).toMatchElement('.search-box', { visible: true });
      await expect(page).toMatchElement('.file-link', { visible: true });
      const listDetails = await expect(page).toMatchElement('.list-details', {
        visible: true,
      });
      await page.evaluateHandle((el) => el.focus, listDetails);
      // await expect(listDetails).toClick();
      const searchBox2 = await expect(page).toMatchElement('.search-box', {
        visible: true,
      });
      const focused = await isFocused(page, searchBox2);
      expect(focused).toBe(false);
      // await activateShortcuts(page);
      // await expect(page).toMatchElement('.kbshortcuts', { visible: true });
      // await page.keyboard.press('Slash', { delay: 100 });
      // await expect(page).toMatchElement('.kbshortcuts', { visible: false });
      // const focused2 = await isFocused(page, searchBox);
      // expect(focused2).toBe(true)
    });
    //
    it('filters down by title when typing on search-box', async () => {
      await page.goto(makeUrl('/'));
      await expect(page).toFill('.search-box', 'aaa');
      const listInbox = await expect(page).toMatchElement('.list-inbox', {
        visible: true,
      });
      await expect(listInbox).toBeDefined();
      await expect(listInbox).toMatch('aaaaaa');
      await expect(listInbox).toMatch('aaabbb');
      await expect(listInbox).not.toMatch('cccccc');
      await expect(page).toFill('.search-box', 'x');
      const fileList = await expect(page).toMatchElement('.file-list', {
        visible: true,
      });
      await expect(fileList).toMatch('There are no files matching your search');
      await expect(page).toFill('.search-box', '#slide');
      const listInbox2 = await expect(page).toMatchElement('.list-inbox', {
        visible: true,
      });
      await expect(listInbox2).toMatch('aaaaaa');
      await expect(listInbox2).not.toMatch('aaabbb');
      await expect(listInbox2).not.toMatch('cccccc');
    });
  });

  describe('Keyboard navigation', () => {
    beforeAll(async () => {
      await page.goto(makeUrl('/'));
      await cleanList(page);
    });

    // TO-DO: The increased timeout is a code smell
    it.skip('hilites only one element by default', async () => {
      await expect(page.url()).toMatch('/notes');
      await page.waitForTimeout(500);
      const hilitedEls = await page.$$('.list-group-item.selected');
      expect(hilitedEls).toHaveLength(1);
    }, 1000);

    it('hilites the top element by default', async () => {
      const hilitedEl = await page.$('.list-group-item.selected');
      const firstEl = await page.$('.list-group-item:nth-child(1)');
      const equal = await page.evaluate(
        (e1, e2) => e1 === e2,
        hilitedEl,
        firstEl
      );
      expect(equal).toBe(true);
    });

    it('pressing down arrow hilites the next element', async () => {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
      const hilitedEl = await page.$('.list-group-item.selected');
      const firstEl = await page.$('.list-group-item:nth-child(1)');
      const secondEl = await page.$('.list-group-item:nth-child(2)');
      const isSecond = await page.evaluate(
        (e1, e2) => e1 === e2,
        hilitedEl,
        secondEl
      );
      const isFirst = await page.evaluate(
        (e1, e2) => e1 === e2,
        hilitedEl,
        firstEl
      );
      expect(isSecond).toBe(true);

      if (isFirst) {
        console.log('firstEl', firstEl);
      }

      expect(isFirst).toBe(false);
    });
  });
});
