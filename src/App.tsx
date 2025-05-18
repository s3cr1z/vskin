import React from 'react';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemePreview from './components/ThemePreview';
import { useTheme } from './hooks/useTheme';
import { presets } from './data/presets';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function App() {
  const { theme, applyPreset } = useTheme();

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-black">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-[#FFFAF0] border-b-[3px] border-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FF595E] p-2 neo-brutalist-sm">
                <Palette className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                VS Code Theme Generator
              </h1>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Theme Selection */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <h2 className="text-xl font-black tracking-tight">Select Your Theme</h2>
            <div className="grid gap-6">
              {presets.map(preset => (
                <motion.button
                  key={preset.id}
                  variants={item}
                  onClick={() => applyPreset(preset.colors, preset.tokenColors)}
                  className="theme-card bg-white p-6 neo-brutalist neo-brutalist-hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">{preset.name}</h3>
                    <p className="text-sm">{preset.description}</p>
                    <div className="flex space-x-2">
                      {Object.values(preset.tokenColors).slice(0, 5).map((color, index) => (
                        <motion.div
                          key={index}
                          className="w-8 h-8 neo-brutalist-sm"
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="neo-brutalist overflow-hidden bg-white">
              <ThemePreview theme={theme} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t-[3px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium">
            VS Code Theme Generator © 2025. All theme files are compatible with Visual Studio Code.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;