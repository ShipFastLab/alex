import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// 配布モードかどうかを判定
const isDistributionMode = process.env.SLACK_CLIENT_ID && process.env.SLACK_CLIENT_SECRET;

// 必須環境変数を検証
let requiredEnvVars: string[];

if (isDistributionMode) {
  // 配布モード（マルチワークスペース）の場合
  requiredEnvVars = [
    'SLACK_CLIENT_ID',
    'SLACK_CLIENT_SECRET',
    'SLACK_SIGNING_SECRET',
    'SLACK_STATE_SECRET'
  ];
  console.log('Running in distribution mode (multi-workspace)');
} else {
  // 開発モード（シングルワークスペース）の場合
  requiredEnvVars = ['SLACK_BOT_TOKEN', 'SLACK_SIGNING_SECRET'];
  console.log('Running in development mode (single workspace)');
}

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default {
  // 共通設定
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET as string,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  // 配布モード用の設定
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID as string,
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET as string,
  SLACK_STATE_SECRET: process.env.SLACK_STATE_SECRET as string,

  // 開発モード用の設定
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN as string,

  // アプリのモード
  IS_DISTRIBUTION_MODE: isDistributionMode,

  // アプリのURL（本番環境用）
  APP_URL: process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`,
};
