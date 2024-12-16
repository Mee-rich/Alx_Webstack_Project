import dbClient from '../utils/db';

export default class MentorController {
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