import { Router } from 'express';
import controllers from './quiz.controllers';
const router = Router();

router
  .route('/')
  .get(controllers.getPage)
  .post(controllers.createQuiz)
  .get(controllers.getAll);

router.route('/quizteacherside').get(controllers.getQuizTeacherSide);

router.route('/quizstudentside').get(controllers.getQuizStudentSide);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
