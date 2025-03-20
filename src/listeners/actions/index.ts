import { App } from '@slack/bolt';
import { buttonClickActionListener } from './button-click';
import { approveButtonActionListener } from './approve-button';
import { selectUserActionListener } from './select-user';
import { datepickerRemindActionListener } from './datepicker-remind';

/**
 * Register all action listeners with the Slack app
 * @param app Slack Bolt app instance
 */
export const registerActionListeners = (app: App): void => {
  // Register all action listeners
  buttonClickActionListener(app);
  approveButtonActionListener(app);
  selectUserActionListener(app);
  datepickerRemindActionListener(app);
};
