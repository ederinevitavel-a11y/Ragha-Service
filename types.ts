
export enum Vocation {
  EK = 'Elite Knight',
  RP = 'Royal Paladin',
  MS = 'Master Sorcerer',
  ED = 'Elder Druid'
}

export enum Quest {
  SOUL_WAR = 'Soul War',
  ROTTEN_BLOOD = 'Rotten Blood',
  PRIMAL_ORDEAL = 'Primal Ordeal Quest'
}

export interface FormData {
  quest: string;
  charName: string;
  charLevel: string;
  vocation: string;
  paymentMethod: string;
  serviceLocation: string;
  realLifeName: string;
  phone: string;
}

export type AppTab = 'HOME' | 'FORM';
