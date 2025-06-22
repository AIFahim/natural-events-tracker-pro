#!/bin/bash

echo "=== Natural Events Tracker Pro - Conda Setup ==="
echo ""

# Backend setup
echo "1. Setting up Python backend environment..."
conda env create -f environment-backend.yml
echo "✓ Backend conda environment created: natural-events-backend"
echo ""

# Frontend setup
echo "2. Setting up Node.js frontend environment..."
conda env create -f environment-frontend.yml
echo "✓ Frontend conda environment created: natural-events-frontend"
echo ""

# Create .env file for backend
echo "3. Creating backend .env file..."
cd backend
cp .env.example .env
cd ..
echo "✓ Backend .env file created"
echo ""

# Install frontend dependencies
echo "4. Installing frontend dependencies..."
conda activate natural-events-frontend
cd frontend
npm install
cd ..
conda deactivate
echo "✓ Frontend dependencies installed"
echo ""

echo "=== Setup Complete! ==="
echo ""
echo "To run the application:"
echo ""
echo "BACKEND:"
echo "  conda activate natural-events-backend"
echo "  cd backend"
echo "  python run.py"
echo ""
echo "FRONTEND (in a new terminal):"
echo "  conda activate natural-events-frontend"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "The backend API will be available at: http://localhost:8000"
echo "The frontend app will be available at: http://localhost:3000"
echo "API documentation: http://localhost:8000/api/v1/docs"