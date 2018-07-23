const express = require("express"),
      fs = require("fs"),
      request = require('request'),
      http = require('https'),
      path = require('path'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      uuidv4 = require('uuid/v4')

const mapMatch = require('./routes/CV_map-match.js');

    // configure storage
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        /*
          Files will be saved in the 'uploads' directory. Make
          sure this directory already exists!
        */
        cb(null, './uploads');
      },
      filename: (req, file, cb) => {
        /*
          uuidv4() will generate a random ID that we'll use for the
          new filename. We use path.extname() to get
          the extension from the original file name and add that to the new
          generated ID. These combined will create the file name used
          to save the file on the server and will be available as
          req.file.pathname in the router handler.
        */
        const newFilename = `input${path.extname(file.originalname)}`;

        cb(null, newFilename);
      },
    });
    // create the multer instance that will be used to upload/save the file
    const upload = multer({ storage });

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  //app.use(express.static("client/build"));
  app.use(express.static(__dirname, 'public'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.get("/api/map-match", mapMatch);

app.post("/api/map-match/:data", mapMatch);

app.post('/api/upload-map', upload.single('mapinput'), (req, res) => {
  /*
    We now have a new req.file object here. At this point the file has been saved
    and the req.file.filename value will be the name returned by the
    filename() function defined in the diskStorage configuration. Other form fields
    are available here in req.body.
  */
 console.log(req.body)

  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});


app.listen(app.get("port"), () => {
  console.log(`>> SERVER START --> EXPRESS-SERVER on ${app.get("port")}`); // eslint-disable-line no-console
});
