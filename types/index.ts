export interface Participant {
  id: string;
  name: string;
  customAmount?: number;
  percentage?: number;
}

export interface BillData {
  totalAmount: number;
  taxAmount: number;
  taxPercentage: number;
  tipPercentage: number;
  tipAmount: number;
  participants: Participant[];
}

export interface CalculationResult {
  participant: Participant;
  baseShare: number;
  tipShare: number;
  totalDue: number;
}

export interface BillSummary {
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  results: CalculationResult[];
}