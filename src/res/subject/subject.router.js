import { Router } from 'express';
import controllers from './subject.controllers';

const router = Router();

router.route('/').get(controllers.getPage).post(controllers.createOne);
router.route('/subjectdata').get(controllers.getAllSubjects);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
