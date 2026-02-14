
import { FormData } from '../types';

/**
 * URL do seu Google Apps Script real para envio de formulários.
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9V95dWbdnuH-LxaQHEsvmyvjQTK05gLVXFNQcUmaSlE3NwJmxJmOtk9p4xXiNYaE8/exec';

/**
 * URL para leitura da aba "Controle Financeiro" via link de publicação CSV.
 * O uso de 'pub?output=csv' é a forma mais robusta de acessar dados publicamente sem CORS.
 */
const READ_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTzShK__gBhMazxvWaX0pQ-RG18oiEFWE26XFOT2426bqLAQezj5fECdfhVPfcy0DKF7qjL7bVxSQFM/pub?output=csv';

/**
 * Envia os dados para o Google Sheets (Formulário de Inscrição).
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
    return true;
  } catch (error) {
    console.error('Ragha Service Error:', error);
    return false;
  }
};

/**
 * Busca a disponibilidade dos itens na aba Controle Financeiro.
 * Retorna uma lista de nomes de itens que estão disponíveis (Col K vazia e Col S = TRUE).
 */
export const fetchAvailability = async (): Promise<string[]> => {
  try {
    // Busca os dados da planilha publicada
    const response = await fetch(READ_URL, {
      method: 'GET',
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    
    // Parser de CSV
    const lines = csvText.split(/\r?\n/);
    const availableItems: string[] = [];

    // Pulamos o cabeçalho
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;

      // Regex para separar por vírgula mas respeitar campos entre aspas
      const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(cell => cell.replace(/^"(.*)"$/, '$1').trim());
      
      /**
       * Mapeamento conforme solicitado:
       * Coluna H (Index 7): Nome do Item
       * Coluna K (Index 10): Status de Venda (Vazio = Disponível)
       * Coluna S (Index 18): Seleção/Ativo (TRUE = Ativo na vitrine)
       */
      const itemName = row[7];
      const soldStatus = row[10];
      const isSelected = row[18];

      // Se o item tem nome, a coluna de venda está vazia e a seleção está marcada como TRUE
      if (itemName && (!soldStatus || soldStatus.trim() === "") && (isSelected === "TRUE" || isSelected === "true")) {
        availableItems.push(itemName.toUpperCase());
      }
    }

    console.log(`Ragha Service Stock: ${availableItems.length} itens prontos para entrega.`);
    return availableItems;
  } catch (error) {
    console.error('Ragha Service: Erro crítico ao acessar estoque remoto:', error);
    return [];
  }
};
