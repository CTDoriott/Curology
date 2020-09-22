import { FormErrors } from 'redux-form';

const validate = (values: any): FormErrors<any> => {
    const errors: FormErrors<any> = {};
    if (!values.quantity) {
      errors.quantity = 'A quantity is required';
    }

    const productQty = Number(values.quantity);
    if (productQty < 1 || productQty > 3 || productQty !== parseInt(values.quantity, 10)) {
      errors.quantity = 'Sorry, you may only order a maximum of 3 Potions';
    }

    if (!values.firstName) {
      errors.firstName = 'A first name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'A last name is required';
    }

    if (!values.email) {
      errors.email = 'An email address is required';
    }

    const email = values.email || '';
    const emailMatch = email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/)
    if (email && !emailMatch) {
      errors.email = 'Please enter a valid email address';
    }

    if (!values.street1) {
      errors.street1 = 'An address is required';
    }

    if (!values.city) {
      errors.city = 'A city is required';
    }

    if (!values.state) {
      errors.state = 'A state is required';
    }

    if (!values.zip) {
      errors.zip = 'A zip code is required';
    }

    if (!values.phone) {
      errors.phone = 'A phone number is required';
    }

    if (!values.ccNum) {
      errors.ccNum = 'A credit card is required';
    }

    const creditCard = values.ccNum || '';
    const cardMatch = creditCard.match(/^\d{4}-\d{4}-\d{4}-\d{4}$/);
    if (creditCard && !cardMatch) {
      errors.ccNum = 'Please enter a valid card number';
    }

    if (!values.exp) {
      errors.exp = 'An expiration date is required';
    }

    const expirationDate = values.exp || '';
    const dateMatch = expirationDate.match(/^\d{2}\/\d{4}$/);
    if (expirationDate && !dateMatch) {
      errors.exp = 'Please enter a valid card date in the format MM/YYYY';
    }

    return errors;
};
export default validate;
