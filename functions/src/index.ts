import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

// Firebase Setup
import admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// const BUCKET_URL = "gs://version-control-system-ooad.appspot.com";

// var bucket = admin.storage().bucket(BUCKET_URL);

admin.storage().bucket().file("NaikAayush/vcs");

// var uploadTask = storageRef
//   .child("images/user1234/file.txt")
//   .put(file, metadata);

// Import Models
import {Message} from "./models/message.model";
import {Repository} from "./models/repository.model";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = express();
app.use(cors({origin: true}));

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

app.get("/checkRepoName/:uname/:rname", async (req, res) => {
  const uname = req.params.uname;
  const rname = req.params.rname;
  const repoRef = db
      .collection("repository")
      .doc(uname)
      .collection("repo")
      .doc(rname);
  const doc = await repoRef.get();
  let message = "";
  let response: Message;
  if (!doc.exists) {
    message = "Repo Name Available";
    response = new Message("OK", message, {
      repoName: rname,
    });
  } else {
    message = "Repo Name Unavailable";
    response = new Message("ERROR", message, {
      repoName: rname,
    });
  }

  // const response = new Message("OK", message, {
  //   repoName: rname,
  // });
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
    data.push({id: doc.id, data: doc.data()});
  });

  const message = "Repo Retrieved Successfully";

  const response = new Message("OK", message, {
    repoList: JSON.stringify(data),
  });

  return res.send(response);
});

app.get("/getRepoDetails/:uname/:rname", async (req, res) => {
  const userName = req.params.uname;
  const repoName = req.params.rname;
  const repoRef = db
      .collection("repository")
      .doc(userName)
      .collection("repo")
      .doc(repoName);
  const doc = await repoRef.get();
  let message = "";
  if (!doc.exists) {
    message = "Repo Name Available";
  } else {
    message = "Repo Name Unavailable";
  }
  const response = new Message("OK", message, {
    repoName: doc.id,
    repoDetails: doc.data(),
  });
  return res.send(response);
});

app.put("/updateCommitNo/:uname/:rname", async (req, res) => {
  const userName = req.params.uname;
  const repoName = req.params.rname;
  const repoRef = db
      .collection("repository")
      .doc(userName)
      .collection("repo")
      .doc(repoName);
  const doc: any = await repoRef.get();
  const commitNo: any = doc.data().commitNo + 1;

  console.log(commitNo);
  // Update Commit in DB
  // Set the 'capital' field of the city
  await repoRef.update({commitNo: commitNo});

  let message = "";
  const docNew = await repoRef.get();
  if (!docNew.exists) {
    message = "Commit Updated";
  } else {
    message = "Commit Not Updated";
  }
  const response = new Message("OK", message, {
    repoName: docNew.id,
    repoDetails: docNew.data(),
  });
  return res.send(response);
});

app.post("/updateFiles", async (req, res) => {
  const uname = req.body.uname;
  const rname = req.body.rname;
  const fileList: Array<String> = req.body.fileList;

  // const repoRef = db.collection("repository").doc(uname).collection("repo");
  const repoRef = db
      .collection("repository")
      .doc(uname)
      .collection("repo")
      .doc(rname);

  const doc: any = await repoRef.get();
  const files: Array<String> = doc.data().files;

  // var filesSet = new Set([files, fileList]);

  const union = [...new Set([...files, ...fileList])];
  console.log(union);

  // console.log(filesSet);
  // var filesArray = new Array(filesSet);
  // console.log(filesArray);
  await repoRef.update({files: union});

  let message = "";
  const docNew = await repoRef.get();
  if (!docNew.exists) {
    message = "Files Updated Successfully";
  } else {
    message = "Files Not Updated Successfully";
  }
  const response = new Message("OK", message, {
    repoName: docNew.id,
    repoDetails: docNew.data(),
  });
  return res.send(response);
});

app.get("/repoFiles/:uname/:rname", async (req, res) => {
  const uname = req.params.uname;
  const rname = req.params.rname;
  const repoRef = db
      .collection("repository")
      .doc(uname)
      .collection("repo")
      .doc(rname);
  const doc = await repoRef.get();
  const data: any = doc.data();
  const commitNo = data.commitNo;
  const files = data.files;
  const finalData: { fileName: string; link: any; time: any }[] = [];
  let flag = false;

  await Promise.all(
      files.map(async function(value: String) {
        for (let i = 0; i <= commitNo; i++) {
          const repoCommitRef = db
              .collection("repository")
              .doc(uname)
              .collection("repo")
              .doc(rname)
              .collection("commit" + i);
          console.log("Block statement execution no." + i);

          const snapshot = await repoCommitRef.get();

          snapshot.forEach((doc) => {
            if (value == doc.id) {
              finalData.push({
                fileName: doc.id,
                link: doc.data().downloadURL,
                time: doc.data().time._seconds,
              });
              flag = true;
              return;
            }
          //   data.push({ id: doc.id, data: doc.data() });
          });
          if (flag == true) {
            break;
          }
        }
        if (flag == true) {
          flag = false;
          return;
        }

        console.log(finalData);
        console.log(typeof finalData);
      })
  );

  console.log(finalData);
  console.log(typeof finalData);

  let message = "";
  let response: Message;

  // eslint-disable-next-line no-constant-condition
  if (true) {
    message = "Repo Files Retrieved Successfully";
    response = new Message("OK", message, {
      data: finalData,
    });
  } else {
    message = "Could not retrieve Repo Files";
    response = new Message("ERROR", message, {
      data: finalData,
    });
  }

  return res.send(response);
});

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
