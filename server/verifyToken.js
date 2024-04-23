const jwt = require('jsonwebtoken');

const verifyTokenMiddleware = async (req, res, next) => {
  try {
    // const authorizationToken = req.query['cookie'];
    // console.log("cat");

    // if (!authorizationToken) {
    //   return res.status(402).json('Not autorized to access this resource.');
    // }

    // jwt.verify(
    //   authorizationToken,
    //   process.env.JWT_SECRET,
    //   async (err, decoded) => {
    //     if (err)
    //       return res.status(402).json('Not autorized to access this resource.');

    //     req.user = decoded.user;
    //   }
    // );
    req.user = {
        user_id: '660927aa2a095a0885ad20e7',
        name: 'Varun Kamath',
        username: 'varunk',
        email: 'varunkamath05@gmail.com'
      }
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
