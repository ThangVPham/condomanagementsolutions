const User = require("../Models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Announcement = require("../Models/announcement");
const Booking = require("../Models/amenityBooking");

//Display login page when user is not authenticated
const displayLoginPage = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  res.render("login", { title: "Login", page: "login", message: "" });
};

//Validate user login information
const processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.render("login", {
        title: "Login",
        page: "login",
        message: "Email/password invalid. Please try again.",
      });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        Announcement.find()
          .sort({ date: -1 })
          .then((announcement) => {
            Booking.find()
              .sort({ _id: -1 })
              .then((booking) => {
                res.redirect("/");
              });
          })
          .catch((err) => {
            console.log(err.msg);
          });
      });
    }
  })(req, res, next);
};

//Display registration form
const displayRegisterPage = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  res.render("register", { title: "Register", page: "register" });
};

//Create new user in Db
const processRegisterPage = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      res.render("login", {
        title: "Login",
        page: "login",
        message: "Email has already been registered. Please login to continue.",
      });
    }
    if (!user) {
      let newUser = req.body;

      User.create(newUser, async (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        }
        res.redirect("/login");
      });
    }
  });
};

//Logout
const processLogOut = (req, res) => {
  req.logout();
  res.redirect("/login");
};

module.exports = {
  displayLoginPage,
  processLoginPage,
  displayRegisterPage,
  processRegisterPage,
  processLogOut,
};
