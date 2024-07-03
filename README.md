# Website Name: parcelPro

# Visit the live site: [parcelPro](https://parcel-pro-e2dbb.web.app)


1.  Users can create an account and log in to access the platform.
2.  Users can register and log in using social media accounts.
3.  The platform is fully responsive and works on mobile, tablet, and desktop devices.
4.  Users can book parcels by providing necessary details like receiver's address and parcel weight.
5.  Users can view, update, and cancel their parcel bookings.
6.  Admins can view all parcels, assign delivery personnel, and manage users.
7.  Delivery personnel can view assigned parcels, update delivery status, and manage reviews.
8.  Users receive notifications for all CRUD operations and successful authentication.
9.  Users can view the delivery location on a map using latitude and longitude coordinates.
10. Admins can view statistics with bar charts and line charts showing bookings by date and a comparison between booked  and delivered parcels.
11. Sensitive information like Firebase config keys and MongoDB credentials are hidden using environment variables.
12. Secures routes with JWT tokens stored in local storage.
13. Users can pay for their parcels using Stripe for secure payments.

# Technology Used Client Side:
- Tailwind CSS
- DaisyUI & Mamba UI
- React router dom
- React icons
- Tanstack/react-query
- React-hook-form
- React loader spinner
- Prop types
- Sweetalert2
- React toastify
- Firebase
- cors
- dotenv

# Technologies Used Server Side
- Node Js
- Express Js
- MongoDB

# Hosting:
- Server Sede Hosting: Vercel
- Client Side Hosting: Firebase

# Installation
# Make sure you have the following installed:
- Node.js
- npm
- Git

# Clone the repository:
- git clone (https://github.com/Afroza5848/assignment-12-client-side.git)
- cd your-repository
- Install dependencies:

# For the client side:
- cd parcel-pro-client
- npm install

# For the server side:
- cd parcel-pro-server 

- npm install 

- Set up environment variables:

- Create a .env file in the server directory and add your MongoDB connection string and any other necessary environment variables.

- Create a .env file in the client directory and add your Firebase configuration and any other necessary environment variables.

- Running the Application

# Start the server:
- cd parcel-pro-server
- nodemon index.js

# Start the client:
- cd parcel-pro-client
- npm run dev
