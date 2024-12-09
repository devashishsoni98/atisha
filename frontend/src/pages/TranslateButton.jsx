import React from 'react';

const TranslateButton = () => {
  return (
    <button
      onClick={() => {
        if (window.google && window.google.translate) {
          const translateElement = document.getElementById('google_translate_element');
          if (translateElement) {
            translateElement.style.display = translateElement.style.display === 'none' ? 'block' : 'none';
          }
        }
      }}
      className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
    >
      Translate
    </button>
  );
};

export default TranslateButton;

