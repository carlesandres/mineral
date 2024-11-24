import 'expect-puppeteer';
import { activateShortcuts, cleanList, makeUrl } from './utils';

describe('Slides', () => {
  const text1 = 'aabbccdd';
  const text2 = 'something else';
  const text3 = 'slide 2';
  const text4 = 'slide 3';

  beforeAll(async () => {
    await page.goto(makeUrl('/'));
    await cleanList(page);
  });

  describe('when opening the slides url', () => {
    beforeAll(async () => {
      await page.goto(makeUrl('/'));
      await cleanList(page);
      await page.goto(makeUrl('/file?id=tx_113'));
    });

    it('opens the slides page', async () => {
      await expect(page).toMatchElement('#editorarea', { visible: true });
      await page.click('.actions .dropdown-btn');
      await expect(page).toMatchElement('.dropdown');
      await expect(page).toMatchElement('.editor-toolbar .slides', {
        visible: true,
      });
      // TO-DO: Make navs buttons
      await page.click('[data-test="play"]');
      await expect(page).toMatchElement('.slide-viewer', { timeout: 1000 });
      await expect(page.url()).toMatch('/slides?id=tx_113');
      await expect(page).toMatch(text1);
      await expect(page).toMatch(text2);
      await expect(page).not.toMatch('undefined');
    });

    it('can be navigated with arrow keys', async () => {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
      const slideViewer = await expect(page).toMatchElement('.slide-viewer');
      await expect(slideViewer).toMatch(text3);
      await expect(slideViewer).not.toMatch(text1);
      await expect(slideViewer).not.toMatch(text2);
      await expect(slideViewer).not.toMatch(text4);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
      const slideViewer2 = await expect(page).toMatchElement('.slide-viewer');
      await expect(slideViewer2).toMatch(text4);
      await expect(slideViewer2).not.toMatch(text1);
      await expect(slideViewer2).not.toMatch(text2);
      await expect(slideViewer2).not.toMatch(text3);
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
      const slideViewer3 = await expect(page).toMatchElement('.slide-viewer');
      await expect(slideViewer3).toMatch(text3);
      await expect(slideViewer3).not.toMatch(text1);
      await expect(slideViewer3).not.toMatch(text4);
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
      const slideViewer4 = await expect(page).toMatchElement('.slide-viewer');
      await expect(slideViewer4).toMatch(text1);
      await expect(slideViewer4).toMatch(text2);
      await expect(slideViewer4).not.toMatch(text3);
      await expect(slideViewer4).not.toMatch(text4);
      await expect(slideViewer4).not.toMatch('undefined');
    });

    it('opens the corresponding file page when issued the f shortcut', async () => {
      await activateShortcuts(page);
      await expect(page).toMatchElement('.kbshortcuts', { visible: true });
      await page.keyboard.press('f', { delay: 100 });
      await expect(page).toMatchElement('.kbshortcuts', { visible: false });
      //   cy.get('.title');
      await expect(page.url()).toMatch('/file?id=tx_113');
    });
  });

  // TO-DO: This should go to in the "file" spec
  it("opens a file's page when clicking the slides button", async () => {
    await page.goto(makeUrl('/file?id=tx_113'));
    await page.waitForTimeout(1000);
    await expect(page).toMatchElement('#editorarea');
    await page.click('.actions .dropdown-btn');
    await expect(page).toMatchElement('.dropdown');
    await page.click('[data-test="play"]');
    await page.waitForTimeout(100);
    await expect(page).toMatchElement('.slide-viewer');
    await expect(page.url()).toMatch('/slides?id=tx_113');
    const slideViewer = await expect(page).toMatchElement('.slide-viewer');
    await expect(slideViewer).toMatch(text1);
    await expect(slideViewer).toMatch(text2);
    // TO-DO: The modal prevents interacting with the page
    await page.waitForTimeout(3000);
    await page.click('[data-test="pen"]');
    await page.waitForTimeout(100);
    await expect(page).toMatchElement('.editor-wrap');
    await expect(page.url()).toMatch('/file?id=tx_113');
    await expect(page).toMatch(text1);
    await expect(page).toMatch(text2);
    await page.click('.actions .dropdown-btn');
    await expect(page).toMatchElement('.dropdown');
    await page.click('[data-test="play"]');
    await page.waitForTimeout(100);
    await expect(page.url()).toMatch('/slides?id=tx_113');
    await expect(page).toMatch(text1);
    await expect(page).toMatch(text2);
  });
});
