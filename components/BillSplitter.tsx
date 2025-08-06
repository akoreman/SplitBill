'use client';

import { useState, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faCalculator, 
  faShare, 
  faUsers,
  faDollarSign,
  faPercentage,
  faCopy,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { BillData, Participant, BillSummary } from '../types';
import { calculateBillSplit, generateShareableText } from '../lib/calculations';

interface BillState {
  totalAmount: string;
  taxAmount: string;
  taxPercentage: string;
  tipPercentage: string;
  tipAmount: string;
  participants: Participant[];
  useTaxPercentage: boolean;
  useTipAmount: boolean;
}

type BillAction = 
  | { type: 'SET_FIELD'; field: keyof BillState; value: any }
  | { type: 'ADD_PARTICIPANT' }
  | { type: 'REMOVE_PARTICIPANT'; id: string }
  | { type: 'UPDATE_PARTICIPANT'; id: string; field: keyof Participant; value: any }
  | { type: 'RESET' };

const initialState: BillState = {
  totalAmount: '',
  taxAmount: '',
  taxPercentage: '',
  tipPercentage: '15',
  tipAmount: '',
  participants: [
    { id: '1', name: '' },
    { id: '2', name: '' }
  ],
  useTaxPercentage: false,
  useTipAmount: false
};

function billReducer(state: BillState, action: BillAction): BillState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [
          ...state.participants,
          { id: Date.now().toString(), name: '' }
        ]
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter(p => p.id !== action.id)
      };
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.map(p =>
          p.id === action.id ? { ...p, [action.field]: action.value } : p
        )
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function BillSplitter() {
  const [state, dispatch] = useReducer(billReducer, initialState);
  const [result, setResult] = useState<BillSummary | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const validateInputs = (): string[] => {
    const errors: string[] = [];
    
    if (!state.totalAmount || parseFloat(state.totalAmount) <= 0) {
      errors.push('Total amount must be greater than 0');
    }
    
    if (state.useTaxPercentage && state.taxPercentage && parseFloat(state.taxPercentage) < 0) {
      errors.push('Tax percentage cannot be negative');
    }
    
    if (!state.useTaxPercentage && state.taxAmount && parseFloat(state.taxAmount) < 0) {
      errors.push('Tax amount cannot be negative');
    }
    
    if (state.useTipAmount && state.tipAmount && parseFloat(state.tipAmount) < 0) {
      errors.push('Tip amount cannot be negative');
    }
    
    if (!state.useTipAmount && state.tipPercentage && parseFloat(state.tipPercentage) < 0) {
      errors.push('Tip percentage cannot be negative');
    }
    
    const validParticipants = state.participants.filter(p => p.name.trim());
    if (validParticipants.length < 2) {
      errors.push('At least 2 participants are required');
    }
    
    const hasCustomAmounts = state.participants.some(p => p.customAmount && p.customAmount > 0);
    if (hasCustomAmounts) {
      const totalCustom = state.participants.reduce((sum, p) => sum + (p.customAmount || 0), 0);
      if (totalCustom <= 0) {
        errors.push('Custom amounts must be greater than 0');
      }
    }
    
    return errors;
  };

  const handleCalculate = () => {
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }
    
    setErrors([]);
    
    const billData: BillData = {
      totalAmount: parseFloat(state.totalAmount),
      taxAmount: state.useTaxPercentage ? 0 : parseFloat(state.taxAmount || '0'),
      taxPercentage: state.useTaxPercentage ? parseFloat(state.taxPercentage || '0') : 0,
      tipPercentage: state.useTipAmount ? 0 : parseFloat(state.tipPercentage || '0'),
      tipAmount: state.useTipAmount ? parseFloat(state.tipAmount || '0') : 0,
      participants: state.participants.filter(p => p.name.trim())
    };
    
    try {
      const summary = calculateBillSplit(billData);
      setResult(summary);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Calculation error']);
      setResult(null);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    
    const shareText = generateShareableText(result);
    
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-inter text-4xl md:text-5xl font-bold mb-4 text-text">
          Split Your Bill
        </h1>
        <p className="text-lg text-text-secondary">
          Enter your bill details and we'll calculate everyone's share
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="glass-card p-8">
          <h2 className="font-inter text-2xl font-semibold mb-6 text-text flex items-center gap-2">
            <FontAwesomeIcon icon={faDollarSign} className="text-accent" />
            Bill Details
          </h2>
          
          {/* Total Amount */}
          <div className="mb-6">
            <label className="block text-text font-medium mb-2">
              Total Bill Amount *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={state.totalAmount}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'totalAmount', value: e.target.value })}
              className="w-full p-3 glass-card border-0 text-text placeholder-text-secondary/60 focus:ring-2 focus:ring-accent rounded-lg"
              placeholder="0.00"
            />
          </div>

          {/* Tax */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <label className="text-text font-medium">Tax</label>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_FIELD', field: 'useTaxPercentage', value: !state.useTaxPercentage })}
                className="text-sm text-accent hover:text-blue-700 transition-colors"
              >
                Switch to {state.useTaxPercentage ? 'Amount' : 'Percentage'}
              </button>
            </div>
            <input
              type="number"
              step={state.useTaxPercentage ? "0.01" : "0.01"}
              min="0"
              value={state.useTaxPercentage ? state.taxPercentage : state.taxAmount}
              onChange={(e) => dispatch({ 
                type: 'SET_FIELD', 
                field: state.useTaxPercentage ? 'taxPercentage' : 'taxAmount', 
                value: e.target.value 
              })}
              className="w-full p-3 glass-card border-0 text-text placeholder-text-secondary/60 focus:ring-2 focus:ring-accent rounded-lg"
              placeholder={state.useTaxPercentage ? "0.00%" : "0.00"}
            />
          </div>

          {/* Tip */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <label className="text-text font-medium">Tip</label>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_FIELD', field: 'useTipAmount', value: !state.useTipAmount })}
                className="text-sm text-accent hover:text-blue-700 transition-colors"
              >
                Switch to {state.useTipAmount ? 'Percentage' : 'Amount'}
              </button>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={state.useTipAmount ? state.tipAmount : state.tipPercentage}
              onChange={(e) => dispatch({ 
                type: 'SET_FIELD', 
                field: state.useTipAmount ? 'tipAmount' : 'tipPercentage', 
                value: e.target.value 
              })}
              className="w-full p-3 glass-card border-0 text-text placeholder-text-secondary/60 focus:ring-2 focus:ring-accent rounded-lg"
              placeholder={state.useTipAmount ? "0.00" : "15.00%"}
            />
          </div>

          {/* Participants */}
          <div className="mb-6">
            <h3 className="font-inter text-xl font-semibold mb-4 text-text flex items-center gap-2">
              <FontAwesomeIcon icon={faUsers} className="text-accent" />
              Participants
            </h3>
            
            {state.participants.map((participant, index) => (
              <div key={participant.id} className="mb-4 p-4 glass-card rounded-lg">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => dispatch({ 
                      type: 'UPDATE_PARTICIPANT', 
                      id: participant.id, 
                      field: 'name', 
                      value: e.target.value 
                    })}
                    className="flex-1 p-2 glass-card border-0 text-text placeholder-text-secondary/60 focus:ring-2 focus:ring-accent rounded"
                    placeholder={`Person ${index + 1} name`}
                  />
                  {state.participants.length > 2 && (
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'REMOVE_PARTICIPANT', id: participant.id })}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={participant.customAmount || ''}
                  onChange={(e) => dispatch({ 
                    type: 'UPDATE_PARTICIPANT', 
                    id: participant.id, 
                    field: 'customAmount', 
                    value: e.target.value ? parseFloat(e.target.value) : undefined 
                  })}
                  className="w-full p-2 glass-card border-0 text-text placeholder-text-secondary/60 focus:ring-2 focus:ring-accent rounded text-sm"
                  placeholder="Custom amount (optional, for uneven splits)"
                />
              </div>
            ))}
            
            {state.participants.length < 10 && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_PARTICIPANT' })}
                className="w-full p-3 glass-card hover:bg-white/20 text-accent border-2 border-dashed border-accent/30 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Participant
              </button>
            )}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-100/20 border border-red-300/30 rounded-lg">
              <ul className="text-red-600 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full btn-glass btn-primary rounded-lg flex items-center justify-center gap-2 text-lg py-4"
          >
            <FontAwesomeIcon icon={faCalculator} />
            Calculate Split
          </button>
        </div>

        {/* Results */}
        <div className="glass-card p-8">
          <h2 className="font-inter text-2xl font-semibold mb-6 text-text flex items-center gap-2">
            <FontAwesomeIcon icon={faPercentage} className="text-accent" />
            Results
          </h2>
          
          {result ? (
            <div>
              {/* Summary */}
              <div className="mb-6 p-4 glass-card rounded-lg">
                <h3 className="font-inter text-lg font-semibold mb-3 text-text">Bill Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Subtotal:</span>
                    <span className="text-text font-medium">${result.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tax:</span>
                    <span className="text-text font-medium">${result.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tip:</span>
                    <span className="text-text font-medium">${result.tip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2 font-semibold">
                    <span className="text-text">Total:</span>
                    <span className="text-accent text-lg">${result.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Individual Results */}
              <div className="space-y-3 mb-6">
                <h3 className="font-inter text-lg font-semibold text-text">Individual Amounts</h3>
                {result.results.map((person, index) => (
                  <div key={index} className="p-4 glass-card rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-text">{person.participant.name}</span>
                      <span className="text-xl font-bold text-accent">${person.totalDue.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-text-secondary space-y-1">
                      <div className="flex justify-between">
                        <span>Base + Tax:</span>
                        <span>${person.baseShare.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tip:</span>
                        <span>${person.tipShare.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full btn-glass btn-secondary rounded-lg flex items-center justify-center gap-2 py-3"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                {copied ? 'Copied!' : 'Copy Summary'}
              </button>
            </div>
          ) : (
            <div className="text-center text-text-secondary py-12">
              <FontAwesomeIcon icon={faCalculator} className="text-4xl mb-4 opacity-50" />
              <p>Enter bill details and click "Calculate Split" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}