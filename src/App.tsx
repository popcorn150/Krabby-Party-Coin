import { useEffect, useState } from "react";
import "./App.css";
import SpongeBob from "./icons/SpongeBob";
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, krabbyPartties, mainCharacter, spongeBob } from "./images";
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
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>
    ([]);
  const pointsToAdd = 11;
  const profitPerHour = 192045;

  const [dailRewardTimeLeft, setDailyRewardTimeLeft] = useState("")
  const [dailyCipherTimeLeft, setdailyCipherTimeLeft] = useState("")
  const [dailComboTimeLeft, setDailyComboTimeLeft] = useState("")

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${-x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 1000);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  useEffect(() => {
    const updateCountDowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setdailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountDowns();
    const interval = setInterval(updateCountDowns, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);



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
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailRewardTimeLeft}
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCipher} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailRewardTimeLeft}
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCombo} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailRewardTimeLeft}
                </p>
              </div>
            </div>
            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={krabbyPartties} alt="Krabby Parties" className="w-12 h-12" />
                <p className="text-4xl text-white">{points.toLocaleString()}</p>
              </div>
            </div>
            <div className="px-4 mt-4 flex justify-center">
              <div className="w-80 h-80 p-4 rounded-full circle-outer"
                onClick={handleCardClick}>
                <div className="w-full h-full rounded-full circle-inner">
                  <img src={spongeBob} alt="Main Character" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
}
export default App;
