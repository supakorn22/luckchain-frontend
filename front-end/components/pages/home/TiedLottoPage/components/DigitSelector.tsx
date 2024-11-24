// components/MultipleDigitSelector.tsx
import React, { useState } from 'react';

interface MultipleDigitSelectorProps {
  digits?: number[]; // Optional array of digits to display
  onSelectionChange: (selectedDigits: number[]) => void; // Callback when selection changes
}

const MultipleDigitSelector: React.FC<MultipleDigitSelectorProps> = ({
  digits = [1, 2, 3, 4, 5, 6],
  onSelectionChange,
}) => {
  const [selectedDigits, setSelectedDigits] = useState<number[]>([]);

  const toggleSelect = (digit: number) => {
    let updatedSelection;
    if (selectedDigits.includes(digit)) {
      // If the digit is already selected, deselect it
      updatedSelection = selectedDigits.filter((d) => d !== digit);
    } else {
      // Otherwise, add it to the selection
      updatedSelection = [...selectedDigits, digit];
    }
    console.log('u',updatedSelection);
    onSelectionChange(updatedSelection);
    setSelectedDigits(updatedSelection);
    
       // Trigger the callback
    
  };

  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
  {digits.slice().reverse().map((digit) => (
    <button
      key={digit}
      onClick={() => toggleSelect(digit)}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: selectedDigits.includes(digit) ? '#0070f3' : '#fff',
        color: selectedDigits.includes(digit) ? '#fff' : '#000',
        cursor: 'pointer',
      }}
    >
      {digit}
    </button>
  ))}
</div>
  );
};

export default MultipleDigitSelector;
