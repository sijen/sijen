import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

// Generate the image list
const images = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/Gallery/G${i + 1}.jpeg`,
  alt: `Leo Club Activity ${i + 1}`,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 sm:space-y-8 px-3 sm:px-4 py-3 sm:py-4 max-w-6xl mx-auto"
    >
      {/* ============================================ */}
      {/* SECTION HEADER */}
      {/* ============================================ */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-4 sm:py-6 md:py-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
          <span className="text-xdr-high">Leo Club</span> Gallery
        </h1>
        <p className="text-xdr-muted text-sm sm:text-lg mb-4 sm:mb-6">
          Moments from our community service & events
        </p>
        <span className="inline-block px-3 py-1 bg-xdr-high/20 text-xdr-high rounded-full text-sm font-medium">
          {images.length} Photos
        </span>
      </motion.section>

      {/* ============================================ */}
      {/* GALLERY GRID */}
      {/* ============================================ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => openLightbox(index)}
            className="glassXDR rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group relative border border-xdr-border hover:border-xdr-info/50 transition-all duration-300"
          >
            {/* Photo */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-40 sm:h-48 md:h-56 object-cover"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <ZoomIn className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium">View Photo</span>
              </div>
            </div>

            {/* Photo Number */}
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded-md text-white text-xs">
              {image.id}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ============================================ */}
      {/* LIGHTBOX */}
      {/* ============================================ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Blurred Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/60 rounded-full text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative z-10 max-h-[85vh] max-w-[90vw] sm:max-w-[80vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
