Instalação do Node.js

Vamos começar inicializando o nosso projeto no Node.js com o comando npm init -y.

Caso você não tenha o Node.js instalado, basta entrar em https://nodejs.org, baixar e instalar a versão LTS. Pode ser interessante utilizar algum gerenciador de versões como o nvm, para mais informações acesse https://github.com/nvm-sh/nvm.

Eu sempre recomendo que você utilize a última versão estável, estou utilizando a versão 16. Fique atento caso esteja utilizando uma versão muito antiga.


Inicialização do Projeto

Após inicializar o projeto, o arquivo package.json será criado. Lá vão ficar as dependências e também os scripts de execução tanto do TypeScript quanto dos testes.


Instalação e Inicialização do TypeScript

Instale o TypeScript utilizando o comando abaixo, aproveitando para instalar outras dependências:

yarn add typescript jest @types/jest ts-node ts-jest

Você também pode utilizar o npm

npm install typescript jest @types/jest ts-node ts-jest

Depois disso, crie o arquivo tsconfig.json:

npx tsc --init

Com isso, o arquivo tsconfig.js deve ter sido criado e estamos prontos para começar.


Configuração do Jest

Configure o Jest utilizando o comando abaixo:

npx ts-jest config:init



Configuração do TypeScript

O TypeScript tem um compilador que faz a conversão do código para JavaScript. Por conta disso, precisamos definir alguns poucos parâmetros:

tsconfig.json


{
    "compilerOptions": {
    "incremental": true,
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
    },
    "include": [
        "src",
        "test"
    ]
}


Fique totalmente à vontade para configurar de forma diferente, conforme as preferências que você já esteja acostumado.


Testando se tudo deu certo

Pronto, agora crie uma pasta chamada src e test dentro delas crie dois arquivos:

Circle.test.ts


import Circle from "../src/Circle";

test("Should calculate the area of circle", function () {
    const circle = new Circle(2);
    expect(circle.getArea()).toBe(12.566370614359172);
});

Circle.ts


export default class Circle {

   constructor (readonly radius: number) {
   }

    getArea() : number {
        return 2 * Math.PI * this.radius;
    }
}

Agora basta executar:

npx jest

Se os testes tiverem sido executados com sucesso está tudo pronto!
