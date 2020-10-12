# 3 broker setup using Kafka Apache download
## Setup
1. Duplicate server.properties twice -> server2.properties, server3.properties
2. Modify each file as follows: `log.dirs=/tmp/kafka-logs/server2` `port=9093` and `log.dirs=/tmp/kafka-logs/server3` `port=9094`
3. Use below commands to get started

## Helpful commands for 3 broker setup:
```
//start zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

//start 3 brokers
bin/kafka-server-start.sh config/server.properties
bin/kafka-server-start.sh config/server2.properties
bin/kafka-server-start.sh config/server3.properties

//create topic with 1 partition 0 replicas
bin/kafka-topics.sh --create --topic tweets --bootstrap-server localhost:9092,localhost:9093,localhost:9094


//create topic with max message size, set default max.message.bytes 10485760
bin/kafka-topics.sh --create --topic tweetsSmall --bootstrap-server localhost:9092,localhost:9093,localhost:9094 --config max.message.bytes=8000

//create topic with partitions and replicas
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 3 --topic tweets3

//describe topic
bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic tweets

//create topic with partitions and replicas and max message size
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 3 --topic tweets2 --config max.message.bytes=8000

//load test
bin/kafka-producer-perf-test.sh --topic tweets3 --num-records 200000 --record-size 1000 --throughput 10000000 --producer-props bootstrap.servers=localhost:9092,localhost:9093,localhost:9094
bin/kafka-producer-perf-test.sh --topic tweets5 --num-records 10 --record-size 1 --throughput 1 --producer-props bootstrap.servers=localhost:9092,localhost:9093,localhost:9094
```
