const validator = require('validator');
const isEmpty = require('./checkEmpty');
module.exports = function validateLoginInput (data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!validator.isEmail(data.email)){
        errors.email = 'Email Invlaid';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email feild is required';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password feild is required';
    }

    return { errors, isValid: isEmpty(errors)}
}