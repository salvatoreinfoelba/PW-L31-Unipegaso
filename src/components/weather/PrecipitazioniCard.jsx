import { Cloud } from 'lucide-react';
import cultivationIndicators from '../../../backend/grape-indicators.json';

const PrecipitazioniCard = ({ precipitazioni = 0 }) => {
  const determinaLivello = (prec) => {
    const minRain = cultivationIndicators['UVA']['rainPercentage']['min'];
    const maxRain = cultivationIndicators['UVA']['rainPercentage']['max'];
    
    if (prec < minRain) {
      return 'basso';
    } else if (prec > maxRain) {
      return 'alto';
    } else {
      return 'medio';
    }
  };

  const livelloCalcolato = determinaLivello(precipitazioni);    

  const getLivelloColor = (livelloCalcolato) => {
    switch(livelloCalcolato.toLowerCase()) {
      case 'alto': return 'bg-indigo-200 text-indigo-700';
      case 'medio': return 'bg-slate-200 text-slate-700';
      case 'basso': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const formatPrecipitazioni = (valore) => {
    if (valore >= 0) {
      return `+${valore}mm`;
    }
    return `${valore}mm`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <Cloud className="w-8 h-8 text-gray-600" />
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getLivelloColor(livelloCalcolato)}`}>
          {livelloCalcolato}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{formatPrecipitazioni(precipitazioni)}</div>
      <div className="text-gray-600 text-sm">Precipitazioni</div>
    </div>
  );
};
export default PrecipitazioniCard;