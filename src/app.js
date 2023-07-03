const express = require('express');
const cors = require('cors');

const app = express();

// ==> routes
const index = require('./routes/index');
const accountRoute = require('./routes/account.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', accountRoute);

module.exports = app;