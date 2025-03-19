import { App, BlockButtonAction } from '@slack/bolt';

/**
 * Listens for button_click actions and responds with a message
 * @param app Slack Bolt app instance
 */
export const buttonClickActionListener = (app: App): void => {
  app.action<BlockButtonAction>('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    // We know that this event comes from a button click from a message in a channel, so `say` will be available.
    await say(`<@${body.user.id}> clicked the button`);
  });
};
