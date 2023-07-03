const router = require('express-promise-router')();
const accountController = require('../controllers/account.controller');

// (POST): localhost:3000/api/account
router.post('/account', accountController.createAccount);

module.exports = router;