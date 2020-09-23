const kafka = require('kafka-node');
const config = require('./config');

const keyword = process.argv.slice(2)[0] || null;

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient({kafkaHost:config.kafka_server});

  let consumer = new Consumer(
    client,
    [{ topic: config.kafka_topic}],
    {
      groupId: `retweet-${keyword}`,//consumer group id, default `kafka-node-group`
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );

  console.log(`consumer ${keyword ? keyword:''} started`);
  consumer.on('message', async function(message) {
    if(keyword){
      if(message.value.includes(keyword)){
        console.log(`OMG, ${keyword}: ${message.value}`);
      }
    }else{
      console.log(message.value);
    }
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}
