import { App } from '@slack/bolt';

/**
 * Listens for app_mention events and responds appropriately
 * @param app Slack Bolt app instance
 */
export const appMentionEventListener = (app: App): void => {
  app.event('app_mention', async ({ event, say }) => {
    console.log('Received app_mention event:', event);

    const text = event.text;

    // Check if the mention contains "hello"
    if (text.toLowerCase().includes('hello')) {
      await say({
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Hey there <@${event.user}>!`,
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
        text: `Hey there <@${event.user}>!`,
      });
    }
    // Check if the mention contains "knock knock"
    else if (text.toLowerCase().includes('knock knock')) {
      await say("_Who's there?_");
    }
    // Default response for other mentions
    else {
      await say(`Hi <@${event.user}>! How can I help you?`);
    }
  });
};
