import { App } from '@slack/bolt';

/**
 * Listens for messages containing "wake me up" and schedules a message
 * @param app Slack Bolt app instance
 */
export const wakeMeUpMessageListener = (app: App): void => {
  // Unix Epoch time for September 30, 2019 11:59:59 PM
  const whenSeptemberEnds = '1569887999';

  app.message('wake me up', async ({ message, client, logger }) => {
    try {
      // Call chat.scheduleMessage with the built-in client
      await client.chat.scheduleMessage({
        channel: message.channel,
        post_at: whenSeptemberEnds,
        text: 'Summer has come and passed',
      });
    } catch (error) {
      logger.error(error);
    }
  });
};
