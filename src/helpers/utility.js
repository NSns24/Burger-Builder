export const checkValidity = (value, rules) => {
    let msg = '';

    if (rules.required && value.trim() === '') {
        msg = 'cannot be empty';
        return msg;
    }

    if (rules.minLength && value.length < rules.minLength) {
        msg = 'minimum length is ' + rules.minLength;
        return msg;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        msg = 'maximum length is ' + rules.maxLength;
        return msg;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test(value)) {
            msg = 'has wrong email format';
            return msg;
        }
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        if (!pattern.test(value)) {
            msg = 'has to be numeric';
            return msg;
        }
    }

    return msg;
}