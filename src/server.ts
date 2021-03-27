import express, { Request, Response } from 'express';
import {
  getPaymentMethods,
  PaymentMethodsResponse,
} from './pagseguro/paymentMethods';
import { createSession } from './pagseguro/session';

const app = express();

app.use(express.json());

const buildUrl = (
  email: string = 'hurryapp7@gmail.com',
  token: string = 'A54DD918ABD14C97B34CDD9A2A99193F',
): string =>
  `https://ws.sandbox.pagseguro.uol.com.br/sessions?email=${email}&token=${token}`;

app.use('/session', async (req: Request, res: Response) => {
  res.json(await createSession(buildUrl())).status(200);
});

app.use('/payment-methods', async (req: Request, res: Response) => {
  const data: PaymentMethodsResponse = await getPaymentMethods(
    '120.00',
    req.query.id as string,
  );
  res.json(data);
});

app.listen(3000, () => console.log(`server listening on port 3000`));
