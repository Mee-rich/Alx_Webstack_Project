import dbClient from '../utils/db'
import Queue from 'bull/lib/queue';
import { ObjectId } from 'mongodb';

const objId = ObjectId;
const blogQueue = new Queue('New blog');

export default class BlogController {
    static async blogNew (req, res) {
        const title = req.body ?  req.body.title : null;
        const snippet = req.body ? req.body.snippet : null;
        const content = req.body ? req.body.content : null;

        if (!title) {
            return res.status(400).json({ error: 'Blog title missing!'} );
        }
        if (!snippet) {
            return res.status(400).json({ error: 'Blog snippet missing!' });
        }
        if (!content) {
            return res.status(400).json({ error: 'Blog content missing!' });
        }

        // checking if the blog was posted by a mentor


       const  insertData = await (await dbClient.blogsCollection())
            	.insertOne({
                	title,
                	snippet,
                	content
            	});

        const blogId = insertData.insertedId.toString();

        blogQueue.add(blogId);
        res.status(200).json({ blogId, title });
    }

    static async getBlogById(req,res) {
        const blogId = req.body.id.toString();

        if (!blogId) {
            return res.status(400).json({ error: "Blog ID missing!" });
        }

        let fetchId = new objId(blogId);

        const blog = await (await dbClient.blogsCollection()).findOne({ _id: fetchId });

        if (!blog) {
            return res.status(400).json({ error: "Blog not found!" });
        }

        res.status(200).json({ 
            title: blog.title,
            snippet: blog.snippet,
            content: blog.content,
             })
    }

    static async allBlogs(req, res) {
        const blogs = await (await dbClient.blogsCollection()).find().toArray();

        const formattedBlogs = blogs.map(blog=> ({
            id: blog._id,
            title: blog.title,
            snippet: blog.snippet,
            content: blog.content,
        }));

        res.status(200).json({
            formattedBlogs
        })
    }
}   
