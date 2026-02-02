
import { FormData } from '../types';

/**
 * URL do seu Google Apps Script real.
 * Atualizado para a nova versão fornecida: ...XiNYaE8/exec
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9V95dWbdnuH-LxaQHEsvmyvjQTK05gLVXFNQcUmaSlE3NwJmxJmOtk9p4xXiNYaE8/exec';

/**
 * Envia os dados para o Google Sheets.
 * Ordem esperada na planilha (Conforme sua solicitação):
 * A: Data/Hora
 * B: Quest
 * C: Level
 * D: Vocação
 * E: Pagamento
 * F: Local
 * G: Nome RL
 * H: Telefone
 * I: (Vazio)
 * J: Nome do Char
 */
export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
  console.log('Ragha Service: Enviando dados para a planilha...', data);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Como o modo 'no-cors' não permite ler a resposta, assumimos sucesso se não houver erro de rede.
    return true;
  } catch (error) {
    console.error('Ragha Service Error:', error);
    return false;
  }
};
