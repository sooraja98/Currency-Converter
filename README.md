# Crypto Converter Application

This project includes a frontend built with React and Material-UI, and a backend developed using Node.js, Express, and Axios.

## Features

- Fetch and display a list of the top 100 cryptocurrencies
- Convert cryptocurrencies to various fiat currencies
- Responsive and user-friendly interface

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
Frontend Setup:
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd crypto-converter-frontend
yarn install
Backend Setup:
Navigate to the backend directory and install dependencies:

bash
Copy code
cd ../crypto-converter-backend
yarn install
Running the Application
Start the Frontend:
In the frontend directory, run:

bash
Copy code
yarn start
The frontend will be available at http://localhost:3000.

Start the Backend:
In a separate terminal, navigate to the backend directory and run:

bash
Copy code
yarn start
The backend server will start on http://localhost:3000.

Backend API Endpoints
GET /api/cryptocurrencies: Fetches the top 100 cryptocurrencies
POST /api/convert: Converts a specified amount of cryptocurrency to fiat currency
