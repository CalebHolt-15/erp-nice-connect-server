import { Router } from 'express';
import controllers from './employee.controllers';
const router = Router();

console.log('emp.rtr');
router.route('/empData').get(controllers.getAll);
router
  .route('/')
  .get(controllers.getOneStudent)
  .get(controllers.getPage)
  .post(controllers.createEmployee);

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
