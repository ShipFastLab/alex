import { App } from '@slack/bolt';

/**
 * Listens for messages containing "knock knock" and responds with an italicized "who's there?"
 * @param app Slack Bolt app instance
 */
export const knockKnockMessageListener = (app: App): void => {
  app.message('knock knock', async ({ say }) => {
    await say("_Who's there?_");
  });
};
