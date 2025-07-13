import { Thermometer } from 'lucide-react';
import cultivationIndicators from '../../../backend/grape-indicators.json';

const TemperaturaCard = ({ temperatura = 24 }) => {
  const determinaLivello = (temp) => {
    const minTemp = cultivationIndicators['UVA']['optimalTemperature']['min'];
    const maxTemp = cultivationIndicators['UVA']['optimalTemperature']['max'];
    
    if (temp < minTemp) {
      return 'basso';
    } else if (temp > maxTemp) {
      return 'alto';
    } else {
      return 'medio';
    }
  };
  
  const livelloCalcolato = determinaLivello(temperatura);
      
  const getLivelloColor = (livelloCalcolato) => {
    switch(livelloCalcolato.toLowerCase()) {
      case 'alto': return 'bg-red-200 text-red-700';
      case 'medio': return 'bg-orange-200 text-orange-700';
      case 'basso': return 'bg-blue-200 text-blue-700';
      default: return 'bg-orange-200 text-orange-700';
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6 border border-orange-200">
      <div className="flex items-center justify-between mb-4">
        <Thermometer className="w-8 h-8 text-orange-600" />
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getLivelloColor(livelloCalcolato)}`}>
          {livelloCalcolato}
        </span>
      </div>
      <div className="text-3xl font-bold text-orange-800 mb-1">+{temperatura}°</div>
      <div className="text-orange-600 text-sm">Temperatura</div>
    </div>
  );
};
export default TemperaturaCard;