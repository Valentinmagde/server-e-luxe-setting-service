import DBManager from "../../../core/db";
import rabbitmqManager from "../../../core/rabbitmq";
import notificationService from "./notification.service";
import { loadTemplate } from "../../utils/helpers.util";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-16
 *
 * Class NotificationSubscribe
 */
class NotificationSubscribe {
  /**
   * Create product customization notification.
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2026-01-10
   * @returns {Promise<void>} - A promise that resolves when the operation completes.
   */
  public async createProductCustomizationNotification(): Promise<void> {
    try {
      const { channel, queue } = await rabbitmqManager.setupQueue(
        "eluxe.product.createProductCustomizationNotification",
        "createProductCustomizationNotificationQueue",
        "createProductCustomizationNotification"
      );

      channel.consume(queue, async (msg: any) => {
        try {
          const data = JSON.parse(msg.content);
          const dbManager = new DBManager();

          // Connect to the database
          const dbConnection = await dbManager.asyncOnConnect();

          await this.handleCreateProductCustomizationNotification(data, dbConnection);
        } catch (error) {
          console.error("Message processing failed:", error);
        } finally {
          channel.ack(msg);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

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

  /**
   * Processes a product customization notification creation request.
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2026-01-10
   *
   * @param {any} data - The data containing the product customization notification details, including `product_id`,
   * `message`, and `user_id`.
   * @param {any} dbConnection - The active database connection object used to interact with the database.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  private async handleCreateProductCustomizationNotification(
    data: any,
    dbConnection: any
  ): Promise<void> {
    try {
      await notificationService.store({
        ...data.message,
        message: data.message.notes,
        type: data.message.type,
      } as any);

      await this.sendCustomizationEmailToClient(data.message);
      await this.sendCustomizationEmailToService(data.message);
    } catch (error) {
      console.error("Error handling create product customization notification:", error);
    } finally {
      dbConnection.disconnect();
    }
  }

  /**
     * Send product customization confirmation email to client
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2026-01-10
     *
     * @param {any} body the email data.
     *
     * @return {Promise<void>} the eventual completion or failure
     */
    private async sendCustomizationEmailToClient(
      body: any
    ): Promise<void> {
      console.log(body);
      const emailData = {
        request_id: body.request_id || "",
        client_name: body.name || "",
        email: body.email || "",
        subject: body.subject || "",
        product_name: body.product_name || "",
        product_sku: body.product_sku || "",
        customization_details: body.notes || "",
        submission_date: new Date().toISOString(),
        admin_dashboard_url: body.admin_dashboard_url || "",
        company_name: body?.company_name || "",
        company_phone: body.company_phone || "",
        current_year: new Date().getFullYear(),
        website_url: body.website_url || "#",
        faq_link: body.faq_link || "#",
      };

      const emailHtml = loadTemplate(
        "product-customization-client-template.html",
        emailData
      );

      console.log("Publish message to rabbitmq", emailHtml);
      await rabbitmqManager
        .publishMessage("eluxe.email.sendMail", "sendMail", {
          senderName: body.company_name,
          receivers: body.email || [],
          senderEmail: body.company_email || "",
          subject: body.subject || "",
          body: emailHtml,
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * Send product customization confirmation email to customer service
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2026-01-10
     *
     * @param {any} body the email data.
     *
     * @return {Promise<void>} the eventual completion or failure
     */
    private async sendCustomizationEmailToService(
      body: any
    ): Promise<void> {
      console.log(body);
      const emailData = {
        request_id: body.request_id || "",
        product_name: body.product_name || "",
        product_sku: body.product_sku || "",
        product_url: body.product_url || "",
        base_price: body.base_price || "",
        client_name: body.name || "",
        client_email: body.email || "",
        subject: body.subject || "",
        customization_details: body.notes || "",
        admin_dashboard_url: body.admin_dashboard_url || "",
        submission_date: body.submission_date || "",
      };

      const emailHtml = loadTemplate(
        "product-customization-service-template.html",
        emailData
      );

      console.log("Publish message to rabbitmq", emailHtml);
      await rabbitmqManager
        .publishMessage("eluxe.email.sendMail", "sendMail", {
          senderName: body.company_name,
          receivers: body.company_email || [],
          senderEmail: body.company_email || "",
          subject: body.subject,
          body: emailHtml,
        })
        .catch((error) => {
          console.log(error);
        });
    }
}

const orderSubscribe = new NotificationSubscribe();
export default orderSubscribe;
