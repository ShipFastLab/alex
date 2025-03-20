import { App } from '@slack/bolt';

/**
 * Listens for reaction_added events and responds with a datepicker when calendar emoji is used
 * @param app Slack Bolt app instance
 */
export const reactionAddedEventListener = (app: App): void => {
  // Sends a section block with datepicker when someone reacts with a 📅 emoji
  app.event('reaction_added', async ({ event, client }) => {
    // Check if it's a calendar emoji and the reaction is on a message
    if (event.reaction === 'calendar' && event.item.type === 'message') {
      await client.chat.postMessage({
        text: 'Pick a reminder date',
        channel: event.item.channel,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Pick a date for me to remind you',
            },
            accessory: {
              type: 'datepicker',
              action_id: 'datepicker_remind',
              initial_date: '2019-04-28',
              placeholder: {
                type: 'plain_text',
                text: 'Select a date',
              },
            },
          },
        ],
      });
    }
  });
};
