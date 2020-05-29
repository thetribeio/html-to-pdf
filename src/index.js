import express from 'express';

import convert from './convert.js';

const port = process.env.PORT || 3000;

const app = express();

app.post('/', async (req, res, next) => {
    try {
        res.set('content-type', 'application/pdf');
        res.end(await convert(req));
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.info(`Listening on port ${port}`);
});
