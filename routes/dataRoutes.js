const express = require('express');
const { getOwnData, getPublicData, saveData, decryptData } = require('../controllers/dataController');

const router = express.Router();

router.post('/me', getOwnData);
router.post('/public', getPublicData);
router.post('/save', saveData);
router.post('/decrypt', decryptData);

module.exports = router;
