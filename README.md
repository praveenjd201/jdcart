



##steps to follow deploy the application.

After run the aws server need to install node js -- search google "aws node install"
url -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

Refer above search document and install nodejs.

To check node version => node -v
To check npm version => npm -v

steps to clone application from GitHub.

enter the following command on aws Linux server

=> sudo yum update -y
=> sudo yum install git -y

To get git version => git --version

To clone the application form the git => git clone <application Url>

After cloning need to install npm packages on backend and frontend. using following command.
=> npm install

To create build on fronend => npm run build

To run server on uninturpted using npm forever. search npm forever start

To install forever => npm install forever -g

to run the app => forever start backend/server.js

to start the app => forever stop backend/server.js

when changes made in project.

to pull project from GitHub => git pull

after pull again buid the app using => npm run build

---------------------------------------------------------------

Run the application using ip with out port (proxy_port)


we can use nginx for proxy pass

=> sudo yum install -y nginx
To enable nginx service => sudo systemctl enable nginx
To start nginx service => sudo systemctl start nginx

congiuration proxypass on nginx

To edit nginx:
=>sudo vim /etc/nginx/nginx.conf      // vim is used to open the editor to edit the file.

after the open the file, to edit the file click the "insert key"

type the following on details on inside the server object server{}

location / {
	proxy_pass http://localhost:8000;
}

then save the file click esc key and : and click x and then enter.

To restart nginx => sudo systemctl restart nginx







