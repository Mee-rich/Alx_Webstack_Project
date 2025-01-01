import React, { Component } from 'react';
import axios from 'axios';

class BlogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateBlogs: false, // State to toggle between views
      posts: [], // State to store fetched blog posts
    };
  }

  // Fetch blogs from API when component mounts
  componentDidMount() {
    axios.get('http://localhost:5000/blogs')
      .then(res => {
        this.setState({ blogs : res.data });
      })
      .catch(error => {
        console.error("There was an error fetching the blog posts!", error);
      });
  }

  // Method to render list of blogs
  blogs() {
    return (
      <div>
        <h2>Blogs</h2>
        <ul>
          {this.state.blogs.map(blog => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <h3>{blog.snippet}</h3>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Method to render create blog form
  createBlogs() {
    return (
      <div>
        <h2>Create a New Blog</h2>
        <form>
          <label>
            Title:
            <input type="text" name="title" required />
          </label>
          <br />
          <label>
            Snippet:
            <textarea name="snippet" required></textarea>
          </label>
          <br />
          <label>
            Content:
            <textarea name="body" required></textarea>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  // Toggle between viewing blogs and creating a new blog
  toggleView = () => {
    this.setState((prevState) => ({
      showCreateBlogs: !prevState.showCreateBlogs,
    }));
  };

  // Render method
  render() {
    const { showCreateBlogs } = this.state;

    return (
      <div>
        <h1>Blog Page</h1>
        <button onClick={this.toggleView}>
          {showCreateBlogs ? 'View Blogs' : 'Create Blog'}
        </button>
        {showCreateBlogs ? this.createBlogs() : this.blogs()}
      </div>
    );
  }
}

export default BlogComponent;
