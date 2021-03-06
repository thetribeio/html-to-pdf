import fs from 'fs';

import puppeteer from 'puppeteer';
import uuid from 'uuid';

const pipe = (source, destination) => new Promise((resolve, reject) => {
    source.pipe(destination);

    source.on('end', resolve);
    source.on('error', reject);
});

const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
});

const convert = async (stream) => {
    const id = uuid.v4();
    const path = `/tmp/${id}.html`;

    await pipe(stream, fs.createWriteStream(path));

    const page = await browser.newPage();

    await page.goto(`file://${path}`);

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await page.close();

    await fs.promises.unlink(path);

    return pdf;
};

export default convert;
