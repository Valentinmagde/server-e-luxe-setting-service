import { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import customResponse from "../app/utils/custom-response.util";
import errorNumbers from "../app/utils/error-numbers.util";
import statusCode from "../app/utils/status-code.util";
import config from "../config";
import nodemailer from "nodemailer";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-07-23
 *
 * Class NodeMailerManager
 */
class NodeMailerManager {
  public transporter: any;

  /**
   * Create a newDBManager instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort as number,
      secure: config.mailSecure,
      auth: config.mailAuth,
    });
  }

  /**
   * Send mail
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-23
   *
   * @param {any} data the email parametters
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public sendMail({
    senderName = "E-LUXE",
    senderEmail = "contact@e-luxe.fr",
    receivers = "",
    subject = "",
    body = ""
  } = {}): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        // send mail with defined transport object
        try {
          const info = await this.transporter.sendMail({
            from: `${senderName} <${senderEmail}>`, // sender address
            to: receivers, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            html: body, // html body
          });

          // console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          //
          // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
          // Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
          // <https://github.com/forwardemail/preview-email>
          //

          resolve(info);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const nodeMailerManager = new NodeMailerManager();
export default nodeMailerManager;