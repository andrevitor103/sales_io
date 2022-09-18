// @ts-nocheck

export class CPF {
    
    const CPF_SIZE_NUMBER_ONLY = 11;
    const CPF_SIZE_WITH_DASHES = 14;
    private isValid: Boolean = false;

    private constructor(readonly cpf: String) {
        this.validate();
    }

    public static create(readonly cpf: String): self {
        return new CPF(cpf);
    }

    public isValid(): Boolean {
        return this.isValid;
    }

    private validate() {
        this.isValid = ( this.isValidFormat() && this.checkFirstDigitIsValid() && this.checkSecondDigitIsValid());
    }

    private isValidFormat() {
        return this.cpf && (this.cpf.length >= this.CPF_SIZE_NUMBER_ONLY || this.cpf.length <= this.CPF_SIZE_WITH_DASHES) && !this.allNumberEquals();
    }

    private allNumberEquals() {
        return this.cpf.split("").every(c => c === this.cpf[0]);
    }
    
    private checkFirstDigitIsValid(): boolean {
        let sumDigit = 0;
        let currentDigit = 0;
        const START_NUMBER = 11;
        for(let count = 1; count < this.cpf.length - 1; count++) {
            currentDigit = parseInt(this.cpf.substring(count-1, count));
            sumDigit += (START_NUMBER - count) * currentDigit 
        }
        return this.getDigitFrom(sumDigit) == parseInt(this.cpf.substring(9,10));
    }
    
    private checkSecondDigitIsValid(): boolean {
        let sumDigit = 0;
        let currentDigit = 0;
        const START_NUMBER = 12;
        for(let count = 1; count < this.cpf.length; count++) {
            currentDigit = parseInt(this.cpf.substring(count-1, count));
            sumDigit += (START_NUMBER - count) * currentDigit 
        }
        return this.getDigitFrom(sumDigit) == parseInt(this.cpf.substring(10));
    }
    
    private getDigitFrom(sum: int): int {
        let restOfTheCalculation = (sum % this.CPF_SIZE_NUMBER_ONLY);
        return restOfTheCalculation < 2 ? 0 : (this.CPF_SIZE_NUMBER_ONLY - restOfTheCalculation);
    }
}
