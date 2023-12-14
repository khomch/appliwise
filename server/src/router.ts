import express from 'express';
import columnController from './controllers/column.controller';
import entryController from './controllers/entry.controller';
import jobController from './controllers/job.controller';
import userController from './controllers/user.controller';
import { auth } from './middlewares/auth';
import boardController from './controllers/board.controller';
const router = express.Router();

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/profile', auth, userController.profile);

router.get('/column', auth, columnController.getColumns);
router.post('/column', auth, columnController.create);
router.post('/column/add', auth, columnController.addToColumn);
router.put('/column/one', auth, columnController.updateOneColumn);
router.put('/column/two', auth, columnController.updateTwoColumns);

router.get('/board', auth, boardController.getBoards);

router.get('/job', auth, jobController.getAll);
router.get('/job/:id', auth, jobController.getOneJob);
router.post('/job', auth, jobController.create);
router.post('/job/parse', auth, jobController.parse);
router.put('/job', auth, jobController.update);
router.put('/job/fav', auth, jobController.handleFavs);
router.delete('/job', auth, jobController.delete);

router.get('/entry/:id', auth, entryController.getEntries);
router.post('/entry', auth, entryController.create);
router.put('/entry', auth, entryController.update);
router.delete('/entry', auth, entryController.delete);

export default router;
