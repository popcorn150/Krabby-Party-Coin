import { useState } from "react";
import "./App.css";
import SpongeBob from "./icons/SpongeBob";
import { binanceLogo, krabbyPartties } from "./images";
import Info from "./icons/Info";
import Settings from "./icons/Settings";

function App() {

  const levelNames = [
    "Bronze cook", // From 0 to 4999 Krabby Patties
    "Silver cook", // From 5,000 to 24,999 Krabby Patties
    "Gold cook", // From 25,000 to 99,999 Krabby Patties
    "Platinum cook", // From 100,000 to 999,999 Krabby Patties
    "Diamond cook", // From 1,000,000 to 2,000,000 Krabby Patties
    "Epic cook", // From 2,000,000 to 10,000,000 Krabby Patties
    "Lengendary cook", // From 10,000,000 to 50,000,000 Krabby Patties
    "Master cook", // From 50,000,000 to 100,000,000 Krabby Patties
    "Grandmaster cook", // From 100,000,000 to 1,000,000,000 Krabby Patties
    "Lord cook" // From 1,000,000,000 to ∞ Krabby Patties
  ];

  const levelMinPoints = [
    0, // Bronze cook
    5000, // Silver cook
    25000, // Gold cook
    100000, // Platinum cook
    1000000, // Diamond cook
    2000000, // Epic cook
    10000000, // Lengendary cook
    50000000, // Master cook
    100000000, // Grandmaster cook
    1000000000 // Lord cook
  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(22749365);
  const profitPerHour = 192045;

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currenLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currenLevelMin) / (nextLevelMin - currenLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  }

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold 
      flex flex-col max-w-xl">

        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <SpongeBob size={50} className="text-[#d4d4d4]" />
            </div>
            <div>
              <p className="text-sm">SpongeBob (Cook)</p>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">{levelIndex + 1}
                    <span className="text-[#95908a]"> / {levelNames.length}
                    </span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-2/3 border-2 border-[#43433b]
              rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">
                  Profit per hour
                </p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={krabbyPartties} alt="Krabby Patties" className="w-[25px] h-[25px]" />
                  <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className="text-[#43433b]"/>
                </div>
              </div>
              <Settings className="text-white"/>
            </div>
          </div>
        </div>
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0"></div>
      </div>
    </div>
  );
}
export default App;
