export function creatControl(config, validation){
    return{
        ...config,
        validation,
        valid: false,
        touched: false,
        value: ''
    }
}

export function validate(value, validation = null){
    if(!validation){
        return true
    }

    let isValid = true;

    if(validation.required){
        isValid = value.trim() !== '' && isValid;
    }


    return isValid
}

export function validateForm(formControls){
    let isFormValid = true;

    for(let control in formControls){
        if(control.hasOwnProperty(control)){
             isFormValid = formControls[control].valid && isFormValid;
        }
    }

    return isFormValid;
}