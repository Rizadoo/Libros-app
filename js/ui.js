/**
 * @file ui.js
 * Generador y manipulador de la interfaz de usuario para la plataforma CUC Libros.
 */

const UI = (function () {
  // SVG Icon definitions
  const ICONS = {
    mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    book: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
    leaf: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    users: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    calendar: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    user: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
    search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    share: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
    accessibility: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><path d="m18 19 1-7-7 1-7-1 1 7"/><path d="M12 5v14"/></svg>`,
    check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
    mapPin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    eye: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`
  };

  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? ICONS.check : 'ℹ️'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Common Header Generator
  function renderHeader(currentView, currentUser) {
    return `
      <header class="main-header" id="main-header">
        <div class="header-container">
          <a href="#" class="brand-logo" id="logo-home-btn">
            UNICOSTA
          </a>

          <nav class="nav-links">
            <span class="nav-link ${currentView === 'how-it-works' ? 'active' : ''}" id="nav-how-it-works">¿Cómo funciona?</span>
            <span class="nav-link ${currentView === 'catalog' ? 'active' : ''}" id="nav-catalog">Explora</span>
            <span class="nav-link ${currentView === 'services' ? 'active' : ''}" id="nav-services">Servicios</span>
            <span class="nav-link ${currentView === 'news' ? 'active' : ''}" id="nav-news">Noticias</span>
            <span class="nav-link ${currentView === 'events' ? 'active' : ''}" id="nav-events">Eventos</span>
          </nav>

          <div class="header-actions">
            <button class="icon-btn" id="btn-toggle-accessibility" title="Opciones de accesibilidad" aria-label="Accesibilidad">
              ${ICONS.accessibility}
            </button>
            <button class="icon-btn" id="btn-share-app" title="Compartir plataforma" aria-label="Compartir">
              ${ICONS.share}
            </button>
            <button class="icon-btn" id="btn-search-nav" title="Buscar en catálogo" aria-label="Buscar">
              ${ICONS.search}
            </button>
            
            ${currentUser ? `
              <div class="user-badge" id="btn-user-profile" title="Ver mi perfil">
                <div class="user-avatar">${currentUser.name.charAt(0)}</div>
                <span>${currentUser.name.split(' ')[0]}</span>
              </div>
              <button class="icon-btn" id="btn-logout" title="Cerrar sesión" style="color: var(--primary); font-size: 0.8125rem; font-weight: 600;">
                Salir
              </button>
            ` : `
              <button class="btn-primary-submit" id="btn-nav-login" style="margin: 0; padding: 0.45rem 1.1rem; width: auto; font-size: 0.875rem;">
                Ingresar
              </button>
            `}
          </div>
        </div>
      </header>
    `;
  }

  // Common Footer Generator
  function renderFooter() {
    return `
      <footer class="main-footer" id="main-footer">
        <div class="footer-container">
          <div class="footer-left">
            <span class="footer-logo">UNICOSTA</span>
            <span class="footer-copy">© 2026 Universidad de la Costa (CUC) - Plataforma de Intercambio Académico</span>
          </div>
          <ul class="footer-links">
            <li class="footer-link-item"><a href="#" id="link-terms">Términos de servicio</a></li>
            <li class="footer-link-item"><a href="#" id="link-privacy">Política de privacidad</a></li>
            <li class="footer-link-item"><a href="#" id="link-support">Soporte del campus</a></li>
            <li class="footer-link-item"><a href="#" id="link-library">Servicios de biblioteca</a></li>
          </ul>
        </div>
      </footer>
    `;
  }

  // View 1: Login Screen (Matches Image 1)
  function renderLoginScreen() {
    return `
      <div class="login-page-wrapper" id="login-view-root">
        <div class="login-split-container">
          <!-- Left Column: Login Form -->
          <div class="login-left-panel">
            <h1 class="login-brand-title">Universidad De<br/>La Costa</h1>
            <p class="login-subtitle">Inicia sesión para continuar explorando la comunidad del campus.</p>

            <form class="login-form" id="login-form">
              <div class="form-group">
                <label class="form-label" for="login-email">Correo Institucional</label>
                <div class="input-with-icon">
                  <span class="input-icon">${ICONS.mail}</span>
                  <input 
                    type="email" 
                    id="login-email" 
                    class="form-input" 
                    placeholder="usuario@cuc.edu.co" 
                    required 
                    value="estudiante@cuc.edu.co"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="form-label-row">
                  <label class="form-label" for="login-password">Contraseña</label>
                  <a href="#" class="forgot-password-link" id="btn-forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="input-with-icon">
                  <span class="input-icon">${ICONS.lock}</span>
                  <input 
                    type="password" 
                    id="login-password" 
                    class="form-input" 
                    placeholder="••••••••" 
                    required 
                    value="123456"
                  />
                  <button type="button" class="password-toggle-btn" id="btn-toggle-pwd" aria-label="Mostrar u ocultar contraseña">
                    ${ICONS.eye}
                  </button>
                </div>
              </div>

              <div class="checkbox-row">
                <input type="checkbox" id="remember-me" checked />
                <label for="remember-me" class="checkbox-label">Recordarme</label>
              </div>

              <button type="submit" class="btn-primary-submit" id="btn-submit-login">
                Iniciar sesión
              </button>

              <div class="signup-prompt">
                ¿No tienes una cuenta? <a href="#" class="signup-link" id="btn-request-access">Solicitar acceso</a>
              </div>
            </form>
          </div>

          <!-- Right Column: Research & Community Showcase -->
          <div class="login-right-panel">
            <div>
              <h2 class="hero-feature-title">Potencia tu investigación</h2>
              <p class="hero-feature-desc">
                Únete a la principal red diseñada específicamente para la colaboración académica y el intercambio sostenible de conocimientos en la Universidad de la Costa.
              </p>

              <div class="features-grid">
                <!-- Card 1: Acceso académico gratuito -->
                <div class="feature-card card-white">
                  <div class="card-icon-box icon-light-red">
                    ${ICONS.book}
                  </div>
                  <h3 class="feature-card-title">Acceso académico<br/>gratuito</h3>
                  <p class="feature-card-text">
                    Desbloquea una amplia biblioteca de recursos digitales, revistas y publicaciones sin costo para los estudiantes y profesores de la CUC.
                  </p>
                </div>

                <!-- Card 2: Intercambio ecológico (Red Highlight Card) -->
                <div class="feature-card card-red">
                  <div class="card-icon-box icon-translucent">
                    ${ICONS.leaf}
                  </div>
                  <h3 class="feature-card-title">Intercambio<br/>ecológico</h3>
                  <p class="feature-card-text">
                    Contribuye a un campus más verde participando en el intercambio de recursos digitales y reduciendo el desperdicio de libros de texto físicos.
                  </p>
                </div>

                <!-- Card 3: Comunidad del campus -->
                <div class="feature-card card-white">
                  <div class="card-icon-box icon-blush">
                    ${ICONS.users}
                  </div>
                  <h3 class="feature-card-title">Comunidad del<br/>campus</h3>
                  <p class="feature-card-text">
                    Conecta con tus compañeros, colabora en proyectos y construye una sólida red académica en toda la universidad.
                  </p>
                </div>
              </div>
            </div>

            <!-- Large Campus Photo -->
            <div class="campus-image-container">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80" 
                alt="Estudiantes en la sala de estudio y biblioteca de la Universidad de la Costa" 
                class="campus-image"
                loading="eager"
              />
            </div>
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;
  }

  // View 2: Dashboard / Home Screen (Matches Image 3)
  function renderDashboard(currentUser) {
    return `
      <div class="dashboard-view" id="dashboard-view-root">
        ${renderHeader('dashboard', currentUser)}

        <div class="dashboard-content">
          <div class="dashboard-hero">
            <h1 class="dashboard-hero-title">Intercambia Conocimiento, No Dinero</h1>
            <p class="dashboard-hero-subtitle">
              La Universidad De La Costa te permite acceder a su plataforma de préstamo de libros. Encuentra lo que necesitas para tu semestre sin necesidad de hacer un préstamo ambiguo.
            </p>

            <div class="hero-cta-group">
              <button class="btn-cta-primary" id="btn-hero-lend">Empezar a Prestar</button>
              <button class="btn-cta-secondary" id="btn-hero-catalog">Explorar Catálogo</button>
            </div>
          </div>

          <!-- 3 Main Action Cards -->
          <div class="dashboard-cards-grid">
            <!-- Card 1: Catálogo General -->
            <div class="dash-card dash-white" id="card-catalog-action">
              <div class="dash-card-icon-box icon-pink">
                ${ICONS.book}
              </div>
              <h2 class="dash-card-title">Catálogo General</h2>
              <p class="dash-card-desc">
                Explora miles de títulos disponibles para préstamo inmediato en la comunidad universitaria.
              </p>
            </div>

            <!-- Card 2: Mi Perfil -->
            <div class="dash-card dash-white" id="card-profile-action">
              <div class="dash-card-icon-box icon-pink">
                ${ICONS.user}
              </div>
              <h2 class="dash-card-title">Mi Perfil</h2>
              <p class="dash-card-desc">
                Gestiona tus préstamos activos, historial de lectura y libros ofrecidos a la red.
              </p>
            </div>

            <!-- Card 3: Próximos Eventos (Red Card) -->
            <div class="dash-card dash-red" id="card-events-action">
              <div class="dash-card-icon-box icon-white-alpha">
                ${ICONS.calendar}
              </div>
              <h2 class="dash-card-title">Próximos Eventos</h2>
              <p class="dash-card-desc">
                Únete a ferias de intercambio presenciales en el campus. Conoce a otros lectores.
              </p>
            </div>
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;
  }

  // View 3: Catalog View
  function renderCatalog(books, filterState, currentUser) {
    const categories = ['all', 'Ingeniería', 'Administración', 'Derecho', 'Psicología'];

    return `
      <div class="dashboard-view" id="catalog-view-root">
        ${renderHeader('catalog', currentUser)}

        <div class="view-container">
          <div class="view-header-bar">
            <div>
              <h1 class="view-title-main">Catálogo General de Libros</h1>
              <p class="view-subtitle-main">Encuentra y solicita libros en préstamo académico compartido de la CUC</p>
            </div>
            <button class="btn-cta-primary" id="btn-catalog-offer-book" style="padding: 0.65rem 1.25rem; font-size: 0.875rem;">
              ${ICONS.plus} Ofrecer un libro
            </button>
          </div>

          <!-- Search & Filter Controls -->
          <div class="search-filter-section">
            <div class="search-input-group">
              <input 
                type="text" 
                id="catalog-search-input" 
                class="search-input-main" 
                placeholder="Buscar por título, autor, palabras clave o facultad..." 
                value="${filterState.query || ''}"
              />
            </div>

            <div class="filter-pills-row">
              <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); align-self: center; margin-right: 0.5rem;">Categoría:</span>
              ${categories.map(cat => `
                <button 
                  class="filter-pill ${filterState.category === cat ? 'active' : ''}" 
                  data-category="${cat}"
                >
                  ${cat === 'all' ? 'Todas las áreas' : cat}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Books Grid -->
          <div class="books-grid">
            ${books.length > 0 ? books.map(book => `
              <div class="book-card" id="book-${book.id}">
                <div class="book-cover-wrap">
                  <img src="${book.coverUrl}" alt="${book.title}" class="book-cover-img" />
                  <span class="book-badge-status ${book.isAvailable ? 'badge-available' : 'badge-borrowed'}">
                    ${book.isAvailable ? 'Disponible' : 'Prestado'}
                  </span>
                </div>
                <div class="book-info-body">
                  <span class="book-category">${book.category} • ${book.edition}</span>
                  <h3 class="book-title">${book.title}</h3>
                  <p class="book-author">Por ${book.author}</p>
                  
                  <div class="book-meta">
                    <span>${book.ownerName}</span>
                    <span style="font-style: italic;">${book.condition}</span>
                  </div>

                  ${book.isAvailable ? `
                    <button class="book-action-btn btn-borrow" data-borrow-id="${book.id}">
                      Solicitar Préstamo
                    </button>
                  ` : `
                    <button class="book-action-btn btn-disabled" disabled>
                      En préstamo actualmente
                    </button>
                  `}
                </div>
              </div>
            `).join('') : `
              <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: var(--radius-md); border: 1px solid var(--outline);">
                <p style="font-size: 1.125rem; color: var(--on-surface-variant); margin-bottom: 1rem;">No se encontraron libros con los criterios de búsqueda.</p>
                <button class="filter-pill active" id="btn-reset-filters">Limpiar filtros de búsqueda</button>
              </div>
            `}
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;
  }

  // View 4: Mi Perfil View
  function renderProfile(currentUser, loans, offeredBooks) {
    const user = currentUser || {
      name: 'Laura María Gómez',
      email: 'lgomez24@cuc.edu.co',
      faculty: 'Facultad de Ingeniería',
      studentId: '202310499',
      role: 'Estudiante Activo'
    };

    return `
      <div class="dashboard-view" id="profile-view-root">
        ${renderHeader('profile', user)}

        <div class="view-container">
          <div class="view-header-bar">
            <div>
              <h1 class="view-title-main">Mi Perfil Académico</h1>
              <p class="view-subtitle-main">Gestión de préstamos activos, libros compartidos y lecturas en el campus</p>
            </div>
            <button class="btn-cta-secondary" id="btn-profile-offer" style="padding: 0.65rem 1.25rem; font-size: 0.875rem;">
              ${ICONS.plus} Compartir nuevo libro
            </button>
          </div>

          <div class="profile-grid">
            <!-- Left Profile Sidebar -->
            <div class="profile-card-sidebar">
              <div class="profile-avatar-lg">
                ${user.name.charAt(0)}
              </div>
              <h2 class="profile-name">${user.name}</h2>
              <span class="profile-role">${user.role}</span>

              <div class="profile-details-list">
                <div class="profile-detail-item">
                  <span class="profile-detail-label">Correo:</span>
                  <span class="profile-detail-value">${user.email}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">Código:</span>
                  <span class="profile-detail-value">${user.studentId}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">Programa:</span>
                  <span class="profile-detail-value">${user.faculty}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">Préstamos activos:</span>
                  <span class="profile-detail-value" style="color: var(--primary);">${loans.length}</span>
                </div>
                <div class="profile-detail-item">
                  <span class="profile-detail-label">Libros ofrecidos:</span>
                  <span class="profile-detail-value">${offeredBooks.length}</span>
                </div>
              </div>
            </div>

            <!-- Right Content Panels -->
            <div class="profile-content-panel">
              <!-- Active Loans Table -->
              <div class="section-card">
                <h3 class="section-card-title">
                  <span>Préstamos Activos</span>
                  <span style="font-size: 0.8125rem; font-weight: normal; color: var(--text-muted);">${loans.length} libros en posesión</span>
                </h3>

                <div class="table-responsive">
                  ${loans.length > 0 ? `
                    <table class="data-table">
                      <thead>
                        <tr>
                          <th>Título del Libro</th>
                          <th>Autor</th>
                          <th>Fecha Límite</th>
                          <th>Prestamista</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${loans.map(loan => `
                          <tr>
                            <td style="font-weight: 600;">${loan.bookTitle}</td>
                            <td>${loan.author}</td>
                            <td style="color: var(--primary); font-weight: 600;">${loan.dueDate}</td>
                            <td>${loan.lenderName}</td>
                            <td>
                              <button class="filter-pill" style="border-color: var(--primary); color: var(--primary);" data-return-loan-id="${loan.id}">
                                Devolver
                              </button>
                            </td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  ` : `
                    <p style="color: var(--text-muted); padding: 1.5rem 0;">No tienes libros en préstamo actualmente.</p>
                  `}
                </div>
              </div>

              <!-- Books Offered Table -->
              <div class="section-card">
                <h3 class="section-card-title">
                  <span>Libros que has compartido con la red CUC</span>
                  <button class="filter-pill active" id="btn-quick-add-book">${ICONS.plus} Añadir otro</button>
                </h3>

                <div class="table-responsive">
                  ${offeredBooks.length > 0 ? `
                    <table class="data-table">
                      <thead>
                        <tr>
                          <th>Título</th>
                          <th>Autor</th>
                          <th>Fecha Registro</th>
                          <th>Estado</th>
                          <th>Préstamos Totales</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${offeredBooks.map(item => `
                          <tr>
                            <td style="font-weight: 600;">${item.title}</td>
                            <td>${item.author}</td>
                            <td>${item.dateAdded}</td>
                            <td><span style="color: #0f6c38; font-weight: 500;">${item.status}</span></td>
                            <td style="text-align: center; font-weight: 600;">${item.timesBorrowed}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  ` : `
                    <p style="color: var(--text-muted); padding: 1.5rem 0;">Aún no has compartido libros con la comunidad.</p>
                  `}
                </div>
              </div>
            </div>
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;
  }

  // View 5: Events View
  function renderEvents(events, currentUser) {
    return `
      <div class="dashboard-view" id="events-view-root">
        ${renderHeader('events', currentUser)}

        <div class="view-container">
          <div class="view-header-bar">
            <div>
              <h1 class="view-title-main">Próximos Eventos y Ferias del Libro</h1>
              <p class="view-subtitle-main">Encuentros presenciales, ferias de trueque y talleres en el campus de la Universidad de la Costa</p>
            </div>
          </div>

          <div class="events-grid">
            ${events.map(evt => `
              <div class="event-card">
                <div class="event-date-badge">
                  ${ICONS.calendar} ${evt.date}
                </div>
                <h3 class="event-title">${evt.title}</h3>
                <div class="event-location">
                  ${ICONS.mapPin} ${evt.location}
                </div>
                <p class="event-desc">${evt.description}</p>
                <button 
                  class="btn-cta-primary ${evt.registered ? 'btn-cta-secondary' : ''}" 
                  style="margin-top: auto; padding: 0.65rem;"
                  data-event-id="${evt.id}"
                >
                  ${evt.registered ? '✓ Ya estás inscrito' : 'Inscribirme al evento'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        ${renderFooter()}
      </div>
    `;
  }

  // Modals Generator
  function renderModalContent(modalState) {
    if (!modalState.isOpen) return '';

    let contentHtml = '';

    switch (modalState.type) {
      case 'offerBook':
        contentHtml = `
          <h2 class="modal-title">Ofrecer un libro a la red CUC</h2>
          <p class="modal-subtitle">Comparte tus textos académicos con compañeros de la universidad.</p>
          <form id="form-offer-book" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="offer-title">Título del Libro</label>
              <input type="text" id="offer-title" class="form-input" style="padding-left: 0.85rem;" placeholder="Ej: Física Universitaria Vol. 1" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="offer-author">Autor(es)</label>
              <input type="text" id="offer-author" class="form-input" style="padding-left: 0.85rem;" placeholder="Ej: Sears & Zemansky" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="offer-category">Facultad / Categoría</label>
              <select id="offer-category" class="form-input" style="padding-left: 0.85rem;">
                <option value="Ingeniería">Ingeniería</option>
                <option value="Administración">Administración & Negocios</option>
                <option value="Derecho">Derecho</option>
                <option value="Psicología">Psicología</option>
                <option value="Ciencias Básicas">Ciencias Básicas</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="offer-condition">Estado del ejemplar</label>
              <select id="offer-condition" class="form-input" style="padding-left: 0.85rem;">
                <option value="Excelente estado">Excelente estado</option>
                <option value="Buen estado con leves notas">Buen estado con leves notas</option>
                <option value="Aceptable">Aceptable</option>
              </select>
            </div>
            <button type="submit" class="btn-primary-submit" style="margin-top: 0.5rem;">
              Publicar en el Catálogo
            </button>
          </form>
        `;
        break;

      case 'forgotPassword':
        contentHtml = `
          <h2 class="modal-title">Recuperar Contraseña</h2>
          <p class="modal-subtitle">Ingresa tu correo institucional @cuc.edu.co para enviarte un enlace seguro.</p>
          <form id="form-forgot-pwd" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="recovery-email">Correo Institucional</label>
              <div class="input-with-icon">
                <span class="input-icon">${ICONS.mail}</span>
                <input type="email" id="recovery-email" class="form-input" placeholder="usuario@cuc.edu.co" required />
              </div>
            </div>
            <button type="submit" class="btn-primary-submit">
              Enviar Instrucciones
            </button>
          </form>
        `;
        break;

      case 'requestAccess':
        contentHtml = `
          <h2 class="modal-title">Solicitar Acceso</h2>
          <p class="modal-subtitle">Registro para estudiantes y docentes activos de la Universidad de la Costa.</p>
          <form id="form-request-access" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="req-name">Nombre Completo</label>
              <input type="text" id="req-name" class="form-input" style="padding-left: 0.85rem;" placeholder="Tu nombre" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="req-email">Correo CUC</label>
              <input type="email" id="req-email" class="form-input" style="padding-left: 0.85rem;" placeholder="usuario@cuc.edu.co" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="req-id">Código Estudiantil / ID</label>
              <input type="text" id="req-id" class="form-input" style="padding-left: 0.85rem;" placeholder="202410000" required />
            </div>
            <button type="submit" class="btn-primary-submit">
              Completar Solicitud
            </button>
          </form>
        `;
        break;

      case 'howItWorks':
        contentHtml = `
          <h2 class="modal-title">¿Cómo funciona la plataforma?</h2>
          <p class="modal-subtitle">Intercambio circular y sostenible de textos académicos en la CUC.</p>
          <div style="font-size: 0.9375rem; line-height: 1.6; color: var(--on-surface-variant); display: flex; flex-direction: column; gap: 1rem;">
            <p><strong>1. Explora el Catálogo:</strong> Busca por materia, código o título para encontrar el libro que necesitas para tu semestre.</p>
            <p><strong>2. Préstamo Solidario:</strong> Solicita el libro con un solo clic. Coordinas la entrega en los puntos seguros de la Biblioteca Central CUC.</p>
            <p><strong>3. Comparte tus libros:</strong> Ofrece libros de semestres anteriores para acumular puntos ecológicos y reconocimientos académicos.</p>
          </div>
        `;
        break;

      case 'services':
        contentHtml = `
          <h2 class="modal-title">Servicios Académicos CUC</h2>
          <p class="modal-subtitle">Integración con los servicios de biblioteca y bienestar universitario.</p>
          <ul style="padding-left: 1.25rem; font-size: 0.9375rem; line-height: 1.8; color: var(--on-surface-variant);">
            <li>Préstamo interbibliotecario y reserva en salas de estudio.</li>
            <li>Acceso a bases de datos científicas internacionales.</li>
            <li>Asesoría en normas de citación y gestores bibliográficos.</li>
            <li>Digitalización responsable de apuntes y guías de cátedra.</li>
          </ul>
        `;
        break;

      case 'news':
        contentHtml = `
          <h2 class="modal-title">Noticias del Campus</h2>
          <p class="modal-subtitle">Novedades de la Universidad de la Costa (CUC).</p>
          <div style="font-size: 0.9375rem; line-height: 1.6; color: var(--on-surface-variant);">
            <p style="margin-bottom: 0.75rem;"><strong>📚 Inauguración del Rincón de Co-working:</strong> Se habilitaron 40 nuevos puestos en el Bloque 2 con estaciones de carga solar.</p>
            <p><strong>🌱 Meta Sostenible 2026:</strong> Ya se han evitado más de 1,200 impresiones de libros físicos gracias a la red de préstamos colaborativos.</p>
          </div>
        `;
        break;
    }

    return `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog">
          <button class="modal-close-btn" id="modal-close-btn" aria-label="Cerrar ventana">&times;</button>
          ${contentHtml}
        </div>
      </div>
    `;
  }

  return {
    showToast: showToast,
    renderLoginScreen: renderLoginScreen,
    renderDashboard: renderDashboard,
    renderCatalog: renderCatalog,
    renderProfile: renderProfile,
    renderEvents: renderEvents,
    renderModalContent: renderModalContent
  };
})();