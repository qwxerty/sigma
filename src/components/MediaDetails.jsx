import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

function MediaDetails({ mediaData }) {
  const { id } = useParams();
  const media = mediaData.find(item => item.id === parseInt(id));

  if (!media) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
        <h2 className="text-2xl font-bold font-poppins">Nie znaleziono tytułu</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
    >
      <header className="bg-gray-900/90 backdrop-blur-md py-6 sticky top-0 z-20 shadow-xl">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold font-poppins tracking-tight">Platforma Filmowa</h1>
          <div className="flex gap-4">
            <Link to="/favorites" className="px-4 py-2 rounded-full bg-blue-600 text-white font-poppins hover:bg-blue-700 transition">
              Ulubione
            </Link>
            <Link to="/" className="px-4 py-2 rounded-full bg-blue-600 text-white font-poppins hover:bg-blue-700 transition">
              Wróć
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <img
            src={media.thumbnail}
            alt={media.title}
            className="w-full lg:w-1/3 h-96 object-cover rounded-xl"
            loading="lazy"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold font-poppins mb-4">{media.title}</h2>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Typ:</span> {media.type}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Rok:</span> {media.year}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Gatunek:</span> {media.genre}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Ocena:</span> <FaStar className="inline text-yellow-400" /> {media.rating}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Czas trwania:</span> {media.duration}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Tagi:</span> {media.tags.join(', ')}
            </p>
            <p className="text-gray-300 mb-4">{media.description}</p>
            <a
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-poppins hover:bg-blue-700 transition"
            >
              Odtwórz
            </a>
          </div>
        </div>
        <section className="mt-8">
          <h3 className="text-2xl font-bold font-poppins mb-4">Galeria</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {media.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${media.title} ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900/90 py-4 text-center text-gray-400">
        <p>© 2025 Platforma Filmowa. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </motion.div>
  );
}

export default MediaDetails;