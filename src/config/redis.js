const {createClient}=require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'eye-cosmic-zinc-41239.db.redis.io',
        port: 19010
    }
});

module.exports=redisClient;