import '../utils/env';
import env from '../utils/env';
import { App, LogLevel, ExpressReceiver } from '@slack/bolt';
import { getDefaultInstallationStore } from '../utils/installationStore';

// Import listeners
import { registerMessageListeners } from '../listeners/messages';
import { registerEventListeners } from '../listeners/events';
import { registerActionListeners } from '../listeners/actions';
import { registerMiddleware } from '../middleware';

let app: App;

// 開発モード（シングルワークスペース）と配布モード（マルチワークスペース）を切り替え
if (env.IS_DISTRIBUTION_MODE) {
  // 配布モード（マルチワークスペース）
  console.log('Initializing app in distribution mode (multi-workspace)');

  // カスタムレシーバーを作成
  const receiver = new ExpressReceiver({
    signingSecret: env.SLACK_SIGNING_SECRET,
    clientId: env.SLACK_CLIENT_ID,
    clientSecret: env.SLACK_CLIENT_SECRET,
    stateSecret: env.SLACK_STATE_SECRET,
    scopes: [
      'chat:write',
      'reactions:write',
      'channels:history',
      'groups:history',
      'im:history',
      'mpim:history',
      'app_mentions:read',
      'reactions:read',
      'team:read'
    ],
    installationStore: getDefaultInstallationStore(),
    installerOptions: {
      directInstall: true,
    },
  });

  // カスタムルートを追加
  receiver.router.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Slack Bot</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              line-height: 1.6;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 20px;
              margin-top: 20px;
            }
            h1 {
              color: #4A154B;
            }
            .button {
              display: inline-block;
              background-color: #4A154B;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 20px;
            }
            .button:hover {
              background-color: #611f69;
            }
          </style>
        </head>
        <body>
          <h1>Slack Bot</h1>
          <p>A TypeScript-based Slack app with various features.</p>

          <div class="container">
            <h2>Features</h2>
            <ul>
              <li>Message Handling: Responds to specific messages</li>
              <li>Event Listening: Handles events like team joins, reactions, etc.</li>
              <li>Interactive Components: Processes button clicks and other interactive elements</li>
            </ul>

            <a href="/slack/install" class="button">Install to Slack</a>
          </div>
        </body>
      </html>
    `);
  });

  // Initialize the Slack app with receiver
  app = new App({
    receiver,
    logLevel: LogLevel.DEBUG,
  });
} else {
  // 開発モード（シングルワークスペース）
  console.log('Initializing app in development mode (single workspace)');

  // Initialize the Slack app with token
  app = new App({
    token: env.SLACK_BOT_TOKEN,
    signingSecret: env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.DEBUG,
  });
}

// Register middleware
registerMiddleware(app);

// Register listeners
registerMessageListeners(app);
registerEventListeners(app);
registerActionListeners(app);

// Start the app
(async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.start(port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
    console.log(`Mode: ${env.IS_DISTRIBUTION_MODE ? 'Distribution (Multi-Workspace)' : 'Development (Single Workspace)'}`);
  } catch (error) {
    console.error('Error starting app:', error);
    process.exit(1);
  }
})();
