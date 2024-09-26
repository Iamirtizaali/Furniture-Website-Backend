const ExpressBrute = require("express-brute");
const MemcachedStore = require("express-brute-memcached");
const moment = require("moment");
var sanitize = require("mongo-sanitize");

// Bruteforce
const store = new ExpressBrute.MemoryStore();

var failCallback = function (req, res, next, nextValidRequestDate) {
  return res.status(401).json({
    message:
      "You've made too many failed attempts in a short period of time, please try again " +
      moment(nextValidRequestDate).fromNow(),
  });
};

// Start slowing requests after 5 failed attempts to do something for the same user
var userBruteforce = new ExpressBrute(store, {
  freeRetries: 7,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
});

//Sanitize Data
var sanitizeData = (req, res, next) => {
  req.body = sanitize(req?.body);
  req.params = sanitize(req?.params);
  req.file = sanitize(req?.file);
  req.query = sanitize(req?.query);
  next();
};

module.exports = { userBruteforce, sanitizeData };
