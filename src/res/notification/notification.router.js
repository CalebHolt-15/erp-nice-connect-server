import { Router } from 'express';
import controllers from './notification.controllers';

const router = Router();

router.route('/').get(controllers.getPage).post(controllers.createOne);

router;
router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
