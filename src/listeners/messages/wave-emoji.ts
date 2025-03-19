import { App } from '@slack/bolt';

/**
 * Listens for messages containing the wave emoji and responds with a greeting
 * @param app Slack Bolt app instance
 */
export const waveEmojiMessageListener = (app: App): void => {
  // This will match any message that contains 👋
  app.message(':wave:', async ({ message, say }) => {
    if (message.subtype === undefined || message.subtype === 'bot_message') {
      await say(`Hello, <@${message.user}>`);
    }
  });
};
