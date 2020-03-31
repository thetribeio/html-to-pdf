import express from 'express';

import createConverter from './converter.mjs';

(async () => {
    const converter = await createConverter();

    const app = express();

    app.post('/', async (req, res, next) => {
        try {
            res.end(await converter.htmToPdf(req))
        } catch (error) {
            next(error);
        }
    });

    app.listen(process.env.PORT || 3000);
})()
