import { SlackEventMiddlewareArgs, SlackActionMiddlewareArgs, BlockAction, BlockButtonAction } from '@slack/bolt';

/**
 * Type definitions for Slack events and actions
 */

// Re-export types from @slack/bolt for convenience
export { BlockAction, BlockButtonAction } from '@slack/bolt';

// Custom type for message event with user field
export interface MessageEvent {
  type: 'message';
  user: string;
  text: string;
  ts: string;
  channel: string;
  subtype?: string;
}

// Custom type for team join event
export interface TeamJoinEvent {
  type: 'team_join';
  user: {
    id: string;
    name: string;
    profile: {
      display_name: string;
      real_name: string;
      email: string;
      image_72: string;
    };
  };
}

// Custom type for reaction added event
export interface ReactionAddedEvent {
  type: 'reaction_added';
  user: string;
  reaction: string;
  item: {
    type: string;
    channel: string;
    ts: string;
  };
  event_ts: string;
}

// Type for message event middleware args
export type MessageEventMiddlewareArgs = SlackEventMiddlewareArgs<'message'> & {
  message: MessageEvent;
};

// Type for action middleware args
export type ButtonActionMiddlewareArgs = SlackActionMiddlewareArgs<BlockButtonAction>;
export type BlockActionMiddlewareArgs = SlackActionMiddlewareArgs<BlockAction>;
