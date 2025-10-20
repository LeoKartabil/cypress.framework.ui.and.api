import Ajv from 'ajv'

/* 
    * Configurações do AJV para validação dos schemas
    * allErrors: true - Mostra todos os erros encontrados na validação
    * verbose: true - Mostra detalhes adicionais sobre os erros
    * strict: false - Desabilita o modo estrito para evitar warnings desnecessários
    * removeAdditional: true - Remove propriedades adicionais que não estão definidas no schema
*/
const ajv = new Ajv({
    allErrors: true, 
    verbose: true, 
    strict: false,
    removeAdditional: true
})

Cypress.Commands.add('validateSchema', (res, schemaPath, status) => {
    console.log(`Validating schema for: ${schemaPath} with status: ${status}`)
    console.log(`Response body: ${res}${JSON.stringify(res.body, null, 2)}`)
    cy.fixture(`schemas/${schemaPath}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)
        if (!valid) {
            var errors = ''
            for (let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            throw new Error('Contract validation erros, please verify!' + errors)
        }
        cy.log(`✅ Schema validation passed for: ${schemaPath} (status ${status})`)
    })
})