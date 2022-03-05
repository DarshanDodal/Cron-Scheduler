require("./CronProcess");

const express = require("express");
const {
    getCurrentSchedules,
    getTasks,
    newTask,
    deleteTask
} = require("./db/db")
const {
    batchExecute
} = require("./API-External")
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
const port = 3000;

// app.get("/test", (req, res) => {
//     batchExecute({
//         scheduleId: "ugtf265",
//         deviceId: "iloVvq",
//         deviceAction: 0
//     }).then((data) => {
//         console.log(data);
//         res.send("OK");
//     }).catch((err) => {
//         console.log(err);
//     })
// })

app.get("/cron/schedules", (req, res) => {
    const schedules = getTasks();
    res.send(schedules);
})

app.post("/cron/schedule", (req, res) => {
    var newT = newTask(req.body);
    res.send("OK");
})

app.delete("/cron/schedule/:scheduleId", (req, res) => {
    var delT = deleteTask(req.params.scheduleId)
    res.send(delT);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});