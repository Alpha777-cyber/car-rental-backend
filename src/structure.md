src/
 ├── config/
 │    └── db.js                     # MongoDB or SQL connection setup
 │
 ├── controllers/                   # Controllers handle HTTP requests
 │    ├── auth.controller.js
 │    ├── car.controller.js
 │    ├── booking.controller.js
 │    └── review.controller.js
 │
 ├── models/                        # Models define database schemas
 │    ├── user.model.js
 │    ├── car.model.js
 │    ├── booking.model.js
 │    └── review.model.js
 │
 ├── routes/                        # Route definitions
 │    ├── auth.routes.js
 │    ├── car.routes.js
 │    ├── booking.routes.js
 │    └── review.routes.js
 │
 ├── middlewares/                   # Middleware for auth, error handling, validation
 │    ├── auth.middleware.js
 │    ├── error.middleware.js
 │    └── validate.middleware.js
 │
 ├── utils/                         # Utility functions (logger, helpers)
 │    └── logger.js
 │
 ├── app.js                          # Express app + middleware + routes setup
 └── server.js                       # Server bootstrap