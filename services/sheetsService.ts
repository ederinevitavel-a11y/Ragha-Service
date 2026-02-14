
import { FormData, OrderData } from '../types';

/**
 * URL do Google Apps Script para o formulário de INSCRIÇÃO (Start Service).
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9V95dWbdnuH-LxaQHEsvmyvjQTK05gLVXFNQcUmaSlE3NwJmxJmOtk9p4xXiNYaE8/exec';

/**
 * URL específica do Google Apps Script para o formulário de ENCOMENDAS (Registro de Interesse).
 * URL atualizada conforme fornecido pelo usuário.
 */
const ORDERS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzql1l7iecYGG9R5aONpmurhpsJd3KWM6u52KKHzZjK2u8A-lzCvq9JFFlCMZ60kcPq/exec';

/**
 * URL para leitura da aba "Controle Financeiro" via link de publicação CSV.
 */
const READ_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTzShK__gBhMazxvWaX0pQ-RG18oiEFWE26XFOT2426bqLAQezj5fECdfhVPfcy0DKF7qjL7bVxSQFM/pub?output=csv';

/**
 * Envia os dados para o Google Sheets (Formulário de Inscrição / Start Service).
 * Usa Blob para contornar restrições de CORS e garantir entrega do JSON.
 */
export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
  console.log('Ragha Service: Enviando inscrição...', data);
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: blob,
    });
    return true;
  } catch (error) {
    console.error('Ragha Service Error:', error);
    return false;
  }
};

/**
 * Envia os dados de encomenda (Registro de Interesse) para o Google Sheets.
 * Mapeamento baseado no seu script:
 * - O script recebe 'itemDesejado' e joga na Coluna B (Nome na sua planilha).
 * - O script recebe 'nomeChar' e joga na Coluna C (Item na sua planilha).
 */
export const submitOrderToGoogleSheets = async (data: OrderData): Promise<boolean> => {
  console.log('Ragha Service: Enviando encomenda...', data);
  try {
    const payload = {
      itemDesejado: data.charName, // Vai para a Coluna B (que é o Nome do Personagem)
      nomeChar: data.itemName,     // Vai para a Coluna C (que é o Nome do Item)
      telefone: data.phone        // Vai para a Coluna D
    };

    // O uso de Blob garante que o e.postData.contents não chegue vazio no Google
    const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain' });

    await fetch(ORDERS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: blob,
    });
    
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
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
