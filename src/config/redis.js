const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'eye-cosmic-zinc-41239.db.redis.io',
        port: 19010,
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error("Redis: too many reconnect attempts, giving up.");
                return new Error("Redis reconnect failed");
            }
            
            
            
            
            // exponential backoff, capped at 3s
            return Math.min(retries * 100, 3000);
        }
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err.message);
});

redisClient.on('reconnecting', () => {
    console.log('Redis: reconnecting...');
});

redisClient.on('connect', () => {
    console.log('Redis: connected');
});

module.exports = redisClient;