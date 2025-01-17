import  { useState } from 'react';
import axiosClient from '../components/AxiosClient';
import { useToken }from '../components/tokenProvider'
import { useNavigate } from 'react-router-dom';



export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // For loading state
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission asynchronously
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset the error message at the start
    setError('');
    setSuccessMessage('');
    
    // Validate required fields
    if (!email || !password1 || !password2 || !role) {
      setError('All fields are required');
      return;
    }

    // Validate that passwords match
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    // Validate role
    if (!['mentor', 'mentee'].includes(role)) {
      setError('Role must be either "mentor" or "mentee"');
      return;
    }

    // Validate email format
    const reEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if (!reEmail.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Validate password format (e.g., at least one number, one special character, etc.)
    const rePass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!rePass.test(password1)) {
      setError('Password must contain at least one digit, one special character, one uppercase letter, and be at least 8 characters long');
      return;
    }

    // Start loading indicator
    setLoading(true);

    try {
      // Make the API call with axios
      const response = await axiosClient.post(
        '/users',
        {
          email,
          password1,
          password2,
          role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      

      // Handle the successful response
      if (await response.data) {
        setSuccessMessage('Signup successful!');
        // Optionally, reset the form if needed
        setEmail('');
        setPassword1('');
        setPassword2('');
        setRole('');
      } else {
        setError('Error occured, signup failed.');
      }
    } catch (error) {
      // Handle error
      setError(`An error ${error.response?.data?.message || error.message} occurred. Please try again later.`);
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Signup</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="roles">Role:</label>
          <select 
            id="roles" 
            value={role}
            onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled selected>Select a role</option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Register'}
        </button>
      </form>
    </>
  );
};



export const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { saveToken } = useToken();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');

    // Validate required fields
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    // Validate that passwords match
    if (!password) {
      setError('Password missing');
      return;
    }

    // Validate email format
    const reEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if (!reEmail.test(email)) {
      setError('Wrong Email');
      return;
    }

    // Validate password format (e.g., at least one number, one special character, etc.)
    const rePass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!rePass.test(password)) {
      setError('Wrong password');
      return;
    }

    // Start loading indicator
    setLoading(true);

    try {
      // Make the GET request with query parameters
      const response = await axiosClient.post('/connect', 
        {
          email,
          password,
        },
        {
          headers: {
          'Content-Type': 'application/json',
          },
        }
      );
      const token = response.data.token;
      
      if (token) {
        saveToken(token)
        alert('Token saved')
      } else { alert('No token received. Try again') }
      
      // Handle the response
      if (response.data) {
        setSuccessMessage('Signin successful!');
        setEmail('');
        setPassword('');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle errors gracefully
      setError(`An error occurred: ${error.response?.data?.message || error.message}`);
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  return ( 
    <>
      <h2>Login</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {successMessage && <div style={{color:'green'}}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type='email'
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
          type ='password'
          value={password}
          onChange={(e)=> {setPassword(e.target.value)}}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  )
}


export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const { fetchToken, clearToken } = useToken();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    setSuccessMessage('Logout successful!');
    clearToken(); 
    alert('Logout successful');
    navigate('/login');

    // const token = fetchToken();

    // try {
    //     await axiosClient.get('/disconnect', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-token': token,
    //         },
    //     });

    //     setSuccessMessage('Logout successful!');
    //     clearToken(); 
    //     alert('Logout successful');
      
    // } catch (err) {
    //     console.error('Logout failed:', err);
    //     setError('Failed to logout. Please try again.');
    // } finally {
    //     setLoading(false);
    // }
  
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <label htmlFor="logout">Logout</label>
      <button type="button" onClick={handleLogout} disabled={loading}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};
