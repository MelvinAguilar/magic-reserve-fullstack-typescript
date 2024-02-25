<div id="top"></div>

<div align="center">
  <h1 align="center">Magic Reserve - Full Stack Typescript App</h1>

![](https://i.imgur.com/TAOsfcF.png)

> ~

> Magic Reserve is a platform where users can reserve tickets for guided tours to a magical destination. The platform provides an interactive experience for users to explore various tours, make reservations.

>
> Server
> <p align="center">
>   <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
>   <img src="https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongoose&logoColor=white" />
>   <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
>   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
>   <img src="https://img.shields.io/badge/JSONWebTokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
>   <img src="https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white" />
>   <img src="https://img.shields.io/badge/Helmet-0C0C0C?style=for-the-badge&logo=helmet&logoColor=white" />
>   <img src="https://img.shields.io/badge/Bcrypt-430089?style=for-the-badge&logo=bcrypt&logoColor=white" />
>   <img src="https://img.shields.io/badge/ExpressRateLimit-000000?style=for-the-badge&logo=express&logoColor=white" />
>   <img src="https://img.shields.io/badge/Validator-000000?style=for-the-badge&logo=validator&logoColor=white" />
>   <img src="https://img.shields.io/badge/XSSClean-000000?style=for-the-badge&logo=xss-clean&logoColor=white" />



> </p>
>

> Client
> <p align="center">
>   <img src="https://img.shields.io/badge/NextJS-black?style=for-the-badge&logo=next.js&logoColor=white" />
>   <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
>   <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
>   <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" />
>   <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
>   <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" />
>   <img src="https://img.shields.io/badge/Cloudinary-0392CF?style=for-the-badge&logo=cloudinary&logoColor=white" />
>   <img src="https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white" />
>   <img src="https://img.shields.io/badge/ReactHookForm-000000?style=for-the-badge&logo=react-hook-form&logoColor=white" />
>   <img src="https://img.shields.io/badge/Zod-FF3E00?style=for-the-badge&logo=zod&logoColor=white" />

> </p>
> ~

</div>

## 🌟 Server Features

- 🔐 **Authentication and Authorization**:
  - Implementation of JWT for secure user authentication.
  - Password reset and recovery functionality for enhanced user experience.
  - Secure cookies implementation for enhanced security.

- 🗺️ **Geospatial Data Handling**:
  - Implementation of geospatial queries and operators for location-based services.
  - Utilization of MongoDB's geospatial capabilities for efficient data handling.
    
- 🔧 **RESTful API Design and Development**:
  - Utilization of advanced features such as filtering, sorting, aliasing, and pagination for efficient data retrieval.
  - Implementation of CRUD operations with MongoDB and Mongoose for seamless data manipulation.
    
- 🚀 **Rate Limiting**:
  - Rate limiting middleware to prevent abuse and ensure fair usage of resources.
    
- 🔍 **XSS Prevention**:
  - Implementation of XSS prevention measures to protect against cross-site scripting attacks.

- 🛡️ **Helmet and HPP Middleware**:
  - Implementation of secure headers for securing Express apps.
  - Adoption of HPP middleware to protect against HTTP parameter pollution attacks.

- 📧 **Email Communication**:
  - Integration with Mailtrap for sending emails.
    
- 🛡️ **Security Enhancements**:
  - Encryption of password for enhanced security.
  - Sanitization of inputs to prevent injection attacks.


----------------
## 🌟 Client Features

- 🗺️ **Interactive Map Display with Mapbox-GL:**
  - Utilization of Mapbox-GL for displaying maps and pinpointing locations of tours.

- 🛒 **Shopping Cart Management with Zustand:**
  - Implementation of a shopping cart using Zustand for efficient state management.
  - Addition, removal, and modification of items within the shopping cart.

- 🍪 **Session Management with Cookies:**
  - Implementation of cookies for session persistence and user authentication.

- 🖼️ **Image Upload and Retrieval with Cloudinary:**
  - Integration with Cloudinary for efficient storage and retrieval of images.
  - Seamless uploading and displaying of images within the application.

- 📄 **Pagination and Search Filtering:**
  - Implementation of pagination for easy navigation through large datasets.
  - Filtering of search results based on user-defined criteria for enhanced data exploration.

- ✅ **Form Validation with React-Hook-Form and Zod:**
  - Validation of user inputs using React-Hook-Form and Zod for robust form handling.
  - Seamless integration of form validation logic to ensure data integrity.

- 🔒 **Authentication and Authorization:**
  - Secure user authentication mechanisms to ensure access control.
  - Implementation of authentication flows for user login and registration.

- 📊 **Admin Dashboard:**
  - Creation of an admin dashboard for managing application content and user accounts.
  - Access to administrative features such as user management, content editing, and analytics.

- 🛠️ **Development Tools and Libraries:**
  - Use of TypeScript for static type-checking and improved code quality.
  - Integration of ESLint and Prettier for code formatting and linting.
  - Adoption of Tailwind CSS for rapid UI development with utility-first styling.

- 📱 **Responsive Design:**
  - Implementation of responsive design principles for optimal user experience across devices.
  - Ensuring compatibility and usability on various screen sizes and resolutions.

----------------


## 🛠️ Getting Started

### Run the server

1. Clone the repository.
2. Change directory to `cd ./backend/`
3. Install dependencies using: `npm install`
4. Set up environment variables:
  - Create a `.env` file in the server directory and add the following environment variables:

```
PORT=3000
NODE_ENV=production
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=90D
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=
EMAIL_PASSWORD=""
FRONTEND_URL=
```


5. Run the server:

```
npm run dev
```

### Run the server


1. Clone the repository.
2. Change directory to `cd ./backend/`
3. Install dependencies using: `npm install`
4. Create a `.env.local` file in the client directory and add the following environment variables:

````
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_MAPBOX_API_TOKEN=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
````

- 💡 **Note**
Cloudinary Account: To utilize image uploading functionality, create a Cloudinary account [here](https://cloudinary.com/) and replace the `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` environment variables with your cloud name, API key, and API secret.

5. Run the development server:

```bash
npm run dev
```

## Screenshots :

### Tour detail: 

![](https://i.imgur.com/yh5mb3p.png)

### Cart: 

![](https://i.imgur.com/ot4w7wJ.png)

### Shoping cart: 

![](https://i.imgur.com/XRlxkE9.png)

### Shoping cart form: 

![](https://i.imgur.com/D1u5K4p.png)

## Administrator

### Dashboard Page

![](https://i.imgur.com/0Nb1QkY.png)

### Tours list

![](https://i.imgur.com/qfO2yPM.png)

### Login: 

![](https://i.imgur.com/5M42JSl.png)
