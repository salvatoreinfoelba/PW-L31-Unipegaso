import { useState, useEffect } from 'react';
import { Sprout, Leaf, Grape } from 'lucide-react';
import cultivationIndicators from '../../backend/grape-indicators.json';
import TemperaturaCard from './weather/TemperaturaCard';
import UmiditaCard from './weather/UmiditaCard';
import PrecipitazioniCard from './weather/PrecipitazioniCard';
import GraficiAnalisi from './Grafici';
import './Dashboard.css'


const Dashboard = () => { 
  const config = cultivationIndicators['UVA'];
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [rain, setRain] = useState([]);

    const generateRandomValue = (min, max, precision = 0) => {
      const random = Math.random() * (max - min) + min;
      return precision > 0 ? parseFloat(random.toFixed(precision)) : Math.round(random);
    };

  useEffect(() => {
    setTemperature(generateRandomValue(config.optimalTemperature.min, config.optimalTemperature.max, 1));
    setHumidity(generateRandomValue(config.soilHumidity.min, config.soilHumidity.max, 1));
    setRain(generateRandomValue(config.rainPercentage.min, config.rainPercentage.max, 1));

    // Aggiorna ogni 3 secondi
    const interval = setInterval(() => {
      setTemperature(generateRandomValue(config.optimalTemperature.min, config.optimalTemperature.max, 1));
      setHumidity(generateRandomValue(config.soilHumidity.min, config.soilHumidity.max, 1));
      setRain(generateRandomValue(config.rainPercentage.min, config.rainPercentage.max, 1));      
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="mx-auto bg-white shadow-2xl overflow-hidden">
        <div className=" px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-800 font-bold">Dashboard</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row sm:p-8 p-4">
          <div className="w-full md:w-2/3 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TemperaturaCard 
                temperatura={temperature}
              />
              <UmiditaCard 
                umidita={humidity}
              />
              <PrecipitazioniCard 
                precipitazioni={rain}
              />
            </div>
            <div className="lg:col-span-2 mt-5">
              <GraficiAnalisi />
            </div>
          </div>
          <div className="w-full md:w-1/3 ml-2">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-purple-50 rounded-2xl p-6 border border-red-100">
                <div className="flex justify-center mb-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="220" height="180" viewBox="0 0 120 100" className="opacity-20">
                        <path
                          d="M20 50 C20 25, 35 15, 60 10 C85 10, 100 25, 100 55 C100 65, 90 80, 75 85 C60 90, 40 85, 25 80 C15 75, 20 65, 20 50 Z"
                          fill="url(#grapeGradient)"
                        />
                        <defs>
                          <linearGradient id="grapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="50%" stopColor="#d97706" />
                            <stop offset="100%" stopColor="#92400e" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <img 
                  src="src/assets/grape_clear.png" 
                  alt="Grappolo d'uva" 
                  className="w-50 h-50 object-contain relative z-10"
                />
                  </div>
                <div className="mb-4">
                  
                  <h3 className="text-xl font-bold text-gray-800">Uva</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  L'uva è una coltura di grande valore agricolo, economico e culturale. Utilizzata sia per il consumo diretto che per la produzione di vino.<br/>Fattori come la temperatura, la disponibilità d'acqua e l'umidità influenzano direttamente la qualità e la resa del raccolto.<br/>
                  Negli ultimi anni, la crescente attenzione alla sostenibilità e all'efficienza ha reso fondamentale monitorare con precisione l'uso dell'acqua, dell'energia e i costi di produzione, per garantire una coltivazione più resiliente e redditizia.<br/>Comprendere l’interazione tra ambiente e coltura permette di prendere decisioni mirate, riducendo gli sprechi e valorizzando ogni fase del ciclo produttivo.
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-gray-700">Germogliamento</span>
                  </div>
                  <div className="text-sm text-gray-500">Marzo-Aprile</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-700" />
                    <span className="text-sm font-medium text-gray-700">Fioritura</span>
                  </div>
                  <div className="text-sm text-gray-500">Maggio-Giugno</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grape className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Allegagione</span>
                  </div>
                  <div className="text-sm text-gray-500">Giugno-Luglio</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grape className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">Invaiatura</span>
                  </div>
                  <div className="text-sm text-gray-500">Luglio-Agosto</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grape className="w-5 h-5 text-purple-800" />
                    <span className="text-sm font-medium text-gray-700">Maturazione</span>
                  </div>
                  <div className="text-sm text-gray-500">Settembre-Ottobre</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
