import express from 'express';
const router = express.Router();

router.get('/jobs', (req, res) => res.send('JOBS'));
// router.post('/jobs', jobController.postJob);
// router.post('/columns/add', columnContoller.postToColumn);
// router.get('/columns', columnContoller.getColumns);
// router.post('/columns', columnContoller.postColumn);
// router.put('/columns/update', columnContoller.updateOrder);

export default router;
