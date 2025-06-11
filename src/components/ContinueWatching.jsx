import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaHeart } from 'react-icons/fa';

function ContinueWatching({ mediaData, favorites, toggleFavorite, theme }) {
  const watching = mediaData
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(item => ({
      ...item,
      progress: Math.floor(Math.random() * 80) + 10
    }));

  if (watching.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink' : 'text-gray-900'}`}>
        Oglądaj dalej
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {watching.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`relative rounded-xl overflow-hidden shadow-xl transition duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg hover:shadow-2xl hover:scale-105`}
          >
            <Link to={`/media/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-64 sm:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-neon-blue" style={{ width: `${item.progress}%` }} />
              <div className="p-4">
                <h3 className={`text-lg sm:text-xl font-bold font-poppins truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                  {item.type} • {item.year} • {item.genre} • <FaStar className="inline text-yellow-400" /> {item.rating}
                </p>
                <p className={`mt-2 line-clamp-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.description}
                </p>
              </div>
            </Link>
            <button
              onClick={() => toggleFavorite(item.id)}
              className={`absolute top-2 right-2 p-2 rounded-full ${favorites.includes(item.id) ? 'bg-red-500' : (theme === 'dark' ? 'bg-gray-600/70' : 'bg-gray-300/70')} text-white hover:bg-red-600 transition shadow-sm`}
            >
              <FaHeart className="text-sm" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ContinueWatching;