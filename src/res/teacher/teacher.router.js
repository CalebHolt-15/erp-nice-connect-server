import { Router } from 'express';
import controllers from './teacher.controllers';
const router = Router();

router
  .route('/')
  .get(controllers.getPage)
  .post(controllers.createTeacher)
  .get(controllers.getAll);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

router.route('/phNo').get(controllers.getOne);
export default router;
