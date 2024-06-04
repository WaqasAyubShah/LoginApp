Welcome to new video:

Today we will sol error:
nodemon : The term 'nodemon' is not recognized as the name of a cmdlet,

Tohandle this I also try:
a) npm install -g nodemon
b) npm install --location=global nodemon
& also added: Set-ExecutionPolicy Unrestricted in Powershell but didn't work,
So I find a new way around:

Old code

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},

New Code

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"server" : "nodemon index.js"
},

After this we have to run the server: npm run server

Hope it will help, if it do, subscribe. Thanks
