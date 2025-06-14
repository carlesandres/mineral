import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { chromium } from 'playwright';
import { Readable } from 'stream';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

interface GeneratePdfRequest {
  text: string;
}

app.post('/generate-pdf', async (req: Request<{}, {}, GeneratePdfRequest>, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the page
    await page.goto('https://mnral.com/new');

    // Wait for the textarea to be available and paste the text
    await page.waitForSelector('textarea');
    await page.fill('textarea', text);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');

    // Create a readable stream from the buffer and pipe it to the response
    const stream = new Readable();
    stream.push(pdfBuffer);
    stream.push(null);
    stream.pipe(res);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.listen(port, () => {
  console.log(`PDF generation service listening at http://localhost:${port}`);
}); 