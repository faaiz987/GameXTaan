'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Gamepad2, MonitorSmartphone, Headset, Disc3, Joystick } from 'lucide-react';
import './index.css'; // or './globals.css'


interface Shop {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  link: string;
  description: string;
  background: string;
}

const LoopLast7SecondsVideo: React.FC<{ isMuted: boolean }> = ({ isMuted }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [hasLoopStarted, setHasLoopStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      if (!duration || !video) return;

      const loopStart = duration - 7.8;

      // If video finished playing for the first time, start looping from last 7s
      if (!hasLoopStarted && video.currentTime >= duration) {
        setHasLoopStarted(true);
        video.currentTime = loopStart;
        video.play().catch(() => {});
      }

      // When already looping: keep replaying last 7 seconds
      if (hasLoopStarted && video.currentTime >= duration) {
        video.currentTime = loopStart;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Manual attempt to play (to trigger autoplay on some browsers)
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [duration, hasLoopStarted]);

  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-[-1]"
      src="/assets/videos/background.mp4"
    />

  );
};


const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [cameraPosition, setCameraPosition] = useState({ x: 50, y: 50 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('/assets/videos/background.mp4');
  const [hoveredShop, setHoveredShop] = useState<Shop | null>(null);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isSoundAnimating, setIsSoundAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showShopIcons, setShowShopIcons] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // ⏱️ Show icons after 17s
    const iconTimer = setTimeout(() => {
      setShowShopIcons(true);
    }, 18000);
    return () => clearTimeout(iconTimer);
  }, []);

  const shops: Shop[] = [
    {
      id: 'ps5',
      name: 'PlayStation Store',
      icon: <MonitorSmartphone className="w-8 h-8" />,
      position: { x: 13, y: 24 },
      link: 'https://www.zara.com',
      description: 'PS5 Store for unique gadgets',
      background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80',
    },
    {
      id: 'xbox',
      name: 'Xbox Store',
      icon: <MonitorSmartphone className="w-8 h-8" />,
      position: { x: 83, y: 24 },
      link: 'https://www.apple.com',
      description: 'Xbox Store for unique gadgets',
      background: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80',
    },
    {
      id: 'ps5-console',
      name: 'PlayStation Console',
      icon: <Gamepad2 className="w-8 h-8" />,
      position: { x: 13, y: 38 },
      link: 'https://www.zara.com',
      description: 'PS5 Console and accessories',
      background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80',
    },
    {
      id: 'xbox-console',
      name: 'XBox Console',
      icon: <Gamepad2 className="w-8 h-8" />,
      position: { x: 83, y: 38 },
      link: 'ttps://www.apple.com',
      description: 'Xbox Console and accessories',
      background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80',
    },
    {
      id: 'vr',
      name: 'VR Store',
      icon: <Headset className="w-8 h-8" />,
      position: { x: 47.5, y: 59 },
      link: 'https://www.starbucks.com',
      description: 'Relax with premium coffee',
      background: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80',
    },
    {
      id: 'xbox-games',
      name: 'Xbox Games',
      icon: <Joystick className="w-8 h-8" />,
      position: { x: 83, y: 55 },
      link: 'https://www.rolex.com',
      description: 'Xbox games to play',
      background: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&q=80',
    },
    {
      id: 'ps-games',
      name: 'Xbox Games',
      icon: <Joystick className="w-8 h-8" />,
      position: { x: 13, y: 55 },
      link: 'https://www.rolex.com',
      description: 'PS games to play',
      background: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&q=80',
    },
    {
      id: 'xbox-accessories',
      name: 'Xbox Accessories',
      icon: <Disc3 className="w-8 h-8" />,
      position: { x: 83, y: 70 },
      link: 'https://www.rolex.com',
      description: 'PS accessories and peripherals',
      background: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&q=80',
    },
    {
      id: 'ps-assessories',
      name: 'PS Accessories',
      icon: <Disc3 className="w-8 h-8" />,
      position: { x: 13, y: 70 },
      link: 'https://www.amazon.com/books',
      description: 'xbox accessories and peripherals',
      background: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80',
    },
  ];

  const handleShopClick = (shop: Shop) => {
    setIsTransitioning(true);
    setSelectedShop(shop);
    setCameraPosition(shop.position);
    setTimeout(() => setCurrentBackground(shop.background), 300);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleBackToCenter = () => {
    setIsTransitioning(true);
    setSelectedShop(null);
    setCameraPosition({ x: 50, y: 50 });
    setTimeout(() => setCurrentBackground('/assets/videos/background.mp4'), 300);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {selectedShop === null && isMounted ? (
          <LoopLast7SecondsVideo isMuted={isMuted} />
        ) : (
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${hoveredShop?.background || currentBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: isTransitioning ? 'blur(8px)' : 'none',
              transform: isTransitioning ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        )}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{ opacity: isTransitioning ? 0.7 : 0.3 }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-30 p-6 flex justify-between items-center">
        <button
          onClick={() => {
            setIsMenuAnimating(true);
            setIsMenuOpen(!isMenuOpen);
            setTimeout(() => setIsMenuAnimating(false), 300);
          }}
          className={`relative group p-3 rounded-full bg-white/10 backdrop-blur-sm 
            hover:bg-white/20 transition-all duration-300 ${isMenuAnimating ? 'scale-90' : 'scale-100'}`}
        >
          <div className="absolute inset-0 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative transform transition-all duration-300">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>

        <button
          onClick={() => {
            setIsSoundAnimating(true);
            setIsMuted(!isMuted);
            setTimeout(() => setIsSoundAnimating(false), 300);
          }}
          className={`relative group p-3 rounded-full bg-white/10 backdrop-blur-sm 
            hover:bg-white/20 transition-all duration-300 ${isSoundAnimating ? 'scale-90' : 'scale-100'}`}
        >
          <div className="absolute inset-0 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative transform transition-all duration-300">
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </div>
        </button>
      </nav>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 backdrop-blur-lg z-40 transition-all duration-700 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <X size={24} className="text-white" />
        </button>
        <div className="relative h-full flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {shops.map((shop) => (
              <button
                key={shop.id}
                onClick={() => {
                  handleShopClick(shop);
                  setIsMenuOpen(false);
                }}
                onMouseEnter={() => setHoveredShop(shop)}
                onMouseLeave={() => setHoveredShop(null)}
                className="group relative flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm
                  hover:bg-white/10 transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative z-10 mb-4 p-4 rounded-full bg-white/10 group-hover:bg-white/20">
                  {shop.icon}
                </div>
                <h3 className="relative z-10 text-2xl font-bold mb-2">{shop.name}</h3>
                <p className="relative z-10 text-white/70 text-center">{shop.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mall Map */}
      <main
        className={`relative z-10 h-screen transition-all duration-1000 ease-in-out ${
          isTransitioning ? 'scale-150 blur-sm' : 'scale-100 blur-none'
        }`}
        style={{
          transform: `translate(${-cameraPosition.x + 50}%, ${-cameraPosition.y + 50}%)`,
        }}
      >
        {showShopIcons && shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => handleShopClick(shop)}
            className={`absolute p-4 rounded-full bg-white/10 backdrop-blur-sm 
              hover:bg-white/20 transition-all duration-300 transform hover:scale-110
              ${selectedShop?.id === shop.id ? 'ring-4 ring-white' : ''}`}
            style={{
              left: `${shop.position.x}%`,
              top: `${shop.position.y}%`,
            }}
          >
            <div className="relative flex items-center justify-center text-white">
              <span className="ripple-ring" /> {/* 🔁 looping animated ripple */}
              {shop.icon}
            </div>
          </button>
        ))}
      </main>

      {/* Shop Detail Overlay */}
      {selectedShop && (
        <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg max-w-md text-center pointer-events-auto">
            <h2 className="text-3xl font-bold mb-4">{selectedShop.name}</h2>
            <p className="text-lg mb-6">{selectedShop.description}</p>
            <div className="space-x-4">
              <a
                href={selectedShop.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              >
                Visit Store
              </a>
              <button
                onClick={handleBackToCenter}
                className="inline-block px-6 py-3 bg-transparent border border-white rounded-full hover:bg-white/10 transition-colors"
              >
                Back to Mall
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-6 text-sm text-center text-white/60">
        © 2024 Virtual Mall Experience
      </footer>
    </div>
  );
};

export default App;