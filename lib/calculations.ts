import { BillData, BillSummary, CalculationResult } from '../types';

export function calculateBillSplit(billData: BillData): BillSummary {
  const { totalAmount, taxAmount, taxPercentage, tipPercentage, tipAmount, participants } = billData;
  
  // Calculate tax
  const tax = taxAmount > 0 ? taxAmount : (totalAmount * taxPercentage) / 100;
  
  // Calculate tip
  const tip = tipAmount > 0 ? tipAmount : ((totalAmount + tax) * tipPercentage) / 100;
  
  // Calculate subtotal and total
  const subtotal = totalAmount;
  const total = subtotal + tax + tip;
  
  // Determine if using custom amounts or equal split
  const hasCustomAmounts = participants.some(p => p.customAmount && p.customAmount > 0);
  
  let results: CalculationResult[];
  
  if (hasCustomAmounts) {
    // Calculate based on custom amounts
    const totalCustomAmount = participants.reduce((sum, p) => sum + (p.customAmount || 0), 0);
    
    if (totalCustomAmount === 0) {
      throw new Error('Custom amounts must be greater than 0');
    }
    
    results = participants.map(participant => {
      const customAmount = participant.customAmount || 0;
      const proportion = customAmount / totalCustomAmount;
      
      // Base share is the custom amount plus proportional tax
      const baseShare = customAmount + (tax * proportion);
      
      // Tip is distributed proportionally
      const tipShare = tip * proportion;
      
      const totalDue = baseShare + tipShare;
      
      return {
        participant,
        baseShare,
        tipShare,
        totalDue
      };
    });
  } else {
    // Equal split
    const perPersonAmount = total / participants.length;
    const perPersonBase = (subtotal + tax) / participants.length;
    const perPersonTip = tip / participants.length;
    
    results = participants.map(participant => ({
      participant,
      baseShare: perPersonBase,
      tipShare: perPersonTip,
      totalDue: perPersonAmount
    }));
  }
  
  return {
    subtotal,
    tax,
    tip,
    total,
    results
  };
}

export function generateShareableText(summary: BillSummary): string {
  const { subtotal, tax, tip, total, results } = summary;
  
  let text = `💰 Split Bill Summary\n\n`;
  text += `Subtotal: $${subtotal.toFixed(2)}\n`;
  text += `Tax: $${tax.toFixed(2)}\n`;
  text += `Tip: $${tip.toFixed(2)}\n`;
  text += `Total: $${total.toFixed(2)}\n\n`;
  text += `👥 Individual Amounts:\n`;
  
  results.forEach(result => {
    text += `${result.participant.name}: $${result.totalDue.toFixed(2)}\n`;
    text += `  Base + Tax: $${result.baseShare.toFixed(2)}\n`;
    text += `  Tip: $${result.tipShare.toFixed(2)}\n\n`;
  });
  
  return text;
}