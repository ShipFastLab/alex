import { App, BlockAction } from '@slack/bolt';

/**
 * Listens for datepicker_remind actions and responds with a confirmation
 * @param app Slack Bolt app instance
 */
export const datepickerRemindActionListener = (app: App): void => {
  app.action<BlockAction>('datepicker_remind', async ({ body, ack, say, logger }) => {
    await ack();

    try {
      // Extract the selected date from the action
      // Cast to any to access the selected_date property which might not be in the type definition
      const action = body.actions[0] as any;
      const selectedDate = action.selected_date;

      // Respond with a confirmation message
      await say(`I'll remind you on ${selectedDate}! 📅`);
    } catch (error) {
      logger.error('Error handling datepicker action:', error);
    }
  });
};
