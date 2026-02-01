
import { FormData } from '../types';

/**
 * URL do seu Google Apps Script real.
 * Os dados enviados aqui serão processados pela função doPost() na sua planilha.
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzezcBP-W9EZZGkmR7bCTuw372HUQRXlm9l0B0W22bsRacL1ZOKbsL9fPXZUOItP454/exec';

export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
  console.log('Iniciando submissão real para Ragha Service API...', data);

  try {
    /**
     * Usamos mode: 'no-cors' porque o Google Apps Script redireciona a requisição.
     * Isso permite que os dados cheguem à planilha sem erros de política de segurança (CORS) no navegador.
     */
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    /**
     * Em modo 'no-cors', o navegador não nos deixa ler a resposta por segurança, 
     * mas se o fetch não disparar um erro (catch), significa que o pacote foi enviado.
     */
    return true;
  } catch (error) {
    console.error('Erro ao conectar com o Google Script:', error);
    return false;
  }
};
