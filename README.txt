project-directory/
│
├── models/
│   ├── User.js         # User Model for storing users
│   └── Task.js         # Task Model for user tasks
│
├── routes/
│   ├── authRoutes.js   # Routes for signup, login, and logout
│   └── taskRoutes.js   # Routes for task management (create, edit, delete tasks)
│
├── middleware/
│   └── authMiddleware.js # Middleware to protect routes for authenticated users
│
├── .env                # Environment variables for MongoDB connection and JWT secret
├── server.js           # Main server file
└── package.json        # Project metadata and dependencies
