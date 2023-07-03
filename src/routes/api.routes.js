const router = require('express-promise-router')();
const accountController = require('../controllers/account.controller');
const offerController = require('../controllers/offer.controller');

// account rest api
router.post('/account', accountController.createAccount);
router.get('/account', accountController.getAccount);
// offer rest api
router.post('/offer', offerController.createOffer);
router.get('/offer', offerController.getOffer);
router.put('/offer', offerController.updateOffer);

module.exports = router;