# Telecom Chat UI - Project Documentation

## 📋 Project Overview

**Project Name:** Telecom Chat UI  
**Type:** React + Vite Frontend Application  
**Purpose:** A chat-based user interface for Lumina Mobile telecommunications service with real-time messaging, account management, and system status monitoring.  
**Tech Stack:** React 19, Vite, Tailwind CSS 4, JavaScript (ES6+)

---

## 🏗️ Project Architecture

### High-Level Structure

```
telecom-chat-ui/
├── Configuration Files
├── Public Assets
├── Source Code (src/)
│   ├── Components (Reusable UI elements)
│   ├── Context (State management)
│   ├── Services (API integration)
│   └── Styles
└── Build & Development Tools
```

### Key Architectural Pattern: **Context API + Component-Based**

The application uses React Context API for global state management rather than Redux, keeping it lightweight and maintainable.

---

## 📁 Directory Structure & Components

### 1. **Root Configuration Files**

#### `package.json`
- **Dependencies:**
  - `react@^19.2.5` - React library
  - `react-dom@^19.2.5` - React DOM rendering
  - `@tailwindcss/vite@^4.2.4` - Tailwind CSS Vite integration

- **Dev Dependencies:**
  - `vite@^8.0.10` - Build tool & dev server
  - `@vitejs/plugin-react@^6.0.1` - React plugin for Vite with Fast Refresh
  - `@tailwindcss/postcss@^4.2.4` - Tailwind CSS PostCSS integration
  - `tailwindcss@^4.2.4` - CSS framework
  - `eslint@^10.2.1` - Code linting
  - `eslint-plugin-react-hooks@^7.1.1` - ESLint rules for React Hooks
  - `eslint-plugin-react-refresh@^0.5.2` - Fast Refresh validation
  - `autoprefixer@^10.5.0` - CSS vendor prefixing
  - `postcss@^8.5.13` - CSS transformations
  - `@types/react@^19.2.14` - React TypeScript type definitions
  - `@types/react-dom@^19.2.3` - React DOM TypeScript type definitions
  - `globals@^17.5.0` - Global variables for JavaScript environments

- **Scripts:**
  ```bash
  npm run dev      # Start development server
  npm run build    # Build for production
  npm run lint     # Run ESLint
  npm run preview  # Preview production build
  ```

#### `vite.config.js`
- Configures Vite build tool
- Enables React Fast Refresh (HMR - Hot Module Replacement)
- Minimal configuration, uses default settings

#### `tailwind.config.js`
- Scans `./index.html` and `./src/**/*.{js,jsx,ts,tsx}` for template files
- Default theme without extensions
- No plugins configured

#### `postcss.config.js`
- Enables Tailwind CSS PostCSS plugin for compilation
- Handles CSS transformations and vendor prefixing

#### `eslint.config.js`
- Code quality and style enforcement
- React and React Hooks ESLint rules enabled
- Ensures consistent code formatting

#### `.env` (Development)
```
VITE_API_URL=http://localhost:8000
VITE_API_KEY=06d3a86d59a5bbfba3b96589110aaca84bb74e590bc20361369c7dc82d305dc5
```
- **VITE_API_URL:** Development backend API endpoint
- **VITE_API_KEY:** Development API authentication key
- Local development configuration for Vite

#### `.env.production` (Production)
```
VITE_API_URL=https://your-cloud-run-url.asia-south1.run.app
VITE_API_KEY=a3f8c2d1e4b5a6f7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1
```
- **VITE_API_URL:** Cloud-hosted backend API endpoint (Google Cloud Run)
- **VITE_API_KEY:** Production API authentication key
- Production environment configuration for deployed version

---

### 2. **Entry Points**

#### `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>telecom-chat-ui</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
- Single-page application (SPA) entry point
- Creates root React mounting point

#### `src/main.jsx`
- ReactDOM root creation and strict mode setup
- Imports global CSS (`index.css`)
- Renders the `App` component

#### `src/App.jsx`
```jsx
<ChatProvider>
  <MainLayout />
</ChatProvider>
```
- Wraps entire application with `ChatProvider` for global state
- Renders main application layout

---

### 3. **Context Layer** (`src/context/`)

#### `ChatContext.jsx`
**Purpose:** Global state management using React Context API

**State Variables:**
- `messages` - Array of chat messages from user and bot
  ```javascript
  [
    { sender: "bot", text: "Welcome to Lumina Mobile. How can I help you today?" },
    { sender: "user", text: "..." },
    { sender: "bot", text: "..." },
    { id: typingId, sender: "bot", text: "", isLoading: true } // Typing indicator
  ]
  ```

- `sessionId` - Current chat session identifier (persisted in localStorage)

- `accountData` - User account information (placeholder for future data)

- `systemStatus` - Backend service health status
  ```javascript
  {
    dialogflow: "idle",  // Google Dialogflow integration status
    gemini: "idle",      // Google Gemini AI status
    firestore: "idle"    // Firestore database status
  }
  ```

**Context Methods:**
- `addMessage(message)` - Add a new message to the chat
- `setSessionId()` - Update session ID
- `setAccountData()` - Update account information
- `setSystemStatus()` - Update backend service status

**Key Features:**
- Auto-persists session ID to localStorage for session continuity
- Provides single source of truth for application state

---

### 4. **Components Layer** (`src/components/`)

#### **Layout Components** (`Layout/`)

##### `MainLayout.jsx`
- **Purpose:** Primary application layout component
- **Structure:**
  ```jsx
  <div className="h-screen bg-black text-white flex flex-col">
    <Header />
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Chat Section: 8 columns (left side) */}
      <ChatWindow /> // col-span-8
      
      {/* Dashboard Section: 4 columns (right side) */}
      <AccountPanel />  // col-span-4
      <SystemStatus />
    </div>
  </div>
  ```
- **Layout:** 12-column responsive grid
  - Chat (66% width)
  - Dashboard (33% width)
- **Styling:** Black background with white text, Tailwind CSS

##### `Header.jsx`
- Navigation bar / top banner component
- Contains `Lumina Mobile` branding or app title
- *(Implementation details to be reviewed)*

#### **Chat Components** (`Chat/`)

##### `ChatWindow.jsx`
- **Purpose:** Main chat interface container
- **Structure:**
  1. Message display area with auto-scrolling
  2. Suggestion chips (quick reply options)
  3. Chat input field
- **Features:**
  - Renders all messages from context
  - Scrollable message history
  - Auto-scroll to latest message

##### `ChatInput.jsx`
```jsx
const [input, setInput] = useState("")      // User input text
const [loading, setLoading] = useState(false) // Loading state during API call
```

- **Purpose:** User message input and sending
- **Key Functions:**
  1. Captures user input
  2. On send:
     - Adds user message to chat
     - Displays typing indicator (bouncing dots animation)
     - Calls `sendMessage()` API
     - Displays bot response
     - Removes loading state
  3. Manages session ID creation and updates
  
- **Features:**
  - Input validation (prevents empty messages)
  - Prevents multiple simultaneous sends (loading flag)
  - Automatic session ID generation

##### `MessageBubble.jsx`
- **Purpose:** Individual message display component
- **Features:**
  - **User Messages:** Right-aligned, purple background (`bg-purple-600`)
  - **Bot Messages:** Left-aligned, dark gray background (`bg-gray-800`)
  - **Loading State:** Shows animated bouncing dots
  - **Styling:** Rounded corners, padding, max-width constraint
  
- **Animations:**
  - Pulse animation for loading state
  - Bouncing animation for typing indicator dots

##### `SuggestionChips.jsx`
- **Purpose:** Display quick reply suggestion buttons
- **Features:**
  - Quick access to common user queries
  - Clickable buttons that trigger messages
  - *(Implementation details to be reviewed)*

#### **Dashboard Components** (`Dashboard/`)

##### `AccountPanel.jsx`
```jsx
<div className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
  <h2 className="text-sm text-gray-400 mb-3">ACCOUNT</h2>
  <div className="text-gray-500 text-sm">No session yet</div>
</div>
```

- **Purpose:** Display user account information
- **Currently:** Placeholder showing "No session yet"
- **Future:** Will display:
  - Account number
  - Account balance
  - Plan details
  - Account status
- **Styling:** Dark theme with borders, gray typography

##### `SystemStatus.jsx`
- **Purpose:** Display backend service health status
- **Monitors:**
  - Dialogflow (NLP/intent processing)
  - Gemini AI (Generative AI responses)
  - Firestore (Database/session storage)
- **Status Indicators:** Likely color-coded (idle, active, error)
- **Updates:** Receives data from `systemStatus` context variable

---

### 5. **Services Layer** (`src/services/`)

#### `api.js`
**Base URL:** `http://localhost:8000`

**Main Function:** `sendMessage(message, sessionId = null)`

```javascript
POST /chat
{
  "message": "User's message",
  "session_id": "session-id-or-null"
}
```

**Response Structure:**
```javascript
{
  "reply": ["Bot's response text(s)"],
  "session_id": "new-or-existing-session-id"
}
```

**Features:**
1. **Error Handling:**
   - HTTP error responses (non-2xx status codes)
   - Network errors (connection failures)
   - Invalid response structure validation
   - User-friendly error messages

2. **Response Validation:**
   - Checks for `reply` field
   - Validates `reply` is an array
   - Falls back to error messages on validation failure

3. **Error Messages:**
   - "Server error. Please try again later." - HTTP errors
   - "Network error. Is the backend running?" - Network/Connection errors
   - "Invalid response from server." - Malformed responses
   - "Unexpected error. Please try again." - Other errors

**Backend Integration:**
- Connects to local backend running on port 8000
- Handles session management (creates new session if none exists)
- Maintains conversation history via session ID

---

### 6. **Styling**

#### `src/index.css`
- Global styles and CSS variables (if any)
- Canvas for Tailwind CSS `@apply` directives
- Base element styling

#### `src/App.css`
- Application-specific component styles
- Override styles if needed

#### Tailwind CSS
- **Framework:** Utility-first CSS
- **Configuration:** Default theme with standard colors
- **Colors Used:**
  - Black (`bg-black`)
  - Dark grays (`bg-gray-950`, `bg-gray-800`, `bg-gray-400`)
  - Purple (`bg-purple-600`)
- **Responsive Design:** Grid-based layout system
- **Animations:** 
  - `animate-pulse` - Pulsing effect for loading states
  - `animate-bounce` - Bouncing effect for typing indicator dots

---

### 7. **Public Assets** (`public/`)

- **favicon.svg** - Browser tab icon (Vite logo by default)
- **icons.svg** - SVG sprite sheet for icons
- Static files served as-is without processing

---

### 8. **Source Assets** (`src/assets/`)

- **hero.png** - Hero/banner image
- **react.svg** - React logo
- **vite.svg** - Vite logo
- Assets for UI components

---

## 🔄 Data Flow & Component Communication

### Message Flow Diagram

```
User Input
    ↓
ChatInput Component (captures text)
    ↓
addMessage() → ChatContext (adds user message)
    ↓
sendMessage(message, sessionId) → API Service
    ↓
Backend API (http://localhost:8000/chat)
    ↓
API Response {reply: [...], session_id: "..."}
    ↓
ChatContext (update messages + sessionId)
    ↓
ChatWindow Component (re-renders)
    ↓
MessageBubble Components (display messages)
    ↓
User Sees Response
```

### State Management Flow

```
ChatContext (Global State)
├── messages → ChatWindow, MessageBubble
├── sessionId → ChatInput, API Service
├── accountData → AccountPanel
└── systemStatus → SystemStatus
```

---

## 🚀 Development Workflow

### Setup & Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Runs on http://localhost:5173 (Vite default)

# Code linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Key Development Features
1. **Hot Module Replacement (HMR)** - Instant updates on code changes
2. **Fast Refresh** - Preserves component state while editing
3. **ESLint** - Real-time code quality checks
4. **Tailwind CSS** - Instant utility class compilation

---

## ⚙️ Environment Configuration

### Development Setup (.env)
- **Location:** `.env` (root directory)
- **Purpose:** Local development environment variables
- **Variables:**
  - `VITE_API_URL` - Development backend API endpoint
  - `VITE_API_KEY` - Development API authentication key

### Production Setup (.env.production)
- **Location:** `.env.production` (root directory)
- **Purpose:** Production deployment environment variables
- **Variables:**
  - `VITE_API_URL` - Cloud-hosted backend API endpoint (Google Cloud Run)
  - `VITE_API_KEY` - Production API authentication key

### Environment Variable Usage
- **Access in Code:** `import.meta.env.VITE_API_URL`
- **Vite Convention:** Only variables prefixed with `VITE_` are exposed to client code
- **Build Time:** Environment variables are resolved at build time, not runtime

### File Organization
- **.gitignore** - Version control exclusion rules
- **package-lock.json** - Locked dependency versions for reproducible installs
- **node_modules/** - Installed npm packages (generated, not committed)

---

## 🔌 External Dependencies

### APIs & Services
- **Backend API:** `http://localhost:8000` - Custom chat backend
- **Google Dialogflow** - NLP/intent recognition (monitored)
- **Google Gemini AI** - Generative AI responses (monitored)
- **Firestore** - Session persistence (monitored)

### NPM Packages Summary
| Package | Version | Purpose | Type |
|---------|---------|---------|------|
| React | 19.2.5 | UI library | Runtime |
| React DOM | 19.2.5 | DOM rendering | Runtime |
| @tailwindcss/vite | 4.2.4 | Tailwind CSS Vite integration | Runtime |
| Vite | 8.0.10 | Build tool & dev server | Dev |
| @vitejs/plugin-react | 6.0.1 | React plugin with Fast Refresh | Dev |
| Tailwind CSS | 4.2.4 | CSS framework | Dev |
| @tailwindcss/postcss | 4.2.4 | Tailwind PostCSS plugin | Dev |
| PostCSS | 8.5.13 | CSS processing pipeline | Dev |
| Autoprefixer | 10.5.0 | CSS vendor prefixing | Dev |
| ESLint | 10.2.1 | Code quality linting | Dev |
| eslint-plugin-react-hooks | 7.1.1 | React Hooks ESLint rules | Dev |
| eslint-plugin-react-refresh | 0.5.2 | Fast Refresh validation | Dev |
| TypeScript Types | Latest | TypeScript definitions for React | Dev |

---

## 📋 State Variables Summary

### ChatContext State
| Variable | Type | Purpose | Persistence |
|----------|------|---------|-------------|
| messages | Array | Chat history | Session only |
| sessionId | String | Unique session identifier | localStorage |
| accountData | Object | User account info | Session only |
| systemStatus | Object | Backend service health | Session only |

---

## 🎨 UI/UX Details

### Color Scheme (Dark Theme)
- **Background:** Black (`#000000`)
- **Primary Surface:** Dark Gray (`#111827` - gray-950)
- **Secondary Surface:** Medium Gray (`#1f2937` - gray-800)
- **Accent:** Purple (`#9333ea` - purple-600)
- **Text:** White (`#ffffff`)
- **Secondary Text:** Light Gray (`#9ca3af` - gray-400)
- **Tertiary Text:** Medium Gray (`#6b7280` - gray-500)

### Responsive Breakpoints
- **Chat Area:** 66% width (8/12 columns)
- **Dashboard:** 33% width (4/12 columns)
- Full-height responsive layout (`h-screen`)

### Interactive Elements
- **Chat Bubbles:** Rounded rectangles with max-width constraint
- **Typing Indicator:** 3 bouncing dots with staggered animation
- **Input Field:** Text input with send button
- **Suggestion Chips:** Clickable quick-reply buttons
- **Status Panels:** Bordered containers with header and content

---

## 🔐 Session Management

### Session Persistence Flow
```
1. User sends first message
2. Backend generates new session_id
3. Frontend receives session_id in response
4. setSessionId() updates context
5. useEffect in ChatProvider saves to localStorage
6. On page refresh, sessionId retrieved from localStorage
7. Subsequent messages use same session_id
```

### Storage Details
- **Key:** `"sessionId"`
- **Storage:** `window.localStorage`
- **Scope:** Per browser, per domain

---

## 📈 Future Enhancement Points

### Suggested Improvements
1. **AccountPanel Implementation**
   - Fetch real account data from backend
   - Display account balance, plan details, billing info

2. **SystemStatus Real-Time Updates**
   - WebSocket connection for live status updates
   - Health check intervals or event-driven updates

3. **SuggestionChips Implementation**
   - Dynamic suggestions based on context
   - Learning from user interactions

4. **Message Persistence**
   - Database storage for chat history
   - Load previous conversations

5. **TypeScript Migration**
   - Add type safety throughout the app
   - Better IDE support and error detection

6. **Error Boundary**
   - Graceful error handling UI
   - Prevent full app crashes

7. **Authentication/Authorization**
   - User login system
   - API authentication tokens

---

## 🛠️ Troubleshooting

### Common Issues

**1. "Network error. Is the backend running?"**
- Ensure backend server is running on `http://localhost:8000`
- Check backend is configured to handle CORS
- Verify `VITE_API_URL` in `.env` points to correct endpoint
- In browser DevTools, check Network tab for failed requests

**2. Vite Dev Server Not Starting**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check port 5173 is not in use: `lsof -i :5173` (macOS/Linux) or `netstat -ano | findstr :5173` (Windows)
- Kill process on that port if needed

**3. Tailwind Styles Not Appearing**
- Verify `tailwind.config.js` content paths are correct
- Run `npm run dev` to trigger watch mode
- Hard refresh browser (Ctrl+Shift+R) or clear cache
- Check browser console for Tailwind errors

**4. Session Not Persisting**
- Check localStorage is enabled in browser
- Verify key is `"sessionId"` exactly
- Check browser DevTools Application → LocalStorage for stored value
- Ensure cookies/storage not blocked by browser privacy settings

**5. ESLint Errors on Save**
- Run `npm run lint` to see all linting issues
- Fix manually or use IDE's quick-fix features
- Configuration in `eslint.config.js` controls which rules are enforced

**6. Building for Production Fails**
- Check `.env.production` has correct `VITE_API_URL`
- Run `npm run build && npm run preview` to test production build locally
- Check for console errors in preview mode
- Verify all environment variables are set correctly

### Debug Tips
- **Check Environment Variables:** `console.log(import.meta.env)` in browser console
- **Inspect State:** React DevTools browser extension shows ChatContext state
- **Network Debugging:** Browser DevTools Network tab shows all API calls
- **Performance:** Use React DevTools Profiler to identify slow components

---

## 📝 File Checklist

✅ Core Files Present:
- [x] package.json - Dependencies configured
- [x] vite.config.js - Build configuration
- [x] tailwind.config.js - Styling framework
- [x] postcss.config.js - CSS processing
- [x] eslint.config.js - Code quality
- [x] index.html - HTML entry point

✅ Application Files Present:
- [x] src/main.jsx - ReactDOM setup
- [x] src/App.jsx - Root component
- [x] src/index.css - Global styles
- [x] src/App.css - App styles

✅ Components Present:
- [x] Layout/MainLayout.jsx
- [x] Layout/Header.jsx
- [x] Chat/ChatWindow.jsx
- [x] Chat/ChatInput.jsx
- [x] Chat/MessageBubble.jsx
- [x] Chat/SuggestionChips.jsx
- [x] Dashboard/AccountPanel.jsx
- [x] Dashboard/SystemStatus.jsx

✅ Infrastructure:
- [x] Context/ChatContext.jsx - State management
- [x] Services/api.js - Backend integration

---

## � Quick Reference Guide

### Common Commands
```bash
# Install dependencies (run once after cloning)
npm install

# Start development server with hot reload
npm run dev

# Lint code for style violations
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### File Editing Tips
- **CSS Changes:** Modify `src/index.css` or `src/App.css` - Tailwind watches these files
- **Component Changes:** Edit component files in `src/components/` - Auto-refresh via Vite HMR
- **Context Changes:** Edit `src/context/ChatContext.jsx` - Affects all connected components
- **API Changes:** Modify `src/services/api.js` - Test with updated backend endpoints

### Environment Variables
- **For Local Testing:** Use `.env` (default for `npm run dev`)
- **For Production Build:** Use `.env.production` (used during `npm run build`)
- **Switching Environments:** Remove one `.env*` file to force usage of another

---

## �📞 API Endpoints Reference

### Chat Endpoint
```
POST http://localhost:8000/chat
Content-Type: application/json

Request:
{
  "message": "string",
  "session_id": "string or null"
}

Response:
{
  "reply": ["string"],
  "session_id": "string"
}
```

---

**Document Version:** 2.0  
**Last Updated:** May 5, 2026  
**Maintained By:** Development Team

### Version History
- **v2.0** - Added environment variables documentation, updated dependency table with complete list
- **v1.0** - Initial project documentation created
