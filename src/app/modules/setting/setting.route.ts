import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import settingController from "./setting.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-07-28
 *
 * Class SettingRoutes
 */
class SettingRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all settings routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @returns {Router} the settigns routes
   */
  public settingRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/settings",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/settings:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Settings
             *     operationId: store
             *     summary: Create a new settings.
             *     description: Create a new settings.
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
             *               name:
             *                 type: string
             *                 description: The language's name.
             *                 example: English
             *               setting:
             *                 type: object
             *
             *     responses:
             *       201:
             *         description: Settings created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.post("/", settingController.store);
          })
        );

        router.use(
          "/setting",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/setting/global:
             *   get:
             *     tags:
             *     - Settings
             *     operationId: getGblobal
             *     summary: Get global setting.
             *     description: Get global setting.
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
             *     responses:
             *       200:
             *         description: Global settings successfully obtain.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.get("/global", settingController.getGlobalSetting);

            /**
             * @swagger
             * /v1/{lang}/setting/store-setting:
             *   get:
             *     tags:
             *     - Settings
             *     operationId: getStore
             *     summary: Get store setting.
             *     description: Get store setting.
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
             *     responses:
             *       200:
             *         description: Store settings successfully obtain.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.get("/store-setting", settingController.getStoreSetting);

            /**
             * @swagger
             * /v1/{lang}/setting/store/seo:
             *   get:
             *     tags:
             *     - Settings
             *     operationId: getStoreSeo
             *     summary: Get store seo setting.
             *     description: Get store seo setting.
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
             *     responses:
             *       200:
             *         description: Store seo settings successfully obtain.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.get("/store/seo", settingController.getStoreSeoSetting);

            /**
             * @swagger
             * /v1/{lang}/setting/store/customization:
             *   get:
             *     tags:
             *     - Settings
             *     operationId: getStoreCustomization
             *     summary: Get store customization setting.
             *     description: Get store customization setting.
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
             *        name: key
             *        schema:
             *          type: string
             *        required: true
             *      - in: query
             *        name: keyTwo
             *        schema:
             *          type: string
             *        required: true
             *
             *     responses:
             *       200:
             *         description: Store customization settings successfully obtain.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.get("/store/customization", settingController.getStoreCustomizationSetting);

            /**
             * @swagger
             * /v1/{lang}/setting/global:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Settings
             *     operationId: updateGlobal
             *     summary: Update global setting.
             *     description: Update global setting.
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
             *               setting:
             *                 type: object
             *
             *     responses:
             *       200:
             *         description: Global setting updated successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.put("/global", settingController.updateGlobalSetting);

            /**
             * @swagger
             * /v1/{lang}/setting/store-setting:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Settings
             *     operationId: updateStore
             *     summary: Update store setting.
             *     description: Update store setting.
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
             *               setting:
             *                 type: object
             *
             *     responses:
             *       200:
             *         description: Store setting updated successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.put("/store-setting", settingController.updateStoreSetting);

            /**
             * @swagger
             * /v1/{lang}/setting/store/customization:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Settings
             *     operationId: updateStoreCustomization
             *     summary: Update store customization setting.
             *     description: Update store customization setting.
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
             *               setting:
             *                 type: object
             *
             *     responses:
             *       200:
             *         description: Store customization setting updated successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Setting'
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
            router.put("/store/customization", settingController.updateStoreCustomizationSetting);
          })
        );
      })
    );
  }
}

const settingRoutes: SettingRoutes = new SettingRoutes();
export default settingRoutes;
