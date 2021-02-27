import { User } from './../../src/res/user/user.model';
const admin = {
  phNo: '',
  password: '',
  role: 'admin',
};
const student = {
  phNo: '',
  password: '',
  role: 'student',
};

const teacher = {
  name: '',
  phNo: '',
  password: '',
  role: 'teacher',
};

export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOne({ _id: req.params.id }).lean().exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getAll = (model) => async (req, res) => {
  try {
    const docs = await model.find().lean().exec();

    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getPagination = (page, size) => {
  const limit = size ? +size : 4;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export const getPage = (model) => async (req, res, next) => {
  const { page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);

  if (req.query.phNo) {
    next();
  } else {
    try {
      const docs = await model.paginate({}, { offset, limit });

      res.status(200).json(docs);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
};

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id;

  try {
    const doc = await model.create({ ...req.body, createdBy });
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json(removed);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
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

export const createSchool = (model) => async (req, res) => {
  const createdBy = req.user._id;

  try {
    const doc = await model.create({ ...req.body, createdBy });
    (admin.phNo = doc.phNo),
      (admin.password = doc.password),
      res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
  try {
    const user = await User.create(admin);
    const accessToken = newAccessToken(user);
    res.cookie('payload', accessToken.split('.').splice(0, 2).join('.'), {
      maxAge: process.env.PERMANENT_COOKIE_EXP * 60 * 1000,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('signature', accessToken.split('.').splice(2, 1), {
      maxAge: process.env.SESSION_COOKIE_EXP * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const createTeacher = (model) => async (req, res) => {
  const createdBy = req.user._id;

  try {
    const doc = await model.create({ ...req.body, createdBy });
    (teacher.name = doc.name),
      (teacher.phNo = doc.phNo),
      (teacher.password = doc.password),
      res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }

  try {
    const user = await User.create(teacher);
    const accessToken = newAccessToken(user);
    res.cookie('payload', accessToken.split('.').splice(0, 2).join('.'), {
      maxAge: process.env.PERMANENT_COOKIE_EXP * 60 * 1000,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('signature', accessToken.split('.').splice(2, 1), {
      maxAge: process.env.SESSION_COOKIE_EXP * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const createStudent = (model) => async (req, res) => {
  const createdBy = req.user._id;

  try {
    const doc = await model.create({ ...req.body, createdBy });
    (student.phNo = doc.phNo),
      (student.password = doc.password),
      res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
  try {
    const user = await User.create(student);
    const accessToken = newAccessToken(user);
    res.cookie('payload', accessToken.split('.').splice(0, 2).join('.'), {
      maxAge: process.env.PERMANENT_COOKIE_EXP * 60 * 1000,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('signature', accessToken.split('.').splice(2, 1), {
      maxAge: process.env.SESSION_COOKIE_EXP * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const getOneStudent = (model) => async (req, res) => {
  try {
    const doc = await model.findOne({ phNo: req.query.phNo }).lean().exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getOneTeacher = (model) => async (req, res) => {
  console.log('this is req: ', req.query.phNo);
  try {
    const doc = await model.findOne({ phNo: req.query.phNo }).lean().exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getAssignmentPage = (model) => async (req, res, next) => {
  const { page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  if (req.query.createdBy) {
    next();
  } else {
    try {
      const docs = await model.paginate(
        { course: req.query.course, schoolId: req.query.schoolId },
        { offset, limit }
      );

      res.status(200).json(docs);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
};

export const getTeacherAssignmentPage = (model) => async (req, res) => {
  const { page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  console.log('TeacherId is : ', req.query.createdBy);
  try {
    const docs = await model.paginate(
      { createdBy: req.query.createdBy },
      { offset, limit }
    );

    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  getAll: getAll(model),
  getOne: getOne(model),
  getPage: getPage(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  createSchool: createSchool(model),
  createTeacher: createTeacher(model),
  createStudent: createStudent(model),
  getOneStudent: getOneStudent(model),
  getOneTeacher: getOneTeacher(model),
  getAssignmentPage: getAssignmentPage(model),
  getTeacherAssignmentPage: getTeacherAssignmentPage(model),
});
