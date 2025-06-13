# Projeto Scraping + Envio de Email

Este projeto é um backend em Node.js que realiza scraping das 10 principais notícias do portal G1 e envia essas notícias por email utilizando o Nodemailer.

---

## Tecnologias

- Node.js
- Express
- Axios
- Cheerio (scraping)
- Nodemailer (envio de email)
- dotenv (variáveis de ambiente)

---

## Como usar

1. Clone este repositório
2. Rode `npm install` para instalar as dependências
3. Configure as variáveis de ambiente no arquivo `.env` baseado no `.env.example`:
   - SMTP_HOST: servidor SMTP (ex: smtp.gmail.com)
   - SMTP_PORT: porta SMTP (ex: 587)
   - SMTP_SECURE: true/false (geralmente false para porta 587)
   - SMTP_USER: seu email
   - SMTP_PASS: senha ou app password do seu email
   - MAIL_TO: email destino para receber as notícias
4. Execute `npm start`
5. Acesse `http://localhost:3000/scrap-send-email` para disparar o scraping e o envio do email

---

## Observações

- Para usar Gmail, crie uma senha de app para o SMTP no Google Account > Segurança > Senhas de app
- O scraping é feito no site https://g1.globo.com, pegue as 10 primeiras manchetes

---

## Autor

Feito com ❤️ por [Seu Nome]