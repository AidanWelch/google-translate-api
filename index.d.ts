/**
 * Google Translate API TypeScript Declaration File
 * This file defines the types and interfaces for the Google Translate API wrapper.
 */

// Main export functions
export default translate;
export {
  translate,
  Translator,
  speak,
  singleTranslate,
  batchTranslate,
  languages,
  isSupported,
  getCode,
};

// Namespace containing all type definitions and interfaces
export declare namespace googleTranslateApi {
  /**
   * Options for translation requests
   */
  interface TranslationOptions {
    from?: string; // Source language
    to?: string; // Target language
    forceFrom?: boolean; // Force use of 'from' language
    forceTo?: boolean; // Force use of 'to' language
    autoCorrect?: boolean; // Enable auto-correction
  }

  /**
   * Extended options for API requests
   */
  export interface RequestOptions extends TranslationOptions {
    tld?: string; // Top-level domain for the translate host
    requestFunction?: Function; // Custom request function
    forceBatch?: boolean; // Force batch translation
    fallbackBatch?: boolean; // Use batch as fallback
    requestOptions?: object; // Additional request options
    rejectOnPartialFail?: boolean; // Reject on partial failure
  }

  /**
   * Represents a translated language
   */
  interface TranslatedLanguage {
    didYouMean: boolean; // Indicates if this was a suggested language
    iso: string; // ISO code of the language
  }

  /**
   * Represents translated text
   */
  interface TranslatedText {
    autoCorrected: boolean; // Indicates if text was auto-corrected
    value: string; // The translated text
    didYouMean: boolean; // Indicates if this was a suggested translation
  }

  /**
   * Response structure for a translation request
   */
  export interface TranslationResponse {
    text: string; // Translated text
    pronunciation?: string; // Pronunciation guide (if available)
    from: {
      language: TranslatedLanguage;
      text: TranslatedText;
    };
    raw: string; // Raw response from the API
  }

  /**
   * Query options for translation
   */
  interface OptionQuery extends TranslationOptions {
    text: string; // Text to translate
  }

  // Type aliases for various input formats
  type Query = string | OptionQuery;
  export type Input = string | Query[] | { [key: string]: Query };

  // Type for translation response based on input type
  export type TranslationResponseStructure<T> = T extends string
    ? Promise<TranslationResponse>
    : T extends Query[]
      ? Promise<TranslationResponse[]>
      : Promise<{ [key in keyof T]: TranslationResponse }>;

  // Type for speak response based on input type
  export type SpeakResponseStructure<T> = T extends string
    ? Promise<string>
    : T extends Query[]
      ? Promise<string[]>
      : Promise<{ [key in keyof T]: string }>;

  /**
   * Enum of supported languages
   * Generated from https://translate.google.com
   * See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   */
  export enum languages {}
  // ... (enum values remain unchanged)

  namespace languages {
    /**
     * Returns the ISO 639-1 code of the desired language
     * @param desiredLang - The name or code (case sensitive) of the desired language
     * @returns The ISO 639-1 code of the language or false if not supported
     */
    function getCode(desiredLang: string): string | boolean;

    /**
     * Checks if the desired language is supported by Google Translate
     * @param desiredLang - The ISO 639-1 code or name of the desired language
     * @returns True if supported, false otherwise
     */
    function isSupported(desiredLang: string): boolean;
  }
}

/**
 * Main translation function
 * @param input - Text or array of texts to translate
 * @param opts - Translation options
 * @returns Promise resolving to translation response(s)
 */
declare function translate<Input extends googleTranslateApi.Input>(
  input: Input,
  opts?: googleTranslateApi.RequestOptions,
): googleTranslateApi.TranslationResponseStructure<Input>;

/**
 * Translator class for creating reusable translator instances
 */
declare class Translator {
  constructor(options?: googleTranslateApi.RequestOptions);
  translate<Input extends googleTranslateApi.Input>(
    input: Input,
    opts?: googleTranslateApi.RequestOptions,
  ): googleTranslateApi.TranslationResponseStructure<Input>;
  options: googleTranslateApi.RequestOptions;
}

/**
 * Function to get spoken audio of translated text
 * @param input - Text or array of texts to speak
 * @param opts - Translation options
 * @returns Promise resolving to audio URL(s)
 */
declare function speak<Input extends googleTranslateApi.Input>(
  input: Input,
  opts?: googleTranslateApi.RequestOptions,
): googleTranslateApi.SpeakResponseStructure<Input>;

/**
 * Function to translate a single string
 * @param input - Text to translate
 * @param opts - Translation options
 * @returns Promise resolving to translation response
 */
declare function singleTranslate(
  input: string,
  opts?: googleTranslateApi.RequestOptions,
): googleTranslateApi.TranslationResponseStructure<string>;

/**
 * Alias for the translate function, used for batch translations
 */
declare const batchTranslate: typeof translate;

/**
 * Object containing supported languages
 */
declare const languages: typeof googleTranslateApi.languages;

/**
 * Checks if a language is supported
 * @param desiredLang - Language to check
 * @returns True if supported, false otherwise
 */
declare function isSupported(desiredLang: string): boolean;

/**
 * Gets the language code for a given language name
 * @param desiredLang - Language name
 * @returns Language code if found, null otherwise
 */
declare function getCode(desiredLang: string): string | null;
