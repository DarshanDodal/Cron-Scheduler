require("./CronProcess");

const express = require("express");
const {
    getCurrentSchedules,
    getTasks,
    newTask,
    deleteTask,
    batchdelete,
    countTasksbydbScheduleId
} = require("./db/db")
const {
    batchExecute
} = require("./API-External")
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
const port = 2022;

// Add a middlewre to check if the request is made by some valid user

// get the user info, if the device name in request does not match with the devices 
// that exist under that user, then reject the request 


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

// app.get("/test", (req, res) => {
//     const count = countTasksbydbScheduleId("qwertyrt");
//     console.log(count);
//     res.send("count");
// })

// app.get("/test1", (req, res) => {
//     const count = getTasks();
//     console.log(count);
//     res.send("count");
// })


/**
 * Get all existing schedules
 */
app.get("/cron/schedules", (req, res) => {
    const schedules = getTasks();
    res.send(schedules);
})

/**
 * New Schedule
 */
app.post("/cron/schedule", (req, res) => {
    req.body.forEach((el, i) => {
        newTask(el);
    })
    res.send("OK");
})

/**
 * Delete a schedule by schedule id
 */
app.delete("/cron/schedule/:scheduleId", (req, res) => {
    var delT = deleteTask(req.params.scheduleId)
    res.send(delT);
})


/**
 * Delete all schedules that belong to dbScheduleId
 */
app.delete("/cron/schedule/batch/:dbScheduleId", (req, res) => {
    var delT = batchdelete(req.params.dbScheduleId);
    res.send(delT);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});