import { fakeToken } from './fakeToken';

const fakeCredentials = [
  {
    name: 'Test',
    surname: 'User',
    authority: 'admin',
    email: 'test@obp.com',
    id: 'acct:test@obp.com',
    token: fakeToken()
  }
];

const fakeAuth = (req, res) => {
  const { password, email } = req.body;
  if (password === 'secretPassword1' && email === 'test@obp.com') {
    res.json({
      status: 'ok',
      code: 200,
      count: 1,
      data: fakeCredentials
    });
    return;
  }
  res.json({
    status: 'error',
    count: 0,
    code: 401,
    description: '',
    message: 'Wrong credentials provided.',
    data: []
  });
};

const fakeCheck = (req, res) => {
  const { token } = req.query;
  if (token === fakeToken()) {
    res.json({
      status: 'ok',
      code: 200,
      count: 1,
      data: fakeCredentials
    });
    return;
  }
  res.json({
    status: 'error',
    count: 0,
    code: 403,
    description: '',
    message: 'You do not have permissions to access this resource.',
    data: []
  });
};

export default {
  'POST /tokens': fakeAuth,
  'GET /tokens': fakeCheck
};
