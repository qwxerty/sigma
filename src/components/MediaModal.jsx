function MediaModal({ media, onClose }) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">{media.title}</h2>
          <img src={media.thumbnail} alt={media.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-300 mb-2"><span className="font-semibold">Typ:</span> {media.type}</p>
          <p className="text-gray-300 mb-2"><span className="font-semibold">Rok:</span> {media.year}</p>
          <p className="text-gray-300 mb-2"><span className="font-semibold">Gatunek:</span> {media.genre}</p>
          <p className="text-gray-300 mb-4">{media.description}</p>
          <div className="flex gap-4">
            <a
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Odtwórz
            </a>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default MediaModal;