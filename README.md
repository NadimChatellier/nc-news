# Mithril News - Frontend

![image](https://github.com/user-attachments/assets/820dd353-cc3f-4082-9bbc-27dff70dfdfb)

![image](https://github.com/user-attachments/assets/a37d3856-ee44-47cf-a04c-ceeae202c5ba)

## Project Overview

**Mithril News** is a fullstack application that allows users to post, interact with, and browse articles. The frontend is built using **React** with **Vite** as the build tool, providing a fast and efficient development experience. The app communicates with the backend via API calls, and the user interface is designed with **Material UI (MUI)** for a responsive, modern design.

This repository hosts the frontend portion of the application, which allows users to register, log in, create and view articles, and more.

## Features

- **User Authentication**: Users can register, login, and authenticate via JWT tokens to access protected routes.
- **Article Management**: Users can view, create, update, and delete articles.
- **Responsive UI**: The application is mobile-friendly, with an intuitive interface designed using Material UI (MUI).
- **Real-Time Updates**: The application interacts with the backend, providing live updates when articles are created or modified.
- **Routing and State Management**: React Router is used for navigation, and global state is managed with React’s Context API.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool for fast development and optimized production builds.
- **Material UI (MUI)**: UI component library for building modern, responsive user interfaces.
- **Supabase**: For managing user authentication and real-time database.
- **React Router**: For handling client-side routing and navigation.
- **CSS & HTML**: For custom styling and layout.

## Installation

##1. Clone the Repository

```bash
git clone https://github.com/NadimChatellier/nc-news

### 2. Install dependencies

npm install

### 3. Set Up Environment Variables
Create a .env file in the root of the project and add the following:

REACT_APP_API_URL=http://your_backend_api_url
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
Make sure to replace the placeholder values with your actual environment variables.


### 4. Run the Development Server

npm run dev
Visit http://localhost:3000 in your browser to view the application.

#Usage
Authentication: Users can log in and register via the authentication forms. Upon logging in, JWT tokens are stored in local storage to manage user sessions.
Article Interaction: Users can create, view, update, and delete articles. The application will display articles in a list and provide form interfaces for managing them.
Responsive Design: The app is fully responsive, designed to work seamlessly on both desktop and mobile devices.
