export default translate;
export {
	translate,
	Translator,
	speak,
	singleTranslate,
	batchTranslate,
	languages,
	isSupported,
	getCode
};

declare function translate<Input extends googleTranslateApi.Input> (
	input: Input,
	opts?: googleTranslateApi.RequestOptions,
): googleTranslateApi.TranslationResponseStructure<Input>;

declare class Translator {
	constructor(options?: googleTranslateApi.RequestOptions);
	translate<Input extends googleTranslateApi.Input> (
		input: Input,
		opts?: googleTranslateApi.RequestOptions,
	): googleTranslateApi.TranslationResponseStructure<Input>;
	options: googleTranslateApi.RequestOptions;
}

declare function speak<Input extends googleTranslateApi.Input> (
	input: Input,
	opts?: googleTranslateApi.RequestOptions,
): googleTranslateApi.SpeakResponseStructure<Input>;

declare function singleTranslate (
	input: string,
	opts?: googleTranslateApi.RequestOptions,
) : googleTranslateApi.TranslationResponseStructure<string>;

declare const batchTranslate: typeof translate;

declare const languages: typeof googleTranslateApi.languages;

declare function isSupported(
	desiredLang: string
): boolean;

declare function getCode(
	desiredLang: string
): boolean | null;

export declare namespace googleTranslateApi {
	interface TranslationOptions {
		from?: string;
		to?: string;
		forceFrom?: boolean;
		forceTo?: boolean;
		autoCorrect?: boolean;
	}

	export interface RequestOptions extends TranslationOptions {
		tld?: string;
		requestFunction?: Function;
		forceBatch?: boolean;
		fallbackBatch?: boolean;
		requestOptions?: object;
		rejectOnPartialFail?: boolean;
	}

	interface TranslatedLanguage {
		didYouMean: boolean;
		iso: string;
	}

	interface TranslatedText {
		autoCorrected: boolean;
		value: string;
		didYouMean: boolean;
	}

	export interface TranslationResponse {
		text: string;
		pronunciation?: string;
		from: {
			language: TranslatedLanguage;
			text: TranslatedText;
		};
		raw: string;
	}

	interface OptionQuery extends TranslationOptions {
		text: string;
	}

	type Query = string | OptionQuery;

	export type Input = string | Query[] | {[key: string]: Query};

	export type TranslationResponseStructure<T> = T extends string ? Promise<TranslationResponse> : T extends Query[] ? Promise<TranslationResponse[]> : Promise<{[key in keyof T]: TranslationResponse}>;

	export type SpeakResponseStructure<T> = T extends string ? Promise<string> : T extends Query[] ? Promise<string[]> : Promise<{[key in keyof T]: string}>;

	/*
 	*
 	* Generated from https://translate.google.com
 	*
 	* In tools/updatelanguages.mjs
 	*
 	* The languages that Google Translate supports (as of 5/15/16) alongside with their ISO 639-1 codes
 	* See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 	*/
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

	namespace languages {
		/**
		 * Returns the ISO 639-1 code of the desiredLang – if it is supported by Google Translate
		 * @param desiredLang – the name or the code(case sensitive) of the desired language
		 * @returns The ISO 639-1 code of the language or false if the language is not supported
		 */
		function getCode(desiredLang: string): string | boolean;

		/**
		 * Returns true if the desiredLang is supported by Google Translate and false otherwise
		 * @param desiredLang – the ISO 639-1 code or the name of the desired language
		 */
		function isSupported(desiredLang: string): boolean;
	}
}
