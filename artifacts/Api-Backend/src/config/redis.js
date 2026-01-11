// // src/config/redis.js
// const redis = require('redis');

// const redisClient = redis.createClient({
//     url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

// (async () => {
//     await redisClient.connect();
//     console.log('✅ Redis connected');
// })();

// module.exports = redisClient;




// src/config/redis.js
const redis = require("redis");

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || "redis", // docker service name
        port: process.env.REDIS_PORT || 6379,
    },
    // ❌ password property hata di
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
    await redisClient.connect();
    console.log("✅ Redis connected");
})();

module.exports = redisClient;
