const { Kafka } = require('kafkajs');
const config = require('./config');

// Create the client with the broker list
const kafka = new Kafka({
  clientId: 'consumerB-retry',
  brokers: config.brokers.split(','),
});

const consumer = kafka.consumer({ groupId: 'consumer-group-B-retry' });


const handleMessage = async ({ topic, partition, message }) => {

  console.log({
    value: message.value.toString(),
  });
};

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: config.topics[0].topic });

    await consumer.run({
      eachMessage: handleMessage,
    });
  } catch (err) {
    console.log(err);
  }
};
run();
