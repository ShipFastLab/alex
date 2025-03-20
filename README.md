# Slack Bot

A TypeScript-based Slack app built with the Slack Bolt framework. This app demonstrates various Slack API features including message listening, event handling, interactive components, and more.

## Project Structure

```
├── src/
│   ├── app/
│   │   └── index.ts         # Main application entry point
│   ├── listeners/
│   │   ├── actions/         # Interactive component handlers
│   │   ├── events/          # Slack event handlers
│   │   └── messages/        # Message handlers
│   ├── middleware/          # Custom middleware
│   │   └── index.ts         # Middleware registration
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Type definitions
│   └── utils/
│       ├── env.ts           # Environment variable handling
│       └── installationStore.ts # OAuth installation storage
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── manifest.yaml            # Slack App Manifest
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## Features

- **Message Handling**: Responds to specific messages like "hello", "knock knock", etc.
- **Event Listening**: Handles events like team joins, reactions, etc.
- **Interactive Components**: Processes button clicks and other interactive elements
- **Middleware Support**: Includes custom middleware for request processing
- **Multi-Workspace Support**: Can be distributed to multiple workspaces via OAuth

## Setup

### Development Mode (Single Workspace)

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Copy the example environment file and add your Slack credentials:

```bash
cp .env.example .env
```

Edit the `.env` file with your Slack Bot Token and Signing Secret:

```
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
PORT=3000
```

3. **Build the project**

```bash
npm run build
```

4. **Start the server**

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### Distribution Mode (Multi-Workspace)

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Copy the example environment file and add your Slack credentials:

```bash
cp .env.example .env
```

Edit the `.env` file with your Slack App credentials:

```
SLACK_CLIENT_ID=your-client-id
SLACK_CLIENT_SECRET=your-client-secret
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_STATE_SECRET=your-state-secret
PORT=3000
APP_URL=https://your-app-domain.com
```

3. **Build the project**

```bash
npm run build
```

4. **Start the server**

```bash
npm start
```

## Slack App Configuration

### Using App Manifest (Recommended)

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click "Create New App" and select "From an app manifest"
3. Select your workspace and click "Next"
4. Copy the contents of `manifest.yaml` and paste it into the YAML editor
5. Update the URLs in the manifest to match your app's domain
6. Click "Create" to create your app

### Manual Configuration

1. Create a new Slack App at [api.slack.com/apps](https://api.slack.com/apps)
2. Under "OAuth & Permissions", add the following Bot Token Scopes:
   - `chat:write`
   - `reactions:write`
   - `channels:history`
   - `groups:history`
   - `im:history`
   - `mpim:history`
   - `app_mentions:read`
   - `reactions:read`
   - `team:read`
3. Set up Redirect URLs for OAuth
4. Under "Basic Information", copy the Client ID, Client Secret, and Signing Secret to your `.env` file
5. Enable Event Subscriptions and subscribe to the following events:
   - `message.channels`
   - `message.groups`
   - `message.im`
   - `message.mpim`
   - `app_mention`
   - `reaction_added`
   - `team_join`
6. Set up Interactivity & Shortcuts with your app's request URL

## Deployment

To deploy the app to a production environment:

1. Set up a server with Node.js installed
2. Clone the repository to your server
3. Install dependencies with `npm install`
4. Build the project with `npm run build`
5. Set up environment variables with your production credentials
6. Start the server with `npm start` or use a process manager like PM2

For production deployments, consider using:
- HTTPS for secure communication
- A process manager like PM2 to keep the app running
- A reverse proxy like Nginx to handle HTTPS and load balancing

## Development

- **Linting**

```bash
npm run lint
```

- **Testing**

```bash
npm test
```

## Extending the App

To add new functionality:

1. Create a new listener in the appropriate directory
2. Register the listener in the corresponding index.ts file
3. Update the main app to use the new functionality if needed

## License

MIT
