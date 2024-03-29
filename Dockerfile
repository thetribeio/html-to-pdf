### node_modules
FROM node:16.15.0-slim AS node_modules

RUN mkdir /opt/html-to-pdf && chown node:node /opt/html-to-pdf
WORKDIR /opt/html-to-pdf
USER node

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

### Final image
FROM node:16.15.0-slim

# Install chromium runtime dependencies
# hadolint ignore=DL3008
RUN apt-get update && apt-get install --yes --no-install-recommends \
        ca-certificates \
        fonts-liberation \
        libappindicator3-1 \
        libasound2 \
        libatk-bridge2.0-0 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgbm1 \
        libgcc1 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libnss3 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxi6 \
        libxrandr2 \
        libxrender1 \
        libxss1 \
        libxtst6 \
        lsb-release \
        wget \
        xdg-utils \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /opt/html-to-pdf && chown node:node /opt/html-to-pdf
WORKDIR /opt/html-to-pdf
USER node

# Copy files
COPY --from=node_modules /opt/html-to-pdf/node_modules/ node_modules/
COPY package.json package.json
COPY src/ src/

CMD ["src/index.js"]
