const Bull = require("bull");
const { emailProcess } = require("../processes/emailProcess");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const emailQueue = new Bull("email", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

emailQueue.process(emailProcess);

const sendEmail = (data) => {
  emailQueue.add(data, {
    delay: 10000,
  });
};

module.exports = { sendEmail, serverAdapter };
