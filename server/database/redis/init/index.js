const redis = require('redis');
const rejson = require('redis-rejson');
const RedisClient = require("../client");
const { once } = require('lodash');
rejson(redis);

require('dotenv').config();

if (!process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PWD) {
    throw new Error("REDIS HOST/PORT/PWD should be set in environment variables");
}

const { REDIS_HOST, REDIS_PORT, REDIS_PWD } = process.env;

const redisEndpointUri = `${REDIS_HOST}:${REDIS_PORT}`;

const redisClient = redis.createClient(`redis://${redisEndpointUri}`, {
    password: REDIS_PWD
});

const redisClientService = once(() => new RedisClient(redisClient));


module.exports = {
    redisClient,
    redisClientService,
};
