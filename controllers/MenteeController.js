import dbClient from '../utils/db';


export default class MenteeController {
    
    // Return mentor properties
    static async addMentee(role) {
        if (role === 'mentee') {
            // const mentees = [];
            return;
        }

    }
//yet to implement functions below in the dbClient
    // Count number of mentors
    static async countMentees(_, res) {
        const menteesCount = await dbClient.countMentees();
        res.status(200).json({ numberOfMentees: menteesCount });
    }

    // Count mentees per mentor
    static async countMenteesRelMentor(_, res) {
        const menteesRelMentorsCount = await dbClient.countMenteesRelMentor();
        res.status(200).json(mentorMenteeStats);
    }
}