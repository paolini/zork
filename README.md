# zork dungeon web wrapper

## development

Use two terminals for backend and frontend. 
The commands will watch file modifications and restart automatically.
For the backend:
```
  nodemon
```
For the frontend:
```
  npm start
```
The react-script will serve static files while proxying unknown requests to the server frontend.

The executable is 32 bit, you need 32 bit support if your architecture is 64. Otherwise you will get the error:
```
sh: 1: ./dungeon: not found
```
See https://www.unixmen.com/enable-32-bit-support-64-bit-ubuntu-13-10-greater/
and https://stackoverflow.com/questions/23970684/how-to-install-32-bit-glibc-on-64-bit-ubuntu

Maybe it is enough to execute:
```
sudo apt-get install gcc-multilib
```

## deployment

Build
```
  npm run build
  node server/server.js
```
