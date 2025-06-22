#!/usr/bin/env python3
"""
Setup script for Natural Events Tracker Pro
"""
import os
import sys
import subprocess
import platform

def run_command(command, cwd=None):
    """Run a shell command and return success status"""
    try:
        subprocess.run(command, shell=True, check=True, cwd=cwd)
        return True
    except subprocess.CalledProcessError:
        return False

def setup_backend():
    """Setup backend environment"""
    print("\n📦 Setting up backend...")
    os.chdir('backend')
    
    # Create virtual environment
    print("Creating virtual environment...")
    if platform.system() == "Windows":
        run_command("python -m venv venv")
        activate_cmd = "venv\\Scripts\\activate"
    else:
        run_command("python3 -m venv venv")
        activate_cmd = "source venv/bin/activate"
    
    # Install dependencies
    print("Installing backend dependencies...")
    if platform.system() == "Windows":
        run_command("venv\\Scripts\\pip install -r requirements.txt")
        run_command("venv\\Scripts\\pip install pydantic-settings")
    else:
        run_command("venv/bin/pip install -r requirements.txt")
        run_command("venv/bin/pip install pydantic-settings")
    
    # Create .env file if not exists
    if not os.path.exists('.env'):
        print("Creating .env file...")
        if os.path.exists('.env.example'):
            run_command("cp .env.example .env" if platform.system() != "Windows" else "copy .env.example .env")
    
    os.chdir('..')
    print("✅ Backend setup complete!")
    print(f"   To activate: {activate_cmd}")

def setup_frontend():
    """Setup frontend environment"""
    print("\n📦 Setting up frontend...")
    os.chdir('frontend')
    
    # Install dependencies
    print("Installing frontend dependencies...")
    if not run_command("npm install"):
        print("❌ Failed to install frontend dependencies")
        print("   Make sure Node.js and npm are installed")
        return False
    
    # Create .env file if not exists
    if not os.path.exists('.env'):
        print("Creating .env file...")
        with open('.env', 'w') as f:
            f.write("REACT_APP_API_URL=http://localhost:8000/api/v1\n")
    
    os.chdir('..')
    print("✅ Frontend setup complete!")
    return True

def main():
    """Main setup function"""
    print("🚀 Natural Events Tracker Pro Setup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists('backend') or not os.path.exists('frontend'):
        print("❌ Error: backend and frontend directories not found")
        print("   Make sure you're running this from the project root")
        sys.exit(1)
    
    # Setup backend
    setup_backend()
    
    # Setup frontend
    setup_frontend()
    
    print("\n✨ Setup complete!")
    print("\nTo run the application:")
    print("\nBackend:")
    print("  cd backend")
    if platform.system() == "Windows":
        print("  venv\\Scripts\\activate")
    else:
        print("  source venv/bin/activate")
    print("  python run.py")
    print("\nFrontend (new terminal):")
    print("  cd frontend")
    print("  npm start")
    print("\n📖 Visit http://localhost:3000 to see the app")
    print("📚 API docs: http://localhost:8000/api/v1/docs")

if __name__ == "__main__":
    main()