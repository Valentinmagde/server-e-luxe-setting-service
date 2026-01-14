import Currencie from "../currency/currency.model";
import Setting from "./setting.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-07-28
 *
 * Class SettingService
 */
class SettingService {
  /**
   * Get global setting details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getGlobalSetting(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const globalSetting: any = await Setting.findOne({
            name: "globalSetting",
          });

          resolve(globalSetting?.setting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get store setting details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getStoreSetting(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const storeSetting = await Setting.findOne({
            name: "storeSetting",
          });

          resolve(storeSetting?.setting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get store setting details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @param {string} key - .
   * @param {string} keyTwo - .
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getStoreCustomizationSetting(
    key: string,
    keyTwo: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          let projection: any = {};

          if (key) {
            projection[`setting.${key}`] = 1;
          }
          if (keyTwo) {
            projection[`setting.${keyTwo}`] = 1;
          }

          // If neither key nor keyTwo is provided, fetch all settings
          if (!key && !keyTwo) {
            projection = { setting: 1 };
          }

          const storeCustomizationSetting = await Setting.findOne(
            { name: "storeCustomizationSetting" },
            projection
          );

          resolve(storeCustomizationSetting?.setting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get store setting details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getStoreSeoSetting(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const storeCustomizationSetting = await Setting.findOne(
            {
              name: "storeCustomizationSetting",
            },
            { "setting.seo": 1, _id: 0 }
          );

          resolve(storeCustomizationSetting?.setting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new global setting
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @param {RoleType} data the global setting data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const setting = new Setting(data);

          const createdSetting = await setting.save();

          resolve(createdSetting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a global setting
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @param {any} data the global setting data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateGlobalSetting(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = await Currencie.findOne({
            symbol: data.setting.default_currency_symbol,
          });

          const globalSetting = await Setting.updateOne(
            {
              name: "globalSetting",
            },
            {
              $set: {
                "setting.number_of_image_per_product":
                  data.setting.number_of_image_per_product,
                "setting.shop_name": data.setting.shop_name,
                "setting.company_name": data.setting.company_name,
                "setting.address": data.setting.address,
                "setting.vat_number": data.setting.vat_number,
                "setting.post_code": data.setting.post_code,
                "setting.contact": data.setting.contact,
                "setting.email": data.setting.email,
                "setting.website": data.setting.website,
                "setting.receipt_size": data.setting.receipt_size,
                "setting.default_currency": currency?.name,
                "setting.default_currency_symbol": currency?.symbol,
                "setting.default_time_zone": data.setting.default_time_zone,
                "setting.default_date_format": data.setting.default_date_format,
                "setting.default_product_image":
                  data.setting.default_product_image,

                //for store setting
                "setting.cod_status": data.setting.cod_status,
                "setting.stripe_status": data.setting.stripe_status,
                "setting.fb_pixel_status": data.setting.fb_pixel_status,
                "setting.google_login_status": data.setting.google_login_status,
                "setting.google_analytic_status":
                  data.setting.google_analytic_status,
                "setting.stripe_key": data.setting.stripe_key,
                "setting.stripe_secret": data.setting.stripe_secret,
                "setting.google_client_id": data.setting.google_client_id,
                "setting.google_secret_key": data.setting.google_secret_key,
                "setting.google_analytic_key": data.setting.google_analytic_key,
                "setting.fb_pixel_key": data.setting.fb_pixel_key,
                "setting.tawk_chat_status": data.setting.tawk_chat_status,
                "setting.tawk_chat_property_id":
                  data.setting.tawk_chat_property_id,
                "setting.tawk_chat_widget_id": data.setting.tawk_chat_widget_id,
                // //for seo
                "setting.meta_img": data.setting.meta_img,
                "setting.favicon": data.setting.favicon,
                "setting.meta_title": data.setting.meta_title,
                "setting.meta_description": data.setting.meta_description,
                "setting.meta_keywords": data.setting.meta_keywords,
                "setting.meta_url": data.setting.meta_url,
              },
            }
          );

          resolve(globalSetting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a store setting
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @param {any} data the global setting data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateStoreSetting(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const storeSetting = await Setting.updateOne(
            {
              name: "storeSetting",
            },
            {
              $set: {
                //for store setting
                "setting.cod_status": data.setting.cod_status,
                "setting.direct_bank_transfer_status":
                  data.setting.direct_bank_transfer_status,
                "setting.account_details": data.setting.account_details,
                "setting.stripe_status": data.setting.stripe_status,
                "setting.paypal_status": data.setting.paypal_status,
                "setting.airwallex_status": data.setting.airwallex_status,
                "setting.cinetpay_status": data.setting.cinetpay_status,
                "setting.razorpay_status": data.setting.razorpay_status,
                "setting.fb_pixel_status": data.setting.fb_pixel_status,
                "setting.google_login_status": data.setting.google_login_status,
                "setting.github_login_status": data.setting.github_login_status,
                "setting.facebook_login_status":
                  data.setting.facebook_login_status,
                "setting.google_analytic_status":
                  data.setting.google_analytic_status,
                "setting.stripe_key": data.setting.stripe_key,
                "setting.stripe_secret": data.setting.stripe_secret,
                "setting.paypal_key": data.setting.paypal_key,
                "setting.paypal_secret": data.setting.paypal_secret,
                "setting.airwallex_key": data.setting.airwallex_key,
                "setting.airwallex_secret": data.setting.airwallex_secret,
                "setting.cinetpay_key": data.setting.cinetpay_key,
                "setting.cinetpay_secret": data.setting.cinetpay_secret,
                "setting.razorpay_id": data.setting.razorpay_id,
                "setting.razorpay_secret": data.setting.razorpay_secret,
                "setting.google_id": data.setting.google_id,
                "setting.google_secret": data.setting.google_secret,
                "setting.github_id": data.setting.github_id,
                "setting.github_secret": data.setting.github_secret,
                "setting.facebook_id": data.setting.facebook_id,
                "setting.facebook_secret": data.setting.facebook_secret,
                "setting.nextauth_secret": data.setting.nextauth_secret,
                "setting.next_api_base_url": data.setting.next_api_base_url,

                "setting.google_analytic_key": data.setting.google_analytic_key,
                "setting.fb_pixel_key": data.setting.fb_pixel_key,
                "setting.tawk_chat_status": data.setting.tawk_chat_status,
                "setting.tawk_chat_property_id":
                  data.setting.tawk_chat_property_id,
                "setting.tawk_chat_widget_id": data.setting.tawk_chat_widget_id,
              },
            }
          );

          resolve(storeSetting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a store customization setting
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-28
   *
   * @param {any} data the global setting data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateStoreCustomizationSetting(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const setting = data.setting;
          // console.log("updateStoreCustomizationSetting");

          const storeCustomizationSetting = await Setting.findOneAndUpdate(
            {
              name: "storeCustomizationSetting",
            },
            {
              $set: {
                // navbar
                "setting.navbar.help_text": setting.navbar.help_text,
                "setting.navbar.categories": setting.navbar.categories,
                "setting.navbar.about_us": setting.navbar.about_us,
                "setting.navbar.contact_us": setting.navbar.contact_us,
                "setting.navbar.offers": setting.navbar.offers,
                "setting.navbar.faq": setting.navbar.faq,
                "setting.navbar.privacy_policy": setting.navbar.privacy_policy,
                "setting.navbar.term_and_condition":
                  setting.navbar.term_and_condition,
                "setting.navbar.pages": setting.navbar.pages,
                "setting.navbar.my_account": setting.navbar.my_account,
                "setting.navbar.login": setting.navbar.login,
                "setting.navbar.logout": setting.navbar.logout,
                "setting.navbar.checkout": setting.navbar.checkout,
                "setting.navbar.phone": setting.navbar.phone,
                "setting.navbar.logo": setting.navbar.logo,
                "setting.navbar.term_and_condition_status":
                  setting.navbar.term_and_condition_status,
                "setting.navbar.privacy_policy_status":
                  setting.navbar.privacy_policy_status,
                "setting.navbar.faq_status": setting.navbar.faq_status,
                "setting.navbar.categories_menu_status":
                  setting.navbar.categories_menu_status,
                "setting.navbar.about_menu_status":
                  setting.navbar.about_menu_status,
                "setting.navbar.contact_menu_status":
                  setting.navbar.contact_menu_status,
                "setting.navbar.offers_menu_status":
                  setting.navbar.offers_menu_status,

                // home
                "setting.home.coupon_status": setting.home.coupon_status,
                "setting.home.featured_status": setting.home.featured_status,

                "setting.home.daily_needs_status":
                  setting.home.daily_needs_status,

                "setting.home.feature_promo_status":
                  setting.home.feature_promo_status,

                "setting.home.slider_width_status":
                  setting.home.slider_width_status,
                "setting.home.promotion_banner_status":
                  setting.home.promotion_banner_status,
                "setting.home.delivery_status": setting.home.delivery_status,
                "setting.home.popular_products_status":
                  setting.home.popular_products_status,
                "setting.home.discount_product_status":
                  setting.home.discount_product_status,
                "setting.home.discount_coupon_code":
                  setting.home.discount_coupon_code,
                "setting.home.place_holder_img": setting.home.place_holder_img,

                "setting.home.discount_title": setting.home.discount_title,
                "setting.home.promotion_title": setting.home.promotion_title,
                "setting.home.promotion_description":
                  setting.home.promotion_description,
                "setting.home.promotion_button_name":
                  setting.home.promotion_button_name,
                "setting.home.promotion_button_link":
                  setting.home.promotion_button_link,
                "setting.home.feature_title": setting.home.feature_title,
                "setting.home.feature_description":
                  setting.home.feature_description,
                "setting.home.feature_product_limit":
                  setting.home.feature_product_limit,
                "setting.home.popular_title": setting.home.popular_title,
                "setting.home.popular_description":
                  setting.home.popular_description,
                "setting.home.popular_product_limit":
                  setting.home.popular_product_limit,
                "setting.home.quick_delivery_subtitle":
                  setting.home.quick_delivery_subtitle,
                "setting.home.quick_delivery_title":
                  setting.home.quick_delivery_title,
                "setting.home.quick_delivery_description":
                  setting.home.quick_delivery_description,
                "setting.home.quick_delivery_button":
                  setting.home.quick_delivery_button,
                "setting.home.quick_delivery_link":
                  setting.home.quick_delivery_link,
                "setting.home.quick_delivery_img":
                  setting.home.quick_delivery_img,
                "setting.home.latest_discount_title":
                  setting.home.latest_discount_title,
                "setting.home.latest_discount_description":
                  setting.home.latest_discount_description,
                "setting.home.latest_discount_product_limit":
                  setting.home.latest_discount_product_limit,
                "setting.home.daily_need_title": setting.home.daily_need_title,
                "setting.home.daily_need_description":
                  setting.home.daily_need_description,
                "setting.home.daily_need_app_link":
                  setting.home.daily_need_app_link,
                "setting.home.daily_need_google_link":
                  setting.home.daily_need_google_link,
                "setting.home.daily_need_img_left":
                  setting.home.daily_need_img_left,
                "setting.home.daily_need_img_right":
                  setting.home.daily_need_img_right,
                "setting.home.button1_img": setting.home.button1_img,
                "setting.home.button2_img": setting.home.button2_img,
                "setting.home.service_one_status": setting.home.service_one_status,
                "setting.home.service_two_status": setting.home.service_two_status,
                "setting.home.service_three_status":
                  setting.home.service_three_status,
                "setting.home.service_four_status": setting.home.service_four_status,
                "setting.home.service_one_image": setting.home.service_one_image,
                "setting.home.service_two_image": setting.home.service_two_image,
                "setting.home.service_three_image":
                  setting.home.service_three_image,
                "setting.home.service_four_image":
                  setting.home.service_four_image,
                "setting.home.service_one_title": setting.home.service_one_title,
                "setting.home.service_two_title": setting.home.service_two_title,
                "setting.home.service_three_title": setting.home.service_three_title,
                "setting.home.service_four_title": setting.home.service_four_title,
                "setting.home.service_one_description": setting.home.service_one_description,
                "setting.home.service_two_description": setting.home.service_two_description,
                "setting.home.service_three_description": setting.home.service_three_description,
                "setting.home.service_four_description": setting.home.service_four_description,

                //slider
                "setting.slider.left_right_arrow":
                  setting.slider.left_right_arrow,
                "setting.slider.bottom_dots": setting.slider.bottom_dots,
                "setting.slider.both_slider": setting.slider.both_slider,
                "setting.slider.first_img": setting.slider.first_img,
                "setting.slider.first_title": setting.slider.first_title,
                "setting.slider.first_title_color":
                  setting.slider.first_title_color,
                "setting.slider.first_description_color_one":
                  setting.slider.first_description_color_one,
                "setting.slider.first_description_color_two":
                  setting.slider.first_description_color_two,
                "setting.slider.first_description":
                  setting.slider.first_description,
                "setting.slider.first_button": setting.slider.first_button,
                "setting.slider.first_link": setting.slider.first_link,
                "setting.slider.first_status": setting.slider.first_status,
                "setting.slider.second_img": setting.slider.second_img,
                "setting.slider.second_title": setting.slider.second_title,
                "setting.slider.second_title_color":
                  setting.slider.second_title_color,
                "setting.slider.second_description_color_one":
                  setting.slider.second_description_color_one,
                "setting.slider.second_description_color_two":
                  setting.slider.second_description_color_two,
                "setting.slider.second_description":
                  setting.slider.second_description,
                "setting.slider.second_button": setting.slider.second_button,
                "setting.slider.second_link": setting.slider.second_link,
                "setting.slider.second_status": setting.slider.second_status,
                "setting.slider.third_img": setting.slider.third_img,
                "setting.slider.third_title": setting.slider.third_title,
                "setting.slider.third_title_color":
                  setting.slider.third_title_color,
                "setting.slider.third_description_color_one":
                  setting.slider.third_description_color_one,
                "setting.slider.third_description_color_two":
                  setting.slider.third_description_color_two,
                "setting.slider.third_description":
                  setting.slider.third_description,
                "setting.slider.third_button": setting.slider.third_button,
                "setting.slider.third_link": setting.slider.third_link,
                "setting.slider.third_status": setting.slider.third_status,
                "setting.slider.four_img": setting.slider.four_img,
                "setting.slider.four_title": setting.slider.four_title,
                "setting.slider.four_title_color":
                  setting.slider.four_title_color,
                "setting.slider.four_description_color_one":
                  setting.slider.four_description_color_one,
                "setting.slider.four_description_color_two":
                  setting.slider.four_description_color_two,
                "setting.slider.four_description":
                  setting.slider.four_description,
                "setting.slider.four_button": setting.slider.four_button,
                "setting.slider.four_link": setting.slider.four_link,
                "setting.slider.four_status": setting.slider.four_status,
                "setting.slider.five_img": setting.slider.five_img,
                "setting.slider.five_title": setting.slider.five_title,
                "setting.slider.five_title_color":
                  setting.slider.five_title_color,
                "setting.slider.five_description_color_one":
                  setting.slider.five_description_color_one,
                "setting.slider.five_description_color_two":
                  setting.slider.five_description_color_two,
                "setting.slider.five_description":
                  setting.slider.five_description,
                "setting.slider.five_button": setting.slider.five_button,
                "setting.slider.five_link": setting.slider.five_link,
                "setting.slider.five_status": setting.slider.five_status,
                "setting.slider.banner_one_title": setting.slider.banner_one_title,
                "setting.slider.banner_one_title_color": setting.slider.banner_one_title_color,
                "setting.slider.banner_one_description": setting.slider.banner_one_description,
                "setting.slider.banner_one_description_color": setting.slider.banner_one_description_color,
                "setting.slider.banner_one_status": setting.slider.banner_one_status,
                "setting.slider.banner_one_image": setting.slider.banner_one_image,
                "setting.slider.banner_one_link": setting.slider.banner_one_link,
                "setting.slider.banner_two_title": setting.slider.banner_two_title,
                "setting.slider.banner_two_title_color": setting.slider.banner_two_title_color,
                "setting.slider.banner_two_description": setting.slider.banner_two_description,
                "setting.slider.banner_two_description_color": setting.slider.banner_two_description_color,
                "setting.slider.banner_two_status": setting.slider.banner_two_status,
                "setting.slider.banner_two_image": setting.slider.banner_two_image,
                "setting.slider.banner_two_link": setting.slider.banner_two_link,

                //checkout
                "setting.checkout.personal_details":
                  setting.checkout.personal_details,
                "setting.checkout.first_name": setting.checkout.first_name,
                "setting.checkout.last_name": setting.checkout.last_name,
                "setting.checkout.email_address":
                  setting.checkout.email_address,
                "setting.checkout.checkout_phone":
                  setting.checkout.checkout_phone,

                "setting.checkout.shipping_details":
                  setting.checkout.shipping_details,
                "setting.checkout.street_address":
                  setting.checkout.street_address,
                "setting.checkout.city": setting.checkout.city,
                "setting.checkout.country": setting.checkout.country,
                "setting.checkout.zip_code": setting.checkout.zip_code,
                "setting.checkout.shipping_cost":
                  setting.checkout.shipping_cost,
                "setting.checkout.shipping_name_one":
                  setting.checkout.shipping_name_one,
                "setting.checkout.shipping_one_desc":
                  setting.checkout.shipping_one_desc,
                "setting.checkout.shipping_one_cost":
                  setting.checkout.shipping_one_cost,
                "setting.checkout.shipping_name_two":
                  setting.checkout.shipping_name_two,
                "setting.checkout.shipping_two_desc":
                  setting.checkout.shipping_two_desc,
                "setting.checkout.shipping_two_cost":
                  setting.checkout.shipping_two_cost,
                "setting.checkout.payment_method":
                  setting.checkout.payment_method,
                "setting.footer.payment_method_title":
                  setting.footer.payment_method_title,
                "setting.footer.payment_method_description":
                  setting.footer.payment_method_description,
                "setting.checkout.order_summary":
                  setting.checkout.order_summary,
                "setting.checkout.apply_button": setting.checkout.apply_button,
                "setting.checkout.continue_button":
                  setting.checkout.continue_button,
                "setting.checkout.confirm_button":
                  setting.checkout.confirm_button,
                "setting.checkout.sub_total": setting.checkout.sub_total,
                "setting.checkout.discount": setting.checkout.discount,
                "setting.checkout.total_cost": setting.checkout.total_cost,

                //dashboard
                "setting.dashboard.invoice_message_first":
                  setting.dashboard.invoice_message_first,
                "setting.dashboard.invoice_message_last":
                  setting.dashboard.invoice_message_last,
                "setting.dashboard.print_button":
                  setting.dashboard.print_button,
                "setting.dashboard.download_button":
                  setting.dashboard.download_button,
                "setting.dashboard.dashboard_title":
                  setting.dashboard.dashboard_title,
                "setting.dashboard.total_order": setting.dashboard.total_order,
                "setting.dashboard.pending_order":
                  setting.dashboard.pending_order,

                "setting.dashboard.processing_order":
                  setting.dashboard.processing_order,
                "setting.dashboard.complete_order":
                  setting.dashboard.complete_order,
                "setting.dashboard.recent_order":
                  setting.dashboard.recent_order,
                "setting.dashboard.my_order": setting.dashboard.my_order,
                "setting.dashboard.update_profile":
                  setting.dashboard.update_profile,
                "setting.dashboard.full_name": setting.dashboard.full_name,
                "setting.dashboard.address": setting.dashboard.address,
                "setting.dashboard.user_email": setting.dashboard.user_email,
                "setting.dashboard.user_phone": setting.dashboard.user_phone,
                "setting.dashboard.update_button":
                  setting.dashboard.update_button,
                "setting.dashboard.current_password":
                  setting.dashboard.current_password,
                "setting.dashboard.new_password":
                  setting.dashboard.new_password,
                "setting.dashboard.change_password":
                  setting.dashboard.change_password,

                // about us
                "setting.about_us.header_status":
                  setting.about_us.header_status,
                "setting.about_us.content_left_status":
                  setting.about_us.content_left_status,
                "setting.about_us.content_right_status":
                  setting.about_us.content_right_status,
                "setting.about_us.content_middle_status":
                  setting.about_us.content_middle_status,
                "setting.about_us.header_bg": setting.about_us.header_bg,
                "setting.about_us.content_right_img":
                  setting.about_us.content_right_img,
                "setting.about_us.content_middle_Img":
                  setting.about_us.content_middle_Img,
                "setting.about_us.founder_one_img":
                  setting.about_us.founder_one_img,
                "setting.about_us.founder_two_img":
                  setting.about_us.founder_two_img,
                "setting.about_us.founder_three_img":
                  setting.about_us.founder_three_img,
                "setting.about_us.founder_four_img":
                  setting.about_us.founder_four_img,
                "setting.about_us.founder_five_img":
                  setting.about_us.founder_five_img,
                "setting.about_us.founder_six_img":
                  setting.about_us.founder_six_img,
                "setting.about_us.title": setting.about_us.title,
                "setting.about_us.top_title": setting.about_us.top_title,
                "setting.about_us.top_description":
                  setting.about_us.top_description,
                "setting.about_us.card_one_title":
                  setting.about_us.card_one_title,
                "setting.about_us.card_one_sub": setting.about_us.card_one_sub,
                "setting.about_us.card_one_description":
                  setting.about_us.card_one_description,
                "setting.about_us.card_two_title":
                  setting.about_us.card_two_title,
                "setting.about_us.card_two_sub": setting.about_us.card_two_sub,
                "setting.about_us.card_two_description":
                  setting.about_us.card_two_description,
                "setting.about_us.middle_description_one":
                  setting.about_us.middle_description_one,
                "setting.about_us.middle_description_two":
                  setting.about_us.middle_description_two,
                "setting.about_us.founder_title":
                  setting.about_us.founder_title,
                "setting.about_us.founder_description":
                  setting.about_us.founder_description,
                "setting.about_us.founder_one_name":
                  setting.about_us.founder_one_name,
                "setting.about_us.founder_one_sub":
                  setting.about_us.founder_one_sub,
                "setting.about_us.founder_two_name":
                  setting.about_us.founder_two_name,
                "setting.about_us.founder_two_sub":
                  setting.about_us.founder_two_name,
                "setting.about_us.founder_three_name":
                  setting.about_us.founder_three_name,
                "setting.about_us.founder_three_sub":
                  setting.about_us.founder_three_sub,
                "setting.about_us.founder_four_name":
                  setting.about_us.founder_four_name,
                "setting.about_us.founder_four_sub":
                  setting.about_us.founder_four_sub,
                "setting.about_us.founder_five_name":
                  setting.about_us.founder_five_name,
                "setting.about_us.founder_five_sub":
                  setting.about_us.founder_five_sub,
                "setting.about_us.founder_six_name":
                  setting.about_us.founder_six_name,
                "setting.about_us.founder_six_sub":
                  setting.about_us.founder_six_sub,
                "setting.about_us.middle_title": setting.about_us.middle_title,
                "setting.about_us.middle_subtitle":
                  setting.about_us.middle_subtitle,
                "setting.about_us.features_one_left_status":
                  setting.about_us.features_one_left_status,
                "setting.about_us.features_one_right_status":
                  setting.about_us.features_one_right_status,
                "setting.about_us.features_two_left_status":
                  setting.about_us.features_two_left_status,
                "setting.about_us.features_two_right_status":
                  setting.about_us.features_two_right_status,
                "setting.about_us.features_one_left_img":
                  setting.about_us.features_one_left_image,
                "setting.about_us.features_two_right_image":
                  setting.about_us.features_two_right_image,
                "setting.about_us.middle_advice_one_title":
                  setting.about_us.middle_advice_one_title,
                "setting.about_us.middle_advice_one_link":
                  setting.about_us.middle_advice_one_link,
                "setting.about_us.middle_advice_two_title":
                  setting.about_us.middle_advice_two_title,
                "setting.about_us.middle_advice_two_link":
                  setting.about_us.middle_advice_two_link,
                "setting.about_us.middle_advice_three_title":
                  setting.about_us.middle_advice_three_title,
                "setting.about_us.middle_advice_three_link":
                  setting.about_us.middle_advice_three_link,
                "setting.about_us.features_one_title":
                  setting.about_us.features_one_title,
                "setting.about_us.features_one_subtitle":
                  setting.about_us.features_one_subtitle,
                "setting.about_us.features_one_description":
                  setting.about_us.features_one_description,
                "setting.about_us.features_two_title":
                  setting.about_us.features_two_title,
                "setting.about_us.features_two_subtitle":
                  setting.about_us.features_two_subtitle,
                "setting.about_us.features_two_description":
                  setting.about_us.features_two_description,
                "setting.about_us.founder_status":
                  setting.about_us.founder_status,
                "setting.about_us.content_middle_img_one":
                  setting.about_us.content_middle_img_one,
                "setting.about_us.content_middle_img_two":
                  setting.about_us.content_middle_img_two,

                //contact us
                "setting.contact_us.header_status":
                  setting.contact_us.header_status,
                "setting.contact_us.email_box_status":
                  setting.contact_us.email_box_status,
                "setting.contact_us.call_box_status":
                  setting.contact_us.call_box_status,
                "setting.contact_us.address_box_status":
                  setting.contact_us.address_box_status,
                "setting.contact_us.store_hours_box_status":
                  setting.contact_us.store_hours_box_status,
                "setting.contact_us.left_col_status":
                  setting.contact_us.left_col_status,
                "setting.contact_us.form_status":
                  setting.contact_us.form_status,
                "setting.contact_us.header_bg": setting.contact_us.header_bg,
                "setting.contact_us.left_col_img":
                  setting.contact_us.left_col_img,
                "setting.contact_us.title": setting.contact_us.title,
                "setting.contact_us.email_box_title":
                  setting.contact_us.email_box_title,
                "setting.contact_us.email_box_email":
                  setting.contact_us.email_box_email,
                "setting.contact_us.email_box_text":
                  setting.contact_us.email_box_text,
                "setting.contact_us.call_box_title":
                  setting.contact_us.call_box_title,
                "setting.contact_us.call_box_phone":
                  setting.contact_us.call_box_phone,
                "setting.contact_us.call_box_text":
                  setting.contact_us.call_box_text,
                "setting.contact_us.address_box_title":
                  setting.contact_us.address_box_title,
                "setting.contact_us.address_box_address_one":
                  setting.contact_us.address_box_address_one,
                "setting.contact_us.address_box_address_two":
                  setting.contact_us.address_box_address_two,
                "setting.contact_us.address_box_address_three":
                  setting.contact_us.address_box_address_three,
                "setting.contact_us.store_hours_box_title":
                  setting.contact_us.store_hours_box_title,
                "setting.contact_us.store_hours":
                  setting.contact_us.store_hours,
                "setting.contact_us.form_title": setting.contact_us.form_title,
                "setting.contact_us.form_description":
                  setting.contact_us.form_description,

                // privacy_policy
                "setting.privacy_policy.status": setting.privacy_policy.status,
                "setting.privacy_policy.header_bg":
                  setting.privacy_policy.header_bg,
                "setting.privacy_policy.title": setting.privacy_policy.title,
                "setting.privacy_policy.description":
                  setting.privacy_policy.description,

                //terms and condition
                "setting.term_and_condition.status":
                  setting.term_and_condition.status,
                "setting.term_and_condition.header_bg":
                  setting.term_and_condition.header_bg,
                "setting.term_and_condition.title":
                  setting.term_and_condition.title,
                "setting.term_and_condition.description":
                  setting.term_and_condition.description,

                // faq
                "setting.faq.page_status": setting.faq.page_status,
                "setting.faq.leftcol_status": setting.faq.leftcol_status,
                "setting.faq.rightcol_status": setting.faq.rightcol_status,
                "setting.faq.header_bg": setting.faq.header_bg,
                "setting.faq.left_img": setting.faq.left_img,
                "setting.faq.title": setting.faq.title,
                "setting.faq.faq_one": setting.faq.faq_one,
                "setting.faq.description_one": setting.faq.description_one,
                "setting.faq.faq_two": setting.faq.faq_two,
                "setting.faq.description_two": setting.faq.description_two,
                "setting.faq.faq_three": setting.faq.faq_three,
                "setting.faq.description_three": setting.faq.description_three,
                "setting.faq.faq_four": setting.faq.faq_four,
                "setting.faq.description_four": setting.faq.description_four,
                "setting.faq.faq_five": setting.faq.faq_five,
                "setting.faq.description_five": setting.faq.description_five,
                "setting.faq.faq_six": setting.faq.faq_six,
                "setting.faq.description_six": setting.faq.description_six,
                "setting.faq.faq_seven": setting.faq.faq_seven,
                "setting.faq.description_seven": setting.faq.description_seven,
                "setting.faq.faq_eight": setting.faq.faq_eight,
                "setting.faq.description_eight": setting.faq.description_eight,

                //offers
                "setting.offers.header_status": setting.offers.header_status,
                "setting.offers.header_bg": setting.offers.header_bg,
                "setting.offers.title": setting.offers.title,
                "setting.offers.coupon_code": setting.offers.coupon_code,

                //footer
                "setting.footer.promo_status": setting.footer.promo_status,
                "setting.footer.block1_status": setting.footer.block1_status,
                "setting.footer.block2_status": setting.footer.block2_status,
                "setting.footer.block3_status": setting.footer.block3_status,
                "setting.footer.block4_status": setting.footer.block4_status,
                "setting.footer.payment_method_status":
                  setting.footer.payment_method_status,
                "setting.footer.bottom_contact_status":
                  setting.footer.bottom_contact_status,
                "setting.footer.social_links_status":
                  setting.footer.social_links_status,
                "setting.footer.shipping_card": setting.footer.shipping_card,
                "setting.footer.support_card": setting.footer.support_card,
                "setting.footer.payment_card": setting.footer.payment_card,
                "setting.footer.offer_card": setting.footer.offer_card,
                "setting.footer.block1_title": setting.footer.block1_title,
                "setting.footer.block1_sub_title1":
                  setting.footer.block1_sub_title1,
                "setting.footer.block1_sub_link1":
                  setting.footer.block1_sub_link1,
                "setting.footer.block1_sub_title2":
                  setting.footer.block1_sub_title2,
                "setting.footer.block1_sub_link2":
                  setting.footer.block1_sub_link2,
                "setting.footer.block1_sub_title3":
                  setting.footer.block1_sub_title3,
                "setting.footer.block1_sub_link3":
                  setting.footer.block1_sub_link3,
                "setting.footer.block1_sub_title4":
                  setting.footer.block1_sub_title4,
                "setting.footer.block1_sub_link4":
                  setting.footer.block1_sub_link4,
                "setting.footer.block2_title": setting.footer.block2_title,
                "setting.footer.block2_sub_title1":
                  setting.footer.block2_sub_title1,
                "setting.footer.block2_sub_link1":
                  setting.footer.block2_sub_link1,
                "setting.footer.block2_sub_title2":
                  setting.footer.block2_sub_title2,
                "setting.footer.block2_sub_link2":
                  setting.footer.block2_sub_link2,
                "setting.footer.block2_sub_title3":
                  setting.footer.block2_sub_title3,
                "setting.footer.block2_sub_link3":
                  setting.footer.block2_sub_link3,
                "setting.footer.block2_sub_title4":
                  setting.footer.block2_sub_title4,
                "setting.footer.block2_sub_link4":
                  setting.footer.block2_sub_link4,
                "setting.footer.block3_title": setting.footer.block3_title,
                "setting.footer.block3_sub_title1":
                  setting.footer.block3_sub_title1,
                "setting.footer.block3_sub_link1":
                  setting.footer.block3_sub_link1,
                "setting.footer.block3_sub_title2":
                  setting.footer.block3_sub_title2,
                "setting.footer.block3_sub_link2":
                  setting.footer.block3_sub_link2,
                "setting.footer.block3_sub_title3":
                  setting.footer.block3_sub_title3,
                "setting.footer.block3_sub_link3":
                  setting.footer.block3_sub_link3,
                "setting.footer.block3_sub_title4":
                  setting.footer.block3_sub_title4,
                "setting.footer.block3_sub_link4":
                  setting.footer.block3_sub_link4,
                "setting.footer.block4_logo": setting.footer.block4_logo,
                "setting.footer.block4_content": setting.footer.block4_content,
                "setting.footer.block4_address": setting.footer.block4_address,
                "setting.footer.block4_phone": setting.footer.block4_phone,
                "setting.footer.block4_email": setting.footer.block4_email,
                "setting.footer.social_links_title":
                  setting.footer.social_links_title,
                "setting.footer.social_facebook":
                  setting.footer.social_facebook,
                "setting.footer.social_youtube": setting.footer.social_youtube,
                "setting.footer.social_twitter": setting.footer.social_twitter,
                "setting.footer.social_pinterest":
                  setting.footer.social_pinterest,
                "setting.footer.social_linkedin":
                  setting.footer.social_linkedin,
                "setting.footer.social_whatsapp":
                  setting.footer.social_whatsapp,
                "setting.footer.newsletter_status":
                  setting.footer.newsletter_status,
                "setting.footer.newsletter_title":
                  setting.footer.newsletter_title,
                "setting.footer.newsletter_description":
                  setting.footer.newsletter_description,
                "setting.footer.payment_method_img":
                  setting.footer.payment_method_img,
                "setting.footer.bottom_contact": setting.footer.bottom_contact,
                "setting.footer.bottom_working_hours": setting.footer.bottom_working_hours,
                "setting.footer.partner_logo": setting.footer.partner_logo,
                "setting.footer.bottom_copyright":
                  setting.footer.bottom_copyright,

                // slug page
                "setting.slug.right_box_status": setting.slug.right_box_status,
                "setting.slug.card_description_one":
                  setting.slug.card_description_one,
                "setting.slug.card_description_two":
                  setting.slug.card_description_two,
                "setting.slug.card_description_three":
                  setting.slug.card_description_three,
                "setting.slug.card_description_four":
                  setting.slug.card_description_four,
                "setting.slug.card_description_five":
                  setting.slug.card_description_five,
                "setting.slug.card_description_six":
                  setting.slug.card_description_six,
                "setting.slug.card_description_seven":
                  setting.slug.card_description_seven,

                //seo setting
                "setting.seo.meta_img": setting.seo.meta_img,
                "setting.seo.favicon": setting.seo.favicon,
                "setting.seo.meta_title": setting.seo.meta_title,
                "setting.seo.meta_description": setting.seo.meta_description,
                "setting.seo.meta_keywords": setting.seo.meta_keywords,
                "setting.seo.meta_url": setting.seo.meta_url,
              },
            },
            {
              new: true,
            }
          );

          resolve(storeCustomizationSetting);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const settingService = new SettingService();
export default settingService;
