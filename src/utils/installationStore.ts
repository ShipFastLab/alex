import { Installation, InstallationQuery } from '@slack/bolt';
import * as fs from 'fs';
import * as path from 'path';

/**
 * インストールデータを保存・取得するためのインターフェース
 */
export interface InstallationStore {
  /**
   * インストールデータを保存する
   * @param installation インストールデータ
   * @returns 保存が成功したかどうか
   */
  storeInstallation(installation: Installation): Promise<void>;

  /**
   * インストールデータを取得する
   * @param query 検索クエリ
   * @returns インストールデータ
   */
  fetchInstallation(query: InstallationQuery<boolean>): Promise<Installation>;

  /**
   * インストールデータを削除する
   * @param query 検索クエリ
   * @returns 削除が成功したかどうか
   */
  deleteInstallation(query: InstallationQuery<boolean>): Promise<void>;
}

/**
 * ファイルベースのインストールストア
 * 開発環境や小規模な本番環境向け
 */
export class FileInstallationStore implements InstallationStore {
  private readonly dirPath: string;

  /**
   * コンストラクタ
   * @param dirPath インストールデータを保存するディレクトリのパス
   */
  constructor(dirPath: string = path.join(process.cwd(), '.installations')) {
    this.dirPath = dirPath;
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath, { recursive: true });
    }
  }

  /**
   * インストールデータを保存する
   * @param installation インストールデータ
   * @returns 保存が成功したかどうか
   */
  async storeInstallation(installation: Installation): Promise<void> {
    try {
      const enterpriseId = installation.enterprise?.id || 'none';
      const teamId = installation.team?.id || 'none';
      const fileName = `${enterpriseId}-${teamId}.json`;
      const filePath = path.join(this.dirPath, fileName);

      fs.writeFileSync(filePath, JSON.stringify(installation, null, 2));
    } catch (error) {
      console.error('Error storing installation data:', error);
      throw error;
    }
  }

  /**
   * インストールデータを取得する
   * @param query 検索クエリ
   * @returns インストールデータ
   */
  async fetchInstallation(query: InstallationQuery<boolean>): Promise<Installation> {
    try {
      const enterpriseId = query.enterpriseId || 'none';
      const teamId = query.teamId || 'none';
      const fileName = `${enterpriseId}-${teamId}.json`;
      const filePath = path.join(this.dirPath, fileName);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Installation data not found for ${enterpriseId}-${teamId}`);
      }

      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as Installation;
    } catch (error) {
      console.error('Error fetching installation data:', error);
      throw error;
    }
  }

  /**
   * インストールデータを削除する
   * @param query 検索クエリ
   * @returns 削除が成功したかどうか
   */
  async deleteInstallation(query: InstallationQuery<boolean>): Promise<void> {
    try {
      const enterpriseId = query.enterpriseId || 'none';
      const teamId = query.teamId || 'none';
      const fileName = `${enterpriseId}-${teamId}.json`;
      const filePath = path.join(this.dirPath, fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting installation data:', error);
      throw error;
    }
  }
}

/**
 * デフォルトのインストールストアを取得する
 * @returns インストールストアのインスタンス
 */
export function getDefaultInstallationStore(): InstallationStore {
  // 環境変数でストレージタイプを切り替えることも可能
  // 例: process.env.INSTALLATION_STORE_TYPE === 'database' ? new DatabaseInstallationStore() : new FileInstallationStore()
  return new FileInstallationStore();
}
