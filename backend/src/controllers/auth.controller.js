const authService = require('../services/auth.service');
const userService = require('../services/user.service');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};


exports.getProfile = async (req, res) => {
  console.log("test")
  try {
    const user = await userService.findById(req.user.id);
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updated = await userService.updateProfile(req.user.id, { name, email, password });
    res.json({ message: 'Profile updated', user: updated });
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};
