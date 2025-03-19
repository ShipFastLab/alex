import { App } from '@slack/bolt';

// Channel ID for welcome messages
const WELCOME_CHANNEL_ID = 'C12345'; // Replace with your actual channel ID

/**
 * Listens for team_join events and sends a welcome message
 * @param app Slack Bolt app instance
 */
export const teamJoinEventListener = (app: App): void => {
  // When a user joins the team, send a message in a predefined channel asking them to introduce themselves
  app.event('team_join', async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in client
      const result = await client.chat.postMessage({
        channel: WELCOME_CHANNEL_ID,
        text: `Welcome to the team, <@${event.user}>! 🎉 You can introduce yourself in this channel.`,
      });
      logger.info(result);
    } catch (error) {
      logger.error(error);
    }
  });
};
