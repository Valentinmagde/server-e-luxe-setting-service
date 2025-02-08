import * as path from "path";
import * as fs from "fs";
import * as handlebars from "handlebars";

/**
 * Check ObjectId validity
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-10
 *
 * @param {string} id the object id
 * @returns {RegExpMatchArray | nul} true | false
 */
export function checkObjectId(id: string): RegExpMatchArray | null {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

/**
 * Loads and compiles an email template with dynamic replacements.
 *
 * @param {string} templateName - The name of the template file (relative to the current directory).
 * @param {EmailReplacements} replacements - An object containing key-value pairs for replacing
 * placeholders in the template.
 * @returns {string} - The compiled HTML content with placeholders replaced by the provided values.
 */
export function loadTemplate(templateName: string, replacements: any): string {
  const templatePath = path.resolve(
    __dirname,
    "../../resources/templates",
    templateName
  );
  const templateContent = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateContent);
  return template(replacements);
}
