const jwt = require('jsonwebtoken');

const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key.trim()] = value;
      return acc;
    }, {});

    const authorizationToken = cookies['next-auth.session-token'];
    if (!authorizationToken) {
      return res.status(402).json('Not autorized to access this resource.');
    }

    jwt.verify(
      authorizationToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(402).json('Not autorized to access this resource.');

        req.user = decoded.user;
      }
    );
    next();
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({
      msg: 'Internal server error. JWT verification failed.',
      error: error,
    });
  }
};

module.exports = verifyTokenMiddleware;
