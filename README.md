# GoodWords
Project for Sazim technical




## Content of Contents


  - [Table of Contents](#table-of-contents)
  - [Cloning the Repository](#cloning-the-repository)
  - [Setup](#setup)



## Cloning the Repository

To clone the repository from GitHub, in the directory you select run the following command:

```
git clone https://github.com/emondsarker/GoodWords.git
```

## Setup

The project is divided into two folders mainly `client` and `backend`. The setup for backend requires you to have PostgreSQL installed on your machine and a database created the details of which should be in your .env file.

In the `client` folder and run the command:
```
npm install
```


In the `backend` folder and run the command:
```
npm install
```


To update the database with your schema run

```
npx prisma migrate dev
```

To start the server, navigate to `backend` and run 
```
nodemon index.js
```

To start the front end, navigate to `client` and run 
```
npm run dev
```

