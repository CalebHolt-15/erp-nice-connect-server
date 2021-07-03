import { Router } from 'express';
import controllers from './school.controllers';
const router = Router();

router.route('/schooldata').get(controllers.getAll);

router
  .route('/')
  .get(controllers.getPage)
  .post(controllers.createSchool)
  .get(controllers.getAll);

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
