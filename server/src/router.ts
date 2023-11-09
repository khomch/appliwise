import express from 'express';
import { prisma } from './models';
import jobController from './controllers/job.controller';
import columnController from './controllers/column.controller';
const router = express.Router();

router.get('/users', async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.send(allUsers);
});
router.get('/job', jobController.getAll);
router.post('/job', jobController.create);
router.put('/job', jobController.updateOrder);
router.post('/column', columnController.create);
router.get('/column', columnController.getColumns);
// router.get('/column/:id', columnController.getItemsInColumn);
router.post('/column/add', columnController.addToColumn);
// router.put('/columns/update', columnContoller.updateOrder);
router.put('/column/ids', columnController.updateIds);

export default router;
