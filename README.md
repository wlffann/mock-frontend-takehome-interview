# Mock Frontend Take Home Interview

This is a simple repo that can be used for mock interviews.

## Setup Instructions

This repo includes a local backend server and a React app that is built using Parcel.

First, [install SQLite](https://www.sqlite.org/download.html) by downloading it or using a tool like [Homebrew](https://formulae.brew.sh/formula/sqlite). 

Run the following commands to set up the project:
```
npm install
npx knex migrate:latest
npx knex seed:run
```

To run the backend in one terminal:
```
npm run server
```

To run the frontend in another terminal:
```
npm start
```

## Description
This is a dead simple blog interface.
