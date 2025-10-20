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

/*
    * Comando customizado para validar o schema de uma resposta de API
    * @param {Object} response - Objeto de resposta da API (deve conter a propriedade 'body')
    * @param {String} schemaName - Nome da pasta da fixture onde o schema está localizado (fixtures/schemas/{schemaName})
    * @param {Object} options - Opções adicionais para a validação
    * @param {Number} options.statusCode - Código de status esperado (default: 200)
    * @param {Boolean} options.strictValidation - Se true, lança erro em caso de falha (default: true)
    * @param {Boolean} options.logErrors - Se true, loga os erros encontrados (default: true)
    * @returns {Boolean} - Retorna true se a validação passar, false caso contrário (se strictValidation for false)
*/
Cypress.Commands.add('validateSchema', (response, schemaName, options = {}) => {
    const { 
        statusCode = response.status || 200,
        strictValidation = true,
        logErrors = true 
    } = options

    // Validação de entrada
    if (!response || !response.body) {
        throw new Error('Response object with body is required for schema validation')
    }

    if (!schemaName) {
        throw new Error('Schema name is required for validation')
    }

    const schemaPath = `schemas/${schemaName}/${statusCode}.json`
    
    return cy.fixture(schemaPath).then(schema => {
        const validate = ajv.compile(schema)
        const valid = validate(response.body)
        
        if (!valid) {
            const errorDetails = validate.errors.map(err => ({
                path: err.instancePath || 'root',
                message: err.message,
                receivedValue: err.data,
                receivedType: typeof err.data,
                expectedSchema: err.schema
            }))

            const errorMessage = errorDetails
                .map(err => `• Path: ${err.path} - ${err.message} (received: ${err.receivedType})`)
                .join('\n')

            if (logErrors) {
                cy.log('Schema Validation Errors:', errorDetails)
            }

            if (strictValidation) {
                throw new Error(`Schema validation failed for '${schemaName}':\n${errorMessage}`)
            } else {
                cy.log(`⚠️ Schema validation warnings for '${schemaName}':\n${errorMessage}`)
                return false
            }
        }

        cy.log(`✅ Schema validation passed for '${schemaName}'`)
        return true
    }).catch(err => {
        if (err.message.includes('does not exist')) {
            throw new Error(`Schema file not found: ${schemaPath}. Please ensure the schema exists.`)
        }
        throw err
    })
})