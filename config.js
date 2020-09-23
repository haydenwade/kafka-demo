module.exports = {
    kafka_topic: 'tweets',
    kafka_topic_partions: 3,
    kafka_topic_replicas: 1,
    kafka_server: 'localhost:9092'
    // kafka_server: 'localhost:9092,localhost:9093,localhost:9094' //example config for 3 brokers
}
