FROM node:14-alpine AS devCon
# Copy all except files in .gitignore
COPY . .
RUN npm i

FROM node:14-slim
# COPY --from=[container name] From/path To/path
EXPOSE 3030
COPY --from=devCon /src /src
COPY --from=devCon /node_modules /node_modules
COPY --from=devCon ["package*.json", "tsconfig.json", "./"]
ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
CMD npm run $ENVIRONMENT