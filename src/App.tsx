import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { List, Grid, Package } from 'lucide-react';

const collectibles = [
  {
    id: 1,
    name: 'Skilled Fingers Series',
    price: '0.855 ETH',
    number: '#209',
    image: 'https://pro.bossadizenith.me/first.svg',
  },
  {
    id: 2,
    name: 'Vibrant Vibes Series',
    price: '0.209 ETH',
    number: '#808',
    image: 'https://pro.bossadizenith.me/second.svg',
  },
];

// === View Button Types ===
interface ViewButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

// === View Button Component ===
const ViewButton = ({ icon: Icon, label, isSelected, onClick }: ViewButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
      isSelected
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </motion.button>
);

// === Shared Item Types ===
interface SharedItemProps {
  item: {
    id: number;
    name: string;
    price: string;
    number: string;
    image: string;
  };
  viewMode: 'list' | 'card' | 'pack';
  isLast: boolean;
}

// === Shared Item Component ===
const SharedItem = ({ item, viewMode, isLast }: SharedItemProps) => {
  const containerClass = {
    list: 'flex items-center gap-6 p-6',
    card: 'p-6',
    pack: 'absolute',
  };

  const imageClass = {
    list: 'w-20 h-20 rounded-xl object-cover',
    card: 'w-full h-48 mb-4 rounded-xl object-cover',
    pack: 'w-full h-full object-cover rounded-xl',
  };

  return (
    <motion.div
      layout
      layoutId={`container-${item.id}`}
      className={containerClass[viewMode]}
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        ...(viewMode === 'pack' && {
          position: 'absolute',
          top: isLast ? 12 : 0,
          left: isLast ? 12 : 0,
          width: '100%',
          height: '100%',
          zIndex: isLast ? 10 : 0,
        }),
      }}
      transition={{
        layout: { duration: 0.5, ease: [0.4, 0.13, 0.23, 0.96] },
      }}
    >
      <motion.img
        layoutId={`image-${item.id}`}
        src={item.image}
        alt={item.name}
        className={imageClass[viewMode]}
      />

      {viewMode !== 'pack' && (
        <motion.div layoutId={`content-${item.id}`} className={viewMode === 'list' ? 'flex-1' : ''}>
          <motion.h3 layout className="text-xl font-semibold mb-2">
            {item.name}
          </motion.h3>
          <motion.div layout className="flex items-center justify-between">
            <motion.span layout className="text-lg font-medium text-blue-600">
              {item.price}
            </motion.span>
            <motion.span layout className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
              {item.number}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// === Main App Component ===
export default function App() {
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'pack'>('list');

  const containerClasses = {
    list: 'space-y-4 max-w-2xl',
    card: 'grid grid-cols-2 gap-8 max-w-3xl',
    pack: 'flex justify-center items-center',
  };

  const totalPrice = collectibles
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(3);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Peerlist Challenge Day 5
            </h1>
            <h2 className="text-2xl text-gray-700 font-mono">Shared Layout Tabs</h2>
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Collectibles</h3>
        {/* View Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          <ViewButton
            icon={List}
            label="List view"
            isSelected={viewMode === 'list'}
            onClick={() => setViewMode('list')}
          />
          <ViewButton
            icon={Grid}
            label="Card view"
            isSelected={viewMode === 'card'}
            onClick={() => setViewMode('card')}
          />
          <ViewButton
            icon={Package}
            label="Pack view"
            isSelected={viewMode === 'pack'}
            onClick={() => setViewMode('pack')}
          />
        </div>

        {/* Shared Layout Transition Area */}
        <LayoutGroup>
          <motion.div layout className={`${containerClasses[viewMode]} mx-auto`}>
            {viewMode === 'pack' ? (
              <motion.div layout className="relative w-48 h-48">
                {collectibles.map((item, index) => (
                  <SharedItem
                    key={item.id}
                    item={item}
                    viewMode="pack"
                    isLast={index === collectibles.length - 1}
                  />
                ))}
                <motion.div layout className="absolute top-full left-0 right-0 text-center mt-6">
                  <motion.h3 layout className="text-2xl font-semibold mb-2">
                    {collectibles.length} Collectibles
                  </motion.h3>
                  <motion.p layout className="text-xl font-medium text-blue-600">
                    {totalPrice} ETH
                  </motion.p>
                </motion.div>
              </motion.div>
            ) : (
              collectibles.map((item) => (
                <SharedItem
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  isLast={false}
                />
              ))
            )}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
