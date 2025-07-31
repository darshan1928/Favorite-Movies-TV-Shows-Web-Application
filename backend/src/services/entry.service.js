const prisma = require('../config/db');

exports.create = async (data, userId) => {
  return await prisma.entry.create({
    data: { ...data, userId }
  });
};

exports.getAll = async (query, userId) => {
  const { page = 1, limit = 10, search = '', type } = query;
  const skip = (page - 1) * limit;

  const filter = {
    userId,
    OR: [
     { title: { contains: search } },
  { director: { contains: search } }
    ]
  };

  if (type) filter.type = type;

  const [entries, total] = await Promise.all([
    prisma.entry.findMany({
      where: filter,
      skip: Number(skip),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    }),
    prisma.entry.count({ where: filter })
  ]);

  return { entries, total, page: Number(page), limit: Number(limit) };
};

exports.update = async (id, data, userId) => {
  const entry = await prisma.entry.findUnique({ where: { id: Number(id) } });
  if (!entry || entry.userId !== userId) throw new Error('Not authorized');

  return await prisma.entry.update({
    where: { id: Number(id) },
    data
  });
};

exports.remove = async (id, userId) => {
  const entry = await prisma.entry.findUnique({ where: { id: Number(id) } });
  if (!entry || entry.userId !== userId) throw new Error('Not authorized');

  return await prisma.entry.delete({ where: { id: Number(id) } });
};
