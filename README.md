## fhdw-pdw-shop-frontend

# SIP.SHOP
## Setup Guide
- Install node and npm `node v14.17.3 (npm v6.14.13)`
  - You can use nvm (node version manager) to manage multiple versions of node `https://github.com/nvm-sh/nvm`
  - To install the suitable version: `nvm install 14`
  - To use the suitable version: `nvm use 14`
  - `!!Caution!!:` You need to reset the node version in every new terminal session. To set it use: `nvm use 14`
- Install dependencies with `npm i` (install) or `npm ci` (clean-install)
- Copy `_.env` file to `.env`
- Finally `RUN THAT SH*T!`

### Ways to run the hyper shop falcon 3000 edition
- Start development server with hot reload as a special effect
  - Run `npm run dev`
  - Brows to `localhost:3000`
- Build the project for production mode and launch the server
  - `npm run build`
  - `npm run start`
- Generate static project
  - npm run generate
