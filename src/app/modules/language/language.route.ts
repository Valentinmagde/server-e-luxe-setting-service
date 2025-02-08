import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import languageController from "./language.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-04-12
 *
 * Class LanguageRoutes
 */
class LanguageRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-04-12
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all language routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-04-12
   *
   * @returns {Router} the language routes
   */
  public languageRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/languages",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/languages:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: store
             *     summary: Create a new language.
             *     description: Create a new language.
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
             *               name:
             *                 type: string
             *                 description: The language's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The language's iso code.
             *                 example: en
             *               flag:
             *                 type: string
             *                 description: The language's flag.
             *               status:
             *                 type: string
             *                 description: The language's status.
             *                 enum: ["show", "hide"]
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The language's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The language's iso code.
             *                 example: en
             *               flag:
             *                 type: string
             *                 description: The language's flag.
             *               status:
             *                 type: string
             *                 description: The language's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       201:
             *         description: Language created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Language'
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
            router.post("/", languageController.store);

            /**
             * @swagger
             * /v1/{lang}/languages/many:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: storeMany
             *     summary: Create many languages.
             *     description: Create many languages.
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
             *             type: array
             *             items:
             *               type: object
             *               properties:
             *                 name:
             *                   type: string
             *                   description: The language's name.
             *                   example: English
             *                 iso_code:
             *                   type: string
             *                   description: The language's iso code.
             *                   example: en
             *                 flag:
             *                   type: string
             *                   description: The language's flag.
             *                 status:
             *                   type: string
             *                   description: The language's status.
             *                   enum: ["show", "hide"]
             *
             *     responses:
             *       201:
             *         description: Languages created successfully.
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
             *                      $ref: '#/components/schemas/Language'
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
            router.post("/many", languageController.storeMany);

            /**
             * @swagger
             * /v1/{lang}/languages:
             *   get:
             *     tags:
             *     - Language
             *     operationId: getAll
             *     summary: Get all languages.
             *     description: Get all language.
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
             *         description: Languages successfully obtained.
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
             *                      $ref: '#/components/schemas/Language'
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
            router.get("/", languageController.index);

            /**
             * @swagger
             * /v1/{lang}/languages/showing:
             *   get:
             *     tags:
             *     - Language
             *     operationId: getShowing
             *     summary: Get all showing languages.
             *     description: Get all showing language.
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
             *         description: Languages successfully obtained.
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
             *                      $ref: '#/components/schemas/Language'
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
            router.get("/showing", languageController.getShowingLanguage);

            /**
             * @swagger
             * /v1/{lang}/languages/update/many:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: updateMany
             *     summary: Update many languages.
             *     description: Update many languages.
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
             *             type: array
             *             items:
             *               type: object
             *               properties:
             *                 _id:
             *                   type: string
             *                   description: The language's ID.
             *                 name:
             *                   type: string
             *                   description: The language's name.
             *                   example: English
             *                 iso_code:
             *                   type: string
             *                   description: The language's iso code.
             *                   example: en
             *                 flag:
             *                   type: string
             *                   description: The language's flag.
             *                 status:
             *                   type: string
             *                   description: The language's status.
             *                   enum: ["show", "hide"]
             *
             *     responses:
             *       200:
             *         description: Languages updated successfully.
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
             *                      $ref: '#/components/schemas/Language'
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
            router.put("/update/many", languageController.updateMany);

            /**
             * @swagger
             * /v1/{lang}/languages/{languageIds}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: deleteMany
             *     summary: Delete many languages.
             *     description: Delete many languages.
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
             *        name: languageIds
             *        schema:
             *          type: string
             *        required: true
             *        description: The language IDs to be deleted. You can enter several identifiers, separated by commas
             *
             *     responses:
             *       204:
             *         description: Languages deleted successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Language'
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
            router.delete("/:languageIds", languageController.deleteMany);
          })
        );

        router.use(
          "/language",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/language/{languageId}:
             *   get:
             *     tags:
             *     - Language
             *     operationId: getById
             *     summary: Get a language by ID.
             *     description: Get a language by ID.
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
             *        name: languageId
             *        schema:
             *          type: string
             *        required: true
             *        description: The language's ID to update
             *
             *     responses:
             *       200:
             *         description: Language successfully obtain.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Language'
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
            router.get("/:languageId", languageController.show);

            /**
             * @swagger
             * /v1/{lang}/language/{languageId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: updateById
             *     summary: Update a language by ID.
             *     description: Update a language by ID.
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
             *        name: languageId
             *        schema:
             *          type: string
             *        required: true
             *        description: The language's ID to update
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The language's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The language's iso code.
             *                 example: en
             *               flag:
             *                 type: string
             *                 description: The language's flag.
             *               status:
             *                 type: string
             *                 description: The language's status.
             *                 enum: ["show", "hide"]
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The language's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The language's iso code.
             *                 example: en
             *               flag:
             *                 type: string
             *                 description: The language's flag.
             *               status:
             *                 type: string
             *                 description: The language's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       200:
             *         description: Language created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Language'
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
            router.put("/:languageId", languageController.update);

            /**
             * @swagger
             * /v1/{lang}/language/{languageId}/status:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: updateStatus
             *     summary: Update a language status.
             *     description: Update a language status.
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
             *        name: languageId
             *        schema:
             *          type: string
             *        required: true
             *        description: The language's ID to update
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
             *         description: Language created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Language'
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
            router.put("/:languageId/status", languageController.updateStatus);

            /**
             * @swagger
             * /v1/{lang}/language/{languageId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Language
             *     operationId: deleteById
             *     summary: Delete a language by ID.
             *     description: Delete a language by ID.
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
             *        name: languageId
             *        schema:
             *          type: string
             *        required: true
             *        description: The language's ID to update
             *
             *     responses:
             *       200:
             *         description: Language successfully deleted.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Language'
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
            router.delete("/:languageId", languageController.delete);
          })
        );
      })
    );
  }
}

const languageRoutes: LanguageRoutes = new LanguageRoutes();
export default languageRoutes;
