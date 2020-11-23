import logo from './logo.svg';
import './App.css';

function App(props) {
  const { percent, children, colorOne, colorTwo } = props;
  const radius = 100 / (2 * Math.PI);
  const colorTextPercent = { color: colorOne }
  return (
      <div className="chart">
        <svg width="100%" height="100%" viewBox="0 0 60 60">
          <circle cx={30} cy={30} r={28} fill="transparent" stroke={colorOne} strokeWidth={1}/>
          <circle cx={30} cy={30} r={radius} fill="transparent"/>
          <circle cx={30} cy={30} r={radius} fill="transparent" stroke={colorOne} strokeWidth={7}/>
          <circle cx={30} cy={30} r={radius} fill="transparent" stroke={colorTwo}
                  strokeWidth={7} strokeDasharray={`${percent} ${100 - percent}`} strokeDashoffset={-25}/>
          <foreignObject width="100%" height="100%">
              <div className="chart-percent">
                <span style={colorTextPercent}>{percent}%</span>
              </div>
          </foreignObject>
        </svg>
        {children && (
          <div className="additional-information">
            {children}
          </div>
        )}
      </div>
  );
}

export default App;
