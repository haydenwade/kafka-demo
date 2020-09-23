const kafka = require('kafka-node');
const config = require('./config');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const username = process.argv.slice(2)[0] || 'nobody';

// create producer instance
Producer = kafka.Producer,
  client = new kafka.KafkaClient({ 
    kafkaHost: config.kafka_server
   }),
  producer = new Producer(client);

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