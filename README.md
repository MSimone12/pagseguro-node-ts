# PagSeguro Node API with Typescript

## Installing

```bash
npm install pagseguro-node-ts
```

## Usage

### First, you need to instantiate _PagSeguroCheckout_ Object and create a Session

<br>

```javascript
const authData = {
  email: 'your pagseguro account email',
  token: 'your pagseguro account token',
  mode: 'production' | 'sandbox',
};

const checkout = new PagSeguroCheckout(authData);

await checkout.createSession();
```

### Then, you can use the other methods to effectively create a checkout

```javascript
checkout.addItem({
  id: '1', // any id
  amount: '25.00', // float with 2 numbers after the floating point
  description: 'this is a description', // any description
  quantity: 1, // the item quantity
});

checkout.addItem({
  id: '2',
  amount: '15.50',
  description: 'this is a description',
  quantity: 2,
});

// after this you must provide credit card information to create a token for the checkout

// complement is optional

await checkout.getCardToken({
  creditCard: {
    cardBrand: 'visa',
    cardCvv: '123',
    cardExpirationMonth: '12',
    cardExpirationYear: '2030',
    cardNumber: '4111111111111111',
  },
  billingAddress: {
    postalCode: '04123011',
    street: 'Avenida Professor Abraão de Morais',
    number: '961',
    district: 'Saúde',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
  },
});

// Add a sender

checkout.sender({
  email: 'any@sandbox.pagseguro.com.br',
  name: 'Martin Lucca Benedito Pires',
  birthDate: '08/04/2003',
  phone: {
    areaCode: '11',
    number: '991748112',
  },
  documents: [
    {
      type: 'CPF',
      value: '44528040808',
    },
  ],
});

// Then, just send the checkout

await checkout.send();
```

<br>

## Bugs, Pull Requests and Questions
<br>

Feel free to contribute: 

 - [GitHub](https://gihub.com/MSimone12/pagseguro-node-ts)