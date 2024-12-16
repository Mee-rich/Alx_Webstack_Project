import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
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
        const database = process.env.DB_DATABASE || 'file_manager';
        const dbURL = `mongodb://${host}:${port}/${database}`;

        this.client = new mongodb.MongoClient(dbURL, {useUnifiedTopology: true});
        this.connected = false;
    
        // Establish connection
        this.client.connect().then(() => {
            this.connected = true;
            console.log('Connceted to MongoDB');
        }).catch((err) => {
            console.log('Failed to connect to MongoDB:', err);
        });
    }

    /**
     * Check if the client's connection to MongoDB  server is active.
     * @returns {boolean}
     */
    isAlive() {
        return this.client.isConnected();
    }

    /**
     * Gets the number of users in the database.
     * @returns {Promise<Number>}
     */
    async nbUsers() {
        return this.client.db().collection('users').countDocuments();
    }

    /**
     * Gets teh number of files in the database.
     * @returns {Promise<Number>}
     */
    async nbFiles() {
        return this.client.db().collection('files').countDocuments();
    }

    /**
     * Gets the reference to the `users` collectoion
     * @returns {Promise<Colection>}
     */
    async usersCollection() {
        return this.client.db().collection('users');
    }

    /**
     * Gets a reference to the `files` collection.
     * @returns {Promise<Collection>}
     */
    async filesCollection() {
        return this.client.db().collection('files');
    }

    /**
     * Gets the number of mentors in the database
     * @returns {Promise<Number>}
     */
    async countMentors() {
        return await this.client.db().collection('users').countDocuments({ role: 'mentor' })
    }

    /**
     * Gets the numnber of mentees each mentors has
     * @returns {Promise<Number>}
     */
    async countMenteesPerMentor() {
        const mentors = await this.client.db().collection('users').countDocuments({ role: 'mentor' });

        const mentorStats = (Array.isArray(mentors) ? mentors : []).map((mentor) => ({
            mentorId: mentor._id,
            menteeCount: mentor.mentees ? mentor.mentees.length : 0,
        }));

        return mentorStats;
    }
}

export const dbClient = new DBClient();
export default dbClient;