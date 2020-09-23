const kafka = require('kafka-node');
const config = require('./config');

const keyword = process.argv.slice(2)[0] || null;

try {
  const ConsumerGroup = kafka.ConsumerGroup;
  
  let cg = new ConsumerGroup({
    groupId:`retweet-${keyword}`,
    kafkaHost:config.kafka_server,
    fromOffset: 'latest',
    protocol: ['roundrobin'],
  },config.kafka_topic);


  const c = cg; //switch between consumer group and consumer

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