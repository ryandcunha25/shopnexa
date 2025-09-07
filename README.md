# ShopNexa

ShopNexa is a full-stack single page e-commerce application built using React.js, Node.js, Express.js, and MongoDB.  
It allows users to browse products, add them to their cart, and complete purchases securely.
---

## Tech Stack Used
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** Mongo DB (Atlas)
- **Authentication:** JWT-based

---

## How to Run the App Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ryandcunha25/shopnexa.git
   cd shopnexa
   ```

2. **Install Dependencies**
   ```bash
    npm install
   ```

4. **Set up Enviroment Variables**
   ```bash
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret
   ```

5. **Run the backend**
   ```bash
   cd backend
   node server.js
   ```

6. **Run the frontend**
   ```bash
   npm start
   ```

8. **Open in Browser** <br>
   (http://localhost:3000)

---

## Frontend (React.js + Tailwind CSS)
- Responsive **single-page application (SPA)**.
- User authentication (Signup/Login).
- Browse products with images, descriptions, categories, and prices.
- Add/remove items from the cart.
- Update product quantities in the cart.
- Dynamic category filter and search.
- Protected routes for cart and checkout.

## Backend (Node.js + Express.js + MongoDB)
- RESTful APIs for authentication, products, and cart management.
- JWT-based authentication and authorization.
- Product management (CRUD operations).
- Cart management (add, remove, update items).
- MongoDB schemas for users, products, and cart.
- Secure password hashing with bcrypt.
---

## Demo Login 
* Email - testuser@gmail.com
* Password - tester

---

## LIVE DEMO
The project is deployed on Vercel & its backend on Render. <br>
Website Link - (https://shopnexa-rd.vercel.app)
  
