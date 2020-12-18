import { Router } from 'express';
import controllers from './course.controllers';
import { Course } from './course.model';
import { School} from './../school/school.model';

const router = Router();

const createCourse = (model) => async (req, res) => {
    const createdBy = req.user._id;
  
    try {
      const doc = await model.create({ ...req.body, createdBy });
      console.log(doc._id);
      console.log(doc.school);
      res.status(201).json(doc);
      insertCourseId(School,doc)
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
};

 const insertCourseId = (model,doc) => {
  try {
    const updatedDoc =  model
    .findOneAndUpdate({_id: doc.school},{$push:{courses: doc._id}})
      .lean()
      .exec(); 
      if (!updatedDoc) {
        return res.status(400).end();
      }
  
      res.status(200).json(updatedDoc);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  

router.route('/').get(controllers.getPage).post(createCourse(Course));

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
