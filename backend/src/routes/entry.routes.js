const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entry.controller');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');
const entrySchema = require('../validations/entry.validation');

// All routes require authentication
router.use(authMiddleware);

router.post('/', validate(entrySchema.create), entryController.createEntry);
router.get('/', entryController.getEntries);
router.put('/:id', validate(entrySchema.update), entryController.updateEntry);
router.delete('/:id', entryController.deleteEntry);

module.exports = router;
