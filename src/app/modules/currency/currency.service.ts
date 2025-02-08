import Currencie from "./currency.model";
import CurrencyType from "./currency.type";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2024-08-15
 *
 * Class CurrencyService
 */
class CurrencyService {
  /**
   * Get currency details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {string} currencyId the currency id
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getById(currencyId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = await Currencie.findById(currencyId);

          resolve(currency);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all showing currencies details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShowingCurrency(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currencies = await Currencie.find({ status: "show" }).sort({
            _id: -1,
          });

          resolve(currencies);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all currency details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAll(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currencies = await Currencie.find().sort({ name: "asc" });

          resolve(currencies);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new currency
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {RoleType} data the currency data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: CurrencyType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = new Currencie(data);

          const createdCurrency = await currency.save();

          resolve(createdCurrency);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create many currencies
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {RoleType} data the currencies data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async storeMany(data: CurrencyType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const createdCurrencies = await Currencie.insertMany(data);

          resolve(createdCurrencies);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a currency
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {string} currencyId the currency id
   * @param {CurrencyType} data the currency data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    currencyId: string,
    data: CurrencyType
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = await Currencie.findById(currencyId);

          if (currency) {
            currency.name = data.name;
            currency.symbol = data.symbol;
            currency.iso_code = data.iso_code;
            currency.exchange_rate = data.exchange_rate;
            currency.status = data.status;
            currency.live_exchange_rates = data.live_exchange_rates;

            const updatedCurrency = await currency.save();

            resolve(updatedCurrency);
          } else {
            resolve(currency);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update currency status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {string} currencyId the currency id
   * @param {CurrencyType} data the currency data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateStatus(
    currencyId: string,
    data: CurrencyType
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = await Currencie.findById(currencyId);

          if (currency) {
            currency.status = data.status;
            currency.live_exchange_rates = data.status || currency.live_exchange_rates;

            const updatedCurrency = await currency.save();

            resolve(updatedCurrency);
          } else {
            resolve(currency);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update currency live exchange rate status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-05-15
   *
   * @param {string} currencyId the currency id
   * @param {CurrencyType} data the currency data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateLiveExchangeRateStatus(
    currencyId: string,
    data: CurrencyType
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = await Currencie.findById(currencyId);

          if (currency) {
            currency.live_exchange_rates = data.live_exchange_rates;

            const updatedCurrency = await currency.save();

            resolve(updatedCurrency);
          } else {
            resolve(currency);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update many currencies
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {CurrencyType} data the currencies data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateMany(data: CurrencyType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const updatedCurrencies = await Currencie.updateMany(
            { _id: { $in: data?.ids?.map((item) => item) } },
            {
              $set: {
                status: data.status,
              },
            },
            {
              multi: true,
            }
          );

          resolve(updatedCurrencies);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a currency by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {string} currencyId the currency id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(currencyId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const currency = await Currencie.findById(currencyId);

          if (currency) {
            const deleteCurrency = await currency.deleteOne();

            resolve(deleteCurrency);
          } else {
            resolve(currency);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete many currencies
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-15
   *
   * @param {Array<string>} data the currency ids
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public deleteMany(data: Array<string>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const deleteCurrencies = await Currencie.deleteMany({
            _id: data.map((item) => item),
          });

          resolve(deleteCurrencies);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const currencyService = new CurrencyService();
export default currencyService;
