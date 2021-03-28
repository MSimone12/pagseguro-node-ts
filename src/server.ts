import express, { Request, Response } from 'express';
import PagSeguroCheckout from '.';
import { PagSeguroProps, PaymentMethodsResponse } from './utils/interface';

const app = express();

app.use(express.json());

const authData: PagSeguroProps = {
  email: 'hurryapp7@gmail.com',
  token: 'A54DD918ABD14C97B34CDD9A2A99193F',
  mode: 'sandbox',
};

app.post('/checkout', async (req, res) => {
  try {
    const checkout = new PagSeguroCheckout(authData);

    await checkout.createSession();

    checkout.reference(req.body.id);

    checkout.addItem({
      id: '1',
      amount: '25.00',
      description: 'dose de whisky',
      quantity: 1,
    });

    checkout.addItem({
      id: '2',
      amount: '20.00',
      description: 'caipirinha',
      quantity: 1,
    });

    await checkout.getCardToken({
      creditCard: {
        cardBrand: 'visa',
        cardCvv: '123',
        cardExpirationMonth: '12',
        cardExpirationYear: '2030',
        cardNumber: '4111111111111111',
      },
      billingAddress: {
        postalCode: '08255210',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        district: 'Conjunto Habitacional José Bonifácio',
        street: 'Avenida Professor João Batista Conti',
        number: '1970',
        complement: 'APT 43B',
      },
    });

    checkout.sender({
      email: 'c10908364925231532065@sandbox.pagseguro.com.br',
      name: 'Matheus Simone',
      birthDate: '29/07/1998',
      phone: {
        areaCode: '11',
        number: '987411639',
      },
      documents: [
        {
          document: {
            type: 'CPF',
            value: '46404034883',
          },
        },
      ],
    });

    res.json(await checkout.send()).status(200);
  } catch (error) {
    res.json(error).status(400);
  }
});

app.listen(3000, () => console.log(`server listening on port 3000`));
