#!/usr/bin/zsh

echo "Verifying NPM and NodeJS are installed..."
npmExists="$(which npm)"
nodeExists="$(which node)"

if [ -z "$npmExists" ]; then
  echo 'Install NPM 10 or 11'
  exit 1
fi

if [ -z "$nodeExists" ]; then
  echo 'Install NodeJS 22 or 24'
  exit 1
fi

echo "NPM and NodeJS are installed"

echo "Verifying Valid NPM and NodeJS versions are installed..."

npmVersion="$(npm -v)"
nodeVersion="$(node -v)"

if [[ "$npmVersion" =~ ^1[01]\.[0-9]+\.[0-9]+$ ]]; then
    echo "Using valid version of NPM"
else
    echo "Need to be using NPM version 10 or 11"
    exit 1
fi

if [[ "$nodeVersion" =~ ^v2[24]\.[0-9]+\.[0-9]+$ ]]; then
    echo "Using valid version of NodeJS"
else
    echo "Need to be using NodeJS version 22 or 24"
    exit 1
fi

# Enable the following 2 lines if you haven't already run npm ci or npm i (got tired of IDE indexing due to node_modules "changing" every npm ci)
#echo "Installing NPM Dependencies From package-lock.json"
#npm ci
echo "Running 'npm run build'. This may take a minute..."
npm run build
echo "Source build completed. Zipping contents for upload"
rm -f history-block.zip # Remove existing zip file if it exists
cd dist
zip -r -FS ../history-block.zip *
cd ..
echo "Build output to dist directory. dist directory zipped to history-block.zip"
