#  Digital-Diner Live App

###  Live Website: [Digital-Diner Live App](https://6811ace39d9789d0a3be79e4--rad-donut-1ff832.netlify.app/) *(Mobile Focused UI)*

---

##  Steps to Run Backend

1. **Clone the repository**
2. **Open the project folder** in your preferred code editor
3. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

4. **Install dependencies and set up environment**
   ```bash
   npm i
   cp .env.sample .env
   ```



5. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 💻 Steps to Run Frontend

1. **Navigate to the frontend folder**
   ```bash
   cd ..
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

---

##  Database Design Strategy

This project uses **MongoDB** for all models due to its flexibility and speed. Since I was already familiar with MongoDB, and due to time constraints, I opted to use it for the entire backend.

### 1. User Model
- **Database Used**: MongoDB  
- **Why**: User data is structured and can be validated using Mongoose schemas.  
- **Benefits**: Easy schema management and authentication support.

### 2. Order Model
- **Database Used**: MongoDB  
- **Why**: Orders need to store multiple items and user references.  
- **Benefits**: Supports nested order structures and fast operations.

### 3. Menu Model
- **Database Used**: MongoDB  
- **Why**: Menu can include dynamic structures like variants or add-ons.  
- **Benefits**: Flexible, efficient updates and retrievals.

### 4. Cart System
- **Stored in Local Storage**  
- **Why**: To avoid unnecessary backend calls and improve responsiveness.  
- **Benefits**: Keeps the cart fast and persistent between page reloads without backend complexity.

---

##  API Endpoints

### User Routes
- `POST /register`
- `POST /login`

### Order Routes
- `POST /create-order`
- `GET /get-orders`
- `PATCH /update-order` (Admin only)

### Menu Routes
- `POST /add-menu` (Admin only)
- `GET /get-menu-items`
- `GET /get-menu-item`
- `PATCH /edit-menu` (Admin only)

---

##  Challenges Faced

###  Managing the Cart

Initially considered using MongoDB to store cart data, but it introduced unnecessary complexity.  
Instead:

- Used **Local Storage** to manage the cart on the frontend.
- Benefits:
  - No backend calls required for cart updates.
  - Simple and efficient.
  - Persistent even after refresh.

---

##  Note

The app is hosted on **Netlify**, which may be a bit **slow on first load**. If menu items don’t load immediately:

- Please wait **5 seconds**, or  
- Navigate to the **"Orders" page and come back** to "Menu" to refresh.
