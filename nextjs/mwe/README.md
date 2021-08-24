# Mitwemessen

## What is it about?

In hybrid work models, you need to know, on which days someone is in the office to go for lunch. This nice app helps you to maintain this information and distribute it to colleauges.

<img src="docs/screen1.png" width=300>
<img src="docs/screen2.png" width=300>
<img src="docs/screen3.png" width=300>
<img src="docs/screen4.png" width=300>

## Getting started

- Install node
- Clone repository
- npm install
- Copy env file
- npm run build
- In Prisma folder: yarn prisma migrate dev --name init
- Setup nginx and letsencrypt certs using certbot
- Route nginx config to node server
- Use pm2 to run node server on startup
