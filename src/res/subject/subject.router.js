import { Router } from 'express';
import controllers from './subject.controllers';
import { Course } from './../course/course.model';
import { Subject } from './../subject/subject.model';

const router = Router();

router.route('/').get(controllers.getPage).post(controllers.createOne);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
