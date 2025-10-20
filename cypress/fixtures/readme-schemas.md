cypress/
├── fixtures/
│   ├── schemas/
│   │   ├── get-users/
│   │   │   ├── 200.json                  
│   │   │   ├── 400.json          
│   │   │   └── 404.json
│   │   ├── post-users/          
│   │   │   ├── 201.json          
│   │   │   ├── 403.json               
│   │   ├── products/
│   │   │   ├── 200.json
│   │   │   ├── 201.json
│   │   │   └── 422.json

```js
    cy.request('GET', '/api/users/1').then(response => {
        // Validação básica - Status code padrão (200)
        cy.validateSchema(response, 'get-users')
        
        // Com opções customizadas
        cy.validateSchema(response, 'post-users', {
            statusCode: 201,
            strictValidation: false,
            logErrors: true
        })
    })
```