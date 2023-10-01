FROM node:14-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

#RUN npm run build
#CMD ["npx", "serve", "-s", "build"]
