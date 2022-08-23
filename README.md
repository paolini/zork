# zork dungeon web wrapper

## development

Use two terminals for backend and frontend. 
The commands will watch file modifications and restart automatically.
For the backend:

  nodemon

For the frontend:

  npm start

The react-script will serve static files while proxying unknown requests to the server frontend.

## deployment

Build

  npm run build
  node server/server.js
