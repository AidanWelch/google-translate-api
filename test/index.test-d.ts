import { expectAssignable, expectType } from 'tsd';
import translateDefaultImport, { translate, Translator, speak, TranslationResponse, singleTranslate, batchTranslate, isSupported, getCode, languages } from '..';

// Expect assignable since the default import is a function with properties, i.e. `translateDefaultImport('text to translate', { to: 'nl' })` and `translateDefaultImport.isSupported('nl')` both work
expectAssignable<typeof translate>(translateDefaultImport)
expectType<typeof translateDefaultImport.translate>(translate)

expectType<Promise<TranslationResponse>>(translate('abc'));
expectType<Promise<TranslationResponse[]>>(translate(['a', {text: 'b', to: 'nl'}, 'c']));
expectType<Promise<{a: TranslationResponse, b: TranslationResponse}>>(translate({a: 'test', b: {text: 'b', to: 'nl'}}));

const translator = new Translator();
expectType<Promise<TranslationResponse>>(translator.translate('abc'));
expectType<Promise<TranslationResponse[]>>(translator.translate(['a', {text: 'b', to: 'nl'}, 'c']));
expectType<Promise<{a: TranslationResponse, b: TranslationResponse}>>(translator.translate({a: 'test', b: {text: 'b', to: 'nl'}}));

expectType<Promise<string>>(speak('abc'));
expectType<Promise<string[]>>(speak(['a', {text: 'b', to: 'nl'}, 'c']))
expectType<Promise<{a: string, b: string}>>(speak({a: 'test', b: {text: 'b', to: 'nl'}}));

expectType<Promise<TranslationResponse>>(singleTranslate('abc'));

expectType<Promise<TranslationResponse>>(batchTranslate('abc'));
expectType<Promise<TranslationResponse[]>>(batchTranslate(['a', {text: 'b', to: 'nl'}, 'c']));
expectType<Promise<{a: TranslationResponse, b: TranslationResponse}>>(batchTranslate({a: 'test', b: {text: 'b', to: 'nl'}}));

expectType<boolean>(isSupported('en'));
expectType<string | null>(getCode('en'));
expectAssignable<Record<string, string>>(languages);
