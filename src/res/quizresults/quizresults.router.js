import { Router } from 'express';
import controllers from './quizresults.controllers';
const router = Router();

router
  .route('/')
  // .get(controllers.getPage)
  .get(controllers.getQuizTeacherSide)
  .post(controllers.createQuizSumbission)
  .get(controllers.getAll);

router.route('/quizresults').get(controllers.getQuizTeacherSide);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
