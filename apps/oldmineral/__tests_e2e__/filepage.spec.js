import 'expect-puppeteer';
import { cleanList, makeUrl } from './utils';

describe('File page', () => {
  describe('Upon visiting /new page', () => {
    beforeAll(async () => {
      await page.goto(makeUrl('/new'));
      // TO-DO: It takes too long
      await page.waitForTimeout(400);
    });

    beforeEach(async () => {
      await cleanList(page);
    });

    it('redirects to the /file page', async () => {
      await expect(page.url()).toMatch('/file');
    });

    it('defaults to editor-only mode', async () => {
      await expect(page).toMatchElement('#editorarea', { visible: true });
      await expect(page).not.toMatchElement('.viewerarea');

      await page.click('.actions .dropdown-btn');
      await expect(page).toMatchElement('.dropdown');

      await page.click('.editor-toolbar .two-panes');
      await expect(page).toMatchElement('#editorarea', { visible: true });
      await expect(page).toMatchElement('.viewerarea', { visible: true });
    });

    describe('Upon editing a new file', () => {
      const title = 'aaaa';
      const textToType = `# ${title} \n bbbb`;

      it('accepts edits to text and renders markdown', async () => {
        await expect(page).toFill('#editorarea textarea', textToType);
        const titleEl = await expect(page).toMatchElement(
          '#editorarea textarea'
        );
        await expect(titleEl).toMatch(title);
        await expect(page).toFill('#editorarea', title);
        const viewerHeader = await expect(page).toMatchElement(
          '.viewerarea h1'
        );
        await expect(viewerHeader).toMatch(title);
        // TO-DO: Make sure there is only one h1
        //     cy.get('.viewerarea h1').should('have.length', 1).contains(title);
      });

      it('keeps the recently edited title and text', async () => {
        // TO-DO: This takes too long
        // To-DO: We need to check title too
        await page.waitForTimeout(3000);
        await page.reload();
        const textArea = await expect(page).toMatchElement(
          '#editorarea textarea'
        );
        await expect(textArea).toMatch('# aaaa');
        const viewerHeader = await expect(page).toMatchElement(
          '.viewerarea h1'
        );
        await expect(viewerHeader).toMatch(title);
      });
    });

    it.skip('Accepts editing the title', async () => {
      const title = 'file title';
      await expect(page).toFill('.title', title);
      await page.waitForTimeout(500);
      // await jestPuppeteer.debug();
      const fileTitle = await expect(page).toMatchElement('.title');
      await expect(fileTitle).toMatch(title);
    });

    it.skip('Accepts editing the color label', async () => {
      await page.click('.title-area .colorball');
      //   cy.get('.title-area .colorball').click();
      //   cy.contains('Choose a new label color');
      //   cy.get('.modal-body .color-428bca').click();
      //   cy.should('not.contain', 'Choose a new label color');
      //   cy.get('.title-area .colorball')
      //     .should('have.css', 'background')
      //     .and('match', /rgb\(66, 139, 202\)/);
      //   cy.get('.title-area .colorball').click();
      //   cy.contains('Choose a new label color');
      //   cy.get('.modal-body .color-d87ea6').click();
      //   cy.should('not.contain', 'Choose a new label color');
      //   cy.get('.title-area .colorball')
      //     .should('have.css', 'background')
      //     .and('match', /rgb\(216, 126, 166\)/);
      //   cy.wait(500);
    });

    // cy.fixture('data-url-icons').
    //   then((dataUrlIcons) => {
    //     const pink = decodeURIComponent(dataUrlIcons.pink);
    //     cy.get('head #dynamic-favicon')
    //       .should('have.attr', 'href', pink);
    //   });
    // });
  });

  // it('allows to create a new file from navbar', () => {
  //   const title = 'file title';
  //   cy.visit('/new');
  //   cy.get('.title')
  //     .type(title)
  //     .should('have.value', title);
  //   // TO-DO: Shitty selector
  //   // TO-DO: This test needs to prove the actual 'new'
  //   // functionality
  //   cy.get('a.new').click();
  //   cy.url().should('include', '/file');
  //   cy.get('.title');
  //   cy.get('.title')
  //     .should('not.have.value', title);
  // });
  //
  // describe.only('Upon visiting /new?title=aaa', () => {
  //   before( () => {
  //     cy.visit('/new?title=aaa');
  //   });
  //
  //   it('redirects to the /file page', () => {
  //     cy.url().should('include', '/file');
  //   });
  //
  //   it('defaults to two-panels mode', () => {
  //     cy.get('.title')
  //       .should('have.value', 'aaa');
  //   });
  // });
});
