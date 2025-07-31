# Mentor-Mentee Mapping System

A full-stack web application that intelligently matches mentees with mentors based on compatibility scores derived from questionnaire responses.

## Features

- **Smart Matching Algorithm**: Uses score difference calculation to find the best mentor-mentee pairs
- **Interactive Questionnaire**: 5 questions each for mentors and mentees with weighted scoring
- **Real-time Matching**: Mentees get instant mentor recommendations upon completion
- **JSON-based Storage**: Simple file-based data persistence
- **Responsive Design**: Modern, clean UI with gradient styling

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System** - JSON-based data storage

## Project Structure

```
mentor-mentee-mapping/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.js
│   │   │   ├── QuestionPage.js
│   │   │   ├── ResultPage.js
│   │   │   └── questionsData.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
├── backend/
│   ├── data/
│   │   ├── mentors.json
│   │   └── mentees.json
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mentor-mentee-mapping
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd ../backend
   npm start
   # Server runs on http://localhost:3001
   ```

5. **Start the Frontend Development Server**
   ```bash
   cd ../frontend
   npm start
   # App opens at http://localhost:3000
   ```

## How It Works

### User Flow

1. **Home Page**: Users choose between "Mentor" or "Mentee" role
2. **Name Input**: Users enter their name
3. **Questionnaire**: 5 questions with scored options (1-5 scale)
4. **Submission**: Data sent to backend with matching logic
5. **Results**: 
   - **Mentees**: See their best mentor match
   - **Mentors**: Get confirmation of registration

### Matching Algorithm

The system calculates compatibility using score difference:

```javascript
total_difference = sum(abs(mentee[i] - mentor[i])) for i in [0..4]
```

- Lower scores indicate better compatibility
- Perfect match = 0 difference
- Maximum difference = 20 (completely opposite preferences)

### Question Categories

1. **Skill Focus/Expertise Area**
2. **Personality/Working Style Compatibility**  
3. **Communication Frequency Preferences**
4. **Structure Preferences**
5. **Career Transition Support**

Each category uses a 1-5 scoring system with identical mappings for mentors and mentees.

## API Endpoints

### POST /mentor
Register a new mentor
```json
{
  "id": "mentor_123456789_abc123",
  "name": "John Doe",
  "scores": [5, 4, 3, 2, 1],
  "timestamp": "2025-07-25T12:00:00Z"
}
```

### POST /mentee  
Register a new mentee and get mentor match
```json
{
  "id": "mentee_123456789_def456", 
  "name": "Jane Smith",
  "scores": [5, 4, 3, 2, 1],
  "timestamp": "2025-07-25T12:00:00Z"
}
```

### GET /matches
View all registered mentors and mentees (admin/testing)

### GET /health
Health check endpoint

## Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:** 
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Data Storage

Data is stored in JSON files:
- `backend/data/mentors.json` - All registered mentors
- `backend/data/mentees.json` - All registered mentees

### Adding Features

Common enhancements:
- Email notifications
- User authentication  
- Admin dashboard
- CSV export functionality
- Database integration (PostgreSQL, MongoDB)
- Deployment configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly  
5. Submit a pull request

## License

MIT License - see LICENSE file for details