import express = require('express');
import { logger } from './helpers/logger';
import { validateCustomToken } from './token-middleware';
import { bodyNextLink } from './endpoints/body-next-link';
import { helloWorld } from './endpoints/hello-world';
import { detailsPage } from './endpoints/details-page';

// Dotenv loads all env variables from .env, but you still need to provdie theese when deployed
require('dotenv').config({ path: `.env` });

/*
Authentication to bell-rock is dead simply. You provide a custom token like this: Authorization: Bearer <Custom_Token>
Because of this, you must provide bell-rock with a non-empty custom token through an env variable called: "CUSTOM_TOKEN"
*/
if (!process.env.CUSTOM_TOKEN) {
    logger.debug(
        `Bell-Rock refused to start. Requires an non-empty custom token with the name: "CUSTOM_TOKEN"`
    );
    process.exit();
}

const app = express();

const port = process.env.PORT || 1338;

logger.debug(`Bell Rock will now try to open up the connection on port ${port}`);

app.get('/helloWorld', validateCustomToken, helloWorld);
app.get('/bodyNextLink', validateCustomToken, bodyNextLink);
app.get('/detailsPage/:id', validateCustomToken, detailsPage);

app.listen(port, function() {
    logger.info(`🔥  Bell Rock is up and listening on port: ${port} - fire away 🏹`);
});
