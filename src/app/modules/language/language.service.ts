import Language from "./language.model";
import LanguageType from "./language.type";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-20
 *
 * Class LanguageService
 */
class LanguageService {
  /**
   * Get Language details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {string} languageId the language id
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getById(languageId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const language = await Language.findById(languageId);

          resolve(language);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all showing languages details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShowingLanguage(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const languages = await Language.find({ status: "show" }).sort({
            _id: -1,
          });

          resolve(languages);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all languages details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAll(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const languages = await Language.find().sort({ name: "asc" });

          resolve(languages);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new language
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   *
   * @param {RoleType} data the language data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: LanguageType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          data.iso_code =
            data.iso_code || data.name.toLowerCase().substring(0, 2);
          const language = new Language(data);

          const createdLanguage = await language.save();

          resolve(createdLanguage);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create many languages
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   *
   * @param {RoleType} data the languages data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async storeMany(data: LanguageType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const createdLanguages = await Language.insertMany(data);

          resolve(createdLanguages);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a language
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {string} languageId the language id
   * @param {LanguageType} data the language data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    languageId: string,
    data: LanguageType
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const language = await Language.findById(languageId);

          if (language) {
            language.name = data.name || language.name;
            language.iso_code = data.iso_code || language.iso_code;
            language.flag = data.flag || language.flag;
            language.status = data.status || language.status;

            const updatedLanguage = await language.save();

            resolve(updatedLanguage);
          } else {
            resolve(language);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update language status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {string} languageId the language id
   * @param {LanguageType} data the language data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateStatus(
    languageId: string,
    data: LanguageType
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const language = await Language.findById(languageId);

          if (language) {
            language.status = data.status;

            const updatedLanguage = await language.save();

            resolve(updatedLanguage);
          } else {
            resolve(language);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update many languages
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {LanguageType} data the languages data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async updateMany(data: LanguageType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const updatedLanguage = await Language.updateMany(
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

          resolve(updatedLanguage);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a language by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {string} languageId the language id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(languageId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const language = await Language.findById(languageId);

          if (language) {
            const deleteLanguage = await language.deleteOne();

            resolve(deleteLanguage);
          } else {
            resolve(language);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete many languages
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-07-14
   *
   * @param {Array<string>} data the language ids
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public deleteMany(data: Array<string>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const deleteLanguage = await Language.deleteMany({
            _id: data.map((item) => item),
          });

          resolve(deleteLanguage);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const languageService = new LanguageService();
export default languageService;
