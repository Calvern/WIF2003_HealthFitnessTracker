import React, { useState } from 'react';
import TopMoodToggle from '../components/Performance/TopMoodToggle';
import BottomMoodToggle from '../components/Performance/BottomMoodToggle';
import CardioLineChart from '../components/Performance/CardioLineChart';
import WorkoutBarChart from '../components/Performance/WorkoutBarChart';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardiovsWorkoutPage = () => {
  const [mode, setMode] = useState('daily');
  const [type, setType] = useState('cardio');

  return (
    <div className="container text-center mt-5 mb-5">
      
      <TopMoodToggle mode={mode} setMode={setMode} />
      
      <div className="chart-area">
        {type === 'cardio' ? (
          <CardioLineChart mode={mode} />
        ) : (
          <WorkoutBarChart mode={mode} />
        )}
      </div>

      <BottomMoodToggle type={type} setType={setType} />
    </div>
  );
};

export default CardiovsWorkoutPage;
