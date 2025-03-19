import { App, BlockAction } from '@slack/bolt';

/**
 * Listens for select_user actions in the assign_ticket block and adds a reaction
 * @param app Slack Bolt app instance
 */
export const selectUserActionListener = (app: App): void => {
  // Your listener function will only be called when the action_id matches 'select_user'
  // AND the block_id matches 'assign_ticket'
  app.action<BlockAction>(
    { action_id: 'select_user', block_id: 'assign_ticket' },
    async ({ body, client, ack, logger }) => {
      await ack();
      try {
        // Make sure the event is not in a view
        if (body.message && body.channel) {
          await client.reactions.add({
            name: 'white_check_mark',
            timestamp: body.message.ts,
            channel: body.channel.id, // if the body has a message, we know it has a channel, too.
          });
        }
      } catch (error) {
        logger.error(error);
      }
    },
  );
};
