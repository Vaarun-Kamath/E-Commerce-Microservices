const jwt = require('jsonwebtoken');

const verifyTokenMiddleware = async (req, res, next) => {
  console.log("REQUEST", req, "ENDING\n\n\n\n\n\n");
  try {
    // const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
    //   const [key, value] = cookie.split('=');
    //   acc[key.trim()] = value;
    //   return acc;
    // }, {});

    const authorizationToken = req.query['cookie'];
    console.log("cat");

    // const authorizationToken = cookies['next-auth.session-token'];
    // if (!authorizationToken) {
    //   return res.status(402).json('Not autorized to access this resource.');
    // }

    jwt.verify(
      authorizationToken,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(402).json('Not autorized to access this resource.');

        req.user = decoded.user;
      }
    );
    // req.user = {
    //   user_id: '660927aa2a095a0885ad20e7',
    //   name: 'Varun Kamath',
    //   username: 'varunk',
    //   email: 'varunkamath05@gmail.com'
    // }
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
