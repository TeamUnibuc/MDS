#!/usr/bin/bash

# Conda envinronment
source ~/miniforge3/etc/profile.d/conda.sh
conda activate MDS_env

echo "========  !!!!   Installing npm/yarn dependencies"
cd frontend
yarn install --check-file
cd ../backend
yarn install --check-file

echo "========  !!!!   Building for production"
# Build the frontend
cd ../frontend
rm -rf dist
yarn build-prod
# Build the backend
cd ../backend
yarn build-prod

echo "========  !!!!   Serving"
echo "  ---     (frontend is static and should already be configured in nginx)"
# Replace the served files with the new ones
cd ../frontend
rm -rf dist_nginx
mv dist dist_nginx

# Serve the new backend
cd ../backend
# Kill old process
PORT=$(grep -oP '^PORT=\K.*' .env)
echo "Port is: ${PORT}"
kill -9 $(lsof -t -i :${PORT})
# Serve
nohup yarn serve &

# Start the engine backgrround process
cd ../engine
# Kill old process
PORT=4242
echo "Port is: ${PORT}"
kill -9 $(lsof -t -i :${PORT})
# Start
nohup python engine.py &

# disown -h %1
# disown -h %2
