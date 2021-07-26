const retry = require('async-await-retry');

const withRetry =  async(
  kafkaJsClientInstance,
  retryTopicName,
  actionHandler,
  loggerInstance
) => {
  const producer = kafkaJsClientInstance.producer();
  await producer.connect();
  return async (originalData) => {
    try {
      const resp = await retry(actionHandler, [originalData], {
        retriesMax: 3,
        onAttemptFail: (data) => {
          console.log(`Retrying...${data.currentRetry}`);
          return true;//proceed with retries
        },
      });
      return resp;
    } catch (err) {
      console.log('Producing to retry queue');
      try{

        await producer.send({
          topic: retryTopicName,
          messages: [{
            value: originalData.message.value
          }]
        });
      }catch(error){
        console.log('failed to produce to retry topic')
      }
    
    }
  };
};

const { Kafka } = require('kafkajs');
const config = require('./config');

// Create the client with the broker list
const kafka = new Kafka({
  clientId: 'consumerB',
  brokers: config.brokers.split(','),
});

const consumer = kafka.consumer({ groupId: 'consumer-group-B' });

let count = 0;

const handleMessage = async ({ topic, partition, message }) => {

  console.log(`processing: ${message.value.toString()}`);
  throw new Error('boom0!');

  if (count === 3) {
    count++;
    console.log(`throwing error1...${message.value.toString()}`);
    throw new Error('boom1!');
  }
  if (count === 4) {
    count = 0;
    console.log(`throwing error2...${message.value.toString()}`);
    throw new Error('boom2!');
  }
  count++;
  console.log({
    value: message.value.toString(),
  });
};

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: config.topics[0].topic });


    const handlerWithRetry = await withRetry(kafka, config.topics[1].topic, handleMessage);
    await consumer.run({
      eachMessage: handlerWithRetry,
    });
  } catch (err) {
    console.log(err);
  }
};
run();
