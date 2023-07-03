const express = require('express');
const cors = require('cors');

const app = express();

// ==> routes
const index = require('./routes/index');
const apiRoute = require('./routes/api.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', apiRoute);

module.exports = app;