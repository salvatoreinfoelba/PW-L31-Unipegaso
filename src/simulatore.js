function getClimaAttuale(){
    const mesi = [
    "Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
    "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
  ];

  const rangeClimatici = {
    Gen:  { tMin: 5.9,  tMax: 15, pMin: 50,  pMax: 90,  uMin: 70, uMax: 85 },
    Feb:  { tMin: 7.2,  tMax: 15.9, pMin: 40,  pMax: 80,  uMin: 65, uMax: 80 },
    Mar:  { tMin: 9,  tMax: 16.8, pMin: 50,  pMax: 90,  uMin: 60, uMax: 75 },
    Apr:  { tMin: 9.3, tMax: 19.4, pMin: 40,  pMax: 70,  uMin: 55, uMax: 70 },
    Mag:  { tMin: 13.1, tMax: 22.6, pMin: 30,  pMax: 60,  uMin: 50, uMax: 65 },
    Giu:  { tMin: 17, tMax: 26.1, pMin: 20,  pMax: 50,  uMin: 45, uMax: 60 },
    Lug:  { tMin: 21.2, tMax: 30, pMin: 10,  pMax: 30,  uMin: 45, uMax: 55 },
    Ago:  { tMin: 22.8, tMax: 31.9, pMin: 5,   pMax: 25,  uMin: 45, uMax: 55 },
    Set:  { tMin: 17.5, tMax: 26, pMin: 20,  pMax: 40,  uMin: 50, uMax: 60 },
    Ott:  { tMin: 16.1, tMax: 22.3, pMin: 40,  pMax: 80,  uMin: 55, uMax: 70 },
    Nov:  { tMin: 10, tMax: 18.8, pMin: 60,  pMax: 100, uMin: 65, uMax: 80 },
    Dic:  { tMin: 6.1,  tMax: 14.5, pMin: 60,  pMax: 100, uMin: 70, uMax: 85 }
  };

  const now = new Date();
  const indiceMese = now.getMonth();
  const mese = mesi[indiceMese];
  const range = rangeClimatici[mese];

  const temperatura = parseFloat((range.tMin + Math.random() * (range.tMax - range.tMin)).toFixed(1));
  const pioggia_mm = parseFloat((range.pMin + Math.random() * (range.pMax - range.pMin)).toFixed(1));
  const umidita_percentuale = parseFloat((range.uMin + Math.random() * (range.uMax - range.uMin)).toFixed(1));

  return {
    anno: now.getFullYear(),
    mese,
    temperatura,
    pioggia_mm,
    umidita_percentuale
  };
}

export function generaDatasetCompleto() {

  return getClimaAttuale();
}