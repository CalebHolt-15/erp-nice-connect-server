import { Router } from 'express';
import controllers from './submission.controller';

const router = Router();

router
  .route('/')
  .get(controllers.getMySubmissions)
  .post(controllers.createOne)
  .get(controllers.getStudentSubmissions);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
