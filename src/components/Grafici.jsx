import { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generaDatasetCompleto } from "../simulatore.js";
import cultivationIndicators from '../../backend/grape-indicators.json';

const GraficiAnalisi = () => {
  const [activeTab, setActiveTab] = useState('climatiche');
  const [realtimeData, setRealtimeData] = useState([]);
  const [produttiveData, generateProductionData] = useState([]);
  const [economicheData, generateEconomicData] = useState([]);
  const weatherData = generaDatasetCompleto();

  const generateRandomValue = (min, max, precision = 0) => {
    const random = Math.random() * (max - min) + min;
    return precision > 0 ? parseFloat(random.toFixed(precision)) : Math.round(random);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString('it-IT', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      const config = cultivationIndicators['UVA'];

      // Genera valori una volta sola per evitare inconsistenze
      const temperature = weatherData.temperatura;
      const humidity = weatherData.umidita_percentuale;
      const rain = weatherData.pioggia_mm;
      const waterConsumption = generateRandomValue(config.waterQuantity.min, config.waterQuantity.max);
      const energyConsumption = generateRandomValue(config.energyQuantity.min, config.energyQuantity.max);
      
      // Calcoli economici
      const productionValue = parseFloat((config.businessInfo.productionValue + Math.random() * 1).toFixed(1));
      const productionRevenue = productionValue * generateRandomValue(config.businessInfo.productPrice.min, config.businessInfo.productPrice.max);
      const totalCosts = (waterConsumption * config.businessInfo.waterPrice) + (energyConsumption * config.businessInfo.energyPrice);
      const profit = productionRevenue - totalCosts;

      // Aggiorna tutti i dati contemporaneamente
      setRealtimeData(prev => {
        const newData = [
          ...prev,
          {
            time,
            temperature: temperature,
            humidity: humidity,
            rain: rain
          }
        ];
        return newData.slice(-8);
      });

      generateProductionData(() => [{
        name: "Condizioni Produttive",
        production: productionValue,
        waterConsumption: waterConsumption,
        energyConsumption: energyConsumption
      }]);

      generateEconomicData(() => [{
        name: "Condizioni Economiche",
        production: productionRevenue,
        cost: totalCosts,
        profit: profit
      }]);
      
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'climatiche', label: 'Condizioni Climatiche', icon: TrendingUp },
    { id: 'produttive', label: 'Condizioni Produttive', icon: BarChart3 },
    { id: 'economiche', label: 'Condizioni Economiche', icon: DollarSign }
  ];

  const renderChart = () => {
    switch (activeTab) {
      case 'climatiche':
        return (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#9f2d00" 
                  strokeWidth={3}
                  dot={{ fill: '#b33503ff', strokeWidth: 2, r: 4 }}
                  name="Temperatura (°C)"
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Umidità (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="rain" 
                  stroke="#3a524aff" 
                  strokeWidth={3}
                  dot={{ fill: '#446157ff', strokeWidth: 2, r: 4 }}
                  name="Pioggia (mm)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'produttive':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Produzione Uva per Settore</h3>
              <p className="text-sm text-gray-600">Analisi produttiva basata sui parametri ottimali</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={produttiveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="production" fill="#8b5cf6" name="Produzione (kg/h)" />
                <Bar dataKey="waterConsumption" fill="#3b82f6" name="Consumo Acqua (m³/ha/h)" />
                <Bar dataKey="energyConsumption" fill="#f59e0b" name="Consumo Energia (kwh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'economiche':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Analisi Economica Uva</h3>
              <p className="text-sm text-gray-600">Prezzo: €{cultivationIndicators['UVA']['businessInfo']['productPrice']['min']}-{cultivationIndicators['UVA']['businessInfo']['productPrice']['max']}/kg</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={economicheData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [`€${value.toLocaleString()}`, name]}
                />
                <Bar dataKey="production" fill="#f59e0b" name="Ricavi" />
                <Bar dataKey="cost" fill="#ef4444" name="Costo" />
                <Bar dataKey="profit" fill="#10b981" name="Profitto" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:p-6 p-2 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analisi Coltivazione Uva</h2>
        <p className="text-gray-600">{cultivationIndicators['UVA']['name']} - {cultivationIndicators['UVA']['description']}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6 bg-gray-50 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 sm:px-4 px-1 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-80">
        {realtimeData.length > 0 || activeTab !== 'climatiche' ? (
          renderChart()
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Caricamento dati in tempo reale...</p>
            </div>
          </div>
        )}
      </div>

      {activeTab === 'climatiche' && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Dati in tempo reale basati sui parametri ottimali</span>
          </div>
          <div className="text-xs text-gray-500">
            Aggiornamento ogni 3 secondi
          </div>
        </div>
      )}
    </div>
  );
};

export default GraficiAnalisi;