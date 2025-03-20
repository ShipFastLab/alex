import { App } from '@slack/bolt';

/**
 * Register all middleware with the Slack app
 * @param app Slack Bolt app instance
 */
export const registerMiddleware = (app: App): void => {
  // Global middleware that runs for all events
  app.use(async ({ logger, context, body, next }) => {
    // Log all incoming requests with detailed information
    logger.debug('Incoming request with context type:', context.type);
    logger.debug('Request body:', JSON.stringify(body, null, 2));

    // Continue to the next middleware or listener
    await next();
  });

  // Add more middleware as needed
};
