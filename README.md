# Expero - Mentorship App

An application that introduces people to mentors in their field for professional guide. The mentors receive incentives for the time spent in mentoring others. People can subscribe to mentoring session/webinars of their mentors. Mentors can also publish articles, mentees can interact with the posts, and also give reviews.

## Installation

The Project needs several packages to run:

1. Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - https://redis.io/downloads/):

``` bash
$ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
$ tar xzf redis-6.0.10.tar.gz
$ cd redis-6.0.10
$ make
```

2. Download and start the mongodb server. My installation was done on Ubuntu Jammy version 22.0(PopOs).

```bash
$ curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor

$ echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

$ sudo apt-get update

$ sudo apt-get install -y mongodb-org

$ sudo service mongod start

```

3. Start the Nodejs server, from the main folder. Run npm install to install all required node modules.

```bash
$ npm install 

$ npm run start-server

```

3. Start the react frontend server

```bash
$ cd frontend

$ npm run dev
```

## Web pages

1. To sign up
```bash
    http://localhost:5173/signup
```

2. To login
```bash
    http://localhost:5173/login
```

3. To update details
```bash
    http://localhost:5173/update_details
```

4. To view dashboard

```bash
    http://localhost:5173/dashboard
```

5. To view blogs

```bash
    http://localhost:5173/blogs
```

6. To create blogs

```bash
    http://localhost:5173/create_blogs
```

7. Home page

```bash
    http://localhost:5173/
```

8. About page

```bash
    http://localhost:5173/about
```

## Authors

1. Adesuyi Adegbenga James (mee-rich) - Email: Meerichy@gmail.com
2. Ugochukwu Lopez (Lopdee) - Email: ugochukwulopezubani@gmail.com
3. Ilyass Ettourach(Ettourach) - Email: ettourach@gmail.com


