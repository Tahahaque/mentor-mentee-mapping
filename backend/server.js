const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File paths
const mentorsFilePath = path.join(__dirname, 'data', 'mentors.json');
const menteesFilePath = path.join(__dirname, 'data', 'mentees.json');

// Helper function to read JSON file
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
};

// Helper function to write JSON file
const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Matching algorithm - calculates score difference
const calculateMatch = (menteeScores, mentorScores) => {
  let totalDifference = 0;
  for (let i = 0; i < 5; i++) {
    totalDifference += Math.abs(menteeScores[i] - mentorScores[i]);
  }
  return totalDifference;
};

// Find best mentor match for a mentee
const findBestMatch = (menteeScores) => {
  const mentors = readJSONFile(mentorsFilePath);
  
  if (mentors.length === 0) {
    return null;
  }
  
  let bestMatch = null;
  let lowestScore = Infinity;
  
  mentors.forEach(mentor => {
    const score = calculateMatch(menteeScores, mentor.scores);
    if (score < lowestScore) {
      lowestScore = score;
      bestMatch = { ...mentor, matchScore: score };
    }
  });
  
  return bestMatch;
};

// Routes

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Mentor-Mentee Matching API',
    version: '1.0.0',
    endpoints: {
      'POST /mentor': 'Register a new mentor',
      'POST /mentee': 'Register a new mentee and get best match',
      'GET /matches': 'View all registered mentors and mentees',
      'GET /admin': 'Admin panel to view all data',
      'GET /health': 'Health check'
    },
    documentation: 'Visit /admin for the admin panel'
  });
});

// POST /mentor - Save a new mentor
app.post('/mentor', (req, res) => {
  try {
    const { id, name, scores, timestamp } = req.body;
    
    // Validation
    if (!id || !name || !scores || !Array.isArray(scores) || scores.length !== 5) {
      return res.status(400).json({ 
        error: 'Invalid data. Required: id, name, scores (array of 5 numbers)' 
      });
    }
    
    const mentors = readJSONFile(mentorsFilePath);
    
    const newMentor = {
      id,
      name,
      scores,
      timestamp: timestamp || new Date().toISOString()
    };
    
    mentors.push(newMentor);
    writeJSONFile(mentorsFilePath, mentors);
    
    res.status(201).json({ 
      message: 'Mentor registered successfully', 
      mentor: newMentor 
    });
    
  } catch (error) {
    console.error('Error saving mentor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /mentee - Save a new mentee and return best mentor match
app.post('/mentee', (req, res) => {
  try {
    const { id, name, scores, timestamp } = req.body;
    
    // Validation
    if (!id || !name || !scores || !Array.isArray(scores) || scores.length !== 5) {
      return res.status(400).json({ 
        error: 'Invalid data. Required: id, name, scores (array of 5 numbers)' 
      });
    }
    
    const mentees = readJSONFile(menteesFilePath);
    
    const newMentee = {
      id,
      name,
      scores,
      timestamp: timestamp || new Date().toISOString()
    };
    
    mentees.push(newMentee);
    writeJSONFile(menteesFilePath, mentees);
    
    // Find best mentor match
    const bestMatch = findBestMatch(scores);
    
    res.status(201).json({
      message: 'Mentee registered successfully',
      mentee: newMentee,
      bestMatch: bestMatch
    });
    
  } catch (error) {
    console.error('Error saving mentee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin - Admin panel with HTML interface
app.get('/admin', (req, res) => {
  try {
    const mentors = readJSONFile(mentorsFilePath);
    const mentees = readJSONFile(menteesFilePath);
    
    // Calculate matches for all mentees
    const menteeMatches = mentees.map(mentee => {
      const bestMatch = findBestMatch(mentee.scores);
      return {
        ...mentee,
        bestMatch: bestMatch
      };
    });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentor-Mentee Admin Panel</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            padding: 30px; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        h1 { 
            color: #333; 
            text-align: center; 
            margin-bottom: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .stats { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .stat-card { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
        }
        .stat-number { 
            font-size: 2em; 
            font-weight: bold; 
            display: block; 
        }
        .section { 
            margin: 30px 0; 
        }
        .section h2 { 
            color: #333; 
            border-bottom: 2px solid #667eea; 
            padding-bottom: 10px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
        }
        th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #ddd; 
        }
        th { 
            background: #f8f9fa; 
            font-weight: 600; 
            color: #333;
        }
        .scores { 
            font-family: monospace; 
            background: #f1f3f4; 
            padding: 4px 8px; 
            border-radius: 4px; 
        }
        .match-info { 
            background: #e8f5e8; 
            padding: 8px; 
            border-radius: 4px; 
            border-left: 4px solid #4caf50; 
        }
        .no-match { 
            background: #fff3cd; 
            padding: 8px; 
            border-radius: 4px; 
            border-left: 4px solid #ffc107; 
        }
        .timestamp { 
            color: #666; 
            font-size: 0.9em; 
        }
        .refresh-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .refresh-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Mentor-Mentee Admin Panel</h1>
        
        <button class="refresh-btn" onclick="window.location.reload()">🔄 Refresh Data</button>
        
        <div class="stats">
            <div class="stat-card">
                <span class="stat-number">${mentors.length}</span>
                <div>Total Mentors</div>
            </div>
            <div class="stat-card">
                <span class="stat-number">${mentees.length}</span>
                <div>Total Mentees</div>
            </div>
            <div class="stat-card">
                <span class="stat-number">${menteeMatches.filter(m => m.bestMatch).length}</span>
                <div>Successful Matches</div>
            </div>
            <div class="stat-card">
                <span class="stat-number">${menteeMatches.filter(m => !m.bestMatch).length}</span>
                <div>Pending Matches</div>
            </div>
        </div>

        <div class="section">
            <h2>👥 Registered Mentors</h2>
            ${mentors.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Scores</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    ${mentors.map(mentor => `
                    <tr>
                        <td><strong>${mentor.name}</strong></td>
                        <td><code>${mentor.id}</code></td>
                        <td><span class="scores">[${mentor.scores.join(', ')}]</span></td>
                        <td class="timestamp">${new Date(mentor.timestamp).toLocaleString()}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : '<p>No mentors registered yet.</p>'}
        </div>

        <div class="section">
            <h2>🎓 Registered Mentees & Their Matches</h2>
            ${mentees.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Mentee Name</th>
                        <th>ID</th>
                        <th>Scores</th>
                        <th>Best Match</th>
                        <th>Match Score</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    ${menteeMatches.map(mentee => `
                    <tr>
                        <td><strong>${mentee.name}</strong></td>
                        <td><code>${mentee.id}</code></td>
                        <td><span class="scores">[${mentee.scores.join(', ')}]</span></td>
                        <td>
                            ${mentee.bestMatch ? 
                                `<div class="match-info">
                                    <strong>${mentee.bestMatch.name}</strong><br>
                                    <small>ID: ${mentee.bestMatch.id}</small>
                                </div>` : 
                                `<div class="no-match">No mentor available</div>`
                            }
                        </td>
                        <td>
                            ${mentee.bestMatch ? 
                                `<strong>${mentee.bestMatch.matchScore}/20</strong><br><small>(lower = better)</small>` : 
                                'N/A'
                            }
                        </td>
                        <td class="timestamp">${new Date(mentee.timestamp).toLocaleString()}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : '<p>No mentees registered yet.</p>'}
        </div>

        <div class="section">
            <h2>📊 API Endpoints</h2>
            <ul>
                <li><strong>GET /</strong> - API information</li>
                <li><strong>POST /mentor</strong> - Register a new mentor</li>
                <li><strong>POST /mentee</strong> - Register a new mentee and get match</li>
                <li><strong>GET /matches</strong> - Get raw JSON data</li>
                <li><strong>GET /admin</strong> - This admin panel</li>
                <li><strong>GET /health</strong> - Health check</li>
            </ul>
        </div>

        <div class="section">
            <h2>🧠 Matching Algorithm</h2>
            <p>The system calculates compatibility using score difference:</p>
            <code>total_difference = sum(abs(mentee[i] - mentor[i])) for i in [0..4]</code>
            <p>Lower scores indicate better compatibility (0 = perfect match, 20 = completely opposite).</p>
        </div>
    </div>
</body>
</html>`;

    res.send(html);
    
  } catch (error) {
    console.error('Error in admin panel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /matches - View all matches (for admin/testing)
app.get('/matches', (req, res) => {
  try {
    const mentors = readJSONFile(mentorsFilePath);
    const mentees = readJSONFile(menteesFilePath);
    
    res.json({
      mentors: mentors,
      mentees: mentees,
      totalMentors: mentors.length,
      totalMentees: mentees.length
    });
    
  } catch (error) {
    console.error('Error retrieving matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mentor-Mentee Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 View matches: http://localhost:${PORT}/matches`);
  console.log(`⚡ Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`📖 API Info: http://localhost:${PORT}/`);
});

module.exports = app;
