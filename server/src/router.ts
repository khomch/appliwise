import express from 'express';
import { prisma } from './models';
import jobController from './controllers/job.controller';
import columnController from './controllers/column.controller';
const router = express.Router();

router.get('/users', async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.send(allUsers);
});
router.get('/jobs', jobController.getAll);
router.post('/jobs', jobController.create);
router.post('/columns', columnController.create);
router.get('/columns', columnController.getColumns);
router.post('/columns/add', columnController.updateColumn);
// router.put('/columns/update', columnContoller.updateOrder);

export default router;
