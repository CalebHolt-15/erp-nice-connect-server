import { Router } from 'express';
import controllers from './subject.controllers';
import {Course} from './../course/course.model'
import {Subject} from './../subject/subject.model'

const router = Router();

const createSubject = (model) => async (req, res) => {
  const createdBy = req.user._id;

  try {
    const doc = await model.create({ ...req.body, createdBy });
    console.log(doc._id);
    console.log(doc.course);
    res.status(201).json(doc);
    insertSubjectId(Course,doc)
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const insertSubjectId = (model,doc) => {
try {
  const updatedDoc =  model
  .findOneAndUpdate({_id: doc.course},{$push:{subjects: doc._id}})
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


router.route('/').get(controllers.getPage).post(createSubject(Subject));

router
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne);

export default router;
