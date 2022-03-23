import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import indexRoutes from "./routes/tasks.routes";

const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

//Motor de plantillla engine
const exphbs = create({
  extname: ".hbs",
  layoutsDir: path.join(app.get("views"), "layouts"),
  defaultLayout: "main",

  //Create helper
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
});

//Register helper

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);

// public route
app.use(express.static(path.join(__dirname, "public")));

//404
app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
