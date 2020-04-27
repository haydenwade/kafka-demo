# Setup Kafka Locally (macOS)
## Using docker-compose - using confluent images (full stack - monitoring, schema registry, etc)
1. `docker-compose up`
2. kafka-topics-ui: http://localhost:8000/

## Using Kafka Download
### 1 Kafka Broker, 1 Zookeeper
1. Download Kafka here: [apache.org](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.5.0/kafka_2.12-2.5.0.tgz)
2. Un-tar it, move folder to a safe place - this is where the data is stored (unless specified elsewhere)
3. Open terminal in kafka directory (what you just downloaded)
4. Start zookeeper `bin/zookeeper-server-start.sh config/zookeeper.properties`
5. Start kafka broker `bin/kafka-server-start.sh config/server.properties`
6. Optional: Start kafka-topics-ui `docker run --rm -it -p 8000:8000 -e "KAFKA_REST_PROXY_URL=http://97.116.135.11:9092" landoop/kafka-topics-ui` 

# Setup Demo - 3 producers, 3 consumers, 1 topic
1. Clone this repo if you haven't already
2. `npm install`
3. `npm run producer` - starts a console app that publishes messages to a specific topic (tweets) - as nobody user
4. `npm run producer-justin` - starts a console app that publishes messages to a specific topic (tweets) - as Justin Bieber
5. `npm run producer-morgan` - starts a console app that publishes messages to a specific topic (tweets) - as Morgan Freeman
6. `npm run consumer` - starts a node app to process messages off of specific topic (tweets) - retweets all tweets
7. `npm run consumer-justin` - starts a node app to process messages off of specific topic (tweets) - retweets anything justin bieber tweets
8. `npm run consumer-cats` - starts a node app to process messages off of specific topic (tweets) - retweets anything about cats


# To start fresh - delete topics, etc
1. Remove the directories that got added to the root directory

#### References
[Apache Kafka Quickstart](https://kafka.apache.org/quickstart)

[npm kafka-node](https://www.npmjs.com/package/kafka-node)

[simplesteph/kafka-stack-docker-compose](https://github.com/simplesteph/kafka-stack-docker-compose)
