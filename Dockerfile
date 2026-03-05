FROM node:24.14.0-bookworm

USER node

WORKDIR /home/node/questly

CMD [ "tail", "-f", "/dev/null" ]