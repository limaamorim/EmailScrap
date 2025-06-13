require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.get('/scrap-send-email', async (req, res) => {
  try {
    // Faz o scraping da G1
    const { data } = await axios.get('https://g1.globo.com/');
    const $ = cheerio.load(data);

    // Captura as 10 principais manchetes
    const noticias = $('a.feed-post-link');
    const top10 = noticias.slice(0, 10).map((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr('href');
      return `<li><a href="${href}" target="_blank">${title}</a></li>`;
    }).get();

    const htmlBody = `
      <h2>📰 Top 10 notícias do G1</h2>
      <ol>
        ${top10.join('\n')}
      </ol>
      <p>Enviado automaticamente via Node.js 😊</p>
    `;

    // Configura o transporte do e-mail
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Envia o e-mail
    await transporter.sendMail({
      from: `"Scraper de Notícias G1" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: 'Top 10 notícias do G1',
      html: htmlBody,
    });

    res.send('✅ E-mail enviado com sucesso com notícias do G1!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).send('Erro ao processar o scraping ou envio de e-mail.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
