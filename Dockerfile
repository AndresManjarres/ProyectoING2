FROM node:18-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev

COPY index.mjs .
COPY src ./src/

ENV MONGO_URI mongodb+srv://aaaaa:077olcr1zBb1n7fC@cluster0.doacvbo.mongodb.net/?retryWrites=true&w=majority
ENV PORT 5001
ENV MINIO_HOST http://minio:9000
ENV MINIO_ACCESS_KEY andresmanjarres
ENV MINIO_SECRET_KEY mi_contraseña_segura123 

EXPOSE 5001

ENTRYPOINT ["npm", "start"]