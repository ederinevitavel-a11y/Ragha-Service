
import { FormData, OrderData } from '../types';

/**
 * URL para o formulário principal de Quests/Serviços.
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9V95dWbdnuH-LxaQHEsvmyvjQTK05gLVXFNQcUmaSlE3NwJmxJmOtk9p4xXiNYaE8/exec';

/**
 * URL para o formulário específico de Registro de Interesse de Itens (Encomendas).
 */
const ORDER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQ6GE1vV1ZGzGFWmvgtlYpryJobVSFUBHXUuzpU2U6WwkVnW5OrJ3Cyya2Z_v8AiT5/exec';

/**
 * URL para leitura da aba "Controle Financeiro" via link de publicação CSV.
 */
const READ_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTzShK__gBhMazxvWaX0pQ-RG18oiEFWE26XFOT2426bqLAQezj5fECdfhVPfcy0DKF7qjL7bVxSQFM/pub?output=csv';

/**
 * Envia os dados para o Google Sheets (Formulário de Inscrição de Quests).
 * Usa URLSearchParams para máxima compatibilidade com Google Apps Script.
 */
export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
  console.log('Ragha Service: Enviando inscrição de quest...', data);
  try {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value as string);
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    return true;
  } catch (error) {
    console.error('Ragha Service Error:', error);
    return false;
  }
};

/**
 * Envia os dados para o Google Sheets (Registro de Interesse de Itens).
 * Conforme solicitado, usa o novo script para Nome do Char, Item e Telefone.
 */
export const submitOrderToGoogleSheets = async (data: OrderData): Promise<boolean> => {
  console.log('Ragha Service: Enviando registro de interesse de item...', data);
  try {
    // Transformamos o objeto em parâmetros de URL para evitar bloqueios de CORS
    const params = new URLSearchParams();
    params.append('charName', data.charName);
    params.append('itemName', data.itemName);
    params.append('phone', data.phone);

    await fetch(ORDER_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    
    // Como usamos no-cors, o fetch não retorna se deu erro no script, 
    // mas se a requisição foi disparada sem erro de rede, retornamos true.
    return true;
  } catch (error) {
    console.error('Ragha Service Order Error:', error);
    return false;
  }
};

/**
 * Busca a disponibilidade dos itens na aba Controle Financeiro.
 */
export const fetchAvailability = async (): Promise<string[]> => {
  try {
    const response = await fetch(READ_URL, {
      method: 'GET',
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/);
    const availableItems: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(cell => cell.replace(/^"(.*)"$/, '$1').trim());
      
      const itemName = row[7];
      const soldStatus = row[10];
      const isSelected = row[18];

      if (itemName && (!soldStatus || soldStatus.trim() === "") && (isSelected === "TRUE" || isSelected === "true")) {
        availableItems.push(itemName.toUpperCase());
      }
    }

    return availableItems;
  } catch (error) {
    console.error('Ragha Service Stock Error:', error);
    return [];
  }
};
