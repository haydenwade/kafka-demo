// does not create a consumer group as expected - Did not research further why
const kafka = require('kafka-node');
const config = require('./config');

const keyword = process.argv.slice(2)[0] || null;

try {
  const ConsumerGroup = kafka.ConsumerGroup;
  
  let cg = new ConsumerGroup({
    groupId:`retweet-cg-${keyword}`,
    kafkaHost:config.kafka_server,
    fromOffset: 'latest',
    protocol: ['roundrobin'],
    id:`retween-cd-${keyword}`
  },config.kafka_topic);

  console.log(`consumer ${keyword ? keyword:''} started`);
  cg.on('message', async function(message) {
    if(keyword){
      if(message.value.includes(keyword)){
        console.log(`OMG, ${keyword}: ${message.value}`);
      }
    }else{
      console.log(message.value);
    }
  })
  cg.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}
