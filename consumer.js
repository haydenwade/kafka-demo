const kafka = require('kafka-node');
const config = require('./config');

const keyword = process.argv.slice(2)[0] || null;

try {
  const Consumer = kafka.Consumer;
  const ConsumerGroup = kafka.ConsumerGroup;
  const client = new kafka.KafkaClient({kafkaHost:config.kafka_server});
  // let cg = new ConsumerGroup({
  //   groupId:`retweet-${keyword}`,
  //   kafkaHost:config.kafka_server,
  //   fromOffset: 'latest',
  //   protocol: ['roundrobin'],
  // },config.kafka_topic);

  let consumer = new Consumer(
    client,
    [{ topic: config.kafka_topic}],
    {
      // groupId: `retweet-${keyword}`,//consumer group id, default `kafka-node-group`
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );

  const c = consumer; //switch between consumer group and consumer

  console.log(`consumer ${keyword ? keyword:''} started`);
  c.on('message', async function(message) {
    if(keyword){
      if(message.value.includes(keyword)){
        console.log(`OMG, ${keyword}: ${message.value}`);
      }
    }else{
      console.log(message.value);
    }
  })
  c.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}