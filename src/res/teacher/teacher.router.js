import { Router } from 'express';
import controllers from './teacher.controllers';
const router = Router();

router
  .route('/')
  .get(controllers.getPage)
  .post(controllers.createTeacher)
  .get(controllers.getOneTeacher);

router.route('/teachersofoneschool').get(controllers.getTeachers);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
