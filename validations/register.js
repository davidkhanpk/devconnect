const validator = require('validator');
const isEmpty = require('./checkEmpty');
module.exports = function validateRegisterInput (data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!validator.isLength(data.name, {min:2, max:30})){
        errors.name = 'Name Must be between 2 and 30 characters';
    }
    if(validator.isEmpty(data.name)){
        errors.name = 'Name feild is required';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email feild is required';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email Invlaid';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password feild is required';
    }
    if(!validator.isLength(data.password, {min:6, max:30})){
        errors.password = 'Password Must be between 6 characters';
    }
    if(validator.isEmpty(data.password2)){
        errors.password2 = 'Password feild is required';
    }
    if(!validator.isLength(data.password2, {min:6, max:30})){
        errors.password2 = 'Password Must be between 6 characters';
    }
    if(!validator.equals(data.password, data.password2)){
        errors.password2 = 'Password Not Matched';
    }

    return { errors, isValid: isEmpty(errors)}
}