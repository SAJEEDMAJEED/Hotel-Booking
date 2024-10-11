Hotel Booking System API

A RESTful API for hotel booking, handling user authentication, room management, booking, and payments. Built with Node.js, Express, MongoDB, Stripe, Redis, and Docker, and deployable on AWS.
Features

    User Authentication: JWT-based secure authentication
    Room Management: Create, update, and list rooms
    Booking and Payments: Date validation, Stripe for payments
    Caching & Rate Limiting: Redis cache and rate limiting for performance
    API Versioning: Structured for easy upgrades
    Docker & AWS: Containerized and deployable on AWS ECS/Elastic Beanstalk

Project Structure

bash

hotel-booking-api/
├── controllers/           # Business logic for auth, rooms, booking, payments
├── middleware/            # Auth, validation, rate limiting
├── models/                # MongoDB schemas
├── routes/                # API routes
├── cache.js               # Redis setup
├── Dockerfile             # Docker configuration
└── app.js                 # Main app file

Setup

    Install: npm install
    Configure: Add .env file for MongoDB, Redis, and Stripe.
    Run: npm start (Runs at http://localhost:3000/v1)

Dockerization

    Build Image: docker build -t hotel-booking-api .
    Run Container: docker run -p 3000:3000 --env-file .env hotel-booking-api

AWS Deployment
ECS or Elastic Beanstalk

    ECR: Push Docker image to AWS ECR.
    ECS/Elastic Beanstalk: Deploy using ECS for a custom setup or Elastic Beanstalk for managed Docker hosting.

