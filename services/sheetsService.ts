
import { FormData, OrderData } from '../types';

/**
 * URL do Google Apps Script para o formulário de INSCRIÇÃO (Start Service).
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9V95dWbdnuH-LxaQHEsvmyvjQTK05gLVXFNQcUmaSlE3NwJmxJmOtk9p4xXiNYaE8/exec';

/**
 * URL específica do Google Apps Script para o formulário de ENCOMENDAS (Registro de Interesse).
 */
const ORDERS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzql1l7iecYGG9R5aONpmurhpsJd3KWM6u52KKHzZjK2u8A-lzCvq9JFFlCMZ60kcPq/exec';

/**
 * URL do endpoint JSON para verificação de itens a Pronta Entrega (URL atualizada pelo usuário).
 */
const STOCK_JSON_URL = 'https://script.google.com/macros/s/AKfycbx-_bnH_YY7WYA25IPSQHIRhzwB_Wt31OyX-YVU-u3xvuzwlL9AX8IhnuPeqax8G8pL/exec';

/**
 * Envia os dados para o Google Sheets (Formulário de Inscrição / Start Service).
 */
export const submitToGoogleSheets = async (data: FormData): Promise<boolean> => {
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
 */
export const submitOrderToGoogleSheets = async (data: OrderData): Promise<boolean> => {
  try {
    const payload = {
      itemDesejado: data.itemName, 
      nomeChar: data.charName,     
      telefone: data.phone        
    };

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
 * Busca a disponibilidade dos itens através do endpoint JSON.
 */
export const fetchAvailability = async (): Promise<string[]> => {
  try {
    // Busca simples sem headers para evitar bloqueios de CORS em redirects do Google
    const response = await fetch(STOCK_JSON_URL);
    
    if (!response.ok) return [];

    const items = await response.json();
    
    if (!items || !Array.isArray(items)) return [];

    // Filtra itens disponíveis:
    // 1. Tem nome de item
    // 2. Status (Coluna J / Vendido) está VAZIO
    return items
      .filter((entry: any) => {
        if (!entry) return false;
        
        const itemName = entry.item || entry.name || entry.itemdrop || entry.item_drop; 
        const statusValue = (entry.status || entry.vendido || "").toString().trim();
        
        // Item disponível = Tem nome e Coluna J (status/vendido) está totalmente vazia
        return itemName && statusValue === "";
      })
      .map((entry: any) => {
        const itemName = entry.item || entry.name || entry.itemdrop || entry.item_drop;
        return itemName.toString().toUpperCase().trim();
      });
        
  } catch (error) {
    console.warn('Ragha Service Stock: Sistema de estoque offline.');
    return [];
  }
};
