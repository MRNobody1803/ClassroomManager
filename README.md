# Reservation Management System

## Description
The Reservation Management System is a web application designed to manage reservation requests for classrooms, professors, and related resources. This application allows administrators to view, approve, or reject reservation requests, while providing an overview of the status and details of each reservation.

## Features
- Fetch and display all reservation requests.
- Provide enriched information such as classroom names and professor details.
- Approve or reject pending reservation requests.
- Sort and filter reservations by creation date and status.
- Error handling and status updates.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **CSS**: For styling the components.
- **Axios**: For handling HTTP requests to the backend.

### Backend
- **Java**: REST API implemented with Java.
- **JAX-RS**: For building RESTful web services.
- **WildFly**: Server used for deploying the application.
- **Database**: (e.g., MySQL or PostgreSQL for storing reservation and user data).

## Installation and Setup

### Prerequisites
1. Node.js installed on your local machine.
2. Java Development Kit (JDK) and Apache Tomcat installed.
3. Database setup with required tables.

### Steps to Run

#### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/reservation-management.git
   ```
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the application in your browser at `http://localhost:3000`.

#### Backend
1. Set up the database schema and populate tables as required.
2. Build and deploy the backend application:
   - Use your preferred IDE (e.g., IntelliJ IDEA or Eclipse) to run the backend.
   - Alternatively, deploy the WAR file to your Tomcat server.
3. Ensure the backend is running at `http://localhost:8080`.

### API Endpoints

#### Reservation Endpoints
- `GET /api/reservations`: Fetch all reservations.
- `PUT /api/reservations/{id}/status`: Update the status of a reservation.

#### Salle Endpoints
- `GET /api/salles/{id}`: Fetch details of a specific classroom.

#### Professor/User Endpoints
- `GET /api/utilisateurs/{id}`: Fetch details of a professor or user.

## Usage
1. Navigate to the reservation management page.
2. View all pending reservations.
3. Click `Approve` or `Reject` to update the status of a reservation.
4. Monitor the reservation details, including classroom and professor information.

## Folder Structure
```
reservation-management/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReservRequest.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── src/main/java/
│   │   ├── com/project/api/
│   │   ├── com/project/models/
│   │   ├── com/project/services/
│   ├── pom.xml
```

## Contribution
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- Special thanks to all contributors and supporters who made this project possible.

---

Feel free to reach out for any questions or issues regarding this project. Happy coding!
