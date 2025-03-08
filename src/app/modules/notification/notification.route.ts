import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import notificationController from "./notification.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-09-15
 *
 * Class NotificationRoutes
 */
class NotificationRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all notifications routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @returns {Router} the notification routes
   */
  public notificationRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/notifications",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/notifications:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: store
             *     summary: Create a new notification.
             *     description: Create a new notification.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               order_id:
             *                 type: string
             *                 description: The order id.
             *                 example: English
             *               product_id:
             *                 type: string
             *                 description: The product id.
             *                 example: en
             *               user_id:
             *                 type: string
             *                 description: The user id.
             *               message:
             *                 type: string
             *                 description: The notification message.
             *               image:
             *                 type: string
             *                 description: The notification image.
             *               status:
             *                 type: string
             *                 description: The notification's status.
             *                 enum: ["show", "hide"]
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               order_id:
             *                 type: string
             *                 description: The order id.
             *                 example: English
             *               product_id:
             *                 type: string
             *                 description: The product id.
             *                 example: en
             *               user_id:
             *                 type: string
             *                 description: The user id.
             *               message:
             *                 type: string
             *                 description: The notification message.
             *               image:
             *                 type: string
             *                 description: The notification image.
             *               status:
             *                 type: string
             *                 description: The notification's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       201:
             *         description: Notification created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.post("/", (req, res) => notificationController.store(req, res));

            /**
             * @swagger
             * /v1/{lang}/notifications:
             *   get:
             *     tags:
             *     - Notification
             *     operationId: getAll
             *     summary: Get all notifications.
             *     description: Get all notifications.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: query
             *        name: page
             *        schema:
             *          type: number
             *        description: Current page
             *      - in: query
             *        name: limit
             *        schema:
             *          type: string
             *          example: 5
             *        description: Number of notifications per page
             *
             *     responses:
             *       200:
             *         description: Notifications successfully obtained.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    type: array
             *                    items:
             *                      $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.get("/", notificationController.index);

            /**
             * @swagger
             * /v1/{lang}/notifications/many:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: updateMany
             *     summary: Update many notifications.
             *     description: Update many notifications.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               ids:
             *                 type: array
             *                 items:
             *                   properties:
             *                     _id:
             *                       type: string
             *                       description: The notification ID.
             *               status:
             *                 type: string
             *                 description: The currency's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       200:
             *         description: Notifications updated successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    type: array
             *                    items:
             *                      $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.put("/many", notificationController.updateManyStatus);

            /**
             * @swagger
             * /v1/{lang}/notifications/{notificationIds}/many:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: deleteMany
             *     summary: Delete many notifications.
             *     description: Delete many notifications.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: notificationIds
             *        schema:
             *          type: string
             *        required: true
             *        description: The notification IDs to be deleted.
             *          You can enter several identifiers, separated by commas
             *
             *     responses:
             *       204:
             *         description: Notifications deleted successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.delete("/:notificationIds/many", notificationController.deleteMany);
          })
        );

        router.use(
          "/notification",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/notification/{notificationId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: show
             *     summary: Get a notification by ID.
             *     description: Get a notification by id from the system.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: notificationId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the notification to get
             *
             *     responses:
             *       200:
             *         description: The notification has successfully logged in.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Notification'
             *
             *       '400':
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       '404':
             *         description: Not Found.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/404'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.get("/:notificationId", notificationController.show);

            /**
             * @swagger
             * /v1/{lang}/notification/{notificationId}/status:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: updateStatus
             *     summary: Update a notification status.
             *     description: Update a notification status.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: notificationId
             *        schema:
             *          type: string
             *        required: true
             *        description: The notification's ID to update
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               status:
             *                 type: string
             *                 description: The language's status.
             *                 enum: ["show", "hide"]
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               status:
             *                 type: string
             *                 description: The language's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       200:
             *         description: Notification updated successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.put("/:notificationId/status", notificationController.updateStatus);

            /**
             * @swagger
             * /v1/{lang}/notification/{notificationId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: deleteById
             *     summary: Delete a notification by ID.
             *     description: Delete a notification by ID.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: notificationId
             *        schema:
             *          type: string
             *        required: true
             *        description: The notification's ID to update
             *
             *     responses:
             *       200:
             *         description: Notificaton successfully deleted.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.delete("/:notificationId", notificationController.delete);

            /**
             * @swagger
             * /v1/{lang}/notification/product/{productId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Notification
             *     operationId: deleteByProductId
             *     summary: Delete a notification by product ID.
             *     description: Delete a notification by product ID.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: productId
             *        schema:
             *          type: string
             *        required: true
             *        description: The product ID to delete
             *
             *     responses:
             *       200:
             *         description: Notificaton successfully deleted.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Notification'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.delete("/product/:productId", notificationController.deleteByProductId);
          })
        );
      })
    );
  }
}

const notificationRoutes: NotificationRoutes = new NotificationRoutes();
export default notificationRoutes;
