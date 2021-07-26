module.exports = {
  brokers: 'localhost:9092',
  topics: [
    {
      topic: 'kafkajs-tweets',
      numPartitions: 1,
      replicationFactor: 1
    },
    {
        topic: 'kafkajs-tweets-retry',
        numPartitions: 1,
        replicationFactor: 1
      },
  ],
};
