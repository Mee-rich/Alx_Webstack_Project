import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a redis client
 */
class RedisClient{
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on('error', (err) => {
            console.error('Redis client failed to connect:', err.message || err.toString());
            this.isClientConnected = false;
        });
        this.client.on('connect', () => {
            this.isClientConnected = true;
        });
    }

    /**
     * Checks for active connection
     * @returns {boolean}
     */
    isAlive(){
        return this.isClientConnected;
    }

    /**
     * This retrieves the value of a given key
     * @param {String} key- The key of the item to retrieve
     * @returns {String | Object}
     */
    async get(key) {
        getAsync = promisify(this.client.GET).bind(this.client);
        return await getAsync(key);
    }

    /**
     * This function sets a key and value with an expiration time
     * @param {String} key- The key of item to store
     * @param {String | Numeber | Boolean} value- The item to store.
     * @parm {String} duration- The expiration time of the item in seconds
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {
        setAsync = promisify(this.client.SETEX).bind(this.client);
        return await setAsync(key, duration, value);
    }

    /**
     * This removes the value of a given key
     * @param {String} key- The key of the item to remove
     * @return {Promise<void>}
     */
    async del(key) {
        await promisify(this.client.DEL).bind(this.client)(key);
    }
}

export const redisClient = new RedisClient();
export default redisClient;