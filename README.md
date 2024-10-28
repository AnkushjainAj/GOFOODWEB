
# GoFood 🍔

**GoFood** is a full-stack food-ordering platform built with the MERN stack, designed to handle over 200 daily orders with zero downtime. This application enhances user experience and operational efficiency for restaurants and consumers alike.

## 🎉 Features
- **User Authentication**: Secure user registration and login for an improved user experience.
- **Restaurant Listings**: Browse a wide range of restaurants and their menus effortlessly.
- **Order Management**: Add items to the cart, manage orders, and enjoy seamless checkout.
- **Responsive Design**: Fully optimized for mobile and desktop devices for a great user experience.
- **Real-Time Notifications**: Users receive real-time updates on their order status.
- **State Management**: Utilized Redux for efficient state management across the application.

## 📈 Achievements
- Developed a full-stack food-ordering platform that handles **200+ daily orders with zero downtime**.
- Improved user experience by implementing **Redux for state management** and optimizing the app for cross-device responsiveness.
- Optimized backend processes, ensuring **stable performance and fast load times**, even under high traffic (reduced response times by **25%**).
- Integrated **MongoDB** with robust queries, ensuring **reliable and efficient data handling** for user orders and sessions.

## 🛠️ Built With
- **MongoDB** - NoSQL database for storing user data and orders.
- **Express.js** - Web framework for building the server-side application.
- **React** - Frontend library for creating interactive user interfaces.
- **Node.js** - JavaScript runtime for executing server-side code.
- **Axios** - For making HTTP requests to the server.
- **Redux** - For managing application state.

## 📂 Project Structure
- **/client**: Contains the frontend React application.
- **/server**: Contains the backend Express application.
- **/models**: Database models for MongoDB.
- **/routes**: API routes for handling requests.
- **/controllers**: Logic for managing requests and responses.

## 📄 Usage
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YourUsername/gofood.git
   cd gofood
   ```
2. **Navigate to Client and Server**:
   - Open two terminal windows.
   - In the first terminal, navigate to the server directory and start the server:
     ```bash
     cd server
     npm install
     npm start
     ```
   - In the second terminal, navigate to the client directory and start the React application:
     ```bash
     cd client
     npm install
     npm start
     ```

## 🚀 Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your local machine.
- **MongoDB** instance running (local or cloud).

### Environment Variables
- Create a `.env` file in the server directory and add the following:
  ```bash
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  ```

### Running Tests
To ensure everything works as expected, run the test suite in the server directory:
```bash
npm test
```

### Building for Production
To create an optimized build of the client application:
```bash
cd client
npm run build
```

## 🌌 Technologies Used
- **MERN Stack**: MongoDB, Express, React, Node.js.
- **JWT**: For user authentication.
- **Bcrypt**: For hashing passwords.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the project.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments
Thanks to all contributors and the community for their support in making this project a success.
