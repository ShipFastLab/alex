import { App } from '@slack/bolt';
import { helloMessageListener } from './hello';
import { knockKnockMessageListener } from './knock-knock';
import { waveEmojiMessageListener } from './wave-emoji';
import { wakeMeUpMessageListener } from './wake-me-up';

/**
 * Register all message listeners with the Slack app
 * @param app Slack Bolt app instance
 */
export const registerMessageListeners = (app: App): void => {
  // Register all message listeners
  helloMessageListener(app);
  knockKnockMessageListener(app);
  waveEmojiMessageListener(app);
  wakeMeUpMessageListener(app);
};
