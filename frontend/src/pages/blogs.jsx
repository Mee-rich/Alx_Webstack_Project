import { useState, useEffect } from 'react';
import axiosClient from '../components/AxiosClient';
import { useNavigate } from 'react-router-dom';


export const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an array
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch blogs when component mounts
    const allBlogs = async () => {
      try {
        const response = await axiosClient.get('/blogs');
        setBlogs(response.data.formattedBlogs);
        setSuccessMessage('Blogs fetched successfully!');
      } catch (error) {
        setError(
          `An error occurred: ${error.response?.data?.message || error.message}. Please try again later.`
        );
      }
    };

    allBlogs();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div>
      <h2>Blogs</h2>
      {/* Display error and success messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Conditional rendering for blogs */}
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.snippet}</p>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading blogs...</p> // Display loading message if no error
      )}
    </div>
  );
};



export const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the message and error
    setError('');
    setSuccessMessage('');

    // Start loading indicator
    setLoading(true);

    try {  
      const response = axiosClient.post(
        '/blogs',
        {
          title,
          snippet,
          content
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

       if (response.data) {
        setSuccessMessage('New blog added!')
        setSnippet('')
        setContent('')
        setTitle('')
      } else {
        setError('Unable to add blog.')
      }
    } catch (error) {
        setError(`An error ${error.response?.data?.message || error.message} occurred. Please try again later.`)
    }

    alert('Blog created')
    navigate('/blogs')
    
  }

  return (
    <div>
        <h2>Create a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Snippet:
            <textarea
              name="snippet"
              value={snippet}
              onChange={(e)=> setSnippet(e.target.value)}
              required
            ></textarea>
          </label>
          <br />
          <label>
            Content:
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </label>
          <br />
          <button type="submit" disabled={loading}> {loading ? 'Creating blog' : 'Create blog'}</button>
        </form>
        {successMessage && <p style={{color:'green'}}>{successMessage}</p>}
        {error && <p style={{color:'red'}}>{error}</p>}
      </div>
  );
}

