// Declare the module 'google-translate-api' to provide type definitions
declare module 'google-translate-api' {

  // Interface defining options for translation, including source and target languages
  export interface TranslationOptions {
    from?: string; // Source language code, e.g., 'en' for English
    to?: string; // Target language code, e.g., 'es' for Spanish
    forceFrom?: boolean; // Force translation from the specified 'from' language
    forceTo?: boolean; // Force translation to the specified 'to' language
    autoCorrect?: boolean; // Enable auto-correction for the input text
  }

  // Interface extending TranslationOptions with additional request-specific options
  export interface RequestOptions extends TranslationOptions {
    tld?: string; // Top-level domain to use for the translation service, e.g., 'com' or 'co.uk'
    requestFunction?: (...args: any[]) => Promise<any>; // Custom function to handle HTTP requests
    forceBatch?: boolean; // Force batching of translation requests
    fallbackBatch?: boolean; // Use batching as a fallback if individual requests fail
    requestOptions?: Record<string, unknown>; // Additional options to pass to the request function
    rejectOnPartialFail?: boolean; // Reject the request if partial failures occur
  }

  // Interface representing the language information of a translated text
  export interface TranslatedLanguage {
    didYouMean: boolean; // Indicates if the detected language differs from the requested one
    iso: string; // ISO code of the detected language
  }

  // Interface representing the translated text, including auto-correction status
  export interface TranslatedText {
    autoCorrected: boolean; // Indicates if the text was auto-corrected
    value: string; // The translated text value
    didYouMean: boolean; // Indicates if the translation was a suggestion
  }

  // Interface representing the full response from a translation request
  export interface TranslationResponse {
    text: string; // The translated text
    pronunciation?: string; // Optional pronunciation of the translated text
    from: {
      language: TranslatedLanguage; // Source language information
      text: TranslatedText; // Original text with translation suggestions
    };
    raw: string; // Raw response from the translation service
  }

  // Interface defining a query for translation, which can include text and options
  export interface OptionQuery extends TranslationOptions {
    text: string; // The text to be translated
  }

  // Type definition for the input to the translate function, which can be a string or various structured formats
  export type Query = string | OptionQuery;
  export type Input = string | Query[] | Record<string, Query>;

  // Type definition for the structure of the translation response based on the input type
  export type TranslationResponseStructure<T> =
    T extends string
      ? Promise<TranslationResponse>
      : T extends Query[]
        ? Promise<TranslationResponse[]>
        : Promise<Record<keyof T, TranslationResponse>>;

  // Type definition for the structure of the response for the speak function
  export type SpeakResponseStructure<T> =
    T extends string
      ? Promise<string>
      : T extends Query[]
        ? Promise<string[]>
        : Promise<Record<keyof T, string>>;

  // Function to perform a translation, returning the appropriate response structure based on input type
  export function translate<T extends Input>(
    input: T,
    opts?: RequestOptions
  ): TranslationResponseStructure<T>;

  // Class to create a Translator object with predefined options, providing translation functionality
  export class Translator {
    constructor(options?: RequestOptions); // Constructor to initialize a Translator with optional settings
    translate<T extends Input>(
      input: T,
      opts?: RequestOptions
    ): TranslationResponseStructure<T>; // Method to perform translation using the Translator instance
    options: RequestOptions; // Options associated with the Translator instance
  }

  // Function to convert text to speech, returning the spoken text in the appropriate format
  export function speak<T extends Input>(
    input: T,
    opts?: RequestOptions
  ): SpeakResponseStructure<T>;

  // Function to perform a single translation request
  export function singleTranslate(
    input: string,
    opts?: RequestOptions
  ): Promise<TranslationResponse>;

  // Function to perform batch translation, same as the main translate function
  export const batchTranslate: typeof translate;

  // Constant representing the available languages in the translation service
  export const languages: typeof Languages;

  // Function to check if a language is supported by the translation service
  export function isSupported(desiredLang: string): boolean;

  // Function to get the ISO code of a language, or null if not supported
  export function getCode(desiredLang: string): string | null;

  // Namespace containing utility functions related to language support
  export namespace languages {
    function getCode(desiredLang: string): string | false; // Get the ISO code or return false if not supported
    function isSupported(desiredLang: string): boolean; // Check if the language is supported
  }
}

// Enum representing the supported languages with their corresponding ISO codes and names
export enum languages {
  "auto" = "Detect language",
  "ab" = "Abkhaz",
  "ace" = "Acehnese",
  "ach" = "Acholi",
  "aa" = "Afar",
  "af" = "Afrikaans",
  "sq" = "Albanian",
  "alz" = "Alur",
  "am" = "Amharic",
  "ar" = "Arabic",
  "hy" = "Armenian",
  "as" = "Assamese",
  "av" = "Avar",
  "awa" = "Awadhi",
  "ay" = "Aymara",
  "az" = "Azerbaijani",
  "ban" = "Balinese",
  "bal" = "Baluchi",
  "bm" = "Bambara",
  "bci" = "Baoulé",
  "ba" = "Bashkir",
  "eu" = "Basque",
  "btx" = "Batak Karo",
  "bts" = "Batak Simalungun",
  "bbc" = "Batak Toba",
  "be" = "Belarusian",
  "bem" = "Bemba",
  "bn" = "Bengali",
  "bew" = "Betawi",
  "bho" = "Bhojpuri",
  "bik" = "Bikol",
  "bs" = "Bosnian",
  "br" = "Breton",
  "bg" = "Bulgarian",
  "bua" = "Buryat",
  "yue" = "Cantonese",
  "ca" = "Catalan",
  "ceb" = "Cebuano",
  "ch" = "Chamorro",
  "ce" = "Chechen",
  "ny" = "Chichewa",
  "zh-CN" = "Chinese (Simplified)",
  "zh-TW" = "Chinese (Traditional)",
  "chk" = "Chuukese",
  "cv" = "Chuvash",
  "co" = "Corsican",
  "crh" = "Crimean Tatar",
  "hr" = "Croatian",
  "cs" = "Czech",
  "da" = "Danish",
  "fa-AF" = "Dari",
  "dv" = "Dhivehi",
  "din" = "Dinka",
  "doi" = "Dogri",
  "dov" = "Dombe",
  "nl" = "Dutch",
  "dyu" = "Dyula",
  "dz" = "Dzongkha",
  "en" = "English",
  "eo" = "Esperanto",
  "et" = "Estonian",
  "ee" = "Ewe",
  "fo" = "Faroese",
  "fj" = "Fijian",
  "tl" = "Filipino",
  "fi" = "Finnish",
  "fon" = "Fon",
  "fr" = "French",
  "fy" = "Frisian",
  "fur" = "Friulian",
  "ff" = "Fulani",
  "gaa" = "Ga",
  "gl" = "Galician",
  "ka" = "Georgian",
  "de" = "German",
  "el" = "Greek",
  "gn" = "Guarani",
  "gu" = "Gujarati",
  "ht" = "Haitian Creole",
  "cnh" = "Hakha Chin",
  "ha" = "Hausa",
  "haw" = "Hawaiian",
  "iw" = "Hebrew",
  "hil" = "Hiligaynon",
  "hi" = "Hindi",
  "hmn" = "Hmong",
  "hu" = "Hungarian",
  "hrx" = "Hunsrik",
  "iba" = "Iban",
  "is" = "Icelandic",
  "ig" = "Igbo",
  "ilo" = "Ilocano",
  "id" = "Indonesian",
  "ga" = "Irish",
  "it" = "Italian",
  "jam" = "Jamaican Patois",
  "ja" = "Japanese",
  "jw" = "Javanese",
  "kac" = "Jingpo",
  "kl" = "Kalaallisut",
  "kn" = "Kannada",
  "kr" = "Kanuri",
  "pam" = "Kapampangan",
  "kk" = "Kazakh",
  "kha" = "Khasi",
  "km" = "Khmer",
  "cgg" = "Kiga",
  "kg" = "Kikongo",
  "rw" = "Kinyarwanda",
  "ktu" = "Kituba",
  "trp" = "Kokborok",
  "kv" = "Komi",
  "gom" = "Konkani",
  "ko" = "Korean",
  "kri" = "Krio",
  "ku" = "Kurdish (Kurmanji)",
  "ckb" = "Kurdish (Sorani)",
  "ky" = "Kyrgyz",
  "lo" = "Lao",
  "ltg" = "Latgalian",
  "la" = "Latin",
  "lv" = "Latvian",
  "lij" = "Ligurian",
  "li" = "Limburgish",
  "ln" = "Lingala",
  "lt" = "Lithuanian",
  "lmo" = "Lombard",
  "lg" = "Luganda",
  "luo" = "Luo",
  "lb" = "Luxembourgish",
  "mk" = "Macedonian",
  "mad" = "Madurese",
  "mai" = "Maithili",
  "mak" = "Makassar",
  "mg" = "Malagasy",
  "ms" = "Malay",
  "ms-Arab" = "Malay (Jawi)",
  "ml" = "Malayalam",
  "mt" = "Maltese",
  "mam" = "Mam",
  "gv" = "Manx",
  "mi" = "Maori",
  "mr" = "Marathi",
  "mh" = "Marshallese",
  "mwr" = "Marwadi",
  "mfe" = "Mauritian Creole",
  "chm" = "Meadow Mari",
  "mni-Mtei" = "Meiteilon (Manipuri)",
  "min" = "Minang",
  "lus" = "Mizo",
  "mn" = "Mongolian",
  "my" = "Myanmar (Burmese)",
  "nhe" = "Nahuatl (Eastern Huasteca)",
  "ndc-ZW" = "Ndau",
  "nr" = "Ndebele (South)",
  "new" = "Nepalbhasa (Newari)",
  "ne" = "Nepali",
  "bm-Nkoo" = "NKo",
  "no" = "Norwegian",
  "nus" = "Nuer",
  "oc" = "Occitan",
  "or" = "Odia (Oriya)",
  "om" = "Oromo",
  "os" = "Ossetian",
  "pag" = "Pangasinan",
  "pap" = "Papiamento",
  "ps" = "Pashto",
  "fa" = "Persian",
  "pl" = "Polish",
  "pt" = "Portuguese (Brazil)",
  "pt-PT" = "Portuguese (Portugal)",
  "pa" = "Punjabi (Gurmukhi)",
  "pa-Arab" = "Punjabi (Shahmukhi)",
  "qu" = "Quechua",
  "kek" = "Qʼeqchiʼ",
  "rom" = "Romani",
  "ro" = "Romanian",
  "rn" = "Rundi",
  "ru" = "Russian",
  "se" = "Sami (North)",
  "sm" = "Samoan",
  "sg" = "Sango",
  "sa" = "Sanskrit",
  "sat-Latn" = "Santali",
  "gd" = "Scots Gaelic",
  "nso" = "Sepedi",
  "sr" = "Serbian",
  "st" = "Sesotho",
  "crs" = "Seychellois Creole",
  "shn" = "Shan",
  "sn" = "Shona",
  "scn" = "Sicilian",
  "szl" = "Silesian",
  "sd" = "Sindhi",
  "si" = "Sinhala",
  "sk" = "Slovak",
  "sl" = "Slovenian",
  "so" = "Somali",
  "es" = "Spanish",
  "su" = "Sundanese",
  "sus" = "Susu",
  "sw" = "Swahili",
  "ss" = "Swati",
  "sv" = "Swedish",
  "ty" = "Tahitian",
  "tg" = "Tajik",
  "ber-Latn" = "Tamazight",
  "ber" = "Tamazight (Tifinagh)",
  "ta" = "Tamil",
  "tt" = "Tatar",
  "te" = "Telugu",
  "tet" = "Tetum",
  "th" = "Thai",
  "bo" = "Tibetan",
  "ti" = "Tigrinya",
  "tiv" = "Tiv",
  "tpi" = "Tok Pisin",
  "to" = "Tongan",
  "ts" = "Tsonga",
  "tn" = "Tswana",
  "tcy" = "Tulu",
  "tum" = "Tumbuka",
  "tr" = "Turkish",
  "tk" = "Turkmen",
  "tyv" = "Tuvan",
  "ak" = "Twi",
  "udm" = "Udmurt",
  "uk" = "Ukrainian",
  "ur" = "Urdu",
  "ug" = "Uyghur",
  "uz" = "Uzbek",
  "ve" = "Venda",
  "vec" = "Venetian",
  "vi" = "Vietnamese",
  "war" = "Waray",
  "cy" = "Welsh",
  "wo" = "Wolof",
  "xh" = "Xhosa",
  "sah" = "Yakut",
  "yi" = "Yiddish",
  "yo" = "Yoruba",
  "yua" = "Yucatec Maya",
  "zap" = "Zapotec",
  "zu" = "Zulu",
}

// Default export of the translate function for easy usage
export default translate;

// Named exports for all key functions and classes in the module
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
