const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors");
const router = express();
router.use(cors({ origin: true }));
router.get("/series/:serie", async(req, res) => {
    const serie = await admin
        .firestore()
        .collection("series")
        .doc(req.params.serie)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                console.log("No such document!");
                return {};
            }
        });
    res.send(serie);
});
router.get("/series", async(req, res) => {
    const series = await admin
        .firestore()
        .collection("series")
        .get();
    var lista = [];
    series.docs.forEach((doc) => {
        lista.push({ id: doc.id, data: doc.data() });
    });
    res.send(lista);
});
router.post("/serie", async(req, res) => {
    const serie = await admin
        .firestore()
        .collection("series")
        .add(req.body)
        .then((docRef) => {
            return docRef.id;
        });
    res.send(serie);
});
router.put("/serie/:id", async(req, res) => {
    const serie = await admin
        .firestore()
        .collection("series")
        .doc(req.params.id)
        .update(req.body)
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                console.log("No such document!");
                return {};
            }
        });
    res.send(serie);
});
router.delete("/serie/:id", async(req, res) => {
    const serie = await admin
        .firestore()
        .collection("series")
        .doc(req.params.id)
        .delete();
    res.send(serie);
});
exports.series = functions.https.onRequest(router);