const axios = require('axios');
const AWS = require("aws-sdk");
const {
    DataExchange
} = require('aws-sdk');

const url = "https://ksmio1eh98.execute-api.ap-south-1.amazonaws.com/dev/api/shadow/batch-update"
const te = "http://192.168.1.105:4000/api/shadow/batch-update"
const dbURL = "https://kdqbacxdnf.execute-api.ap-south-1.amazonaws.com/dev"

var iotData = new AWS.IotData({
    endpoint: "a2s01vbeprvgnz-ats.iot.ap-south-1.amazonaws.com",
    region: "ap-south-1"
})

// module.exports.batchExecute = (data) => new Promise((resolve, reject) => {
//     axios({
//             method: 'post',
//             url: url,
//             data: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(data => {
//             // console.log('Success:', data);
//             resolve(data);
//             // log this in log files using logger
//         })
//         .catch((error) => {
//             // console.error('Error:', error);
//             reject(error);
//             // log this in log files using logger
//         });
// })

module.exports.deleteBatchSchedule = (data) => new Promise((resolve, reject) => {
    axios({
            method: 'delete',
            url: dbURL + "/db/schedule" + "?deviceId=" + data.deviceId + "&scheduleId=" + data.scheduleId,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => {
            // console.log('Success:', data);
            resolve(data);
            // log this in log files using logger
        })
        .catch((error) => {
            // console.error('Error:', error);
            reject(error);
            // log this in log files using logger
        });
})


module.exports.batchExecute = (data) => new Promise((resolve, reject) => {
    const params = {
        topic: `$aws/things/${data.deviceId}/shadow/update`,
        payload: Buffer.from(`{\"state\":{\"desired\":{\"p\":${data.deviceAction===1?true:false}}}}`),
        qos: 1,
    };
    iotData.publish(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
    })
})