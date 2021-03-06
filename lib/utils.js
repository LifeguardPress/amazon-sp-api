const CustomError = require('./CustomError');

module.exports = {
	// Check if all required path parameters are given
	// --> not neccessary for body or querystring as SP API error messages are meaningful enough
	checkParams:(req_params, requirements) => {
		if (!req_params || !req_params.path){
			throw new CustomError({
	  		code:'NO_PATH_FOUND',
	  		message: 'Please provide the following path parameters: ' + Object.keys(requirements.path).join(',')
	  	});
		}
		for (let param in requirements.path){
			if (!req_params.path[param]){
				throw new CustomError({
		  		code:'REQUIRED_PATH_PARAMETER_NOT_FOUND',
		  		message: 'Please provide the following path parameter: ' + param
		  	});
			} else if (requirements.path[param].type === 'enum' && !requirements.path[param].enum.includes(req_params.path[param])){
				throw new CustomError({
		  		code:'INVALID_PATH_PARAMETER_VALUE',
		  		message: 'Invalid value "' + req_params.path[param] + '" for path parameter ' + param
		  	});
			}
		}
	}
};