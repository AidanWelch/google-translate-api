function getRequestOptions(reqOptions = {}, defaultReqOptions = {}, useUserSuppliedRequestOptions = false) {
    if (useUserSuppliedRequestOptions === true) {
		return reqOptions ?? {};
	} 
	
    return {...reqOptions, ...defaultReqOptions};
}

module.exports = {getRequestOptions};
