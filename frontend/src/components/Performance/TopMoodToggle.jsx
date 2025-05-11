import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const getCurrentLabel = (mode, index) => {
  const today = new Date();
  let label = '';

  if (mode === 'daily') {
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1 + index * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    label = `${startOfWeek.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })} - ${endOfWeek.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })}`;
  } else {
    const date = new Date(today.getFullYear(), today.getMonth() + index, 1);
    label = date.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
  }

  return label;
};

const TopMoodToggle = ({ mode, setMode }) => {
  const [dateIndex, setDateIndex] = useState(0);

  const handlePrev = () => setDateIndex(dateIndex - 1);
  const handleNext = () => setDateIndex(dateIndex + 1);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h4 className="mb-0 fw-bold fs-3">
        {mode === 'daily' ? 'Daily Activity' : 'Weekly Activity'}
        </h4>

    <div className="d-flex justify-content-center mt-3">
        <div className="d-flex gap-4">
        <span
        role="button"
        onClick={() => setMode('daily')}
        style={{
        fontSize: '20px',
        fontWeight: mode === 'daily' ? 'bold' : 'normal',
        color: mode === 'daily' ? 'black' : 'grey',
        borderBottom: mode === 'daily' ? '3px solid black' : 'none',
        paddingBottom: '4px',
        cursor: 'pointer'
        }}
        >
        Daily
        </span>
        <span
        role="button"
        onClick={() => setMode('weekly')}
        style={{
        fontSize: '20px',
        fontWeight: mode === 'weekly' ? 'bold' : 'normal',
        color: mode === 'weekly' ? 'black' : 'grey',
        borderBottom: mode === 'weekly' ? '3px solid black' : 'none',
        paddingBottom: '4px',
        cursor: 'pointer'
        }}
        >
        Weekly
        </span>
        </div>
    </div>


      <div className="d-flex align-items-center gap-4 fs-4">
        <span
        role="button"
        onClick={handlePrev}
        style={{ fontSize: "3rem", cursor: "pointer", userSelect: "none" }}
        >
         &#8249;
        </span>
        <strong className="mb-0">{getCurrentLabel(mode, dateIndex)}</strong>
        <span
        role="button"
        onClick={handleNext}
        style={{ fontSize: "3rem", cursor: "pointer", userSelect: "none" }}
        >
        &#8250;
        </span></div>
    </div>
    </div>
  );
};

export default TopMoodToggle;