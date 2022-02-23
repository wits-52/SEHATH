/**
 * Validates if a password is valid or not. 
 * RULES:
 * 1. Min Length: 8
 * 2. Max Length: 20
 * 3.  Should have atleast one lower case, one upper case and one number in password.
 * @param {Strign} password password to be validated
 * @returns {Object} isValid property for validation result, message for detailed data.
 */
const validatePassword = (password) => {
    if(!password) {
        return {
            isValid: false,
            message: 'Please provide valid password.'
        };
    }
    let isValid = true;
    let message = 'Success';
    if (typeof password !== 'string') {
        isValid = false;
        message = 'Password should be a string';
        return { isValid, message };
    };
    if (password.length < 8) {
        isValid = false;
        message = 'Password should have minimum length of 8';
        return { isValid, message };
    }
    if (password.length > 20 ) {
        isValid = false;
        message = 'Password should not exceed 20 characters';
        return { isValid, message };
    }
    const hasUpperCaseChars = password.match(/[A-Z]/);
    if(!hasUpperCaseChars) {
        isValid = false;
        message = 'Password should have some Upper Case characters.';
        return { isValid, message };
    }
    const hasLowerCaseChars = password.match(/[a-z]/);
    if(!hasLowerCaseChars) {
        isValid = false;
        message = 'Password should have some Lower Case characters.';
        return { isValid, message };
    }
    const hasNumericChars = password.match(/[0-9]/);
    if(!hasNumericChars) {
        isValid = false;
        message = 'Password should have some Numeric characters.';
        return { isValid, message };
    }
    return { isValid, message };
};
/**
 * Method to validate is passed email is valid or not
 * @param {String} email email which needs to be validated
 * @returns {Boolean} true if valid email, false is invalid
 */
const emailValidator = (email) => {
    if(!email) return false;
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.toLowerCase().match(emailRegEx);
}
// TODO: add phone validator to check valid phone number
module.exports = {validatePassword, emailValidator};