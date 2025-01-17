import dbClient from '../utils/db';

const randomId = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000; 

export default class MentorController {
    
    // Return mentor properties
    static async addMentor(role) {
        if (role === 'mentor') {
            const mentorId = randomId.toString();
            const mentees = [];
            const mentor_details = {mentorId, mentees};
            return mentor_details;
        }
    }

    // Count number of mentors
    static async countMentors(_, res) {
        const mentorCount = await dbClient.countMentors();
        res.status(200).json({ numberOfMentors: mentorCount });
    }

    // Count mentees per mentor
    static async countMenteesPerMentor(_, res) {
        const mentorMenteeStats = await dbClient.countMenteesPerMentor();
        res.status(200).json(mentorMenteeStats);
    }
}

