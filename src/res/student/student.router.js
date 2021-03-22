import { Router } from 'express';
import controllers from './student.controllers';
const router = Router();

router
  .route('/')
  .get(controllers.getOneStudent)
  .get(controllers.getPage)
  .post(controllers.createStudent);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
