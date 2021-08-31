import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../res/user/user.model';

export const newAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXP * 60 * 1000,
    }
  );
};

export const verifyAccessToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  console.log('signup');
  console.log('req.body:', req.body);
  console.log('req.body.ability:', req.body.ability);

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'need phone-number and password' });
  }

  try {
    const user = await User.create(req.body);
    console.log('user signup:', user);
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

export const signin = async (req, res) => {
  console.log('req.body:', req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  // console.log(req.body.phNo);

  // if (!req.body.email) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'need username and password' });
  }
  console.log('signin');

  const invalid = { message: 'Invalid username and passoword combination' };
  try {
    const user = await User.findOne({
      email: req.body.email,
      // email: req.body.email,
    })
      // .select('email')
      .select('email password username role ability')
      .exec();
    console.log('user signin:', user);

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    const accessToken = newAccessToken(user);
    console.log('accessToken:', accessToken);
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
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  if (!req.cookies['payload'] || !req.cookies['signature']) {
    return res.status(401).end();
  }

  const token = `${req.cookies['payload']}.${req.cookies['signature'][0]}`;
  console.log('protect > token:', token);

  let payload;
  try {
    payload = await verifyAccessToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

export const reAuth = async (req, res, next) => {
  const accessToken = newAccessToken(req.user);

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
  next();
};

//
//   try {
//     const user = await User.create(req.body);
//     console.log('user signup:', user);
//     const accessToken = newAccessToken(user);
//     res.cookie('payload', accessToken.split('.').splice(0, 2).join('.'), {
//       maxAge: process.env.PERMANENT_COOKIE_EXP * 60 * 1000,
//       secure: true,
//       sameSite: 'strict',
//     });
//     res.cookie('signature', accessToken.split('.').splice(2, 1), {
//       maxAge: process.env.SESSION_COOKIE_EXP * 60 * 1000,
//       httpOnly: true,
//       secure: true,
//       sameSite: 'strict',
//     });
//     res.status(200).end();
//   } catch (e) {
//     console.error(e);
//     return res.status(400).end();
//   }
// };

// //
// export const createEmployee = async (req, res) => {
//   console.log('createEmployee');
//   console.log('req.body.name:', req.body.name);

//   if (!req.body.name || !req.body.email) {
//     return res.status(400).json({ message: 'need phone-number and password' });
//   }
