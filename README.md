This is a full-stack demo using the MERN stack + Nginx + Docker and docker-compose.

Steps to test
1. Download or clone the repo
2. run "npm install" in the client and server directories to download hte necessary dependencies and create the node_modules directory
3. run docker-compose up to build container images and start-up containers

From there you should be able to test the app from localhost:3000 (client-only), localhost:3001 (server-only) or localhost (reverse-proxy for both)
