/**
 * @file repository.js
 * Capa de datos y persistencia para la plataforma de intercambio académico de la Universidad de la Costa (CUC).
 */

const Repository = (function () {
  const STORAGE_KEYS = {
    BOOKS: 'cuc_libros_books',
    LOANS: 'cuc_libros_loans',
    EVENTS: 'cuc_libros_events',
    USERS: 'cuc_libros_users',
    OFFERED: 'cuc_libros_offered'
  };

  // Initial Sample Data
  const defaultBooks = [
    {
      id: 'book-1',
      title: 'Cálculo de Una Variable: Trascendentes Tempranas',
      author: 'James Stewart',
      category: 'Ingeniería',
      edition: '8va Edición (2022)',
      faculty: 'Facultad de Ingeniería',
      ownerName: 'Biblioteca Central CUC',
      isAvailable: true,
      condition: 'Excelente estado',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: 'Texto fundamental para el aprendizaje integral del cálculo diferencial e integral con aplicaciones en ciencias e ingeniería.'
    },
    {
      id: 'book-2',
      title: 'Estructuras de Datos y Algoritmos en Java',
      author: 'Robert Lafore',
      category: 'Ingeniería',
      edition: '4ta Edición',
      faculty: 'Ingeniería de Sistemas',
      ownerName: 'Carlos Mendoza (Estudiante)',
      isAvailable: true,
      condition: 'Muy bueno con anotaciones',
      coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      description: 'Guía paso a paso sobre listas enlazadas, árboles binarios, grafos y algoritmos de optimización para programación.'
    },
    {
      id: 'book-3',
      title: 'Principios de Administración Estratégica',
      author: 'Arthur A. Thompson & John E. Gamble',
      category: 'Administración',
      edition: '19na Edición',
      faculty: 'Ciencias Económicas',
      ownerName: 'María Fernanda Rivas',
      isAvailable: false,
      borrowedBy: 'Andrés Morales (Hasta 15 Sep)',
      condition: 'Como nuevo',
      coverUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      description: 'Análisis de competitividad, formulación y ejecución de estrategias corporativas en mercados emergentes.'
    },
    {
      id: 'book-4',
      title: 'Derecho Constitucional Colombiano',
      author: 'Rodrigo Uprimny & Manuel Sánchez',
      category: 'Derecho',
      edition: '5ta Edición Actualizada',
      faculty: 'Facultad de Derecho',
      ownerName: 'Valentina Castro',
      isAvailable: true,
      condition: 'Excelente',
      coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      description: 'Compendio doctrinario y jurisprudencial sobre la Constitución de 1991, derechos fundamentales y mecanismos de tutela.'
    },
    {
      id: 'book-5',
      title: 'Termodinámica para Ingenieros',
      author: 'Yunus A. Çengel & Michael A. Boles',
      category: 'Ingeniería',
      edition: '9na Edición',
      faculty: 'Ingeniería Ambiental y Civil',
      ownerName: 'Biblioteca Central CUC',
      isAvailable: true,
      condition: 'Bueno',
      coverUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      description: 'Leyes de la termodinámica, ciclos de potencia y refrigeración aplicados a sistemas energéticos sostenibles.'
    },
    {
      id: 'book-6',
      title: 'Psicología Organizacional y del Trabajo',
      author: 'Michael G. Aamodt',
      category: 'Psicología',
      edition: '7ma Edición',
      faculty: 'Ciencias Humanas',
      ownerName: 'Laura Gómez',
      isAvailable: true,
      condition: 'Impecable',
      coverUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      description: 'Enfoques contemporáneos sobre reclutamiento, liderazgo, motivación laboral y cultura institucional.'
    }
  ];

  const defaultEvents = [
    {
      id: 'evt-1',
      title: 'Gran Trueque de Libros y Revistas CUC 2026',
      date: '18 de Septiembre, 2026 • 9:00 AM - 4:00 PM',
      location: 'Plaza de Banderas, Bloque 2 - Campus CUC',
      description: 'Espacio presencial abierto para que estudiantes y docentes intercambien textos académicos, apuntes y literatura libremente.',
      registered: true
    },
    {
      id: 'evt-2',
      title: 'Seminario: Recursos Digitales y Búsqueda en Scopus/IEEE',
      date: '24 de Septiembre, 2026 • 2:00 PM - 5:00 PM',
      location: 'Auditorio Principal CUC & Transmisión Virtual',
      description: 'Aprende a maximizar el uso de bases de datos de alto impacto y gestores bibliográficos como Mendeley y Zotero.',
      registered: false
    },
    {
      id: 'evt-3',
      title: 'Club de Lectura Crítica: Ciencia y Sostenibilidad',
      date: '02 de Octubre, 2026 • 10:00 AM - 12:00 PM',
      location: 'Sala de Co-Working, Biblioteca Central',
      description: 'Debate mensual sobre publicaciones recientes en innovación energética y desarrollo sostenible en el Caribe.',
      registered: false
    }
  ];

  const defaultLoans = [
    {
      id: 'loan-1',
      bookId: 'book-1',
      bookTitle: 'Cálculo de Una Variable: Trascendentes Tempranas',
      author: 'James Stewart',
      loanDate: '2026-08-20',
      dueDate: '2026-09-10',
      status: 'Activo',
      lenderName: 'Biblioteca Central CUC'
    }
  ];

  const defaultOffered = [
    {
      id: 'off-1',
      title: 'Química General y Orgánica',
      author: 'Raymond Chang',
      dateAdded: '2026-08-15',
      status: 'En préstamo a Juan Pérez (Vence 12 Sep)',
      timesBorrowed: 3
    },
    {
      id: 'off-2',
      title: 'Metodología de la Investigación Científica',
      author: 'Roberto Hernández Sampieri',
      dateAdded: '2026-08-25',
      status: 'Disponible en red',
      timesBorrowed: 1
    }
  ];

  // Helper storage functions
  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Error reading from localStorage', e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }
  }

  // Initialize DB if empty
  if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
    setStorage(STORAGE_KEYS.BOOKS, defaultBooks);
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    setStorage(STORAGE_KEYS.EVENTS, defaultEvents);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOANS)) {
    setStorage(STORAGE_KEYS.LOANS, defaultLoans);
  }
  if (!localStorage.getItem(STORAGE_KEYS.OFFERED)) {
    setStorage(STORAGE_KEYS.OFFERED, defaultOffered);
  }

  return {
    getBooks: function () {
      return getStorage(STORAGE_KEYS.BOOKS, defaultBooks);
    },

    getBookById: function (id) {
      const books = this.getBooks();
      return books.find(b => b.id === id) || null;
    },

    searchBooks: function (query = '', category = 'all') {
      const books = this.getBooks();
      const q = query.toLowerCase().trim();

      return books.filter(book => {
        const matchesCategory = category === 'all' || book.category.toLowerCase() === category.toLowerCase();
        const matchesQuery = !q ||
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          (book.faculty && book.faculty.toLowerCase().includes(q));

        return matchesCategory && matchesQuery;
      });
    },

    addBook: function (newBook) {
      const books = this.getBooks();
      const bookObj = {
        id: 'book-' + Date.now(),
        isAvailable: true,
        coverUrl: newBook.coverUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
        ...newBook
      };
      books.unshift(bookObj);
      setStorage(STORAGE_KEYS.BOOKS, books);

      // Also record in user offered books
      const offered = this.getUserOfferedBooks();
      offered.unshift({
        id: 'off-' + Date.now(),
        title: bookObj.title,
        author: bookObj.author,
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'Disponible en red',
        timesBorrowed: 0
      });
      setStorage(STORAGE_KEYS.OFFERED, offered);

      return bookObj;
    },

    borrowBook: function (bookId, borrowerName = 'Laura Gómez') {
      const books = this.getBooks();
      const bookIndex = books.findIndex(b => b.id === bookId);
      if (bookIndex === -1) return { success: false, message: 'Libro no encontrado' };

      if (!books[bookIndex].isAvailable) {
        return { success: false, message: 'Este libro ya se encuentra en préstamo activo' };
      }

      books[bookIndex].isAvailable = false;
      books[bookIndex].borrowedBy = borrowerName;
      setStorage(STORAGE_KEYS.BOOKS, books);

      // Add to loans
      const loans = this.getUserLoans();
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 15);

      loans.unshift({
        id: 'loan-' + Date.now(),
        bookId: bookId,
        bookTitle: books[bookIndex].title,
        author: books[bookIndex].author,
        loanDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'Activo',
        lenderName: books[bookIndex].ownerName
      });
      setStorage(STORAGE_KEYS.LOANS, loans);

      return { success: true, message: '¡Préstamo concedido con éxito! Fecha límite de entrega: ' + dueDate.toLocaleDateString() };
    },

    returnLoan: function (loanId) {
      const loans = this.getUserLoans();
      const loan = loans.find(l => l.id === loanId);
      if (!loan) return { success: false, message: 'Préstamo no encontrado' };

      // Update book status
      const books = this.getBooks();
      const book = books.find(b => b.id === loan.bookId);
      if (book) {
        book.isAvailable = true;
        delete book.borrowedBy;
        setStorage(STORAGE_KEYS.BOOKS, books);
      }

      const updatedLoans = loans.filter(l => l.id !== loanId);
      setStorage(STORAGE_KEYS.LOANS, updatedLoans);

      return { success: true, message: 'Libro devuelto satisfactoriamente al catálogo.' };
    },

    getUserLoans: function () {
      return getStorage(STORAGE_KEYS.LOANS, defaultLoans);
    },

    getUserOfferedBooks: function () {
      return getStorage(STORAGE_KEYS.OFFERED, defaultOffered);
    },

    getEvents: function () {
      return getStorage(STORAGE_KEYS.EVENTS, defaultEvents);
    },

    toggleEventRegistration: function (eventId) {
      const events = this.getEvents();
      const event = events.find(e => e.id === eventId);
      if (event) {
        event.registered = !event.registered;
        setStorage(STORAGE_KEYS.EVENTS, events);
        return { success: true, registered: event.registered };
      }
      return { success: false };
    },

    validateCredentials: function (email, password) {
      if (!email || !email.includes('@')) {
        return { valid: false, message: 'Por favor ingresa un correo institucional válido.' };
      }
      if (!password || password.length < 4) {
        return { valid: false, message: 'La contraseña debe tener al menos 4 caracteres.' };
      }
      return {
        valid: true,
        user: {
          name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
          email: email.toLowerCase(),
          faculty: 'Facultad de Ingeniería',
          studentId: '202310499',
          role: 'Estudiante Activo'
        }
      };
    }
  };
})();
