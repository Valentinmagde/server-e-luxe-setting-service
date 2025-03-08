import DBManager from "../../../core/db";
import rabbitmqManager from "../../../core/rabbitmq";
import notificationService from "./notification.service";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-16
 *
 * Class NotificationSubscribe
 */
class NotificationSubscribe {
  /**
   * Listens for and processes order notification creation messages.
   *
   * @returns {Promise<void>} - A promise that resolves when the operation completes.
   *
   * @throws {Error} - Logs any errors related to queue setup or message processing.
   */
  public async createOrderNotification(): Promise<void> {
    try {
      const { channel, queue } = await rabbitmqManager.setupQueue(
        "eluxe.order.createOrderNotification",
        "createOrderNotificationQueue",
        "createOrderNotification"
      );

      channel.consume(queue, async (msg: any) => {
        try {
          const data = JSON.parse(msg.content);
          const dbManager = new DBManager();

          // Connect to the database
          const dbConnection = await dbManager.asyncOnConnect();

          await this.handleCreateOrderNotification(data, dbConnection);
        } catch (error) {
          console.error("Message processing failed:", error);
        } finally {
          channel.ack(msg); // Always acknowledge the message
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Processes an order notification creation request.
   *
   * @param {any} data - The data containing the order notification details, including `order_id`,
   * `message`, and `user_id`.
   * @param {any} dbConnection - The active database connection object used to interact with the database.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   *
   * @throws {Error} - Logs any errors related to notification creation.
   */
  private async handleCreateOrderNotification(
    data: any,
    dbConnection: any
  ): Promise<void> {
    try {
      await notificationService.store({
        order_id: data.message.order_id,
        message: data.message.message,
        user_id: data.message.user_id,
        type: data.message.type,
      } as any);
    } catch (error) {
      console.error("Error handling create order notification:", error);
    } finally {
      dbConnection.disconnect();
    }
  }
}

const orderSubscribe = new NotificationSubscribe();
export default orderSubscribe;
