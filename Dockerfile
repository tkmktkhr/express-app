FROM node:14-alpine AS build
RUN apk --update --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata
EXPOSE 3030
# COPY test relativeDir/
# COPY test /absoluteDir/
COPY /src ./src
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm i
# COPY . .
# RUN cp -R node_modules ./node

FROM node:14-slim
# COPY --from=[container name] From/path To/path
COPY --from=build /src /src
COPY --from=build /node_modules /node_modules
COPY --from=build package.json ./
COPY --from=build package-lock.json ./
COPY --from=build tsconfig.json ./
# COPY --from=build ./ ./
ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT
CMD npm run $ENVIRONMENT