import { validate } from "../src/v1/CPFBefore";


test('validação de CPF quando receber um CPF válido então deve aceitar CPF', () => {
    const cpfTest = '11259209989';
    const isValid = validate(cpfTest)
    expect(isValid).toBeTruthy();
})
test('validação de CPF quando receber um CPF inválido então deve recusar CPF', () => {
    const cpfTest = '11122233344';
    const isValid = validate(cpfTest)
    expect(isValid).toBeFalsy();
})
