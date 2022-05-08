import './App.css';
import WeatherData from './components/WeatherData';

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// d16a2285c05c1bb21f4fab73b242b4f8

function App() {

  return (
    <div className="App">
      <WeatherData/>
    </div>
  );
}

export default App;
