const db = require('better-sqlite3')('schedules.sqlite', {
    verbose: console.log
});

module.exports.getCurrentSchedules = () => {
    //Select schedules between the current 1 min
    const beginDate = new Date();
    const currentMinute = beginDate.getMinutes();
    const setMin = new Date().setMinutes(currentMinute + 1);

    // console.log("BD: ", beginDate);
    // console.log("ND: ", new Date(setMin));

    // console.log("BD: ", beginDate.getTime());
    // console.log("ND: ", new Date(setMin).getTime());
    const selectCS = db.prepare("SELECT * FROM schedules WHERE (ts BETWEEN ? AND ?) AND (state= ?)");
    const info = selectCS.all(beginDate.getTime(), new Date(setMin).getTime(), 1);
    return info;
}

module.exports.getTasks = () => {
    const schedules = db.prepare("SELECT * FROM schedules");
    const dbData = schedules.all();
    return dbData;
}

module.exports.newTask = (schedule) => {
    const time2millis = new Date(schedule.ts).getTime();
    const NS = db.prepare("INSERT INTO schedules (scheduleId,deviceId,ts,state,deviceAction) VALUES (?,?,?,?,?)");
    const status = NS.run(schedule.scheduleId, schedule.deviceId, time2millis, schedule.state, schedule.deviceAction);
    return status.changes;
}

module.exports.deleteTask = (scheduleId) => {
    const deleteTaskQ = db.prepare("DELETE FROM schedules WHERE scheduleId = ?");
    const exec = deleteTaskQ.run(scheduleId);
    return exec;
}

// const sqlite3 = require('sqlite3').verbose();
// // var db = new sqlite3.Database(':memory:');

// const db = new sqlite3.Database('/home/darshan/Projects/SmartFarm-Backend/CronService/CronScheduler/schedules.sqlite', (err) => {
//     if (err) {
//         return console.error(err.message);
//     }

//     console.log('Connected to the in-memory SQlite database.');
// });

// module.exports.closedb = () => {
//     db.close((err) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         console.log('Close the database connection.');
//     });
// }


// module.exports.getCurrentSchedules = () => {
//     //Select schedules between the current 1 min
//     const beginDate = new Date();
//     const currentMinute = beginDate.getMinutes();
//     const setMin = new Date().setMinutes(currentMinute + 1);

//     console.log("BD: ", beginDate);
//     console.log("ND: ", new Date(setMin));

//     db.run("SELECT * FROM tasks;", (res, error) => {
//         if (error) {
//             console.log(error);
//         }
//         console.log(res)
//     })

//     // const endDateSec = beginDate.setMi
// }

// var gracefulExit = function () {
//     closedb();
//     process.exit(0);
// }
// process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: '../schedules.sqlite',
//     },
// });


// module.exports.getCurrentSchedules = (currentDate, futureDate) => {
//     return knex("tasks").select("*").where("ts").between(currentDate).and(futureDate);
// }