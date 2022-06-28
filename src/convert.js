import { randomUUID } from 'crypto';
import fs from 'fs';
import puppeteer from 'puppeteer';

const pipe = (source, destination) => new Promise((resolve, reject) => {
    source.pipe(destination);

    source.on('end', resolve);
    source.on('error', reject);
});

const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
});

const convert = async (stream) => {
    const id = randomUUID();
    const path = `/tmp/${id}.html`;

    await pipe(stream, fs.createWriteStream(path));

    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(`file://${path}`);

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await page.close();
    await context.close();

    await fs.promises.unlink(path);

    return pdf;
};

export default convert;
