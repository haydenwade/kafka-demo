const kafka = require('kafka-node');
const config = require('./config');
const { v4: uuidv4 } = require('uuid');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const username = process.argv.slice(2)[0] || 'nobody';

let count = -1;

// create producer instance with custom partitioner
Producer = kafka.Producer,
  client = new kafka.KafkaClient({
    kafkaHost: config.kafka_server
  }),
  producer = new Producer(client, {
    partitionerType: 4  //set to 2 for cyclic aka DefaultPartitioner (round robin)
  }, () => {
    count++;
    if (count % 3 === 0) {
      return 0;
    } else {
      return 1;
    }
  });

let ready = false;
const kafka_topic = config.kafka_topic;
//wait to connect
producer.on('ready', async function () {
  ready = true;
  console.log(`Connected to kafka broker for topic ${kafka_topic}, ready to producer messages!`);
  rl.prompt()
});

producer.on('error', function (err) {
  console.log('kafka-producer error:', err);
  throw err;
});

const handleInput = (input) => {
  if (!ready) {
    console.log('hang tight, waiting to connect to kafka...');
    return;
  }
  try {
    let payloads = [
      {
        topic: kafka_topic,
        messages: `${username}: ${input}`
      }
    ];
    //publish message
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('error occurred while publishing message', err);
      }
    });
    rl.prompt()
  }
  catch (err) {
    console.log('oops:', err);
  }
}
rl.on('line', handleInput);
