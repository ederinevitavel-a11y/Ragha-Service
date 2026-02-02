
import { FormData } from '../types';

/**
 * URL do seu Google Apps Script real.
 * Substitua pela URL gerada ao clicar em "Implantar" > "Nova Implantação" no Apps Script.
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-Hon6g63GuYohrsH0HdD7_8Jt34IV7zDfCwUI5_UTi0iQwcxQeKQFNJ-ySyETlJN1/exec';

/**
 * Envia os dados para o Google Sheets seguindo a ordem configurada no Script do Google.
 * Ordem esperada na planilha conforme última atualização:
 * A: Data/Hora | B: Quest | C: Level | D: Vocação | E: Pagamento | F: Local | G: Nome RL | H: Telefone | J: Char Name
 */
export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
  console.log('Ragha Service: Enviando requisição para processamento em planilha...', data);

  try {
    // Usamos no-cors para evitar erros de redirecionamento do Google Apps Script
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Se o fetch não lançar erro, assumimos sucesso no envio dos dados
    return true;
  } catch (error) {
    console.error('Ragha Service Error: Falha ao conectar com o servidor do Google Sheets:', error);
    return false;
  }
};
