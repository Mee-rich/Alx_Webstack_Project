import { useState } from "react";
import axiosClient from "../components/AxiosClient";
// import { useToken } from '../components/tokenProvider';
import { useNavigate } from "react-router-dom";


export const UpdateDetails = (role) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [experience, setExperience] = useState('');
    const [careerYear, setCareerYear] = useState('');
    const [professionalRole, setProfessionalRole] = useState('');
    const [careerField, setCareerField] = useState('');
    const [skills, setSkills] = useState('');
    const [personalInterest, setPersonalInterest] = useState('');
    const [mentorshipGoal, setMentorshipGoal] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    
    role = 'mentee'

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    if (role=='mentor') {
        return (
            <>
                <p>Update Details</p>
                <form action="" onSubmit={handleSubmit}>
                    {error && <div style={{color:'red'}}>{error}</div>}
                    {successMessage && <div style={{color:'green'}}>{successMessage}</div>}
                </form>
                <div>
                    <label htmlFor="firstName">FirstName:</label>
                    <input 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">LastName:</label>
                    <input 
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Contact Number:</label>
                    <input 
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="linkedin">Linkedin:</label>
                    <input 
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="experience">Experience:</label>
                    <input 
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="careerField">Career Field:</label>
                    <input 
                        type="text"
                        value={careerField}
                        onChange={(e) => setCareerField(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="professionalRole">Professional Role(s):</label>
                    <input 
                        type="text"
                        value={professionalRole}
                        onChange={(e) => setProfessionalRole(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="careerYear">Career Year(s):</label>
                    <input 
                        type="number" min={0}
                        value={careerYear}
                        onChange={(e) => setCareerYear(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="skills">Skill(s):</label>
                    <input 
                        type="text"
                        value={skills}
                        placeholder="Enter skills seperated by a comma"
                        onChange={(e) => setSkills(e.target.value)}
                        required
                    />
                </div>
            </>
        )
    };

    if (role=='mentee') {
        return (
            <>
                <p>Update Details</p>
                <form action="" onSubmit={handleSubmit}>
                    {error && <div style={{color:'red'}}>{error}</div>}
                    {successMessage && <div style={{color:'green'}}>{successMessage}</div>}
                </form>
                <div>
                    <label htmlFor="firstName">FirstName:</label>
                    <input 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">LastName:</label>
                    <input 
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Contact Number:</label>
                    <input 
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="linkedin">Linkedin:</label>
                    <input 
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="experience">Experience:</label>
                    <input 
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="careerField">Career Field:</label>
                    <input 
                        type="text"
                        value={careerField}
                        onChange={(e) => setCareerField(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="professionalRole">Professional Role(s):</label>
                    <input 
                        type="text"
                        value={professionalRole}
                        onChange={(e) => setProfessionalRole(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="careerYear">Career Year(s):</label>
                    <input 
                        type="number" min={0}
                        value={careerYear}
                        onChange={(e) => setCareerYear(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="skills">Skill(s):</label>
                    <input 
                        type="text"
                        value={skills}
                        placeholder="Enter skills seperated by a comma"
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="personalInterest">Personal Interest(s):</label>
                    <input 
                        type="text"
                        value={personalInterest}
                        placeholder="Enter skills seperated by a comma"
                        onChange={(e) => setPersonalInterest(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mentorshipGoal">Mentorship Goal(s):</label>
                    <input 
                        type="text"
                        value={mentorshipGoal}
                        placeholder="Enter skills seperated by a comma"
                        onChange={(e) => setMentorshipGoal(e.target.value)}
                        required
                    />
                </div>
            </>
        )
    };

};
