
import { FormData, OrderData } from '../types';

/**
 * URL do Google Apps Script para o formulário de INSCRIÇÃO (Start Service).
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9V95dWbdnuH-LxaQHEsvmyvjQTK05gLVXFNQcUmaSlE3NwJmxJmOtk9p4xXiNYaE8/exec';

/**
 * URL específica do Google Apps Script para o formulário de ENCOMENDAS (Registro de Interesse).
 * Atualizada conforme a última imagem fornecida pelo usuário.
 */
const ORDERS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyVaR9A04_KUj5mkYDmaPZiISrG6QgmYCTnEz68PQo2QAwTcOeuKnQAnv0XT6QR6bjw/exec';

/**
 * URL para leitura da aba "Controle Financeiro" via link de publicação CSV.
 */
const READ_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTzShK__gBhMazxvWaX0pQ-RG18oiEFWE26XFOT2426bqLAQezj5fECdfhVPfcy0DKF7qjL7bVxSQFM/pub?output=csv';

/**
 * Envia os dados para o Google Sheets (Formulário de Inscrição / Start Service).
 */
export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
  console.log('Ragha Service: Enviando inscrição...', data);
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
 * Envia os dados de encomenda (Registro de Interesse) para o Google Sheets.
 * Envia como JSON stringificado para ser capturado pelo e.postData.contents no Apps Script.
 */
export const submitOrderToGoogleSheets = async (data: OrderData): Promise<boolean> => {
  console.log('Ragha Service: Enviando encomenda...', data);
  try {
    // Mapeamento das chaves para bater com o seu script: data.itemDesejado, data.nomeChar, data.telefone
    const payload = {
      itemDesejado: data.itemName,
      nomeChar: data.charName,
      telefone: data.phone
    };

    // Enviamos como string pura. O modo 'no-cors' fará com que o Apps Script 
    // receba isso no e.postData.contents
    await fetch(ORDERS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: JSON.stringify(payload),
    });
    
    // Como usamos no-cors, não podemos ler a resposta, mas assumimos sucesso se não houver erro de rede
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
