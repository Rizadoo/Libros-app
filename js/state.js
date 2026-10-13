/**
 * @file state.js
 * Gestor de estado de la aplicación CUC Libros.
 */

const AppState = (function () {
  let state = {
    currentView: 'login', // 'login' | 'dashboard' | 'catalog' | 'profile' | 'events'
    currentUser: null,    // { name, email, faculty, studentId, role }
    catalogFilter: {
      category: 'all',
      query: ''
    },
    modal: {
      isOpen: false,
      type: null, // 'offerBook' | 'forgotPassword' | 'requestAccess' | 'bookDetail' | 'howItWorks' | 'services' | 'news'
      data: null
    },
    accessibility: {
      highContrast: false,
      largeFont: false
    }
  };

  const listeners = [];

  function notify() {
    listeners.forEach(fn => fn(state));
  }

  return {
    getState: function () {
      return state;
    },

    subscribe: function (fn) {
      listeners.push(fn);
      return () => {
        const index = listeners.indexOf(fn);
        if (index > -1) listeners.splice(index, 1);
      };
    },

    setView: function (viewName) {
      state.currentView = viewName;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      notify();
    },

    setCurrentUser: function (user) {
      state.currentUser = user;
      notify();
    },

    logout: function () {
      state.currentUser = null;
      state.currentView = 'login';
      notify();
    },

    setCatalogFilter: function (filterUpdate) {
      state.catalogFilter = { ...state.catalogFilter, ...filterUpdate };
      notify();
    },

    openModal: function (type, data = null) {
      state.modal = {
        isOpen: true,
        type: type,
        data: data
      };
      notify();
    },

    closeModal: function () {
      state.modal = {
        isOpen: false,
        type: null,
        data: null
      };
      notify();
    },

    toggleHighContrast: function () {
      state.accessibility.highContrast = !state.accessibility.highContrast;
      document.body.classList.toggle('high-contrast', state.accessibility.highContrast);
      notify();
    },

    toggleLargeFont: function () {
      state.accessibility.largeFont = !state.accessibility.largeFont;
      document.body.classList.toggle('large-font', state.accessibility.largeFont);
      notify();
    }
  };
})();
