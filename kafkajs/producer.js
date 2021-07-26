const { Kafka } = require('kafkajs');
const config = require('./config');

// Create the client with the broker list
const kafka = new Kafka({
  clientId: 'producer1',
  brokers: config.brokers.split(','),
});
const producer = kafka.producer();

const produce = async () => {
    const msg = `test msg - ${Date.now()}`;
    console.log(`producing: ${msg}`)
  await producer.send({
    topic: config.topics[0].topic,
    messages: [{ value: msg }],
  });
};
const run = async() => {
  try {
    await producer.connect();
    setInterval(produce, 2500);
  } catch (err) {
    console.log(err);
  }
};
run();
