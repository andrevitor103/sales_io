import { CPF } from "../src/v3/CPF";

test('validação de CPF quando receber um CPF válido então deve aceitar CPF', () => {
    const cpf = CPF.create('11259209989');
    expect(cpf.isValid).toBeTruthy();
})
test('validação de CPF quando receber um CPF inválido então deve recusar CPF', () => {
    const cpf = CPF.create('11122233344');
    expect(cpf.isValid).toBeFalsy();
})
test('validação de CPF quando receber um CPF com todos os digitos iguais então deve recusar CPF', () => {
    const cpf = CPF.create('00000000000');
    expect(cpf.isValid).toBeFalsy();
})
