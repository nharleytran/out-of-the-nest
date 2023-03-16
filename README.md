# Out of the Nest 

Embarking on a life journey after undergrad is challenging, and the journey comes with hard work, anxiety, waiting, and coordination. One significant stressor for many students, especially at Johns Hopkins University, is either the admission process to graduate and professional school or the job application. With tons of schools, job descriptions, and varying admissions guidelines, this process is rather confusing and difficult to start with, especially for freshmen and sophomores. For example, a freshman who want to pursue a software engineering career should prioritize very different things compared to ones who are interested in computer research.  

We want to create a platform that allows graduates and upperclassmen to post submissions about their admissions and job recruiting journeys, offering connection and insight to others in the same boat. This information includes GPA, extracurricular activities, essays, resume, and other personal recommendations that we believe will be helpful in guiding underclassmen to pursue their aspiring career pathway properl

## Installing / Getting started

We first need to install the packages. 

```
  $ yarn install
```
To run the server,
```
  $ yarn server
```
and open another terminal to run the client,

```
  $ yarn client
```

## Developing

For setting up the database, we use Mongo Atlas (version 5.0.15).  
Copy `.env` from slack channel to the root folder.  

To run the test for front-end,

```
  $ yarn test-frontend
```
and run the test for back-end,

```
  $ yarn test-backend
```

## Deployment

The App is deployed [here](https://sp23-oose-project-team-13.vercel.app/).  
The App (dev branch) is deployed [here](https://sp23-oose-project-team-13-git-dev-team13jhu.vercel.app/).  

The Back-End API is deployed [here](https://sp23-oose-project-team-13.vercel.app/api/).
