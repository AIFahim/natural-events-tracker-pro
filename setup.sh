#!/bin/bash

echo "Setting up Natural Events Tracker Pro..."

# Backend setup
echo "Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
echo "Backend setup complete!"

# Frontend setup
echo "Setting up frontend..."
cd ../frontend
npm install
echo "Frontend setup complete!"

echo "Setup complete! To run the application:"
echo "1. Backend: cd backend && source venv/bin/activate && python run.py"
echo "2. Frontend: cd frontend && npm start"