const entryService = require('../services/entry.service');

exports.createEntry = async (req, res, next) => {
  try {
    const data = await entryService.create(req.body, req.user.id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getEntries = async (req, res, next) => {
  try {
    const data = await entryService.getAll(req.query, req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateEntry = async (req, res, next) => {
  try {
     const { id, userId, createdAt, ...allowedFields } = req.body;

    const data = await entryService.update(req.params.id, allowedFields, req.user.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    await entryService.remove(req.params.id, req.user.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
