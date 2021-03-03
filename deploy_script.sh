#!/usr/bin/bash

# Conda envinronment
source ~/miniforge3/etc/profile.d/conda.sh
conda activate MDS_env

echo "========  !!!!   Installing npm/yarn dependencies"
cd frontend
yarn install
cd ../backend
yarn install

echo "========  !!!!   Building for production"
# Build the frontend
cd ../frontend
rm -rf dist
yarn build
# Build the backend
cd ../backend
yarn build-prod

echo "========  !!!!   Serving backend"
echo "  ---     (frontend is static and should already be configured in nginx)"
# Replace the served files with the new ones
cd ../frontend
rm -rf dist_nginx
mv dist dist_nginx

# Serve the new backend
cd ../backend
# Kill old process
PORT=$(grep -oP '^PORT=\K.*' .env)
kill $(lsof -t -i :${PORT})
# Serve
yarn serve
