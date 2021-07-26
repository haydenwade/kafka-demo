const { Kafka } = require('kafkajs')
const config = require('./config')

// Create the client with the broker list
const kafka = new Kafka({
  clientId: 'producer1',
  brokers: config.brokers.split(',')
})
const admin = kafka.admin()
const run = async()=>{
  try{
    await admin.connect()

    await admin.createTopics({
        topics: config.topics,
    });
    
    await admin.disconnect()
    
    console.log('created topics')
  }catch(err){
    console.log(err);
  }
}
run();