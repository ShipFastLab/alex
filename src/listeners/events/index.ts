import { App } from '@slack/bolt';
import { teamJoinEventListener } from './team-join';
import { reactionAddedEventListener } from './reaction-added';
import { botMessageEventListener } from './bot-message';
import { appMentionEventListener } from './app-mention';

/**
 * Register all event listeners with the Slack app
 * @param app Slack Bolt app instance
 */
export const registerEventListeners = (app: App): void => {
  // Register all event listeners
  teamJoinEventListener(app);
  reactionAddedEventListener(app);
  botMessageEventListener(app);
  appMentionEventListener(app);
};
