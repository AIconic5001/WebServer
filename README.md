# WebServer

This is for web server development: backend and frontend

Planned Tech Stacks:
Frontend:

- HTML, CSS
- React
- jQuery
- Redux

Backend:

- SQL
- Python: Flask, Jinja

Frontend Notes:
The website is deployed from the branch `kalliopeWeb`. Any new updates should be merged into that branch after being reviewed for new deployments

### **!IMPORTANT:** Do NOT merge PR from branch `kalliopeWeb` into `main`.

## Requirements to test

Node.js
Python

## How to run this app

- Step 1: Clone this branch
- Step 2: `npm i` to install all package in frontend folder
- Step 3: `python -m venv venv` to create a virtual env
- Step 4: `pip install -r requirements.txt` to install python package
- Step 5: `flask run` to deploy local backend server
- Step 6: On another CLI, `npm run dev` to deploy the frontend and start testing
