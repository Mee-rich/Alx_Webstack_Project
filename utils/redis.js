import { promisify } from 'util';
import { createClient } from 'redis';


/**
 * Represents a redis client
 */
class RedisClient{
    constructor() {
        
        this.client = createClient();
        this.client.connect();
        this.isClientConnected = true;
        this.client.on('error', (err) => {
            console.error('Redis client failed to connect:', err.message || err.toString());
            this.isClientConnected = false;
        });
        this.client.on('connect', () => {
            this.isClientConnected = true;
        });
        this.client.on('end', () => {
            console.warn('Redis client disconnected');
            this.isClientConnected = false;
        });
        this.client.ping();        
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
        // await this.client.connect();
        const getAsync = await (this.client.GET).bind(this.client);
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
        // await this.client.connect();
        const setAsync = await  (this.client.SETEX).bind(this.client);
        return await setAsync(key, duration, value);
    }

    /**
     * This removes the value of a given key
     * @param {String} key- The key of the item to remove
     * @return {Promise<void>}
     */
    async del(key) {
        // await this.client.connnect();
        await (this.client.DEL).bind(this.client)(key);
    }
}

export const redisClient = new RedisClient();
export default redisClient;