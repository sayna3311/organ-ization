//Requirements
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
const { check, validationResult } = require("express-validator");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

//Modles to be included
var hospital = require("./modles/hospital");
var heart = require("./modles/heart");
var intestine = require("./modles/intestine");
var kidney = require("./modles/kidney");
var liver = require("./modles/liver");
var lungs = require("./modles/lungs");
var pancreas = require("./modles/pancreas");
var plasma = require("./modles/plasma");

//Modles ends
app.use("/", express.static("public"));

//PORT ADDRESS
var port = process.env.PORT || 5000;

dotenv.config();

connectDB();
//Altus Data cluster connection query ends

//app.use
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ***************************Authentication section begins***************************
//passport
app.use(
  require("express-session")({
    secret: "HIII ARKS",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(hospital.authenticate()));
passport.serializeUser(hospital.serializeUser());
passport.deserializeUser(hospital.deserializeUser());
//REGISTER

app.get("/register", function(req, res) {
  res.render("register");
});
app.post("/register", function(req, res) {
  req.body.username;
  req.body.password;
  hospital.register(
    new hospital({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      contact: req.body.contact
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.redirect("/hospitallogin");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/hospitallogin");
      });
    }
  );
});

app.post(
  "/hospitallogin",
  passport.authenticate("local", {
    successRedirect: "/hospitaldashboard",
    failureRedirect: "/hospitallogin"
  }),
  function(req, res) {}
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// ***************************Authentication section ends***************************
//RESTFUL ROUTES
app.post("/addorgan", function(req, res) {
  var date = req.body.date;
  var age = req.body.age;
  var choice = req.body.choice;
  var remarks = req.body.remarks;
  var hosp = req.user.id;
  var hospname = req.user.name;
  var hospaddress = req.user.address;
  var hospcontact = req.user.contact;

  if (choice == 1) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    heart.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  if (choice == 2) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    kidney.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  if (choice == 3) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    intestine.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  if (choice == 4) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    liver.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  if (choice == 5) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    lungs.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  if (choice == 6) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    pancreas.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  if (choice == 7) {
    var newdata = {
      hosp: hosp,
      hospname: hospname,
      hospaddress: hospaddress,
      hospcontact: hospcontact,
      date: date,
      age: age,
      remarks: remarks
    };
    plasma.create(newdata, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.render("hospitaldashboard");
      }
    });
  }
  //   res.render("index");
});

app.post("/organ", function(req, res) {
  //to display all the organs
  var choice = req.body.choice;
  //   console.log(choice);
  if (choice == 1) {
    heart.find({}, function(err, allheart) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: allheart
        });
      }
    });
  }
  if (choice == 2) {
    kidney.find({}, function(err, allkidney) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: allkidney
        });
      }
    });
  }
  if (choice == 3) {
    intestine.find({}, function(err, allintestine) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: allintestine
        });
      }
    });
  }
  if (choice == 4) {
    liver.find({}, function(err, allliver) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: allliver
        });
        console.log(allliver);
      }
    });
  }
  if (choice == 5) {
    lungs.find({}, function(err, alllungs) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: alllungs
        });
      }
    });
  }
  if (choice == 6) {
    pancreas.find({}, function(err, allpancreas) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: allpancreas
        });
      }
    });
  }
  if (choice == 7) {
    plasma.find({}, function(err, allplasma) {
      if (err) {
        console.log(err);
      } else {
        res.render("organ", {
          organ: allplasma
        });
      }
    });
  }
  //   res.render("organ");
});

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/hospitallogin", function(req, res) {
  res.render("hospitallogin");
});

app.get("/register", function(req, res) {
  res.render("register.ejs");
});

app.get("/hospitaldashboard", function(req, res) {
  res.render("hospitaldashboard");
});
// app.get("/findorgan", function(req, res) {
//   //form to be submited so as to search database
//   res.render("findorgan");
// });

//Hospital login
// app.get("/login", function(req, res) {
//   res.render("login.ejs");
// });
// app.get("/dashboard", function(req, res) {
//   //if data not available email form is rendered else Dashboard of the hospital is shown
//   res.render("hospitalDashboard");
// });

//Server
app.listen(port, function() {
  console.log("server is on".yellow.bold);
});
