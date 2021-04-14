import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

//Firebase Setup
import admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// const BUCKET_URL = "gs://version-control-system-ooad.appspot.com";

// var bucket = admin.storage().bucket(BUCKET_URL);

admin.storage().bucket().file("NaikAayush/vcs");

// var uploadTask = storageRef
//   .child("images/user1234/file.txt")
//   .put(file, metadata);

//Import Models
import { Message } from "./models/message.model";
import { Repository } from "./models/repository.model";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = express();
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.get("/", (req, res) => {
  return res.send("NO");
});

app.get("/checkRepoName/:name", async (req, res) => {
  const repoName = req.params.name;
  const repoRef = db.collection("repository").doc(repoName);
  const doc = await repoRef.get();
  var message = "";
  if (!doc.exists) {
    message = "Repo Name Available";
  } else {
    message = "Repo Name Unavailable";
  }

  const response = new Message("OK", message, {
    repoName: repoName,
  });
  return res.send(response);
});

app.post("/createRepo", async (req, res) => {
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  const repo = new Repository(
    req.body.name,
    req.body.visibility,
    req.body.ownerId,
    req.body.ownerName,
    req.body.description,
    timestamp
  );
  // console.log(repo);
  await db
    .collection("repository")
    .doc(req.body.ownerName)
    .collection("repo")
    .doc(req.body.name)
    .set(repo.toJSON());
  const message = "Repo Created Successfully";
  // console.log(response);
  const response = new Message("OK", message, {
    repoName: req.body.name,
  });

  return res.send(response);
});

app.post("/listRepo", async (req, res) => {
  const uname = req.body.uname;

  const repoRef = db.collection("repository").doc(uname).collection("repo");
  const snapshot = await repoRef.get();
  if (snapshot.empty) {
    const message = "Repo List Empty";
    // console.log(response);
    const response = new Message("ERROR", message, {
      repoList: "NA",
    });
    return res.send(response);
  }
  const data: { id: string; data: FirebaseFirestore.DocumentData }[] = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, data: doc.data() });
  });

  const message = "Repo Retrieved Successfully";

  const response = new Message("OK", message, {
    repoList: JSON.stringify(data),
  });

  return res.send(response);
});

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
