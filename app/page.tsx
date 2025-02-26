"use client"

import { useState, useEffect } from "react";
import LoadingCar from "../components/LoadingCar";
import CustomSelect from "@/components/CustomSelect";

export default function Home() {
  const [fuelPrices, setFuelPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [distance, setDistance] = useState<number>(0);
  const [consumption, setConsumption] = useState<number>(0);
  const [fuelType, setFuelType] = useState<string>("Benzyna 95");
  const [cost, setCost] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFuelPrices() {
      try {
        const response = await fetch("/api/fuelPrices");
        const data = await response.json();
        setFuelPrices(data);
      } catch (error) {
        console.error("Błąd pobierania cen paliw", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFuelPrices();
  }, []);

  useEffect(() => {
    if (fuelPrices[fuelType]) {
      const pricePerLiter = fuelPrices[fuelType];
      const totalCost = (distance / 100) * consumption * pricePerLiter;
      setCost(totalCost);
    }
  }, [distance, consumption, fuelType, fuelPrices]);


  const calculateCost = (fuelType: string): number => {
    if (fuelPrices[fuelType] && distance && consumption) {
      return (distance / 100) * consumption * fuelPrices[fuelType];
    }
    return 0;
  };


  return (
    <>
      <div className="min-h-screen bg-teal-600 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center text-teal-700">Kalkulator Kosztu Przejazdu</h1>
          {loading ? (
            <LoadingCar />
          ) : (
            <>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-gray-700">Długość trasy (km):</span>
                  <input
                    type="number"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={distance === 0 ? "" : distance}
                    onChange={(e) => setDistance(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Średnie spalanie (l/100km):</span>
                  <input
                    type="number"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={consumption === 0 ? "" : consumption}
                    onChange={(e) => setConsumption(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Rodzaj paliwa:</span>
                  <CustomSelect
                    options={fuelPrices}
                    value={fuelType}
                    onChange={setFuelType}
                    setCost={setCost}
                    calculateCost={calculateCost}
                  />
                </label>
              </div>

              {cost !== null && (
                <div className="mt-4 text-center text-lg font-semibold text-gray-700">
                  Całkowity koszt: <span className="text-teal-700">{cost.toFixed(2)} PLN</span>
                </div>
              )}
            </>
          )}
        </div>
        <p className="absolute bottom-0 right-0">Ceny paliw pobrane z <a href="http://autocentrum.pl" target="_blank"> autocentrum.pl</a></p>
      </div>
    </>
  );
}
