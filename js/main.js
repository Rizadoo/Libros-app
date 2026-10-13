/**
 * @file main.js
 * Orquestador principal de la aplicación CUC Libros.
 * Controla el flujo desde el inicio de sesión hacia la landing page.
 */

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  let modalContainer = document.getElementById('modal-root');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-root';
    document.body.appendChild(modalContainer);
  }

  // Render function reacting to state
  function renderApp() {
    const state = AppState.getState();
    const { currentView, currentUser, modal } = state;

    let viewHtml = '';

    switch (currentView) {
      case 'login':
        viewHtml = UI.renderLoginScreen();
        break;

      case 'dashboard':
      default:
        viewHtml = UI.renderDashboard(currentUser);
        break;
    }

    appContainer.innerHTML = viewHtml;
    modalContainer.innerHTML = UI.renderModalContent(modal);

    // Attach event listeners for the rendered view
    attachEventListeners(currentView, state);
  }

  // Attach all user interaction handlers
  function attachEventListeners(viewName, state) {
    // -------------------------------------------------------------
    // Global Header & Navigation Listeners
    // -------------------------------------------------------------
    const logoHomeBtn = document.getElementById('logo-home-btn');
    if (logoHomeBtn) {
      logoHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        AppState.setView('dashboard');
      });
    }

    const navHowItWorks = document.getElementById('nav-how-it-works');
    if (navHowItWorks) {
      navHowItWorks.addEventListener('click', () => AppState.openModal('howItWorks'));
    }

    const navServices = document.getElementById('nav-services');
    if (navServices) {
      navServices.addEventListener('click', () => AppState.openModal('services'));
    }

    const navNews = document.getElementById('nav-news');
    if (navNews) {
      navNews.addEventListener('click', () => AppState.openModal('news'));
    }

    const btnAccessibility = document.getElementById('btn-toggle-accessibility');
    if (btnAccessibility) {
      btnAccessibility.addEventListener('click', () => {
        AppState.toggleHighContrast();
        UI.showToast('Modo de alto contraste actualizado');
      });
    }

    const btnShare = document.getElementById('btn-share-app');
    if (btnShare) {
      btnShare.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          UI.showToast('Enlace de la plataforma copiado al portapapeles');
        } else {
          UI.showToast('Plataforma CUC lista para compartir');
        }
      });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        AppState.logout();
        UI.showToast('Has cerrado sesión.');
      });
    }

    const btnNavLogin = document.getElementById('btn-nav-login');
    if (btnNavLogin) {
      btnNavLogin.addEventListener('click', () => AppState.setView('login'));
    }

    // -------------------------------------------------------------
    // Login Screen Listeners
    // -------------------------------------------------------------
    if (viewName === 'login') {
      const loginForm = document.getElementById('login-form');
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('login-email').value || 'estudiante@cuc.edu.co';
          const validation = Repository.validateCredentials(email, '123456');
          
          if (validation.valid) {
            AppState.setCurrentUser(validation.user);
            AppState.setView('dashboard');
            UI.showToast(`¡Bienvenido(a), ${validation.user.name}!`);
          } else {
            AppState.setCurrentUser({
              name: 'Estudiante CUC',
              email: email,
              faculty: 'Facultad de Ingeniería',
              studentId: '202410001',
              role: 'Estudiante Activo'
            });
            AppState.setView('dashboard');
            UI.showToast('¡Bienvenido(a) a la plataforma CUC!');
          }
        });
      }

      const btnTogglePwd = document.getElementById('btn-toggle-pwd');
      if (btnTogglePwd) {
        btnTogglePwd.addEventListener('click', () => {
          const pwdInput = document.getElementById('login-password');
          if (pwdInput.type === 'password') {
            pwdInput.type = 'text';
          } else {
            pwdInput.type = 'password';
          }
        });
      }

      const btnForgot = document.getElementById('btn-forgot-password');
      if (btnForgot) {
        btnForgot.addEventListener('click', (e) => {
          e.preventDefault();
          AppState.openModal('forgotPassword');
        });
      }

      const btnRequestAccess = document.getElementById('btn-request-access');
      if (btnRequestAccess) {
        btnRequestAccess.addEventListener('click', (e) => {
          e.preventDefault();
          AppState.openModal('requestAccess');
        });
      }
    }

    // -------------------------------------------------------------
    // Landing Page / Dashboard Listeners
    // -------------------------------------------------------------
    if (viewName === 'dashboard') {
      const btnHeroLend = document.getElementById('btn-hero-lend');
      if (btnHeroLend) {
        btnHeroLend.addEventListener('click', () => {
          UI.showToast('Módulo de préstamo en preparación');
        });
      }

      const btnHeroCatalog = document.getElementById('btn-hero-catalog');
      if (btnHeroCatalog) {
        btnHeroCatalog.addEventListener('click', () => {
          UI.showToast('Catálogo general en preparación');
        });
      }
    }

    // -------------------------------------------------------------
    // Modal Listeners
    // -------------------------------------------------------------
    if (state.modal.isOpen) {
      const modalBackdrop = document.getElementById('modal-backdrop');
      const closeBtn = document.getElementById('modal-close-btn');

      if (closeBtn) {
        closeBtn.addEventListener('click', () => AppState.closeModal());
      }

      if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
          if (e.target === modalBackdrop) {
            AppState.closeModal();
          }
        });
      }

      const formForgot = document.getElementById('form-forgot-pwd');
      if (formForgot) {
        formForgot.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('recovery-email').value;
          AppState.closeModal();
          UI.showToast(`Se han enviado las instrucciones a ${email}`);
        });
      }

      const formReq = document.getElementById('form-request-access');
      if (formReq) {
        formReq.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('req-name').value;
          AppState.closeModal();
          UI.showToast(`Solicitud recibida para ${name}.`);
        });
      }
    }

    // Footer link shortcuts
    const linkTerms = document.getElementById('link-terms');
    if (linkTerms) linkTerms.addEventListener('click', (e) => { e.preventDefault(); AppState.openModal('howItWorks'); });

    const linkSupport = document.getElementById('link-support');
    if (linkSupport) linkSupport.addEventListener('click', (e) => { e.preventDefault(); AppState.openModal('services'); });

    const linkLibrary = document.getElementById('link-library');
    if (linkLibrary) linkLibrary.addEventListener('click', (e) => { e.preventDefault(); AppState.openModal('services'); });
  }

  // Subscribe to state changes to re-render
  AppState.subscribe(() => {
    renderApp();
  });

  // Initial render starting at login
  renderApp();
});