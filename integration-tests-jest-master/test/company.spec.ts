import pactum, { spec } from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';
import { Faker, faker } from '@faker-js/faker';

describe('Desafio qa API', () => {
  const p = pactum;
  const baseUrl = 'https://api-desafio-qa.onrender.com/company/';

  p.request.setDefaultTimeout(90000);

  describe('Este endpoint cria um novo registro de empresa com nome, CNPJ, estado, cidade, endereço e setor.', () => {
    it('Deve criar uma nova empresa com sucesso', async () => {
      const newCompany = {
        name: faker.company.name(),
        cnpj: '55048649000174',
        state: 'SP',
        city: 'São Paulo',
        address: 'Rua Teste, 123',
        sector: 'Tecnologia'
      };

      await spec()
        .post('https://api-desafio-qa.onrender.com/company/') 
        .withJson(newCompany)
        .expectStatus(201);
    });
  });

  describe('Este endpoint retorna uma lista de todas as empresas cadastradas.', () => { 
    it('Deve retornar uma lista de todas as empresas', async () => {
      const response = await p.spec()
        .get('https://api-desafio-qa.onrender.com/company/') 
        .expectStatus(200);
    });
  });
  describe('Retornar os detalhes da empresa', () => {
    it('Deve retornar os detalhes da empresa com base no ID fornecido', async () => {
        const companyId = 1; 
        const expectedResponse = {
            id: companyId,
            name: "string",
            address: "string",
            services: [
                {
                    serviceId: 0,
                    serviceName: "string",
                    serviceDescription: "string"
                }
            ]
        };

        const response = await p.spec()
            .get(`https://api-desafio-qa.onrender.com/company/${companyId}`) 
            .expectStatus(200)
            .expectBodyContains(expectedResponse); 
    });
    });
    describe('Recuperar produtos associados a uma empresa', () => {
        it('Deve retornar todos os produtos associados ao ID da empresa especificado', async () => {
            const companyId = 1;
            const expectedResponse = [
                {
                    productId: 0,
                    productName: "string",
                    productDescription: "string",
                    price: 0
                }
            ];
    
            const response = await p.spec()
                .get(`https://api-desafio-qa.onrender.com/company/${companyId}/products`) 
                .expectStatus(200)
                .expectBodyContains(expectedResponse); 
        });
    });
    describe('Retornar detalhes de um produto específico', () => {
        it('Deve retornar os detalhes do produto baseado nos IDs da empresa e do produto', async () => {
            const companyId = 1;
            const productId = 0; 
            const expectedResponse = {
                productId: productId,
                productName: "string",
                productDescription: "string",
                price: 0
            };
    
            const response = await p.spec()
                .get(`https://api-desafio-qa.onrender.com/company/${companyId}/products/${productId}`) 
                .expectStatus(200)
                .expectBodyContains(expectedResponse); 
        });
    });
    describe('Recuperar funcionários associados a uma empresa', () => {
        it('Deve retornar todos os funcionários associados ao ID da empresa especificado', async () => {
            const companyId = 1; 
            const expectedResponse = [
                {
                    employeeId: 0,
                    employeeName: "string",
                    employeePosition: "string"
                }
            ];
    
            const response = await p.spec()
                .get(`https://api-desafio-qa.onrender.com/company/${companyId}/employees`) 
                .expectStatus(200)
                .expectBodyContains(expectedResponse);
        });
    });
    
  afterAll(() => p.reporter.end());
});
