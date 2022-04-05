function Validate(value, rules) {

    function minLengthValidator(value, minLength) {
        return value.length >= minLength;
    }

    function requiredValidator(value) {
        return value.trim() !== '';
    }


    function dateValidator(value) {
        const re = /^\d{4}-\d{2}-\d{2}$/
        return re.test(value)

    }

    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'minLength':
                isValid = isValid && minLengthValidator(value, rules[rule]);
                break;

            case 'isRequired':
                isValid = isValid && requiredValidator(value);
                break;

            case 'dateValidator':
                isValid = isValid && dateValidator(value);
                break;
            default:
                isValid = true;
        }

    }

    return isValid;
}

export default Validate;
