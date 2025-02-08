import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import currencyController from "./currency.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-08-15
 *
 * Class CurrencyRoutes
 */
class CurrencyRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all currency routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-05-15
   *
   * @returns {Router} the currency routes
   */
  public currencyRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/currencies",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/currencies:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: store
             *     summary: Create a new currency.
             *     description: Create a new currency.
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
             *                 description: The currency's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The currency's iso code.
             *                 example: en
             *               symbol:
             *                 type: string
             *                 description: The currency's symbol.
             *               exchange_rate:
             *                 type: string
             *                 description: The currency's exchange rate.
             *               live_exchange_rates:
             *                 type: string
             *                 description: The currency's live exchange rates.
             *               status:
             *                 type: string
             *                 description: The currency's status.
             *                 enum: ["show", "hide"]
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The currency's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The currency's iso code.
             *                 example: en
             *               symbol:
             *                 type: string
             *                 description: The currency's symbol.
             *               exchange_rate:
             *                 type: string
             *                 description: The currency's exchange rate.
             *               live_exchange_rates:
             *                 type: string
             *                 description: The currency's live exchange rates.
             *               status:
             *                 type: string
             *                 description: The currency's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       201:
             *         description: Currency created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.post("/", currencyController.store);

            /**
             * @swagger
             * /v1/{lang}/currencies/many:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: storeMany
             *     summary: Create many currencies.
             *     description: Create many currencies.
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
             *                   description: The currency's name.
             *                   example: English
             *                 iso_code:
             *                   type: string
             *                   description: The currency's iso code.
             *                   example: en
             *                 symbol:
             *                   type: string
             *                   description: The currency's symbol.
             *                 exchange_rate:
             *                   type: string
             *                   description: The currency's exchange rate.
             *                 live_exchange_rates:
             *                   type: string
             *                   description: The currency's live exchange rates.
             *                 status:
             *                   type: string
             *                   description: The currency's status.
             *                   enum: ["show", "hide"]
             *
             *     responses:
             *       201:
             *         description: Currencies created successfully.
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
             *                      $ref: '#/components/schemas/Currency'
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
            router.post("/many", currencyController.storeMany);

            /**
             * @swagger
             * /v1/{lang}/currencies:
             *   get:
             *     tags:
             *     - Currency
             *     operationId: getAll
             *     summary: Get all currencies.
             *     description: Get all currencies.
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
             *         description: Currencies successfully obtained.
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
             *                      $ref: '#/components/schemas/Currency'
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
            router.get("/", currencyController.index);

            /**
             * @swagger
             * /v1/{lang}/currencies/showing:
             *   get:
             *     tags:
             *     - Currency
             *     operationId: getShowing
             *     summary: Get all showing currencies.
             *     description: Get all showing currencies.
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
             *         description: Currencies successfully obtained.
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
             *                      $ref: '#/components/schemas/Currency'
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
            router.get("/showing", currencyController.getShowingCurrency);

            /**
             * @swagger
             * /v1/{lang}/currencies/many:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: updateMany
             *     summary: Update many currencies.
             *     description: Update many currencies.
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
             *                   description: The currency's name.
             *                   example: English
             *                 iso_code:
             *                   type: string
             *                   description: The currency's iso code.
             *                   example: en
             *                 symbol:
             *                   type: string
             *                   description: The currency's symbol.
             *                 exchange_rate:
             *                   type: string
             *                   description: The currency's exchange rate.
             *                 live_exchange_rates:
             *                   type: string
             *                   description: The currency's live exchange rates.
             *                 status:
             *                   type: string
             *                   description: The currency's status.
             *                   enum: ["show", "hide"]
             *
             *     responses:
             *       200:
             *         description: Currencies updated successfully.
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
             *                      $ref: '#/components/schemas/Currency'
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
            router.put("/many", currencyController.updateMany);

            /**
             * @swagger
             * /v1/{lang}/currencies/{currencyIds}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: deleteMany
             *     summary: Delete many currencies.
             *     description: Delete many currencies.
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
             *        name: currencyIds
             *        schema:
             *          type: string
             *        required: true
             *        description: The currencies IDs to be deleted. You can enter several identifiers, separated by commas
             *
             *     responses:
             *       204:
             *         description: Currencies deleted successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.delete("/:currencyIds", currencyController.deleteMany);
          })
        );

        router.use(
          "/currency",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/currency/{currencyId}:
             *   get:
             *     tags:
             *     - Currency
             *     operationId: getById
             *     summary: Get a currency by ID.
             *     description: Get a currency by ID.
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
             *        name: currencyId
             *        schema:
             *          type: string
             *        required: true
             *        description: The currency's ID to update
             *
             *     responses:
             *       200:
             *         description: Currency successfully obtain.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.get("/:currencyId", currencyController.show);

            /**
             * @swagger
             * /v1/{lang}/currency/{currencyId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: updateById
             *     summary: Update a currency by ID.
             *     description: Update a currency by ID.
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
             *        name: currencyId
             *        schema:
             *          type: string
             *        required: true
             *        description: The currency's ID to update
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
             *                 description: The currency's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The currency's iso code.
             *                 example: en
             *               symbol:
             *                 type: string
             *                 description: The currency's symbol.
             *               exchange_rate:
             *                 type: string
             *                 description: The currency's exchange rate.
             *               live_exchange_rates:
             *                 type: string
             *                 description: The currency's live exchange rates.
             *               status:
             *                 type: string
             *                 description: The currency's status.
             *                 enum: ["show", "hide"]
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The currency's name.
             *                 example: English
             *               iso_code:
             *                 type: string
             *                 description: The currency's iso code.
             *                 example: en
             *               symbol:
             *                 type: string
             *                 description: The currency's symbol.
             *               exchange_rate:
             *                 type: string
             *                 description: The currency's exchange rate.
             *               live_exchange_rates:
             *                 type: string
             *                 description: The currency's live exchange rates.
             *               status:
             *                 type: string
             *                 description: The currency's status.
             *                 enum: ["show", "hide"]
             *
             *     responses:
             *       200:
             *         description: Currency created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.put("/:currencyId", currencyController.update);

            /**
             * @swagger
             * /v1/{lang}/currency/{currencyId}/status:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: updateStatus
             *     summary: Update a currency status.
             *     description: Update a currency status.
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
             *        name: currencyId
             *        schema:
             *          type: string
             *        required: true
             *        description: The currency's ID to update
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
             *         description: Currency created successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.put("/:currencyId/status", currencyController.updateStatus);

            /**
             * @swagger
             * /v1/{lang}/currency/{currencyId}/live-exchange-rates:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: updateLiveExchangeRates
             *     summary: Update a currency live exchange rates.
             *     description: Update a currency live exchange rates.
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
             *        name: currencyId
             *        schema:
             *          type: string
             *        required: true
             *        description: The currency's ID to update
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               live-exchange-rates:
             *                 type: string
             *                 description: The currency's live exchange rates.
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               live-exchange-rates:
             *                 type: string
             *                 description: The currency's live exchange rates.
             *
             *     responses:
             *       200:
             *         description: Currency updated successfully.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.put("/:currencyId/live-exchange-rates", currencyController.updateStatus);

            /**
             * @swagger
             * /v1/{lang}/currency/{currencyId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Currency
             *     operationId: deleteById
             *     summary: Delete a currency by ID.
             *     description: Delete a currency by ID.
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
             *        name: currencyId
             *        schema:
             *          type: string
             *        required: true
             *        description: The currency's ID to update
             *
             *     responses:
             *       200:
             *         description: Currency successfully deleted.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Currency'
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
            router.delete("/:currencyId", currencyController.delete);
          })
        );
      })
    );
  }
}

const currencyRoutes: CurrencyRoutes = new CurrencyRoutes();
export default currencyRoutes;
