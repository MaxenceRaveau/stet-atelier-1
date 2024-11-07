/**
 * Load environment variables
 */
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;

/**
 * Middleware to parse request bodies
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Setting the templating engine to EJS
 */
app.set("view engine", "ejs");

/**
 * Serve static files
 */
app.use(express.static("public"));

/**
 * Session configuration with connect-mongo
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

/**
 * Logging session creation and destruction
 */
app.use((req, res, next) => {
  const sess = req.session;
  // Make session available to all views
  res.locals.session = sess;
  if (!sess.views) {
    sess.views = 1;
    console.log("Session created at: ", new Date().toISOString());
  } else {
    sess.views++;
    console.log(
      `Session accessed again at: ${new Date().toISOString()}, Views: ${sess.views}, User ID: ${sess.userId || '(unauthenticated)'}`,
    );
  }
  next();
});

/**
 * Authentication Routes
 */
app.use(authRoutes);

/**
 * Root path response
 */
app.get("/", (req, res) => {
  res.render("welcome");
});

/**
 * Route to handle Play button click and store game duration in session
 */
/**
 * Route to handle Play button click and store game duration in session
 */
// Start of Selection
app.post("/start-game", (req, res) => {
  const { duration } = req.body;
  if (!duration) {
    console.error("Game duration not specified.");
    return res.status(400).send("Game duration not specified.");
  }
  req.session.gameDuration = parseInt(duration, 10);
  if (isNaN(req.session.gameDuration) || req.session.gameDuration <= 0) {
    console.error("Invalid game duration specified.");
    return res.status(400).send("Invalid game duration specified.");
  }
  console.log(`Game duration set to ${req.session.gameDuration} seconds.`);
  res.redirect("/rules");
});


/**
 * Route to display the Rules screen
 */
app.get("/rules", (req, res) => {
  res.render("rules");
});

/**
 * Route to handle the game screen
 */
  app.get('/game', (req, res) => {
    const gameDuration = req.session.gameDuration || 15; // Default to 15 seconds if not set
    res.render('game', { gameDuration });
  });

/**
 * If no routes handled the request, it's a 404
 */
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

/**
 * Error handling
 */
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});