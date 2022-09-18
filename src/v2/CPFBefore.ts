// @ts-nocheck

const CPF_SIZE_NUMBER_ONLY = 11;
const CPF_SIZE_WITH_DASHES = 14;

function sanitize(str: String) {
    return  str
            .replaceAll('.','')
            .replaceAll('-','')
            .replace(" ","");  
}

function isValidCPF(str: String): boolean {
    return isValidFormat(str) && checkFirstDigitIsValid(str) && checkSecondDigitIsValid(str);
}

function isValidFormat(str: String) {
    return str && (str.length >= CPF_SIZE_NUMBER_ONLY || str.length <= CPF_SIZE_WITH_DASHES) && !allNumberEquals(str);
}

function allNumberEquals(str: String) {
    return str.split("").every(c => c === str[0]);
}

function checkFirstDigitIsValid(cpf: String): boolean {
    let sumDigit = 0;
    let currentDigit = 0;
    const START_NUMBER = 11;
    for(let count = 1; count < cpf.length - 1; count++) {
        currentDigit = parseInt(cpf.substring(count-1, count));
        sumDigit += (START_NUMBER - count) * currentDigit 
    }
    return getDigitFrom(sumDigit) == parseInt(cpf.substring(9,10));
}

function checkSecondDigitIsValid(cpf: String): boolean {
    let sumDigit = 0;
    let currentDigit = 0;
    const START_NUMBER = 12;
    for(let count = 1; count < cpf.length; count++) {
        currentDigit = parseInt(cpf.substring(count-1, count));
        sumDigit += (START_NUMBER - count) * currentDigit 
    }
    return getDigitFrom(sumDigit) == parseInt(cpf.substring(10));
}

function getDigitFrom(sum: int): int {
    let restOfTheCalculation = (sum % CPF_SIZE_NUMBER_ONLY);
    return restOfTheCalculation < 2 ? 0 : (CPF_SIZE_NUMBER_ONLY - restOfTheCalculation);
}

export function validate(str: String): boolean {
    const cpf = sanitize(str);
    try{
        return isValidCPF(cpf);
    }catch (e){  
        return false;  
    }  
}
