const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.use("/:movieId", controller.movieExists);

// Nest reviewsRouter and theatersRouter under movieId routes
router.use("/:movieId/theaters", theatersRouter);  // Handles /movies/:movieId/theaters
router.use("/:movieId/reviews", reviewsRouter);    // Handles /movies/:movieId/reviews

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router.route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;
