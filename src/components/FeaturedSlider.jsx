import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function FeaturedSlider({ mediaData, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % mediaData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + mediaData.length) % mediaData.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12 relative">
      <h2 className={`text-3xl sm:text-4xl font-bold font-poppins mb-4 text-center ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink' : 'text-gray-900'}`}>
        Nowości
      </h2>
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Link to={`/media/${mediaData[currentIndex].id}`}>
            <motion.img
              src={mediaData[currentIndex].thumbnail}
              alt={mediaData[currentIndex].title}
              className="w-full h-[400px] sm:h-[600px] object-cover"
              loading="lazy"
              animate={{ scale: 1.1 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-black/80 to-transparent' : 'from-gray-900/80 to-transparent'} flex items-end p-4 sm:p-6`}>
              <div>
                <h3 className={`text-2xl sm:text-4xl font-bold font-poppins ${theme === 'dark' ? 'text-white' : 'text-gray-200'}`}>
                  {mediaData[currentIndex].title}
                </h3>
                <p className={`text-sm sm:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'} capitalize`}>
                  {mediaData[currentIndex].type} • {mediaData[currentIndex].year} • {mediaData[currentIndex].genre} • <FaStar className="inline text-yellow-400" /> {mediaData[currentIndex].rating}
                </p>
                <p className={`mt-2 line-clamp-2 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-300'}`}>
                  {mediaData[currentIndex].description}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-300/70'} text-white p-2 sm:p-3 rounded-full hover:bg-neon-blue transition shadow-sm`}
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-300/70'} text-white p-2 sm:p-3 rounded-full hover:bg-neon-blue transition shadow-sm`}
        >
          →
        </button>
      </div>
    </section>
  );
}

export default FeaturedSlider;