// used to make post and get requests really easy
const express = require("express");
//the port that data is being sent and retrived from
const port = 3001;
//mongoose connects my project to mongoDB
const mongoose = require("mongoose");
//jsonweb token makes tokens for auth
const jwt = require("jsonwebtoken");
//uses the var aqpp to run post and get requests Password1273!IMAC
const app = express();
//encryption password
const bcrypt = require("bcrypt");
//is link the api key to access db
const uri ="mongodb+srv://mahan:N5VGMQU9koXvDOHl@cluster0.b4vi4nd.mongodb.net/?retryWrites=true&w=majority";
//middle ware saying expect json obj
app.use(express.json());
//middle ware saying expect json obj
app.use(express.urlencoded({ extended: false }));
//sets cors to allow all requests and all request types
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const path = require("path");  
app.use("/images", express.static(path.join("backend/images")));  
//connects to db
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("we are connected to db");
  })
  .catch((error) => {
    console.log(error);
  });
//makes schema for posts
const PostSchema = {
  UserName: String,
  content: String,
  key: String,
  File:String
};
//make schema for users  100 48
const UserSchema = {
  UserName: String,
  Password: String,
  token: String,
};
//makes a model basically tell the db to use this collectio freom the db
let UserCollection = mongoose.model("users", UserSchema);
//makes a model basically tell the db to use this collectio freom the db
let PostCollection = mongoose.model("Posts", PostSchema);


app.post("/testSendImg", (req, res) => {
  console.log(req.body);
});

//makes a new collection from the data sent from fronty and saves to db
app.post("/testSendData", (req, res) => {
  let newCollection = new PostCollection({
    content: req.body.content,
    UserName: req.body.UserName,
    key: req.body.key,
    File : req.body.File
  });
  newCollection
    .save()
    .then(() => {
      console.log("Saved successfully");
    })
    .catch((error) => {
      console.error("Error saving document:", error);
    });
    PostCollection.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
//sends data from db to front end
app.get("/testGetData", (req, res) => {
  PostCollection.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
//deletes data from the db
app.post("/TestButtonsDelete", (req, res) => {
  console.log(req.body.key);
  PostCollection.deleteOne({ key: req.body.key })
    .then(() => {
      console.log("done and deleted");
      res.send("done");
    })
    .catch((error) => {
      console.log(error);
    });
});
//edits data from the db
app.post("/TestButtonsEdit", (req, res) => {
  console.log(req.body.key);
  PostCollection.updateOne(
    { key: req.body.key },
    { $set: { content: req.body.content } }
  )
    .then(() => {
      console.log("done and edited");
      res.send("done");
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/testSignIn", async (req, res) => {
  await UserCollection.findOne({ UserName: req.body.username })
    .then(async (result) => {
      if (result === null) {
        let Token = await jwt.sign(
          {
            username: req.body.username
          },
          "shhhhhh", // use env
          {
            expiresIn: "1d",
          }
        );
        await bcrypt.genSalt(10, (error, salt) => {
          if (error) {
            console.log(error);
          } else {
            bcrypt.hash(req.body.password, salt, async (error, hash) => {
              if (error) {
                console.log(error);
              } else {
                const user = await UserCollection.create({
                  UserName: req.body.username,
                  Password: hash,
                  token: Token,
                });
                user.token = Token;
                res.status(200).json(user);
              }
            });
          }
        });
      } else {
        console.log("failed chage user name");
        res.send("fail");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/TestLogin", async (req, res) => {
  await UserCollection.findOne({ UserName: req.body.username }).then(
    async (result) => {
      if (result === null) {
        res.send("failUsername");
      } else {
        if (req.body.newPassword === "") {
          res.send(result);
        } else {
         await bcrypt.compare(
            req.body.password,
            req.body.newPassword,
           async (error, result) => {
              if (result === true) {
                let Token = jwt.sign(
                  {
                    username: req.body.username,
                   
                  },
                  "shhhhhh", // use env
                  {
                    expiresIn: "1d",
                  }
                );
               await UserCollection.updateOne(
                  { UserName: req.body.username },
                  { $set: { token: Token } }
                );
               await UserCollection.findOne({ UserName: req.body.username })
                  .then((newResult) => {
                    res.status(200).json(newResult);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else if (result === false) {
                res.send("failPassword");
              } else if (error) {
                console.log(error);
              }
            }
          );
        }
      }
    }
  );
});
app.post("/testLogOut", async (req, res) => {
  await UserCollection.updateOne(
    { UserName: req.body.UserName },
    { $set: { token: "" } }
  );
  await UserCollection.findOne({ UserName: req.body.UserName })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post("/testGetAccount", async (req, res) => {
  await UserCollection.findOne({ UserName: req.body.UserName })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});


app.listen(port, function (error) {
  if (error) {
    console.log("you got a error ", error);
  } else {
    console.log("server is running on port ", port);
  }
}); 