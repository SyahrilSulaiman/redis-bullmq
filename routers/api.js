// const { Queue, Worker } = require('bullmq');
// const express = require('express')
// const router = express.Router()

// const connection = { connection: { host: 'localhost', port: 6379}}

// router.get("/", async(req, res) => {

//     const myQueue = new Queue('foo', {connection});

//     async function addJobs() {            
//         for (let index = 0; index < 10; index++) {
//             setTimeout(async () => {
//                 await myQueue.add('myJobName', { foo: `Queue number ${index + 1}` });
//             }, 3000);
//         }
//     }

//     const worker = new Worker('foo', async job => {
//         console.log("Queue ID : ", job.id);
//         console.log("Worker processing queue : ", job.data);
//     },{connection});

//     addJobs();

//     res.status(200).json({
//         status: 'ok',
//         message: 'Processing your queue in progress...'
//     })
// })
// module.exports = router

const { Queue, Worker } = require('bullmq');
const express = require('express');
const router = express.Router();

const connection = { connection: { host: 'localhost', port: 6379 } };

router.get("/", async(req, res) => {

    const myQueue = new Queue('foo', { connection });

    async function addJobs() {
        for (let index = 0; index < 10; index++) {
            await myQueue.add('myJobName', { foo: `Queue number ${index + 1}` });
        }
    }

    const worker = new Worker('foo', async job => {
        console.log("Queue ID : ", job.id);
        console.log("Worker processing queue : ", job.data);

        // Simulate a delay of 3 seconds before processing the next job
        await new Promise(resolve => setTimeout(resolve, 1000));
    }, { connection });

    addJobs();

    res.status(200).json({
        status: 'ok',
        message: 'Processing your queue in progress...'
    });
});

module.exports = router;
