const validator = require('validator');
const isEmpty = require('./checkEmpty');
module.exports = function validatePostInput (data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    if(!validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = 'Post between 10 and 300'
    }

    if(validator.isEmpty(data.text)){
        errors.text = 'text feild is required';
    }

    return { errors, isValid: isEmpty(errors)}
}