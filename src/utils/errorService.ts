import { sendMessageToAdminGroup } from "../api/telegraf/adminBot";

export class ErrorService {
  /**
   * Handles API errors by logging them and sending notifications.
   * @param error The error to handle.
   */
  static handleApiError(error: any): void {
    console.error('API Error:', error);
    sendMessageToAdminGroup(`API Error: ${error.message}`);
  }

  /**
   * Handles generic errors.
   * @param error The error to handle.
   */
  static handleError(error: any): void {
    console.error('Error:', error);
    sendMessageToAdminGroup(`Error: ${error.message}`);
  }
}
