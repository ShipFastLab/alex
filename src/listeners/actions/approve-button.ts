import { App, BlockAction } from '@slack/bolt';

/**
 * Listens for approve_button actions and responds with a message
 * @param app Slack Bolt app instance
 */
export const approveButtonActionListener = (app: App): void => {
  // Your middleware will be called every time an interactive component with the action_id "approve_button" is triggered
  app.action<BlockAction>('approve_button', async ({ ack, say }) => {
    // Acknowledge action request
    await ack();
    await say('Request approved 👍');
  });
};
