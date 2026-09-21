/* ============================================================
   CLAMMY CAB (PTY) LTD — Application Script
   Offline-first. All data stored in localStorage.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. CONSTANTS & DEFAULTS
     ---------------------------------------------------------- */
  const STORE_KEY = 'clammycab_data_v1';
  const SESSION_KEY = 'clammycab_admin_session';

  const DEFAULTS = {
    business: {
      name: 'CLAMMY CAB (PTY) LTD',
      shortName: 'CLAMMY CAB',
      suffix: '(PTY) LTD · Sanitation',
      tagline: 'Professional sanitation & cleaning services in Soweto, South Africa.',
      phone: '+27739782453',
      whatsapp: '+27739782453',
      email: 'info@clammycab.co.za',
      address: '1039, Soweto, South Africa',
      hours: 'Mon – Sat: 07:00 – 18:00',
      about:
        'CLAMMY CAB (PTY) LTD is a proudly South African sanitation and cleaning company based in ' +
        'Soweto, 1039. We specialise in portable toilet hire, septic tank and pit latrine emptying, ' +
        'deep cleaning, high-pressure washing and hygiene supply — serving households, businesses, ' +
        'schools, churches, events and municipalities.',
      password: 'admin123'
    },

    images: {
      logo: '',
      hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=80',
      about: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80'
    },

    services: [
      {
        id: 's1',
        title: 'Portable Toilet Hire',
        price: 'From R450 / day',
        desc: 'Clean, sanitised portable toilets delivered, set up and collected for events, construction sites and gatherings. Includes paper, sanitiser and weekly servicing.',
        img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's2',
        title: 'Septic Tank & Pit Emptying',
        price: 'From R850 / load',
        desc: 'Fast vacuum tanker emptying of septic tanks, pit latrines and conservancy tanks. Fully compliant disposal with no mess left behind.',
        img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's3',
        title: 'Deep Cleaning & Disinfection',
        price: 'From R600 / room',
        desc: 'Hospital-grade deep cleaning and disinfection for homes, offices, clinics, schools and ablution blocks. Kills germs and removes odours.',
        img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's4',
        title: 'High-Pressure Washing',
        price: 'From R500 / area',
        desc: 'Pavements, driveways, walls, bins and refuse areas blasted clean with industrial pressure equipment and eco-friendly detergents.',
        img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's5',
        title: 'Hygiene & Consumables Supply',
        price: 'Quote on request',
        desc: 'Bulk supply and refilling of hand sanitiser, toilet paper, bin liners, air fresheners and cleaning chemicals for your business.',
        img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 's6',
        title: 'Event Sanitation Packages',
        price: 'From R1 800 / event',
        desc: 'Complete sanitation setup for weddings, funerals, church gatherings and festivals — toilets, handwash stations, bins and on-site attendants.',
        img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80'
      }
    ],

    gallery: [
      { id: 'g1', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80', caption: 'Deep cleaning team on site' },
      { id: 'g2', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80', caption: 'Sanitised portable toilets' },
      { id: 'g3', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80', caption: 'Vacuum tanker emptying' },
      { id: 'g4', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80', caption: 'High-pressure washing' },
      { id: 'g5', img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80', caption: 'Hygiene supplies delivered' },
      { id: 'g6', img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80', caption: 'Event sanitation setup' }
    ]
  };

  /* ----------------------------------------------------------
     2. STATE
     ---------------------------------------------------------- */
  let state = null;
  let pendingServiceImage = null;   // dataURL awaiting save
  let pendingEditId = null;
  let editExistingImage = null;     // keep old image if no new upload

  /* ----------------------------------------------------------
     3. UTILITIES
     ---------------------------------------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function digitsOnly(str) {
    return String(str || '').replace(/[^0-9]/g, '');
  }

  function prettyPhone(raw) {
    const d = digitsOnly(raw);
    if (d.length === 11 && d.startsWith('27')) {
      return '+27 ' + d.slice(2, 4) + ' ' + d.slice(4, 7) + ' ' + d.slice(7);
    }
    if (d.length === 10) {
      return d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
    }
    return raw || '';
  }

  function waLink(message) {
    const num = digitsOnly(state.business.whatsapp);
    const txt = message ? '?text=' + encodeURIComponent(message) : '';
    return 'https://wa.me/' + num + txt;
  }

  function telLink() {
    return 'tel:' + (state.business.phone || '').replace(/\s/g, '');
  }

  /* ---------- toast ---------- */
  let toastTimer = null;
  function toast(msg, type) {
    const el = $('#toast');
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.className = 'toast' + (type ? ' ' + type : '');
    }, 2600);
  }

  /* ----------------------------------------------------------
     4. STORAGE
     ---------------------------------------------------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return deepClone(DEFAULTS);

      const parsed = JSON.parse(raw);
      return {
        business: Object.assign({}, DEFAULTS.business, parsed.business || {}),
        images:   Object.assign({}, DEFAULTS.images,   parsed.images   || {}),
        services: Array.isArray(parsed.services) ? parsed.services : deepClone(DEFAULTS.services),
        gallery:  Array.isArray(parsed.gallery)  ? parsed.gallery  : deepClone(DEFAULTS.gallery)
      };
    } catch (err) {
      console.warn('Could not read saved data, using defaults.', err);
      return deepClone(DEFAULTS);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      return true;
    } catch (err) {
      console.error('Save failed (storage full?)', err);
      toast('Storage is full. Remove a few images and try again.', 'err');
      return false;
    }
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /* ----------------------------------------------------------
     5. IMAGE HANDLING (resize + compress to dataURL)
     ---------------------------------------------------------- */
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function compressImage(file, maxW, maxH, quality) {
    maxW = maxW || 1200;
    maxH = maxH || 1200;
    quality = quality || 0.78;

    const dataURL = await fileToDataURL(file);
    const img = await loadImage(dataURL);

    let { width, height } = img;
    const ratio = Math.min(maxW / width, maxH / height, 1);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const isPNG = file.type === 'image/png';
    return canvas.toDataURL(isPNG ? 'image/png' : 'image/jpeg', quality);
  }

  /* ----------------------------------------------------------
     6. RENDER — BUSINESS INFO
     ---------------------------------------------------------- */
  function renderBusiness() {
    const b = state.business;

    document.title = b.name + ' | Sanitation & Cleaning Services in Soweto';

    $('#navName').textContent = b.shortName || b.name;
    $('#navSuffix').textContent = b.suffix || '';
    $('#footerName').textContent = b.name;
    $('#footerTag').textContent = b.tagline || '';
    $('#aboutText').textContent = b.about || '';

    $('#contactPhone').textContent = prettyPhone(b.phone);
    $('#contactWhats').textContent = prettyPhone(b.whatsapp);
    $('#contactAddress').textContent = b.address;
    $('#contactHours').textContent = b.hours;
    $('#contactEmail').textContent = b.email;

    $('#footerPhone').textContent = prettyPhone(b.phone);
    $('#footerWhats').textContent = prettyPhone(b.whatsapp);
    $('#footerAddress').textContent = b.address;
    $('#footerEmail').textContent = b.email;

    // links
    $('#heroWa').href = waLink('Hello CLAMMY CAB, I would like to enquire about your sanitation services.');
    $('#heroCardWa').href = waLink('Hello CLAMMY CAB, I would like a free quote please.');
    $('#aboutWa').href = waLink('Hello CLAMMY CAB, I would like to know more about your company.');
    $('#servicesWa').href = waLink('Hello CLAMMY CAB, I need a custom sanitation quote.');
    $('#navWaMobile').href = waLink('Hello CLAMMY CAB, I would like to enquire about your services.');
    $('#contactWa').href = waLink('Hello CLAMMY CAB, I would like to get in touch.');
    $('#fabWa').href = waLink('Hello CLAMMY CAB, I would like to enquire about your services.');
    $('#footerWa').href = waLink('Hello CLAMMY CAB, I would like to enquire about your services.');

    const tel = telLink();
    $('#navCall').href = tel;
    $('#heroCall').href = tel;
    $('#contactCall').href = tel;
    $('#footerCall').href = tel;

    // logo
    applyImageToElement($('#navLogo'), state.images.logo);
    applyImageToElement($('#footerLogo'), state.images.logo);
    const fb = $('#logoFallback');
    if (fb) fb.style.display = state.images.logo ? 'none' : 'grid';
  }

  function applyImageToElement(imgEl, src) {
    if (!imgEl) return;
    if (src) {
      imgEl.src = src;
      imgEl.style.display = '';
    } else {
      imgEl.removeAttribute('src');
      imgEl.style.display = 'none';
    }
  }

  /* ----------------------------------------------------------
     7. RENDER — HERO & ABOUT IMAGES
     ---------------------------------------------------------- */
  function renderBrandImages() {
    const heroImg = $('#heroImg');
    const aboutImg = $('#aboutImg');

    heroImg.src = state.images.hero || DEFAULTS.images.hero;
    aboutImg.src = state.images.about || DEFAULTS.images.about;

    const heroPrev = $('#heroPreview');
    const aboutPrev = $('#aboutPreview');
    const logoPrev = $('#logoPreview');

    if (heroPrev)  heroPrev.innerHTML  = previewHTML(state.images.hero);
    if (aboutPrev) aboutPrev.innerHTML = previewHTML(state.images.about);
    if (logoPrev)  logoPrev.innerHTML  = previewHTML(state.images.logo);
  }

  function previewHTML(src) {
    return src ? '<img src="' + src + '" alt="preview">' : '';
  }

  /* ----------------------------------------------------------
     8. RENDER — SERVICES
     ---------------------------------------------------------- */
  function renderServices() {
    const grid = $('#servicesGrid');
    if (!grid) return;

    if (!state.services.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No services added yet. Open the Admin panel to add your first service.</p>';
      return;
    }

    grid.innerHTML = state.services.map(function (s) {
      const msg = 'Hello CLAMMY CAB, I am interested in your "' + s.title + '" service (' + s.price + '). Please send me more information.';
      return (
        '<article class="service-card reveal">' +
          '<div class="service-img">' +
            '<img src="' + escapeHTML(s.img || DEFAULTS.services[0].img) + '" alt="' + escapeHTML(s.title) + '" loading="lazy">' +
            '<span class="service-price">' + escapeHTML(s.price) + '</span>' +
          '</div>' +
          '<div class="service-body">' +
            '<h3>' + escapeHTML(s.title) + '</h3>' +
            '<p>' + escapeHTML(s.desc) + '</p>' +
            '<a class="service-btn" target="_blank" rel="noopener" href="' + waLink(msg) + '">' +
              '<svg class="ico-fill" viewBox="0 0 24 24"><use href="#i-wa"/></svg> Enquire on WhatsApp' +
            '</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    observeReveals();
  }

  function renderQuickServices() {
    const box = $('#heroQuickServices');
    if (!box) return;

    const picks = state.services.slice(0, 4);
    if (!picks.length) {
      box.innerHTML = '';
      return;
    }

    box.innerHTML = picks.map(function (s) {
      const msg = 'Hello CLAMMY CAB, I am interested in your "' + s.title + '" service. Please send me a quote.';
      return (
        '<a class="hero-card-item" target="_blank" rel="noopener" href="' + waLink(msg) + '">' +
          '<span>' + escapeHTML(s.title) + '</span>' +
          '<span>' + escapeHTML(s.price) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderServiceSelect() {
    const sel = $('#cfService');
    if (!sel) return;

    sel.innerHTML = '<option value="">Select a service…</option>' +
      state.services.map(function (s) {
        return '<option value="' + escapeHTML(s.title) + '">' + escapeHTML(s.title) + '</option>';
      }).join('') +
      '<option value="Other">Other / Not sure</option>';
  }

  function renderFooterServices() {
    const box = $('#footerServices');
    if (!box) return;

    box.innerHTML = state.services.slice(0, 5).map(function (s) {
      return '<a href="#services">' + escapeHTML(s.title) + '</a>';
    }).join('') || '<a href="#services">Our Services</a>';
  }

  /* ----------------------------------------------------------
     9. RENDER — GALLERY
     ---------------------------------------------------------- */
  function renderGallery() {
    const grid = $('#galleryGrid');
    if (!grid) return;

    if (!state.gallery.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No gallery images yet. Upload some in the Admin panel.</p>';
      return;
    }

    grid.innerHTML = state.gallery.map(function (g, i) {
      return (
        '<figure class="gallery-item reveal" data-index="' + i + '">' +
          '<img src="' + escapeHTML(g.img) + '" alt="' + escapeHTML(g.caption || 'Gallery image') + '" loading="lazy">' +
          (g.caption ? '<figcaption class="gallery-cap">' + escapeHTML(g.caption) + '</figcaption>' : '') +
        '</figure>'
      );
    }).join('');

    observeReveals();
  }

  /* ----------------------------------------------------------
     10. RENDER — ADMIN LISTS
     ---------------------------------------------------------- */
  function renderAdminServices() {
    const list = $('#adminServiceList');
    const count = $('#svcCount');
    if (!list) return;

    count.textContent = state.services.length;

    if (!state.services.length) {
      list.innerHTML = '<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:20px 0;">No services yet.</p>';
      return;
    }

    list.innerHTML = state.services.map(function (s) {
      return (
        '<div class="admin-item">' +
          '<div class="admin-item-thumb"><img src="' + escapeHTML(s.img) + '" alt=""></div>' +
          '<div class="admin-item-info">' +
            '<b>' + escapeHTML(s.title) + '</b>' +
            '<small>' + escapeHTML(s.price) + '</small>' +
            '<p>' + escapeHTML(s.desc) + '</p>' +
          '</div>' +
          '<div class="admin-item-actions">' +
            '<button class="icon-btn edit" data-edit="' + s.id + '" title="Edit">' +
              '<svg class="ico" viewBox="0 0 24 24"><use href="#i-edit"/></svg>' +
            '</button>' +
            '<button class="icon-btn del" data-del="' + s.id + '" title="Delete">' +
              '<svg class="ico" viewBox="0 0 24 24"><use href="#i-trash"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderAdminGallery() {
    const box = $('#adminGallery');
    const count = $('#galCount');
    if (!box) return;

    count.textContent = state.gallery.length;

    if (!state.gallery.length) {
      box.innerHTML = '<p style="color:var(--muted);font-size:.88rem;grid-column:1/-1;text-align:center;padding:16px 0;">No images yet.</p>';
      return;
    }

    box.innerHTML = state.gallery.map(function (g) {
      return (
        '<div class="admin-gal-item">' +
          '<img src="' + escapeHTML(g.img) + '" alt="">' +
          '<button class="admin-gal-del" data-galdel="' + g.id + '" title="Delete">' +
            '<svg class="ico" viewBox="0 0 24 24"><use href="#i-x"/></svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');
  }

  function renderBusinessForm() {
    const b = state.business;
    setVal('#bizName', b.name);
    setVal('#bizTagline', b.suffix);
    setVal('#bizPhone', b.phone);
    setVal('#bizWhats', b.whatsapp);
    setVal('#bizEmail', b.email);
    setVal('#bizAddress', b.address);
    setVal('#bizHours', b.hours);
    setVal('#bizAbout', b.about);
    setVal('#bizPass', b.password);
  }

  function setVal(sel, value) {
    const el = $(sel);
    if (el) el.value = value == null ? '' : value;
  }

  /* ----------------------------------------------------------
     11. RENDER ALL
     ---------------------------------------------------------- */
  function renderAll() {
    renderBusiness();
    renderBrandImages();
    renderServices();
    renderQuickServices();
    renderServiceSelect();
    renderFooterServices();
    renderGallery();
    renderAdminServices();
    renderAdminGallery();
    renderBusinessForm();
    observeReveals();
  }

  /* ----------------------------------------------------------
     12. SCROLL REVEAL
     ---------------------------------------------------------- */
  let revealObserver = null;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(el => el.classList.add('in'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     13. NAVIGATION
     ---------------------------------------------------------- */
  function initNav() {
    const nav = $('#nav');
    const burger = $('#hamburger');
    const links = $('#navLinks');

    function onScroll() {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      spyScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        links.classList.remove('open');
        burger.classList.remove('active');
      }
    });
  }

  function spyScroll() {
    const sections = ['home', 'about', 'services', 'gallery', 'contact'];
    const scrollPos = window.scrollY + 140;

    let current = 'home';
    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });

    $$('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ----------------------------------------------------------
     14. LIGHTBOX
     ---------------------------------------------------------- */
  function initLightbox() {
    const lb = $('#lightbox');
    const img = $('#lbImg');
    const cap = $('#lbCaption');
    const close = $('#lbClose');

    $('#galleryGrid').addEventListener('click', function (e) {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const idx = parseInt(item.dataset.index, 10);
      const g = state.gallery[idx];
      if (!g) return;

      img.src = g.img;
      cap.textContent = g.caption || '';
      lb.classList.add('open');
      document.body.classList.add('no-scroll');
    });

    function closeLb() {
      lb.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    close.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLb();
        closeAdmin();
      }
    });
  }

  /* ----------------------------------------------------------
     15. CONTACT FORM
     ---------------------------------------------------------- */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = $('#cfName').value.trim();
      const service = $('#cfService').value;
      const msg = $('#cfMsg').value.trim();

      if (!name) {
        toast('Please enter your name.', 'err');
        $('#cfName').focus();
        return;
      }

      const lines = [
        'Hello CLAMMY CAB (PTY) LTD,',
        '',
        'Name: ' + name,
        'Service: ' + (service || 'Not specified'),
        msg ? 'Message: ' + msg : ''
      ].filter(Boolean);

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
      toast('Opening WhatsApp…', 'ok');
      form.reset();
    });
  }

  /* ----------------------------------------------------------
     16. DROPZONE HELPER
     ---------------------------------------------------------- */
  function setupDropzone(zoneEl, onFiles) {
    if (!zoneEl) return;
    const input = zoneEl.querySelector('input[type=file]');

    zoneEl.addEventListener('click', function (e) {
      if (e.target === input) return;
      input.click();
    });

    input.addEventListener('change', function () {
      if (input.files && input.files.length) onFiles(Array.from(input.files));
      input.value = '';
    });

    ['dragenter', 'dragover'].forEach(function (ev) {
      zoneEl.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        zoneEl.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(function (ev) {
      zoneEl.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (ev === 'dragleave' && zoneEl.contains(e.relatedTarget)) return;
        zoneEl.classList.remove('dragover');
      });
    });

    zoneEl.addEventListener('drop', function (e) {
      const dt = e.dataTransfer;
      if (!dt || !dt.files || !dt.files.length) return;
      const files = Array.from(dt.files).filter(f => f.type.startsWith('image/'));
      if (files.length) onFiles(files);
    });
  }

  /* ----------------------------------------------------------
     17. ADMIN — LOGIN / PANEL
     ---------------------------------------------------------- */
  function openAdmin() {
    $('#admin').classList.add('open');
    document.body.classList.add('no-scroll');

    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      showDashboard();
    } else {
      $('#adminLogin').hidden = false;
      $('#adminDash').hidden = true;
      $('#logoutBtn').hidden = true;
      setTimeout(() => $('#adminPass').focus(), 200);
    }
  }

  function closeAdmin() {
    $('#admin').classList.remove('open');
    document.body.classList.remove('no-scroll');
    $('#loginError').textContent = '';
    $('#adminPass').value = '';
  }

  function showDashboard() {
    $('#adminLogin').hidden = true;
    $('#adminDash').hidden = false;
    $('#logoutBtn').hidden = false;
    renderAdminServices();
    renderAdminGallery();
    renderBusinessForm();
    renderBrandImages();
  }

  function initAdmin() {
    $('#adminLink').addEventListener('click', openAdmin);
    $('#adminClose').addEventListener('click', closeAdmin);

    $('#admin').addEventListener('click', function (e) {
      if (e.target === $('#admin')) closeAdmin();
    });

    /* login */
    function tryLogin() {
      const pass = $('#adminPass').value;
      if (pass === state.business.password) {
        sessionStorage.setItem(SESSION_KEY, '1');
        $('#loginError').textContent = '';
        $('#adminPass').value = '';
        showDashboard();
        toast('Welcome back, owner.', 'ok');
      } else {
        $('#loginError').textContent = 'Incorrect password. Please try again.';
        $('#adminPass').select();
      }
    }

    $('#loginBtn').addEventListener('click', tryLogin);
    $('#adminPass').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryLogin();
    });

    $('#logoutBtn').addEventListener('click', function () {
      sessionStorage.removeItem(SESSION_KEY);
      $('#adminLogin').hidden = false;
      $('#adminDash').hidden = true;
      $('#logoutBtn').hidden = true;
      toast('Logged out.');
    });

    /* tabs */
    $$('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        const name = tab.dataset.tab;
        $$('.tab').forEach(t => t.classList.toggle('active', t === tab));
        $$('.tab-panel').forEach(function (p) {
          p.classList.toggle('active', p.dataset.panel === name);
        });
      });
    });

    /* wipe */
    $('#wipeBtn').addEventListener('click', function () {
      if (!confirm('This will erase ALL saved content and restore the original demo data. Continue?')) return;
      localStorage.removeItem(STORE_KEY);
      state = loadState();
      renderAll();
      toast('Website data has been reset.', 'ok');
    });

    /* ---------- services CRUD ---------- */
    $('#svcSave').addEventListener('click', saveService);
    $('#svcReset').addEventListener('click', resetServiceForm);

    $('#adminServiceList').addEventListener('click', function (e) {
      const editBtn = e.target.closest('[data-edit]');
      const delBtn = e.target.closest('[data-del]');

      if (editBtn) editService(editBtn.dataset.edit);

      if (delBtn) {
        const id = delBtn.dataset.del;
        const svc = state.services.find(s => s.id === id);
        if (!svc) return;
        if (!confirm('Delete "' + svc.title + '"?')) return;
        state.services = state.services.filter(s => s.id !== id);
        if (saveState()) {
          renderServices();
          renderQuickServices();
          renderServiceSelect();
          renderFooterServices();
          renderAdminServices();
          resetServiceForm();
          toast('Service deleted.', 'ok');
        }
      }
    });

    /* service image dropzone */
    setupDropzone($('#svcDrop'), function (files) {
      handleSingleImage(files[0], 1000, 0.80, function (dataURL) {
        pendingServiceImage = dataURL;
        $('#svcPreview').innerHTML = '<img src="' + dataURL + '" alt="preview">';
      });
    });

    /* ---------- gallery upload ---------- */
    setupDropzone($('#galDrop'), async function (files) {
      toast('Processing ' + files.length + ' image(s)…');
      let added = 0;
      for (const file of files) {
        try {
          const dataURL = await compressImage(file, 1000, 1000, 0.75);
          state.gallery.push({
            id: uid('g'),
            img: dataURL,
            caption: file.name.replace(/\.[^.]+$/, '')
          });
          added++;
        } catch (err) {
          console.warn('Could not process', file.name, err);
        }
      }
      if (added && saveState()) {
        renderGallery();
        renderAdminGallery();
        toast(added + ' image(s) added to gallery.', 'ok');
      } else {
        toast('No images were added.', 'err');
      }
    });

    $('#adminGallery').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-galdel]');
      if (!btn) return;
      const id = btn.dataset.galdel;
      if (!confirm('Remove this image from the gallery?')) return;
      state.gallery = state.gallery.filter(g => g.id !== id);
      if (saveState()) {
        renderGallery();
        renderAdminGallery();
        toast('Image removed.', 'ok');
      }
    });

    /* ---------- branding dropzones ---------- */
    setupDropzone($('#logoDrop'), function (files) {
      handleSingleImage(files[0], 420, 0.92, function (dataURL) {
        state.images.logo = dataURL;
        if (saveState()) {
          renderBusiness();
          renderBrandImages();
          toast('Logo updated.', 'ok');
        }
      });
    });

    setupDropzone($('#heroDrop'), function (files) {
      handleSingleImage(files[0], 1800, 0.78, function (dataURL) {
        state.images.hero = dataURL;
        if (saveState()) {
          renderBrandImages();
          toast('Hero background updated.', 'ok');
        }
      });
    });

    setupDropzone($('#aboutDrop'), function (files) {
      handleSingleImage(files[0], 1200, 0.80, function (dataURL) {
        state.images.about = dataURL;
        if (saveState()) {
          renderBrandImages();
          toast('About image updated.', 'ok');
        }
      });
    });

    /* reset buttons */
    $$('[data-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const which = btn.dataset.reset;
        if (which === 'logo') state.images.logo = '';
        if (which === 'hero') state.images.hero = DEFAULTS.images.hero;
        if (which === 'about') state.images.about = DEFAULTS.images.about;

        if (saveState()) {
          renderBusiness();
          renderBrandImages();
          toast('Restored to default.', 'ok');
        }
      });
    });

    /* ---------- business info ---------- */
    $('#bizSave').addEventListener('click', function () {
      const b = state.business;

      b.name      = $('#bizName').value.trim() || DEFAULTS.business.name;
      b.suffix    = $('#bizTagline').value.trim();
      b.phone     = $('#bizPhone').value.trim();
      b.whatsapp  = $('#bizWhats').value.trim();
      b.email     = $('#bizEmail').value.trim();
      b.address   = $('#bizAddress').value.trim();
      b.hours     = $('#bizHours').value.trim();
      b.about     = $('#bizAbout').value.trim();
      b.password  = $('#bizPass').value.trim() || 'admin123';
      b.shortName = b.name.split('(')[0].trim() || b.name;
      b.tagline   = DEFAULTS.business.tagline;

      if (saveState()) {
        renderAll();
        toast('Business information saved.', 'ok');
      }
    });

    $('#bizReset').addEventListener('click', function () {
      renderBusinessForm();
      toast('Changes discarded.');
    });
  }

  /* ---------- helpers for service form ---------- */
  function handleSingleImage(file, maxSize, quality, cb) {
    if (!file || !file.type.startsWith('image/')) {
      toast('Please choose a valid image file.', 'err');
      return;
    }
    compressImage(file, maxSize, maxSize, quality)
      .then(cb)
      .catch(function (err) {
        console.error(err);
        toast('Could not process that image.', 'err');
      });
  }

  function saveService() {
    const title = $('#svcTitle').value.trim();
    const price = $('#svcPrice').value.trim();
    const desc  = $('#svcDesc').value.trim();

    if (!title) { toast('Please enter a service name.', 'err'); $('#svcTitle').focus(); return; }
    if (!price) { toast('Please enter a price.', 'err'); $('#svcPrice').focus(); return; }
    if (!desc)  { toast('Please enter a description.', 'err'); $('#svcDesc').focus(); return; }

    const id = $('#svcId').value;

    if (id) {
      const svc = state.services.find(s => s.id === id);
      if (!svc) return;
      svc.title = title;
      svc.price = price;
      svc.desc = desc;
      if (pendingServiceImage) svc.img = pendingServiceImage;
    } else {
      state.services.push({
        id: uid('s'),
        title: title,
        price: price,
        desc: desc,
        img: pendingServiceImage || DEFAULTS.services[0].img
      });
    }

    if (saveState()) {
      renderServices();
      renderQuickServices();
      renderServiceSelect();
      renderFooterServices();
      renderAdminServices();
      resetServiceForm();
      toast(id ? 'Service updated.' : 'Service added.', 'ok');
    }
  }

  function editService(id) {
    const svc = state.services.find(s => s.id === id);
    if (!svc) return;

    $('#svcId').value = svc.id;
    $('#svcTitle').value = svc.title;
    $('#svcPrice').value = svc.price;
    $('#svcDesc').value = svc.desc;

    pendingServiceImage = null;
    editExistingImage = svc.img;
    $('#svcPreview').innerHTML = svc.img ? '<img src="' + svc.img + '" alt="preview">' : '';
    $('#serviceFormTitle').textContent = 'Edit Service';

    $('#svcTitle').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetServiceForm() {
    $('#svcId').value = '';
    $('#svcTitle').value = '';
    $('#svcPrice').value = '';
    $('#svcDesc').value = '';
    $('#svcPreview').innerHTML = '';
    pendingServiceImage = null;
    editExistingImage = null;
    $('#serviceFormTitle').textContent = 'Add New Service';
  }

  /* ----------------------------------------------------------
     18. BOOTSTRAP
     ---------------------------------------------------------- */
  function init() {
    state = loadState();

    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    renderAll();
    initNav();
    initLightbox();
    initContactForm();
    initAdmin();

    // subtle parallax on hero image
    const heroImg = $('#heroImg');
    if (heroImg && window.matchMedia('(min-width: 900px)').matches) {
      window.addEventListener('scroll', function () {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroImg.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.06)';
        }
      }, { passive: true });
    }

    console.log('%cCLAMMY CAB (PTY) LTD', 'color:#0ea5e9;font-weight:900;font-size:14px;');
    console.log('Admin panel: click “Admin” in the menu. Default password: admin123');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();