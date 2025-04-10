import React from 'react';



const UserProfileCard = ({ user }) => {

  const userData = (user.otherDetails)
  return (
    // <>
    //   <div className="flex flex-col items-center min-h-screen px-4 py-10 text-white bg-gray-900">
    //     <div >
    //       <h2 className="text-lg font-bold">{userData.firstName} {userData.lastName}</h2>
    //       <p className="text-lg font-bold">{userData.professionalRole}</p>
    //     </div>
    //     <h2 className="text-lg font-bold">{user.name}</h2>
    //     <p className="text-sm text-gray-600">{user.email}</p>
    //     <p className="text-xs text-gray-500">{user.role}</p>
    //   </div>
    //   <div className="">

    //     <div class="">
    //       <div class="">
    //         <p className='text-lg font-bold' > User Details</p>
    //         <p className="text-lg font-bold"><strong>Phone Number:</strong>{user.phoneNumber}</p>
    //         <p className="text-lg font-bold"><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank">linkedin.com/in/Adesuyi_Adegbenga</a></p>
    //         <p className="text-sm text-gray-600"><strong>Experience:</strong>{user.experience}</p>
    //         <p className="text-sm font-medium text-gray-600"><strong>Career Year:</strong>{user.careerYear}</p>
    //         <p><strong>Career Field:</strong>{user.careerField}</p>
    //         <p><strong>Professional Role:</strong>{user.professionalRole}</p>
    //       </div>

    //       {/* <div class="">
    //               <h3>Skills:</h3>
    //               <ul>
    //                   <li>JavaScript</li>
    //                   <li>Node.js</li>
    //                   <li>React</li>
    //                   <li>MongoDB</li>
    //               </ul>
    //           </div>

    //           <div class="">
    //               <h3>Personal Interests:</h3>
    //               <p>Photography, Traveling, Tech Blogging</p>
    //           </div>

    //           <div class="">
    //               <h3>Mentorship Goal:</h3>
    //               <p>To guide young developers in their career growth and help them navigate the software engineering industry.</p>
    //           </div> */}
    //     </div>
    //   </div>
    // </>

    <div className="flex items-center flex-grow min-h-screen px-4 py-10 text-white bg-gray-900">
      <div className="w-full max-w-md p-6 text-gray-900 bg-white shadow-xl rounded-2xl">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
          <p className="text-sm text-gray-500">{userData.professionalRole}</p>
          <p className="mt-1 text-xs text-gray-400">{user.email}</p>
          {/* <p className="mt-1 text-xs text-gray-400">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p> */}
          <span className="inline-block px-2 py-1 mt-2 text-xs text-green-700 bg-green-100 rounded-full">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} {user.details.mentorId}</span>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Phone Number:</p>
            <p className="text-gray-800">{userData.phoneNumber}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">LinkedIn:</p>
            <a href={userData.linkedin} className="text-blue-600 underline">
              {userData.linkedin}
            </a>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Experience:</p>
            <p className="text-gray-800">{userData.experience}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Career Year:</p>
            <p className="text-gray-800">{userData.careerYear}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Career Field:</p>
            <p className="text-gray-800">{userData.careerField}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Professional Role:</p>
            <p className="text-gray-800">{userData.professionalRole}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserProfileCard;