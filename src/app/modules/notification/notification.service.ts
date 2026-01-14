import { socket } from "../../../core/socket";
import Notification from "./notification.model";
import NotificationType from "./notification.type";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-09-15
 *
 * Class NotificationService
 */
class NotificationService {
  /**
   * Get notification details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-03-07
   *
   * @param {string} notificationId the notification id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public show(notificationId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const notification = await Notification.findById(notificationId);

          resolve(notification);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all notification details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {any} data the notification criteria
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAll(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const { page } = data || 1;

          const pages = page;
          const limits = data.limit || 5;
          const skip = (pages - 1) * limits;
          const totalDoc = await Notification.countDocuments();
          const totalUnreadDoc = await Notification.countDocuments({
            status: "unread",
          });
          const notifications = await Notification.find({
            status: { $in: ["read", "unread"] },
          })
            .sort({
              _id: -1,
            })
            .skip(skip)
            .limit(limits);

          resolve({ totalDoc, totalUnreadDoc, notifications });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new notification
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {RoleType} data the notification data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: NotificationType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // if (data.product_id) {
          //   const isAdded = await Notification.findOne({
          //     product_id: data.product_id,
          //   });
          //   if (isAdded) {
          //     resolve("ISADDED");
          //   } else {
          //     const newNotification = new Notification(data);
          //     const notification = await newNotification.save();

          //     // Émettre la notification en temps réel via WebSocket
          //     socket.emit('notification', notification);

          //     resolve(notification);
          //   }
          // } else {
            const newNotification = new Notification(data);
            const notification = await newNotification.save();

            // Émettre la notification en temps réel via WebSocket
            socket.emit('notification', notification);

            resolve(notification);
          // }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update notification status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {string} notificationId the notification id
   * @param {any} data the notification data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateStatus(
    notificationId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const newStatus = data.status;

          await Notification.findByIdAndUpdate(
            { _id: notificationId },
            {
              $set: {
                status: newStatus,
              },
            }
          );
          const totalDoc = await Notification.countDocuments({
            status: "unread",
          });

          resolve({
            totalDoc,
            message: `Notification Read!`,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update many notification status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {any} data the notification data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateManyStatus(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const updatedNotifications = await Notification.updateMany(
            { _id: { $in: data?.ids.map((item: string) => item) } },
            {
              $set: {
                status: data.status,
              },
            },
            {
              multi: true,
            }
          );

          resolve(updatedNotifications);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a notification by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {string} notificationId the notification id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(notificationId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const notification = await Notification.findById(notificationId);

          if (notification) {
            const deletedNotification = await notification.deleteOne();

            resolve(deletedNotification);
          } else {
            resolve(notification);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a notification by product id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {string} productId the product id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public deleteByProductId(productId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const notification = await Notification.findOne({product_id: productId});

          if (notification) {
            const deletedNotification = await notification.deleteOne({product_id: productId});

            resolve(deletedNotification);
          } else {
            resolve(notification);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete many notifications
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Array<string>} data the notifications ids
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public deleteMany(data: Array<string>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const deleteNotifications = await Notification.deleteMany({
            _id: data.map((item) => item),
          });

          resolve(deleteNotifications);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const notificationService = new NotificationService();
export default notificationService;
