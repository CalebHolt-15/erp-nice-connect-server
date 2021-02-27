import { Router } from 'express';
import controllers from './student.controllers';
const router = Router();

router
  .route('/')
  .get(controllers.getPage)
  .post(controllers.createStudent)
  .get(controllers.getOneStudent);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
