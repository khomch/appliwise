import express from 'express';
import { prisma } from './models';
import jobController from './controllers/job.controller';
import columnController from './controllers/column.controller';
import entryController from './controllers/entry.controller';
const router = express.Router();

router.get('/users', async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.send(allUsers);
});
router.get('/job', jobController.getAll);
router.get('/job/:id', jobController.getOneJob);
router.delete('/job', jobController.delete);
router.post('/job', jobController.create);
router.put('/job/fav', jobController.handleFavs);
router.post('/column', columnController.create);
router.get('/column', columnController.getColumns);
router.post('/column/add', columnController.addToColumn);
router.put('/column/ids', columnController.updateIds);
router.post('/entry', entryController.create);
router.get('/entry/:id', entryController.getEntries);
router.delete('/entry', entryController.delete);
router.put('/entry', entryController.update);

export default router;
