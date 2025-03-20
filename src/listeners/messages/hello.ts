import { App } from '@slack/bolt';

/**
 * Listens for messages containing "hello" and responds with a greeting and button
 * @param app Slack Bolt app instance
 */
export const helloMessageListener = (app: App): void => {
  app.message('hello', async ({ message, say }) => {
    // Filter out message events with subtypes (see https://api.slack.com/events/message)
    if (message.subtype === undefined || message.subtype === 'bot_message') {
      // say() sends a message to the channel where the event was triggered
      await say({
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Hey there <@${message.user}>!`,
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click Me',
              },
              action_id: 'button_click',
            },
          },
        ],
        text: `Hey there <@${message.user}>!`,
      });
    }
  });
};
