import { App, subtype } from '@slack/bolt';

/**
 * Listens for bot_message events and logs them
 * @param app Slack Bolt app instance
 */
export const botMessageEventListener = (app: App): void => {
  app.message(subtype('bot_message'), async ({ message, logger }) => {
    // Cast message to any since we know it's a bot message
    const botMessage = message as any;
    logger.info(`The bot user ${botMessage.user} said ${botMessage.text}`);
  });
};
