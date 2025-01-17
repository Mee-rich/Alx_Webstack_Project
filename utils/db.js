import mongodb from 'mongodb';
import envFetch from './dot_Env';

/**
 * Represents a MongoDB client
 */
class DBClient {
    /**
     * Creates a new DBClient instance.
     */
    constructor() {
        envFetch();
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        //const database = process.env.DB_DATABASE || 'Expero_Database';  This for deployment
        const database = process.env.DB_DATABASE || 'file_manager';  //This for development
        const dbURL = `mongodb://${host}:${port}/${database}`;

        this.client = new mongodb.MongoClient(dbURL, {useUnifiedTopology: true});
        this.connected = false;
    
        // Establish connection
        this.client.connect().then(() => {
            this.connected = true;
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.log('Failed to connect to MongoDB:', err);
        });
    }

    /**
     * Check if the client's connection to MongoDB  server is active.
     * @returns {boolean}
     */
    isAlive() {
        return this.connected;
    }

    /**
     * Gets the number of users in the database.
     * @returns {Promise<Number>}
     */
    async nbUsers() {
        await this.client.connect();
        return await this.client.db(this.database).collection('users').countDocuments();
    }

    /**
     * Gets the number of files in the database.
     * @returns {Promise<Number>}
     */
    async nbFiles() {
        return await this.client.db(this.database).collection('files').countDocuments();
    }

    /**
     * Gets the reference to the `users` collection
     * @returns {Promise<Collection>}
     */
    async usersCollection() {
        await this.client.connect();
        return this.client.db(this.database).collection('users');
    }

    /**
     * Gets a reference to the `files` collection.
     * @returns {Promise<Collection>}
     */
    async filesCollection() {
        await this.client.connect();
        return await this.client.db(this.database).collection('files');
    }

    /**
     * Gets a reference to the 'blogs' collection
     * @re(turns {Promise<Collection}
     */
    async blogsCollection() {
        await this.client.connect();
        return await this.client.db(this.database).collection('blogs')
    }


    /**
     * Gets the number of mentors in the database
     * @returns {Promise<Number>}
     */
    async countMentors() {
        return await this.client.db(this.database).collection('users').countDocuments({ role: 'mentor' })
    }

    /**
     * Gets the numnber of mentees each mentors has
     * @returns {Promise<Number>}
     */
    async countMenteesPerMentor() {
        const mentors = await this.client.db(database).collection('users').countDocuments({ role: 'mentor' });

        const mentorStats = (Array.isArray(mentors) ? mentors : []).map((mentor) => ({
            mentorId: details.mentor._id,
            menteeCount: details.mentees ? details.mentees.length : 0,
        }));

        return mentorStats;
    }
}

export const dbClient = new DBClient();
export default dbClient;