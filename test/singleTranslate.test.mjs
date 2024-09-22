import assert from 'assert/strict';
import { singleTranslate } from '../index.cjs';

describe('singleTranslate()', function () {
	this.timeout(5000);
	this.retries(1);

	it('should translate individual word with defaults', async () => {
		try {
			const res = await singleTranslate('cat', {from: 'en', to: 'es'});

			assert.equal(res.text, 'gato');
		} catch (e) {
			assert.equal(e.message, 'Too Many Requests');
		}
	});

	it('should translate sentences to target', async () => {
		try {
			const res = await singleTranslate('These sentences are test.  Just to make sure this works.  It should!', {from: 'en', to: 'ja'});

			assert.equal(res.text, 'これらの文はテストです。  これが機能することを確認するためです。  それはすべきです！');
		} catch (e) {
			assert.equal(e.message, 'Too Many Requests');
		}
	});

	it('should default to English on some incorrect iso forced', async () => {
		try {
			const resTo = await singleTranslate('This is a test', {to: 'testing', from: 'en', forceTo: true});

			assert.equal(resTo.text, 'This is a test');

			const resFrom = await singleTranslate('Tohle je zkouška', {to: 'en', from: 'anotherone', forceFrom: true});

			assert.equal(resFrom.text, 'Tohle je zkouška');
		} catch (e) {
			assert.equal(e.message, 'Too Many Requests');
		}
	});

	it('should error on other incorrect isos, forced', async () => {
		await assert.rejects(singleTranslate('This is a test', {to: 'abc', from: 'en', forceTo: true}));
		await assert.rejects(singleTranslate('This is a test', {to: 'en', from: 'ii', forceFrom: true}));
	});

	it('should pass request options', async () => {
		const abortController = new AbortController();
		const requestOptions = {
			signal: abortController.signal
		};
		abortController.abort();
		await assert.rejects(singleTranslate('vertaler', {requestOptions}), 'AbortError');
	});

	it('should reject on incorrect iso not forced', async () => {
		await assert.rejects(singleTranslate('This is a test', {to: 'abc', from: 'en'}));
		await assert.rejects(singleTranslate('This is a test', {to: 'en', from: 'ii'}));
	});

	it('should not error on empty input', async () => {
		const res = await singleTranslate('', {to: 'es', from: 'en'});

		assert.equal(res.text, '');
	});

});