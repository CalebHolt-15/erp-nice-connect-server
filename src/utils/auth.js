import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../res/user/user.model';

//role also//crt newAccessToken based on userId&role
// console.log('newAccessToken.user:', user)
export const newAccessToken = (user) => {
  return (
    jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXP * 60 * 1000,
  }))
};

//verify (token=payload.signature) using (JWT_ACCESS_SECRET)// reject or resolve
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
  // console.log(req.body.email);
  // console.log(req.body.password);
  // console.log(req.body.phNo);
  // if (!req.body.email) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'need username and password' });
  }
  console.log('60.signin');

  const invalid = { message: 'Invalid username and passoword combination' };
  //if email&password exist then findthe user
  try {
    const user = await User.findOne({
      email: req.body.email,
      // email: req.body.email,
    })
      // .select('email')
      .select('email password username role ability')
      .exec();
    console.log('72.signin-user:', user);

    //if he's not a user (401)//is user checkpassword
    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    //if passwors match create newAccessToken using his id,role...
    const accessToken = newAccessToken(user);
    console.log('87.signin-accessToken:', accessToken);
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

// '/api'
//if payload&signature arethere,Verify
export const protect = async (req, res, next) => {
  console.log("protect//")
  console.log('111.req.cookies:', req.cookies)
  if (!req.cookies['payload'] || !req.cookies['signature']) {
    return res.status(401).end();
  }

  //if payload&signature are there in Cookies then[crt token=payload.signature]=>Verify
  const token = `${req.cookies['payload']}.${req.cookies['signature'][0]}`;
  console.log('protect-token:', token);

  let payload;
  //after token created, verify it
  try {
    payload = await verifyAccessToken(token); //token needed
  } catch (e) {
    return res.status(401).end();
  }

  console.log('protect.user:', user)
  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

//if not a user
  if (!user) {
    return res.status(401).end();
  }

//if user
  req.user = user;
  next();
};

//After protect
//create newAccessToken
//then response inthecookie with payload&signature => next()
export const reAuth = async (req, res, next) => {
  console.log('reAuth:');
  console.log('reAuth-req.user:', req.user);
  const accessToken = newAccessToken(req.user); //userID is needed

  //after accessToken created
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
