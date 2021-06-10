FROM node:14-alpine AS build
RUN apk --update --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata
EXPOSE 3030
# WORKDIR /src
# COPY test relativeDir/
# COPY test /absoluteDir/
COPY /src ./src
COPY package.json ./
COPY package-lock.json ./
RUN npm i

FROM node:14-slim
# COPY --from=[container name] From/path To/path
COPY --from=build /src /src
COPY . .
ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
CMD npm run $ENVIRONMENT