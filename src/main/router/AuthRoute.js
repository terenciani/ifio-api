"use strict";
const AuthController = require("../controller/AuthController");

module.exports = class AuthRoute {
  constructor(app) {
    app.route("/signin").post(AuthController.signIn);
  } // constructor()
}; // class
