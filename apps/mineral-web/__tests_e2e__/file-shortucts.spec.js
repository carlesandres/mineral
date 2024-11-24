import 'expect-puppeteer';
import { cleanList, makeUrl } from './utils';

describe('Shortcuts in the file page can', () => {
  beforeAll(async () => {
    await page.goto(makeUrl('/'));
    await cleanList(page);
  });

  it('shows and hides help modal with keys', async () => {
    await page.goto(makeUrl('/file?id=tx_113'));
    await expect(page).toMatchElement('#editorarea textarea', {
      visible: true,
    });
    await page.click('#editorarea textarea');
    await page.keyboard.down('ControlRight');
    await page.keyboard.press('k');
    await page.keyboard.up('ControlRight');
    await expect(page).toMatchElement('.kbshortcuts', { visible: true });
    await page.keyboard.press('Escape', { delay: 100 });
    await expect(page).toMatchElement('.kbshortcuts', { visible: false });
  });

  it('create a new file', async () => {
    const title = 'file created from keyboard shortcut';
    await page.goto(makeUrl('/new'));
    await expect(page).toMatchElement('#editorarea textarea', {
      visible: true,
    });
    await expect(page).toFill('.title', title);
    await page.waitForTimeout(1000);
    const actualTitle = await page.title();
    expect(actualTitle).toBe(title);
    await page.keyboard.down('ControlRight');
    await page.keyboard.press('k');
    await page.keyboard.up('ControlRight');
    await page.keyboard.press('n', { delay: 100 });
    await expect(page.url()).toMatch('/file');
    const titleEl = await expect(page).toMatchElement('.title');
    await expect(titleEl).not.toMatch(title);
  });

  it('delete current file', async () => {
    const title = 'file to delete from keyboard shortcut';
    await page.goto(makeUrl('/file?id=tx_113'));
    await expect(page).toMatchElement('#editorarea textarea', {
      visible: true,
    });
    await page.keyboard.down('ControlRight');
    await page.keyboard.press('k');
    await page.waitForTimeout(3000);
    await page.keyboard.up('ControlRight');
    await page.keyboard.press('d', { delay: 100 });
    await page.waitForTimeout(1000);
    const modal = await expect(page).toMatchElement('.modal-dialog', {
      visible: true,
    });
    await expect(modal).toMatch(
      'Are you sure you want to delete the current file?'
    );
    await page.click('.modal-dialog .btn-success');
    // TO-DO: The fact that a large delay is needed here is flagging a huge problem
    await page.waitForTimeout(1000);
    await expect(page.url()).not.toMatch('/file');
    await expect(page.url()).toMatch('/notes');
    const list = await expect(page).toMatchElement('.list-group', {
      visible: true,
    });
    // TO-DO: Useless check
    await expect(list).not.toMatch(title);
  });

  it('can jump to slides view', async () => {
    await page.goto(makeUrl('/file?id=tx_112'));
    // TO-DO: This next line is needed because the file is now not loaded on
    // componentDidMount (we might want to change this later)
    await expect(page).toMatchElement('#editorarea textarea', {
      visible: true,
    });
    await page.keyboard.down('ControlRight');
    await page.keyboard.press('k');
    await page.keyboard.up('ControlRight');
    await page.keyboard.press('s', { delay: 100 });
    await page.waitForTimeout(1000);
    await expect(page.url()).toMatch('/slides?id=tx_112');
    const slideV = await expect(page).toMatchElement('.slide-viewer', {
      visible: true,
    });
    await expect(slideV).toMatch('bbbbb');
    await expect(slideV).not.toMatch('bbbbbk');
    await expect(slideV).not.toMatch('undefined');
    await expect(slideV).not.toMatch('bbbbbs');
  });

  // TO-DO: Use 'keydown' instead of type for more robustness
  it.skip('can hide and show the viewer', async () => {
    // cy.visit('/file?id=tx_112');
    // cy.get('#editorarea');
    // cy.get('#editorarea textarea').type('{ctrl}kv');
    // cy.get('.kbshortcuts').should('not.be.visible');
    // cy.get('.viewerarea').should('not.be.visible');
    // cy.get('#editorarea textarea').type('{ctrl}kv');
    // cy.get('.kbshortcuts').should('not.be.visible');
    // cy.get('.viewerarea').should('be.visible');
  });

  it.skip('can hide and show the editor', async () => {
    //   cy.visit('/file?id=tx_112&panels=edit_read');
    //   cy.get('#editorarea');
    //   cy.get('#editorarea textarea').type('{ctrl}ke');
    //   cy.get('.kbshortcuts').should('not.be.visible');
    //   cy.get('#editorarea').should('not.be.visible');
    //   cy.sendESC();
    //   cy.activateShortcuts();
    //   cy.sendKey(69);
    //   cy.get('.kbshortcuts').should('not.be.visible');
    //   cy.get('#editorarea').should('be.visible');
  });
});
