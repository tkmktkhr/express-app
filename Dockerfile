FROM node:14-alpine AS devCon
RUN apk --update --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata
EXPOSE 3030
# Copy all except files in .gitignore
COPY . .
RUN npm i

FROM node:14-slim
# COPY --from=[container name] From/path To/path
COPY --from=devCon /src /src
COPY --from=devCon /node_modules /node_modules
COPY --from=devCon ["package*.json", "tsconfig.json", "./"]
ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
CMD npm run $ENVIRONMENT