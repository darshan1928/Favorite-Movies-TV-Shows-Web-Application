
const bcrypt = require('bcrypt');
const prisma = require('../config/db');

exports.findById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

exports.updateProfile = async (id, data) => {
  const updateData = { name: data.name, email: data.email };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true },
  });
};
