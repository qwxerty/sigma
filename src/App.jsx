import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MediaCard from './components/MediaCard';
import MediaDetails from './components/MediaDetails';
import FeaturedSlider from './components/FeaturedSlider';
import ContinueWatching from './components/ContinueWatching';
import mediaData from './data/mediaData';
import './index.css';

function Home({ favorites, setFavorites }) {
  const [filter, setFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScroll, setShowScroll] = useState(false);
  const itemsPerPage = 8;

  // Dynamiczne kategorie, gatunki i tagi
  const categories = useMemo(() => ['all', ...new Set(mediaData.map(item => item.type))], []);
  const genres = useMemo(() => ['all', ...new Set(mediaData.flatMap(item => item.genre.split('/')))], []);
  const tags = useMemo(() => ['all', ...new Set(mediaData.flatMap(item => item.tags))], []);

  // Filtrowanie i wyszukiwanie
  const filteredMedia = useMemo(() => {
    let result = mediaData;
    if (filter !== 'all') result = result.filter(item => item.type === filter);
    if (genreFilter !== 'all') result = result.filter(item => item.genre.includes(genreFilter));
    if (tagFilter !== 'all') result = result.filter(item => item.tags.includes(tagFilter));
    if (search) {
      result = result.filter(
        item =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Sortowanie
    result = [...result].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return 0;
    });
    return result;
  }, [filter, genreFilter, tagFilter, search, sortBy]);

  // Podpowiedzi wyszukiwania
  const searchSuggestions = useMemo(() => {
    if (!search) return [];
    return mediaData
      .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
      .map(item => item.title)
      .slice(0, 6);
  }, [search]);

  // Toggle ulubionych
  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  // Paginacja
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Polecane
  const recommended = useMemo(() => {
    const shuffled = [...filteredMedia].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [filteredMedia]);

  // Scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 bg-[length:200%_200%] animate-gradient-to-r text-white"
    >
      <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-lg py-6 shadow-2xl">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins tracking-tight mb-4 sm:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Platforma Filmowa
          </h1>
          <div className="flex gap-4">
            <Link
              to="/favorites"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-poppins hover:from-blue-700 hover:to-purple-700 transition shadow-md"
            >
              Ulubione ({favorites.length})
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Nowości */}
        <FeaturedSlider mediaData={mediaData.slice(-4).reverse()} />

        {/* Oglądaj dalej */}
        <ContinueWatching mediaData={mediaData} favorites={favorites} toggleFavorite={toggleFavorite} />

        {/* Wyszukiwarka */}
        <div className="mb-8 relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj filmu lub serialu..."
            className="w-full max-w-md mx-auto block p-4 rounded-full bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition backdrop-blur-lg shadow-md"
          />
          {searchSuggestions.length > 0 && (
            <ul className="absolute w-full max-w-md mx-auto bg-gray-800/95 rounded-lg mt-2 shadow-xl backdrop-blur-lg z-10">
              {searchSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => setSearch(suggestion)}
                  className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer font-poppins text-sm transition"
                >
                  <span className="font-semibold">{suggestion.slice(0, search.length)}</span>
                  {suggestion.slice(search.length)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filtry i sortowanie */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => { setFilter(category); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full font-medium font-poppins capitalize text-sm sm:text-base ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800/80 text-gray-200 hover:bg-blue-500 hover:text-white'
                } transition duration-300 backdrop-blur-lg shadow-sm`}
              >
                {category === 'all' ? 'Wszystkie' : category} ({mediaData.filter(item => category === 'all' || item.type === category).length})
              </button>
            ))}
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => { setGenreFilter(genre); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full font-medium font-poppins capitalize text-sm sm:text-base ${
                  genreFilter === genre
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800/80 text-gray-200 hover:bg-blue-500 hover:text-white'
                } transition duration-300 backdrop-blur-lg shadow-sm`}
              >
                {genre === 'all' ? 'Wszystkie gatunki' : genre}
              </button>
            ))}
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => { setTagFilter(tag); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full font-medium font-poppins capitalize text-sm sm:text-base ${
                  tagFilter === tag
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800/80 text-gray-200 hover:bg-blue-500 hover:text-white'
                } transition duration-300 backdrop-blur-lg shadow-sm`}
              >
                {tag === 'all' ? 'Wszystkie tagi' : tag}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 rounded-full bg-gray-800/80 text-white font-poppins text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition backdrop-blur-lg shadow-sm"
          >
            <option value="title">Sortuj: Tytuł</option>
            <option value="rating">Sortuj: Ocena</option>
            <option value="year">Sortuj: Rok</option>
          </select>
        </div>

        {/* Polecane */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Polecane dla Ciebie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-6">
            {recommended.map(item => (
              <MediaCard
                key={item.id}
                {...item}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Wszystkie tytuły */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Wszystkie tytuły ({filteredMedia.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-6">
            {paginatedMedia.map(item => (
              <MediaCard
                key={item.id}
                {...item}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Paginacja */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full bg-gray-800/80 text-white disabled:opacity-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition font-poppins text-sm sm:text-base backdrop-blur-lg shadow-sm"
            >
              Poprzednia
            </button>
            <span className="text-gray-300 font-poppins text-sm sm:text-base">
              Strona {currentPage} z {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full bg-gray-800/80 text-white disabled:opacity-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition font-poppins text-sm sm:text-base backdrop-blur-lg shadow-sm"
            >
              Następna
            </button>
          </div>
        )}
      </main>

      {/* Back to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition shadow-lg z-30"
        >
          ↑
        </button>
      )}

      <footer className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 py-6 text-center text-gray-300 shadow-inner">
        <p className="font-poppins">© 2025 Platforma Filmowa. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </motion.div>
  );
}

function Favorites({ mediaData, favorites, setFavorites }) {
  const favoriteMedia = mediaData.filter(item => favorites.includes(item.id));

  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 bg-[length:200%_200%] animate-gradient-to-r text-white"
    >
      <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-lg py-6 shadow-2xl">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Ulubione
          </h1>
          <Link
            to="/"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-poppins hover:from-blue-700 hover:to-purple-700 transition shadow-md"
          >
            Wróć
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Twoje ulubione tytuły ({favoriteMedia.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-6">
          {favoriteMedia.map(item => (
            <MediaCard
              key={item.id}
              {...item}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 py-6 text-center text-gray-300 shadow-inner">
        <p className="font-poppins">© 2025 Platforma Filmowa. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </motion.div>
  );
}

function App() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

  // Zapisywanie ulubionych w localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/media/:id" element={<MediaDetails mediaData={mediaData} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/favorites" element={<Favorites mediaData={mediaData} favorites={favorites} setFavorites={setFavorites} />} />
      </Routes>
    </Router>
  );
}

export default App;