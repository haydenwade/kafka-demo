const kafka = require('kafka-node');
const config = require('./config');
try {
    const topicsToCreate = [{
        topic: config.kafka_topic,
        partitions: config.kafka_topic_partions,
        replicationFactor: config.kafka_topic_replicas
    }
    ];
    
    const client = new kafka.KafkaClient({ kafkaHost: config.kafka_server });

    client.createTopics(topicsToCreate, (error, result) => {
        if (error) {
            console.log('error occurred creating topic', error);
        }
        console.log(result);
    })
}
catch (e) {
    console.log(e);
}