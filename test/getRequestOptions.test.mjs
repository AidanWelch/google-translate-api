import assert from 'assert';
import { getRequestOptions } from '../lib/translation/getRequestOptions.cjs';
import { DEFAULT_OPTIONS } from '../lib/defaults.cjs';

describe('getRequestOptions()', function () {

	it('should result in default options', async () => {        
        const userDefinedOptions = {
            'headers': {}
        };

		const res = getRequestOptions(userDefinedOptions, DEFAULT_OPTIONS.requestOptions, false);
        assert.deepEqual(res, DEFAULT_OPTIONS.requestOptions);
    });
	it('should result in user-supplied options', async () => {
        const userDefinedOptions = {
            'headers': {}
        };
		const res = getRequestOptions(userDefinedOptions, DEFAULT_OPTIONS.requestOptions, true);
        assert.deepEqual(res, userDefinedOptions);
    });
});
