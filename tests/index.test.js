const fetch = require('node-fetch');
const pdf = require('pdfjs-dist/legacy/build/pdf.js');

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

test('It generates a PDF', async () => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: `
            <html>
                <head>
                </head>
                <body>
                    Hello world
                </body>
            </html>
        `,
    });

    expect(response.ok).toBe(true);
    expect(response.headers.get('content-type')).toBe('application/pdf');

    const body = await response.buffer();

    const document = await pdf.getDocument(body).promise;

    const page = await document.getPage(1);

    const content = await page.getTextContent();

    const string = content.items.map((item) => item.str).join('');

    expect(string).toBe('Hello world');
});
