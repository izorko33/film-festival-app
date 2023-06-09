# Film Festival App

This is a web application built with React that serves as an online survey tool for a film festival. It allows users to provide feedback on the films screened during the festival.

## Features

- Survey form to collect feedback on films
- Success page displaying submitted feedback
- Mocked API using MirageJS for development and testing
- TypeScript for type safety
- Docker containerization for easy deployment
- Link to live: https://izorko33.github.io/film-festival-app/

## Prerequisites

- Node.js (v14 or higher) and npm installed
- Docker installed (if you plan to run the application using Docker)

## Getting Started

Follow these instructions to set up and run the application locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/izorko33/film-festival-app.git
   ```

2. Install dependencies:
   ```bash
   cd film-festival-app
   npm install
   ```
3. Change .env.example to .env.local and populate with data you choose
   ```bash
   NODE_ENV='development'
   REACT_APP_BACKEND_API=''
   ```
   (for use of mocked api use 'http://localhost:3000' for REACT_APP_BACKEND_API)
4. Start the development server:
   ```bash
   npm start
   ```
   The application will be accessible at http://localhost:3000.

## Mocked API

The application uses MirageJS to mock the API endpoints during development and testing. The mock API responses are defined in the src/services directory. You can modify the mock responses or add new endpoints as needed.

## Building and Running with Docker

To containerize and run the application using Docker, follow these steps:

1. Build the Docker image:

```bash
docker build -t film-festival-app .
```

2. Run the Docker container:

```bash
docker run -p 3000:80 film-festival-app
```

The application will be accessible at http://localhost:3000.

## TypeScript

This project is implemented using TypeScript, providing enhanced type safety and improved developer experience. The source files with TypeScript extensions (.ts or .tsx) can be found in the src directory.

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or new features to propose, please open an issue or submit a pull request.
