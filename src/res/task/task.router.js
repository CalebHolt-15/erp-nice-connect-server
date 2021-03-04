import { Router } from 'express';
import controllers from './task.controller';

const router = Router();

router
  .route('/')
  .get(controllers.getAssignmentPage)
  .get(controllers.getTeacherAssignmentPage)
  .post(controllers.createOne)
  .get(controllers.getAssignmentData);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
