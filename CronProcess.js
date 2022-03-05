var CronJob = require('cron').CronJob;
const {
    getCurrentSchedules,
    countTasksbydbScheduleId,
    deleteTask
} = require("./db/db")
const {
    batchExecute,
    deleteBatchSchedule
} = require("./API-External")

const onTick = () => {
    console.log('You will see this message every minute : ', new Date());
    // Check of there are schedules for the next minute 
    const cs = getCurrentSchedules();

    //if exists Make an API call
    if (cs.length > 0) {
        cs.forEach((el, i) => {
            batchExecute(el).then((data) => {
                const schedulesOfBatchLeft = countTasksbydbScheduleId();
                deleteTask(el.scheduleId);
                if (schedulesOfBatchLeft < 1) {
                    deleteBatchSchedule(el).then(() => {
                        console.log("Batch Removed from mongo database");
                    }).catch(() => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
                // If API call failed try once again in other round
            })
        });
    }

    //if does not exist do nothing.
}

const onComplete = () => {
    console.log("Task Completed");
}


var job = new CronJob('30 * * * * *', onTick, onComplete, true, 'Asia/Kolkata');
job.start();