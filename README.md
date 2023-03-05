# Out of the Nest 

Embarking on a life journey after undergrad is challenging, and the journey comes with hard work, anxiety, waiting, and coordination. One significant stressor for many students, especially at Johns Hopkins University, is either the admission process to graduate and professional school or the job application. With tons of schools, job descriptions, and varying admissions guidelines, this process is rather confusing and difficult to start with, especially for freshmen and sophomores. For example, a freshman who want to pursue a software engineering career should prioritize very different things compared to ones who are interested in computer research.  

We want to create a platform that allows graduates and upperclassmen to post submissions about their admissions and job recruiting journeys, offering connection and insight to others in the same boat. This information includes GPA, extracurricular activities, essays, resume, and other personal recommendations that we believe will be helpful in guiding underclassmen to pursue their aspiring career pathway properl

## Installing / Getting started

We first need to install MongoDB, and NodeJs. Then we install packages in server and client directories.

```
   $ cd client
   $ npm install
   $ cd ..
   $ cd server
   $ npm install
   
```
To run the server,
```
$ cd server
$ nodemon index.js
```
and the client side,

```
$ cd client
$ npm start
```

## Developing

For setting up the database, we use Mongo Atlas (version 5.0.15), edit `.env` to change the URL. That's all we need to start developing the app.

## Deployment

The App is deployed [here](https://sp23-oose-project-team-13.vercel.app/). <br/>
The Back-End API is deployed [here](https://outofthenest.fly.dev/).
