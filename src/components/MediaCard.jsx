import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaHeart } from 'react-icons/fa';

function MediaCard({ id, title, type, description, thumbnail, year, genre, rating, isFavorite, toggleFavorite, theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative rounded-xl overflow-hidden shadow-xl transition duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg hover:shadow-2xl hover:scale-105`}
    >
      <Link to={`/media/${id}`}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 sm:h-80 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className={`text-lg sm:text-xl font-bold font-poppins truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
            {type} • {year} • {genre} • <FaStar className="inline text-yellow-400" /> {rating}
          </p>
          <p className={`mt-2 line-clamp-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {description}
          </p>
        </div>
      </Link>
      <button
        onClick={() => toggleFavorite(id)}
        className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? 'bg-red-500' : (theme === 'dark' ? 'bg-gray-600/70' : 'bg-gray-300/70')} text-white hover:bg-red-600 transition shadow-sm`}
      >
        <FaHeart className="text-sm" />
      </button>
    </motion.div>
  );
}

export default MediaCard;