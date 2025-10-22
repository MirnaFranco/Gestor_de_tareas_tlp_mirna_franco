import { Router } from 'express';
import * as ctrl from '../controllers/tasksController.js';

const router = Router();

router.get('/', ctrl.getTasks);
router.get('/:id', ctrl.getTask);
router.post('/', ctrl.createTask);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

export default router;
