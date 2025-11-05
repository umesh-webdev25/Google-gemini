# Google Gemini AI Chat Application

A modern React application that integrates with Google's Gemini AI API to provide an interactive chat experience. Built with React and Vite, featuring a responsive UI with light/dark theme support.

## Features

- 🤖 Integration with Google Gemini AI API
- 🌓 Light/Dark theme support
- 💬 Interactive chat interface
- 🔍 Search functionality
- 📱 Responsive design
- ⚡ Fast performance with Vite

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- NPM or Yarn
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # React components
│   ├── Main/       # Main chat interface
│   └── Sidebar/    # Sidebar navigation
├── config/         # Configuration files
├── Context/        # React Context providers
└── App.jsx        # Root component
```

## Technologies Used

- React
- Vite
- Google Gemini AI API
- CSS Variables for theming
- Context API for state management

## Features in Detail

### Theme System
- Seamless light/dark mode switching
- CSS variables for consistent theming
- Persistent theme preference storage

### Chat Interface
- Real-time AI responses
- Message history
- Search functionality
- Responsive design for all screen sizes

### API Integration
- Secure API key management
- Error handling
- Response streaming

## Contributing

Feel free to open issues and submit pull requests to improve the application.

## License

This project is licensed under the MIT License.
