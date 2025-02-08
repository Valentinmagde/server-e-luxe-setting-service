import { Request, Response } from "express";
import i18n from "../../../core/i18n";
import customResponse from "../../utils/custom-response.util";
import statusCode from "../../utils/status-code.util";
import errorNumbers from "../../utils/error-numbers.util";
import validator from "../../utils/validator.util";
import { Errors } from "validatorjs";
import { checkObjectId, loadTemplate } from "../../utils/helpers.util";
import notificationService from "./notification.service";
import rabbitmqManager from "../../../core/rabbitmq";
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-09-15
 *
 * Class NotificationController
 */
class NotificationController {
  /**
   * Constructs a new instance of the NotificationController class.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * This constructor binds the sendContactEmail method to the current instance
   * of the class to ensure the correct `this` context is maintained when the method
   * is used as a callback or event handler.
   */
  constructor() {
    this.sendContactEmail = this.sendContactEmail.bind(this);
  }

  /**
   * Get all notification details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async index(req: Request, res: Response): Promise<void> {
    notificationService
      .getAll(req.query)
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Add notification route handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    const validationRule = {
      type: "required|string",
      message: "required|string",
    };

    await validator
      .validator(
        req.body,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            const body = req.body;

            notificationService
              .store(body)
              .then((result) => {
                if(result === "ISADDED") {
                  const response = {
                    status: statusCode.httpConflict,
                    errNo: errorNumbers.resourceAlreadyExists,
                    errMsg: "This notification already exists",
                  };

                  return customResponse.error(response, res);
                } else {
                  if(body.type === "contact") {
                    this.sendContactEmail(body);
                  }

                  const response = {
                    status: statusCode.httpCreated,
                    data: result,
                  };

                  return customResponse.success(response, res);
                }
              })
              .catch((error) => {
                const response = {
                  status: error?.status || statusCode.httpInternalServerError,
                  errNo: errorNumbers.genericError,
                  errMsg: error?.message || error,
                };

                return customResponse.error(response, res);
              });
          }
        }
      )
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Send contact notification route handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-02-04
   *
   * @param {any} body the email data.
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  private async sendContactEmail(body: any): Promise<void> {
    const emailData = {
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      subject: body.subject || "",
      message: body.message || "",
      product_name: body?.appName || "",
      support_url: body.supportUrl || "#",
    };

    const emailHtml = loadTemplate("contact-notification-template.html", emailData);

    await rabbitmqManager.publishMessage("eluxe.email.sendMail", "sendMail", {
      senderName: body.name,
      receivers: body.receivers || [],
      senderEmail: body.email || "",
      subject: body.subject,
      body: emailHtml,
    });
  }

  /**
   * Update notification status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async updateStatus(req: Request, res: Response): Promise<void> {
    const validationRule = {
      status: "required|string",
    };

    await validator
      .validator(
        req.body,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            const notificationId = req.params.notificationId;
            // check if nofication id is valid
            if (checkObjectId(notificationId)) {
              notificationService
                .updateStatus(notificationId, req.body)
                .then((result) => {
                  if (result === null || result === undefined) {
                    const response = {
                      status: statusCode.httpNotFound,
                      errNo: errorNumbers.resourceNotFound,
                      errMsg: i18n.__("notification.notificationNotFound"),
                    };

                    return customResponse.error(response, res);
                  } else {
                    const response = {
                      status: statusCode.httpOk,
                      data: result,
                    };

                    return customResponse.success(response, res);
                  }
                })
                .catch((error) => {
                  const response = {
                    status: error?.status || statusCode.httpInternalServerError,
                    errNo: errorNumbers.genericError,
                    errMsg: error?.message || error,
                  };

                  return customResponse.error(response, res);
                });
            } else {
              const response = {
                status: statusCode.httpBadRequest,
                errNo: errorNumbers.ivalidResource,
                errMsg: i18n.__("notification.invalidNotificationId"),
              };

              return customResponse.error(response, res);
            }
          }
        }
      )
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Update many notification status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async updateManyStatus(req: Request, res: Response): Promise<void> {
    notificationService
      .updateManyStatus(req.body)
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Delete a notification by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async delete(req: Request, res: Response): Promise<void> {
    const notificationId = req.params.notificationId;

    if (checkObjectId(notificationId)) {
      notificationService
        .delete(notificationId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("notification.notificationNotFound"),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpNoContent,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("notification.invalidNotificationId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Delete a notification by product id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async deleteByProductId(req: Request, res: Response): Promise<void> {
    const productId = req.params.productId;

    if (checkObjectId(productId)) {
      notificationService
        .deleteByProductId(productId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("notification.notificationNotFound"),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpNoContent,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("notification.invalidNotificationId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Delete many notifications
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-09-15
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async deleteMany(req: Request, res: Response): Promise<void> {
    const notificationIds = req.params.notificationIds.split(",");

    notificationService
      .deleteMany(notificationIds)
      .then((result) => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("notification.notificationNotFound"),
          };

          return customResponse.error(response, res);
        } else {
          const response = {
            status: statusCode.httpNoContent,
            data: result,
          };

          return customResponse.success(response, res);
        }
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }
}

const notificationController = new NotificationController();
export default notificationController;
