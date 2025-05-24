#!/bin/bash

echo "=== Step 1: Installing Python 3 (if not installed) ==="
if ! command -v python3 &> /dev/null; then
  echo "Installing Python..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    brew install python
  else
    sudo apt update && sudo apt install -y python3 python3-pip
  fi
else
  echo "Python is already installed."
fi

echo "=== Step 2: Installing backend dependencies ==="
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

echo "=== Step 3: Installing frontend dependencies ==="
cd frontend
npm install

echo "=== Step 4: Running frontend dev server ==="
npm run dev