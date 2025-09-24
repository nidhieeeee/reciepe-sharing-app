const express = require('express');
const router = express.Router();
const aiModelController = require('../controllers/aiModelControllers');

router.post('/generate', aiModelController.generateRecipe); 

module.exports = router;