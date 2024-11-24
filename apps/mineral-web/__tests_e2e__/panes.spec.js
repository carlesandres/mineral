import 'expect-puppeteer';
import { makeUrl } from './utils';

describe('File panes', () => {
  describe('Upon visiting /new page', () => {
    describe('Upon clicking on editor close button', () => {
      it('hides the viewer pane', async () => {
        await page.goto(makeUrl('/new'));
        await page.waitForTimeout(100);
        await expect(page).toMatchElement('#editorarea', { visible: true });
        await expect(page).not.toMatchElement('#editor .viewerarea', {
          visible: false,
        });
        await page.click('#editorarea .close');
        await page.waitForTimeout(3000);
        await expect(page).toMatchElement('.viewerarea', { visible: true });
        await expect(page).not.toMatchElement('#editorarea');
      });

      it('keeps the editor hidden upon reloading the page', async () => {
        await page.reload();
        await expect(page).toMatchElement('.viewerarea', { visible: true });
        await expect(page).not.toMatchElement('#editorarea');
      });
    });

    describe('Upon clicking on viewer close button', () => {
      it('hides the viewer pane', async () => {
        await expect(page).toMatchElement('.viewerarea .close', {
          visible: true,
        });
        await page.click('.viewerarea .close');
        await page.waitForTimeout(3000);
        await expect(page).toMatchElement('#editorarea', { visible: true });
        await expect(page).not.toMatchElement('#editor .viewerarea', {
          visible: false,
        });
      });

      it('keeps the viewer hidden upon reloading the page', async () => {
        await page.reload();
        await expect(page).toMatchElement('#editorarea', { visible: true });
        await expect(page).not.toMatchElement('#editor .viewerarea', {
          visible: false,
        });
      });
    });
  });
});
