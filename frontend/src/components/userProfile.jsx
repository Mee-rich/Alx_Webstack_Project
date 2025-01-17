import React from 'react';



const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-xs text-gray-500">{user.role}</p>
    </div>
  );
};

export default UserProfileCard;