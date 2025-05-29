import React from "react";

const AqiDisplayCard = ({ aqiData }) => {
  const getAqiInfo = (aqi) => {
    switch (aqi) {
      case 1:
        return { description: "Good", colorClass: "bg-green-500" };
      case 2:
        return { description: "Fair", colorClass: "bg-lime-500" };
      case 3:
        return { description: "Moderate", colorClass: "bg-yellow-500" };
      case 4:
        return { description: "Poor", colorClass: "bg-orange-500" };
      case 5:
        return { description: "Very Poor", colorClass: "bg-red-600" };
      default:
        return { description: "N/A", colorClass: "bg-gray-500" };
    }
  };

  if (!aqiData) return null;

  const aqi = aqiData?.list?.[0]?.main?.aqi;
  const aqiInfo = getAqiInfo(aqi);

  const co = aqiData?.list?.[0]?.components?.co;
  const no = aqiData?.list?.[0]?.components?.no;
  const no2 = aqiData?.list?.[0]?.components?.no2;
  const o3 = aqiData?.list?.[0]?.components?.o3;
  const so2 = aqiData?.list?.[0]?.components?.so2;
  const pm2_5 = aqiData?.list?.[0]?.components?.pm2_5;
  const pm10 = aqiData?.list?.[0]?.components?.pm10;
  const nh3 = aqiData?.list?.[0]?.components?.nh3;

  const pointerLeftPosition = aqi ? `${aqi * 20 - 10}%` : "50%";

  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg backdrop-blur-sm text-center text-gray-800 w-72 max-w-xs mx-auto mt-6 border border-white border-opacity-30 transform transition-all duration-300 hover:scale-105">
      {" "}
      {/* Removed flex-grow and adjusted mt-6 */}
      <h3 className="text-xl font-bold mb-2 text-white text-center">
        Air Quality Index (AQI)
      </h3>
      <div className="flex items-center justify-center gap-2 text-lg mb-4">
        <span
          className={`inline-block w-5 h-5 rounded-full ${aqiInfo.colorClass}`}
          title={`AQI Scale: 1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor`}
        ></span>
        <p className="font-semibold">
          AQI: {aqi} ({aqiInfo.description})
        </p>
      </div>
      <div className="relative w-full h-8 rounded-lg overflow-hidden mb-4 bg-gray-700">
        <div className="flex h-full">
          <div className="flex-1 bg-green-500"></div>
          <div className="flex-1 bg-lime-500"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-orange-500"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>
        {aqi && (
          <div
            className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
            style={{ left: pointerLeftPosition }}
          >
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
          </div>
        )}
      </div>
      <div className="text-sm text-left grid grid-cols-2 gap-x-4 gap-y-1">
        {co && <p>CO: {co.toFixed(2)} μg/m³</p>}
        {no && <p>NO: {no.toFixed(2)} μg/m³</p>}
        {no2 && <p>NO2: {no2.toFixed(2)} μg/m³</p>}
        {o3 && <p>O3: {o3.toFixed(2)} μg/m³</p>}
        {so2 && <p>SO2: {so2.toFixed(2)} μg/m³</p>}
        {pm2_5 && <p>PM2.5: {pm2_5.toFixed(2)} μg/m³</p>}
        {pm10 && <p>PM10: {pm10.toFixed(2)} μg/m³</p>}
        {nh3 && <p>NH3: {nh3.toFixed(2)} μg/m³</p>}
      </div>
    </div>
  );
};

export default AqiDisplayCard;
