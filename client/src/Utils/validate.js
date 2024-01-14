import validator from 'validator';

export const validateDelivery = formData => {
    const emailOk = validator.isEmail(formData.email);
    const postCodeOk = validator.isPostalCode(formData.postalCode, 'any');
    const phoneOk = (formData.phone.split('-')[0] === '09') && (formData.phone.split('-')[1].length === 8);
    const finalOk = emailOk && postCodeOk && phoneOk;
    return [finalOk, emailOk, postCodeOk, phoneOk]
};