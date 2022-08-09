const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
};

/* Restuarant Registration */
exports.restaurantRegister = CatchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  //   find if restaurant_owner name exist in db
  await db
    .execute("SELECT * FROM restaurant_owner WHERE username=?", [username])
    .then(([results, fields]) => {
      // if no results
      if (results && results.length == 0) {
        //   see if email exists
        return db.execute("SELECT * FROM restaurant_owner WHERE email=?", [
          email,
        ]);
      } else {
        return next(
          new AppError(
            `${username} is associated with an existing account. Please login.`,
            401
          )
        );
      }
    })
    .then(([results, fields]) => {
      //   If name/email dne, then we hash password and store it in db
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      } else {
        res.status(200).json({
          status: "fail",
          error: `${email} already exist. Please login.`,
        });
      }
    })
    .then((hashedPassword) => {
      let baseSQL =
        "INSERT INTO restaurant_owner (username,email,password) VALUES (?,?,?)";
      return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        res.status(200).json({
          status: "success",
          message: `${email} has successfully signed up!`,
        });
      } else {
        return next(
          new AppError(
            "Server error, restaurant owner user could not be created",
            500
          )
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Deliverer Registration */
exports.delivererRegister = CatchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  await db
    .execute("SELECT * FROM deliverers WHERE username=?", [username])
    .then(() => {
      return db.execute("SELECT * FROM deliverers WHERE email=?", [email]);
    })
    .then(([results, fields]) => {
      //   If email dne, then we hash password and store it in db
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      } else {
        return next(new AppError(`${email} already exist. Please login.`, 500));
      }
    })
    .then((hashedPassword) => {
      let baseSQL =
        "INSERT INTO deliverers (username,email,password) VALUES (?,?,?)";
      return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        res.status(200).json({
          status: "success",
          message: `${email} has successfully signed up!`,
        });
      } else {
        return next(
          new AppError(
            "Server error, restaurant owner user could not be created",
            500
          )
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Normal user Registration  for staffs/students*/
exports.approvedUserRegister = CatchAsync(async (req, res, next) => {
  const { username, email, password, address, phone_number } = req.body;

  await db
    .execute("SELECT * FROM approved_users WHERE username=?", [username])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute("SELECT * FROM approved_users WHERE email=?", [
          email,
        ]);
      } else {
        return next(
          new AppError(
            `${username} is associated with an existing account. Please login.`,
            401
          )
        );
      }
    })
    .then(([results, fields]) => {
      //   If username/email dne, then we hash password and store it in db
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      } else {
        res.status(200).json({
          status: "fail",
          error: `${email} already exist. Please login.`,
        });
      }
    })
    .then((hashedPassword) => {
      let baseSQL =
        "INSERT INTO approved_users (username,email,password, address,phone_number) VALUES (?,?,?,?,?)";
      return db.execute(baseSQL, [
        username,
        email,
        hashedPassword,
        address,
        phone_number,
      ]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        res.status(200).json({
          status: "success",
          message: `${email} has successfully signed up!`,
        });
      } else {
        return next(
          new AppError("Server error, user could not be created", 500)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Restuarant Sign in */
exports.restaurantLogin = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  let baseSQL =
    "SELECT id, email, password, fk_restaurant_id FROM restaurant_owner WHERE email=?;";
  // userID: to set up and link the  foreign key using sessions table in db
  let userID;
  let restaurantID;

  let account_type = "restaurant";
  await db
    .execute(baseSQL, [email])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userID = results[0].id;
        restaurantID = results[0].fk_restaurant_id

        return bcrypt.compare(password, hashedPassword);
      } else {
        return next(
          new AppError(
            "email or password is incorrect. Please try again. ",
            401
          )
        );
      }
    })
    .then((passwordMatch) => {
      if (passwordMatch) {
        // GENERATE JWT TOKEN
        let token = jwt.sign({ userID }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("logged", token, cookieOptions);
        req.session.email = email;
        // using sessions table we can now link our foregin key to this restaurant_owner user
        req.session.userID = userID;
        res.locals.logged = true;
        res.status(200).json({
          status: "success",
          message: `Welcome back owner, ${email}`,
          token,
          email,
          userID,
          account_type,
          restaurantID
        });
      } else {
        return next(
          new AppError("Invalid email or password. Please try again. ", 401)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Deliverer Sign in */
exports.delivererLogin = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  let baseSQL = "SELECT id, email, password FROM deliverers WHERE email=?;";
  let userID;
  let account_type = "deliverer";
  await db
    .execute(baseSQL, [email])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userID = results[0].id;
        return bcrypt.compare(password, hashedPassword);
      } else {
        return next(
          new AppError(
            "email or password is incorrect. Please try again. ",
            401
          )
        );
      }
    })
    .then((passwordMatch) => {
      if (passwordMatch) {
        let token = jwt.sign({ userID }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("loggedDeliverer", token, cookieOptions);
        req.session.email = email;
        // using sessions table we can now link our foregin key to  deliverer
        req.session.userID = userID;
        res.locals.logged = true;
        res.status(200).json({
          status: "success",
          message: `Welcome back owner, ${email}`,
          token,
          email,
          userID,
          account_type,
        });
      } else {
        return next(
          new AppError("Invalid email or password. Please try again. ", 401)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Normal user login  for staffs/students*/
exports.approvedUserLogin = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  let baseSQL = "SELECT id, email, password FROM approved_users WHERE email=?;";
  // userID: to set up and link the  foreign key using sessions table in db
  let userID;
  let account_type = "user";
  await db
    .execute(baseSQL, [email])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userID = results[0].id;
        return bcrypt.compare(password, hashedPassword);
      } else {
        return next(
          new AppError(
            "email or password is incorrect. Please try again. ",
            401
          )
        );
      }
    })
    .then((passwordMatch) => {
      if (passwordMatch) {
        let token = jwt.sign({ userID }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("loggedUser", token, cookieOptions);
        req.session.email = email;
        // using sessions table we can now link our foregin key to  approved_user
        req.session.userID = userID;
        res.locals.logged = true;
        res.status(200).json({
          status: "success",
          message: `Welcome back owner, ${email}`,
          token,
          email,
          userID,
          account_type,
        });
      } else {
        return next(
          new AppError("Invalid email or password. Please try again. ", 401)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

exports.restrictTo = (...account_type) => {
  return (req, res, next) => {
    if (!account_type) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
