import axios from 'axios';

const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get('/user/me', {
      headers: {
        'x-token': token, 
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server response
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Error: No response from server.');
    } else {
      // Other errors
      throw new Error(error.message);
    }
  }
};

export default fetchUserProfile;
