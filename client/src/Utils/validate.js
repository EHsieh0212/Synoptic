import validator from 'validator';

export const validateDelivery = formData => {
    const emailOk = validator.isEmail(formData.email);
    const postCodeOk = validator.isPostalCode(formData.postalCode, 'any');
    const phoneOk = (formData.phone.split('-')[0] === '09') && (formData.phone.split('-')[1].length === 8);
    return [emailOk, postCodeOk, phoneOk];
};

export const validatePayment = formData => {
    const creditCardOk = validator.isCreditCard(formData.creditCard);
    const cvvRegex = /^[0-9]{3,4}$/;
    const cvvOk = cvvRegex.test(formData.cvv);
    return [creditCardOk, cvvOk];
};
