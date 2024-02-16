# Ride Hailing Aggregator API 

This project is a Ride Hailing API built with NestJS, providing endpoints to retrieve offers from multiple providers.

## Installation

Clone the repository and install dependencies using npm:

```bash
npm install
```  

## Configuration

Ensure you have the necessary environment variables configured. Update .env with your settings.

## Usage

Start the server with the following command:

```bash
npm start
```  

The API will be available at http://localhost:3001.

## Swagger Documentation

You can access the OpenAPI Swagger documentation for this API by visiting:

```bash
http://localhost:3000/api
```

## Endpoints

- GET /offers: Get offers from all providers.
- GET /offers/error: Trigger an error response.

## Error Handling

The application includes http exception handler 'HttpExceptionFilter' to respond gracefully in case of errors. It also includes a custom MalformedOfferException in case critical values are missing from providers.

## Testing

Run unit tests with the following command:

```bash
npm test
```

## Dependencies

- `@nestjs/common`: Provides common functionalities for NestJS applications.
- `@nestjs/testing`: Provides utilities for testing NestJS applications.
- `@nestjs/config`: A NestJS utility to manage env variables.
- `@nestjs/swagger`: A NestJS utility to generate and update swagger document on the fly.
- `jest`: Testing framework for JavaScript applications.
- `@nestjs/platform-express`: Integration with the Express web framework.