import { Router } from 'express';
import controllers from './course.controllers';
const router = Router();

router.route('/coursedata').get(controllers.getAll);

export default router;
