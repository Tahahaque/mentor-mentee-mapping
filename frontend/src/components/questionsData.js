export const QUESTIONS = {
  mentee: [
    {
      id: 1,
      question: "What skill are you most interested in developing?",
      options: [
        { text: "Industry Knowledge", score: 5 },
        { text: "Leadership/Strategy", score: 4 },
        { text: "Technical/Data Skills", score: 3 },
        { text: "Communication Skills", score: 2 },
        { text: "Project Management", score: 1 }
      ]
    },
    {
      id: 2,
      question: "What kind of mentor would you work best with?",
      options: [
        { text: "Experienced in your field", score: 5 },
        { text: "Structured and organized", score: 4 },
        { text: "Empathetic and supportive", score: 3 },
        { text: "Challenging and direct", score: 2 },
        { text: "Flexible and informal", score: 1 }
      ]
    },
    {
      id: 3,
      question: "What's your preferred communication style/frequency?",
      options: [
        { text: "Daily/Slack-style", score: 5 },
        { text: "Weekly check-ins", score: 4 },
        { text: "Biweekly sessions", score: 3 },
        { text: "Monthly check-ins", score: 2 },
        { text: "Ad hoc/as needed", score: 1 }
      ]
    },
    {
      id: 4,
      question: "How much structure do you want in your mentorship?",
      options: [
        { text: "Highly structured sessions", score: 5 },
        { text: "Some structure with flexibility", score: 4 },
        { text: "Balanced mix of structure and informal", score: 3 },
        { text: "Mostly informal, lightly guided", score: 2 },
        { text: "Fully informal discussions", score: 1 }
      ]
    },
    {
      id: 5,
      question: "Are you currently going through a career/life transition?",
      options: [
        { text: "Major transition needing full support", score: 5 },
        { text: "Moderate transition, some guidance needed", score: 4 },
        { text: "Minor career shift or new goals", score: 3 },
        { text: "Mild uncertainty, not urgent", score: 2 },
        { text: "No transitions currently", score: 1 }
      ]
    }
  ],
  mentor: [
    {
      id: 1,
      question: "What skill area are you best equipped to mentor in?",
      options: [
        { text: "Industry Knowledge", score: 5 },
        { text: "Leadership/Strategy", score: 4 },
        { text: "Technical/Data Skills", score: 3 },
        { text: "Communication Skills", score: 2 },
        { text: "Project Management", score: 1 }
      ]
    },
    {
      id: 2,
      question: "What kind of mentee do you work best with?",
      options: [
        { text: "Wants expertise in your field", score: 5 },
        { text: "Prefers structure and organization", score: 4 },
        { text: "Needs empathy and encouragement", score: 3 },
        { text: "Likes direct challenges and feedback", score: 2 },
        { text: "Values flexibility and informal talks", score: 1 }
      ]
    },
    {
      id: 3,
      question: "Your preferred communication style/frequency?",
      options: [
        { text: "Daily/Slack-style", score: 5 },
        { text: "Weekly check-ins", score: 4 },
        { text: "Biweekly sessions", score: 3 },
        { text: "Monthly check-ins", score: 2 },
        { text: "Ad hoc/as needed", score: 1 }
      ]
    },
    {
      id: 4,
      question: "How structured is your mentorship style?",
      options: [
        { text: "Very structured and scheduled", score: 5 },
        { text: "Some structure with plans", score: 4 },
        { text: "Flexible structure", score: 3 },
        { text: "Mostly informal with optional structure", score: 2 },
        { text: "Fully informal and fluid", score: 1 }
      ]
    },
    {
      id: 5,
      question: "Are you comfortable mentoring someone in transition?",
      options: [
        { text: "Very experienced and willing", score: 5 },
        { text: "Comfortable and somewhat experienced", score: 4 },
        { text: "Open to it with minor limitations", score: 3 },
        { text: "Prefer to avoid intense transition cases", score: 2 },
        { text: "Not currently available for this", score: 1 }
      ]
    }
  ]
};
