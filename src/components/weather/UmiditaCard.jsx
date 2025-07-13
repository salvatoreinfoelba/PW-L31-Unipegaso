import { Droplets } from 'lucide-react';
import cultivationIndicators from '../../../backend/grape-indicators.json';

const UmiditaCard = ({ umidita = 78 }) => {
  const determinaLivello = (umidita) => {
    const minHumidity = cultivationIndicators['UVA']['soilHumidity']['min'];
    const maxHumidity = cultivationIndicators['UVA']['soilHumidity']['max'];
    
    if (umidita < minHumidity) {
      return 'basso';
    } else if (umidita > maxHumidity) {
      return 'alto';
    } else {
      return 'medio';
    }
  };
      
  const livelloCalcolato = determinaLivello(umidita);

  const getLivelloColor = (livelloCalcolato) => {
    switch(livelloCalcolato.toLowerCase()) {
      case 'alto': return 'bg-blue-200 text-blue-700';
      case 'medio': return 'bg-cyan-200 text-cyan-700';
      case 'basso': return 'bg-gray-200 text-gray-700';
      default: return 'bg-blue-200 text-blue-700';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <Droplets className="w-8 h-8 text-blue-600" />
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getLivelloColor(livelloCalcolato)}`}>
          {livelloCalcolato}
        </span>
      </div>
      <div className="text-3xl font-bold text-blue-800 mb-1">{umidita}%</div>
      <div className="text-blue-600 text-sm">Umidità Suolo</div>
    </div>
  );
};
export default UmiditaCard;