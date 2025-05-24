@echo off
echo === Step 1: Installing Python ===
winget install -e --id Python.Python.3.11

echo === Step 2: Adding Python to PATH (you may need to restart terminal) ===
setx PATH "%PATH%;%LocalAppData%\Programs\Python\Python311\Scripts;%LocalAppData%\Programs\Python\Python311"

echo === Step 3: Installing Python dependencies ===
python -m pip install --upgrade pip
pip install -r requirements.txt

echo === Step 4: Installing frontend dependencies ===
cd frontend
npm install

echo === Step 5: Running frontend dev server ===
npm run dev