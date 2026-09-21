/* ============================================================
   CLAMMY CAB (PTY) LTD — Application Script
   Dual business: Sanitation + Transport (Gauteng <-> Tzaneen)
   Offline-first. All data stored in localStorage.
   ============================================================ */

(function () {
  'use strict';

  const STORE_KEY   = 'clammycab_data_v2';
  const SESSION_KEY = 'clammycab_admin_session';

  /* ==========================================================
     DEFAULTS
     ========================================================== */
  const DEFAULTS = {
    business: {
      name: 'CLAMMY CAB (PTY) LTD',
      shortName: 'CLAMMY CAB',
      suffix: 'Sanitation · Transport',
      tagline: 'Sanitation & cleaning in Soweto, plus door-to-door transport between Gauteng and Tzaneen.',
      phone: '+27739782453',
      whatsapp: '+27739782453',
      email: 'clammymaholobela@gmail.com',
      address: '1039, Soweto, South Africa',
      hours: 'Mon – Sat: 07:00 – 18:00',
      about:
        'CLAMMY CAB (PTY) LTD is a proudly South African company based in Soweto, 1039. ' +
        'We operate two divisions — a professional sanitation & cleaning service ' +
        '(portable toilet hire, septic & pit emptying, deep cleaning, high-pressure washing) ' +
        'and a dedicated transport & capping service running door-to-door between Gauteng ' +
        'and Tzaneen, Limpopo.',
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

    transportServices: [
      {
        id: 't1',
        title: 'Gauteng to Tzaneen — Door to Door',
        price: 'From R350 / passenger',
        desc: 'Daily scheduled trips from Johannesburg, Soweto and Pretoria directly to Tzaneen. Door-to-door pickup and drop-off with luggage included.',
        img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 't2',
        title: 'Tzaneen to Gauteng — Return Trips',
        price: 'From R350 / passenger',
        desc: 'Comfortable return journeys from Tzaneen back to Gauteng. Book early to secure your seat. Door-to-door service available.',
        img: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 't3',
        title: 'Parcel & Cargo Capping',
        price: 'From R120 / parcel',
        desc: 'Fast, secure capping of parcels, boxes and small cargo between Gauteng and Tzaneen. Tracked and handled with care.',
        img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 't4',
        title: 'Furniture & Appliance Transport',
        price: 'Quote on request',
        desc: 'Moving a couch, fridge, bed or full household? We safely load, wrap, transport and offload at your new address.',
        img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 't5',
        title: 'Group & Event Transport',
        price: 'Quote on request',
        desc: 'Book a full vehicle for weddings, funerals, church trips or family groups travelling between Gauteng and Limpopo.',
        img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 't6',
        title: 'Custom Route / Charter',
        price: 'Quote on request',
        desc: 'Need a different route or a full-day charter? Tell us where you are going and we will arrange a dedicated vehicle.',
        img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80'
      }
    ],

    gallery: [
      { id: 'g1', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80', caption: 'Deep cleaning team on site' },
      { id: 'g2', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80', caption: 'Sanitised portable toilets' },
      { id: 'g3', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80', caption: 'Vacuum tanker emptying' },
      { id: 'g4', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80', caption: 'High-pressure washing' },
      { id: 'g5', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80', caption: 'Gauteng to Tzaneen trip' },
      { id: 'g6', img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80', caption: 'Parcel capping deliveries' }
    ]
  };

  /* ==========================================================
     STATE
     ========================================================== */
  let state = null;
  let pendingServiceImage   = null;
  let pendingTransportImage = null;

  /* ==========================================================
     UTILITIES
     ========================================================== */
  function $(sel, root){ return (root || document).querySelector(sel); }
  function $$(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function uid(p){
    return (p || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escapeHTML(str){
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function digitsOnly(s){ return String(s || '').replace(/[^0-9]/g, ''); }

  function prettyPhone(raw){
    const d = digitsOnly(raw);
    if (d.length === 11 && d.indexOf('27') === 0){
      return '+27 ' + d.slice(2, 4) + ' ' + d.slice(4, 7) + ' ' + d.slice(7);
    }
    if (d.length === 10){
      return d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
    }
    return raw || '';
  }

  function waLink(message){
    const num = digitsOnly(state.business.whatsapp);
    const txt = message ? '?text=' + encodeURIComponent(message) : '';
    return 'https://wa.me/' + num + txt;
  }

  function telLink(){ return 'tel:' + String(state.business.phone || '').replace(/\s/g, ''); }

  let toastTimer = null;
  function toast(msg, type){
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
      el.className = 'toast' + (type ? ' ' + type : '');
    }, 2600);
  }

  /* ==========================================================
     STORAGE
     ========================================================== */
  function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

  function loadState(){
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return deepClone(DEFAULTS);
      const parsed = JSON.parse(raw);
      return {
        business:          Object.assign({}, DEFAULTS.business, parsed.business || {}),
        images:            Object.assign({}, DEFAULTS.images,   parsed.images   || {}),
        services:          Array.isArray(parsed.services)          ? parsed.services          : deepClone(DEFAULTS.services),
        transportServices: Array.isArray(parsed.transportServices) ? parsed.transportServices : deepClone(DEFAULTS.transportServices),
        gallery:           Array.isArray(parsed.gallery)           ? parsed.gallery           : deepClone(DEFAULTS.gallery)
      };
    } catch (err){
      console.warn('Could not read saved data, using defaults.', err);
      return deepClone(DEFAULTS);
    }
  }

  function saveState(){
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      return true;
    } catch (err){
      console.error('Save failed (storage full?)', err);
      toast('Storage is full. Remove a few images and try again.', 'err');
      return false;
    }
  }

  /* ==========================================================
     IMAGE COMPRESSION
     ========================================================== */
  function fileToDataURL(file){
    return new Promise(function(res, rej){
      const r = new FileReader();
      r.onload = function(){ res(r.result); };
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  function loadImage(src){
    return new Promise(function(res, rej){
      const img = new Image();
      img.onload = function(){ res(img); };
      img.onerror = rej;
      img.src = src;
    });
  }

  function compressImage(file, maxW, maxH, quality){
    maxW = maxW || 1200;
    maxH = maxH || 1200;
    quality = quality || 0.78;

    return fileToDataURL(file).then(function(dataURL){
      return loadImage(dataURL);
    }).then(function(img){
      let w = img.width, h = img.height;
      const ratio = Math.min(maxW / w, maxH / h, 1);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      const isPNG = file.type === 'image/png';
      return canvas.toDataURL(isPNG ? 'image/png' : 'image/jpeg', quality);
    });
  }

  /* ==========================================================
     RENDER — BUSINESS
     ========================================================== */
  function applyImageToElement(imgEl, src){
    if (!imgEl) return;
    if (src){ imgEl.src = src; imgEl.style.display = ''; }
    else { imgEl.removeAttribute('src'); imgEl.style.display = 'none'; }
  }

  function renderBusiness(){
    const b = state.business;

    document.title = b.name + ' | Sanitation & Transport | Soweto & Gauteng to Tzaneen';

    var el;
    el = $('#navName');      if (el) el.textContent = b.shortName || b.name;
    el = $('#navSuffix');    if (el) el.textContent = b.suffix || '';
    el = $('#footerName');   if (el) el.textContent = b.name;
    el = $('#footerTag');    if (el) el.textContent = b.tagline || '';
    el = $('#aboutText');    if (el) el.textContent = b.about || '';

    el = $('#contactPhone');   if (el) el.textContent = prettyPhone(b.phone);
    el = $('#contactWhats');   if (el) el.textContent = prettyPhone(b.whatsapp);
    el = $('#contactAddress'); if (el) el.textContent = b.address;
    el = $('#contactHours');   if (el) el.textContent = b.hours;
    el = $('#contactEmail');   if (el) el.textContent = b.email;

    el = $('#footerPhone');   if (el) el.textContent = prettyPhone(b.phone);
    el = $('#footerWhats');   if (el) el.textContent = prettyPhone(b.whatsapp);
    el = $('#footerAddress'); if (el) el.textContent = b.address;
    el = $('#footerEmail');   if (el) el.textContent = b.email;

    setHref('#heroWa',      waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));
    setHref('#heroCardWa',  waLink('Hello CLAMMY CAB, I would like a free quote please.'));
    setHref('#aboutWa',     waLink('Hello CLAMMY CAB, I would like to know more about your company.'));
    setHref('#servicesWa',  waLink('Hello CLAMMY CAB, I need a custom sanitation quote.'));
    setHref('#transportWa', waLink('Hello CLAMMY CAB, I would like to book a transport / capping trip between Gauteng and Tzaneen.'));
    setHref('#navWaMobile', waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));
    setHref('#contactWa',   waLink('Hello CLAMMY CAB, I would like to get in touch.'));
    setHref('#fabWa',       waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));
    setHref('#footerWa',    waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));

    const tel = telLink();
    setHref('#navCall', tel);
    setHref('#heroCall', tel);
    setHref('#contactCall', tel);
    setHref('#footerCall', tel);

    applyImageToElement($('#navLogo'), state.images.logo);
    applyImageToElement($('#footerLogo'), state.images.logo);
    const fb = $('#logoFallback');
    if (fb) fb.style.display = state.images.logo ? 'none' : 'grid';
  }

  function setHref(sel, href){
    const el = $(sel);
    if (el) el.setAttribute('href', href);
  }

  /* ==========================================================
     RENDER — BRAND IMAGES
     ========================================================== */
  function previewHTML(src){
    return src ? '<img src="' + src + '" alt="preview">' : '';
  }

  function renderBrandImages(){
    const heroImg  = $('#heroImg');
    const aboutImg = $('#aboutImg');

    if (heroImg)  heroImg.src  = state.images.hero  || DEFAULTS.images.hero;
    if (aboutImg) aboutImg.src = state.images.about || DEFAULTS.images.about;

    const hp = $('#heroPreview');
    const ap = $('#aboutPreview');
    const lp = $('#logoPreview');
    if (hp) hp.innerHTML = previewHTML(state.images.hero);
    if (ap) ap.innerHTML = previewHTML(state.images.about);
    if (lp) lp.innerHTML = previewHTML(state.images.logo);
  }

  /* ==========================================================
     RENDER — SANITATION SERVICES
     ========================================================== */
  function renderServices(){
    const grid = $('#servicesGrid');
    if (!grid) return;

    if (!state.services.length){
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No services added yet. Open Admin to add your first service.</p>';
      return;
    }

    grid.innerHTML = state.services.map(function(s){
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

  /* ==========================================================
     RENDER — TRANSPORT SERVICES
     ========================================================== */
  function renderTransport(){
    const grid = $('#transportGrid');
    if (!grid) return;

    if (!state.transportServices.length){
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No transport services added yet. Open Admin to add your first route.</p>';
      return;
    }

    grid.innerHTML = state.transportServices.map(function(t){
      const msg = 'Hello CLAMMY CAB Transport, I am interested in your "' + t.title + '" service (' + t.price + '). Please send me more information.';
      return (
        '<article class="transport-card reveal">' +
          '<div class="transport-img">' +
            '<img src="' + escapeHTML(t.img) + '" alt="' + escapeHTML(t.title) + '" loading="lazy">' +
            '<span class="transport-price">' + escapeHTML(t.price) + '</span>' +
          '</div>' +
          '<div class="transport-body">' +
            '<h3>' + escapeHTML(t.title) + '</h3>' +
            '<p>' + escapeHTML(t.desc) + '</p>' +
            '<a class="transport-btn" target="_blank" rel="noopener" href="' + waLink(msg) + '">' +
              '<svg class="ico-fill" viewBox="0 0 24 24"><use href="#i-wa"/></svg> Book on WhatsApp' +
            '</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    observeReveals();
  }

  /* ==========================================================
     RENDER — HERO QUICK LIST / SERVICE SELECT / FOOTER SERVICES
     ========================================================== */
  function renderQuickServices(){
    const box = $('#heroQuickServices');
    if (!box) return;

    const picks = state.services.slice(0, 2).concat(state.transportServices.slice(0, 2));
    if (!picks.length){ box.innerHTML = ''; return; }

    box.innerHTML = picks.map(function(s){
      const msg = 'Hello CLAMMY CAB, I am interested in your "' + s.title + '" service. Please send me a quote.';
      return (
        '<a class="hero-card-item" target="_blank" rel="noopener" href="' + waLink(msg) + '">' +
          '<span>' + escapeHTML(s.title) + '</span>' +
          '<span>' + escapeHTML(s.price) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderServiceSelect(){
    const sel = $('#cfService');
    if (!sel) return;

    const sanOpts = state.services.map(function(s){
      return '<option value="Sanitation: ' + escapeHTML(s.title) + '">Sanitation — ' + escapeHTML(s.title) + '</option>';
    }).join('');

    const trnOpts = state.transportServices.map(function(t){
      return '<option value="Transport: ' + escapeHTML(t.title) + '">Transport — ' + escapeHTML(t.title) + '</option>';
    }).join('');

    sel.innerHTML =
      '<option value="">Select a service…</option>' +
      '<optgroup label="Sanitation">' + sanOpts + '</optgroup>' +
      '<optgroup label="Transport">' + trnOpts + '</optgroup>' +
      '<option value="Other">Other / Not sure</option>';
  }

  function renderFooterServices(){
    const box = $('#footerServices');
    if (!box) return;

    const san = state.services.slice(0, 3).map(function(s){
      return '<a href="#services">' + escapeHTML(s.title) + '</a>';
    }).join('');

    const trn = state.transportServices.slice(0, 2).map(function(t){
      return '<a href="#transport">' + escapeHTML(t.title) + '</a>';
    }).join('');

    box.innerHTML = (san + trn) || '<a href="#services">Our Services</a>';
  }

  /* ==========================================================
     RENDER — GALLERY
     ========================================================== */
  function renderGallery(){
    const grid = $('#galleryGrid');
    if (!grid) return;

    if (!state.gallery.length){
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No gallery images yet. Upload some in the Admin panel.</p>';
      return;
    }

    grid.innerHTML = state.gallery.map(function(g, i){
      return (
        '<figure class="gallery-item reveal" data-index="' + i + '">' +
          '<img src="' + escapeHTML(g.img) + '" alt="' + escapeHTML(g.caption || 'Gallery image') + '" loading="lazy">' +
          (g.caption ? '<figcaption class="gallery-cap">' + escapeHTML(g.caption) + '</figcaption>' : '') +
        '</figure>'
      );
    }).join('');

    observeReveals();
  }

  /* ==========================================================
     RENDER — ADMIN LISTS
     ========================================================== */
  function renderAdminServices(){
    const list = $('#adminServiceList');
    const count = $('#svcCount');
    if (!list) return;

    if (count) count.textContent = state.services.length;

    if (!state.services.length){
      list.innerHTML = '<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:20px 0;">No services yet.</p>';
      return;
    }

    list.innerHTML = state.services.map(function(s){
      return (
        '<div class="admin-item">' +
          '<div class="admin-item-thumb"><img src="' + escapeHTML(s.img) + '" alt=""></div>' +
          '<div class="admin-item-info">' +
            '<b>' + escapeHTML(s.title) + '</b>' +
            '<small>' + escapeHTML(s.price) + '</small>' +
            '<p>' + escapeHTML(s.desc) + '</p>' +
          '</div>' +
          '<div class="admin-item-actions">' +
            '<button class="icon-btn edit" data-edit="' + s.id + '" title="Edit" type="button">' +
              '<svg class="ico" viewBox="0 0 24 24"><use href="#i-edit"/></svg>' +
            '</button>' +
            '<button class="icon-btn del" data-del="' + s.id + '" title="Delete" type="button">' +
              '<svg class="ico" viewBox="0 0 24 24"><use href="#i-trash"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderAdminTransport(){
    const list = $('#adminTransportList');
    const count = $('#tspCount');
    if (!list) return;

    if (count) count.textContent = state.transportServices.length;

    if (!state.transportServices.length){
      list.innerHTML = '<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:20px 0;">No transport services yet.</p>';
      return;
    }

    list.innerHTML = state.transportServices.map(function(t){
      return (
        '<div class="admin-item">' +
          '<div class="admin-item-thumb"><img src="' + escapeHTML(t.img) + '" alt=""></div>' +
          '<div class="admin-item-info">' +
            '<b>' + escapeHTML(t.title) + '</b>' +
            '<small>' + escapeHTML(t.price) + '</small>' +
            '<p>' + escapeHTML(t.desc) + '</p>' +
          '</div>' +
          '<div class="admin-item-actions">' +
            '<button class="icon-btn edit" data-tedit="' + t.id + '" title="Edit" type="button">' +
              '<svg class="ico" viewBox="0 0 24 24"><use href="#i-edit"/></svg>' +
            '</button>' +
            '<button class="icon-btn del" data-tdel="' + t.id + '" title="Delete" type="button">' +
              '<svg class="ico" viewBox="0 0 24 24"><use href="#i-trash"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderAdminGallery(){
    const box = $('#adminGallery');
    const count = $('#galCount');
    if (!box) return;

    if (count) count.textContent = state.gallery.length;

    if (!state.gallery.length){
      box.innerHTML = '<p style="color:var(--muted);font-size:.88rem;grid-column:1/-1;text-align:center;padding:16px 0;">No images yet.</p>';
      return;
    }

    box.innerHTML = state.gallery.map(function(g){
      return (
        '<div class="admin-gal-item">' +
          '<img src="' + escapeHTML(g.img) + '" alt="">' +
          '<button class="admin-gal-del" data-galdel="' + g.id + '" title="Delete" type="button">' +
            '<svg class="ico" viewBox="0 0 24 24"><use href="#i-x"/></svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');
  }

  function renderBusinessForm(){
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

  function setVal(sel, value){
    const el = $(sel);
    if (el) el.value = value == null ? '' : value;
  }

  /* ==========================================================
     RENDER ALL
     ========================================================== */
  function renderAll(){
    renderBusiness();
    renderBrandImages();
    renderServices();
    renderTransport();
    renderQuickServices();
    renderServiceSelect();
    renderFooterServices();
    renderGallery();
    renderAdminServices();
    renderAdminTransport();
    renderAdminGallery();
    renderBusinessForm();
    observeReveals();
  }

  /* ==========================================================
     SCROLL REVEAL
     ========================================================== */
  let revealObserver = null;

  function observeReveals(){
    if (!('IntersectionObserver' in window)){
      $$('.reveal').forEach(function(el){ el.classList.add('in'); });
      return;
    }
    if (!revealObserver){
      revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal:not(.in)').forEach(function(el){ revealObserver.observe(el); });
  }

  /* ==========================================================
     NAVIGATION
     ========================================================== */
  function spyScroll(){
    const sections = ['home', 'about', 'services', 'transport', 'gallery', 'contact'];
    const scrollPos = window.scrollY + 140;

    let current = 'home';
    sections.forEach(function(id){
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });

    $$('.nav-link').forEach(function(link){
      const href = link.getAttribute('href');
      if (!href) return;
      link.classList.toggle('active', href === '#' + current);
    });
  }

  function initNav(){
    const nav = $('#nav');
    const burger = $('#hamburger');
    const links = $('#navLinks');

    function onScroll(){
      if (!nav) return;
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      spyScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && links){
      burger.addEventListener('click', function(){
        const open = links.classList.toggle('open');
        burger.classList.toggle('active', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      links.addEventListener('click', function(e){
        if (e.target.closest('a')){
          links.classList.remove('open');
          burger.classList.remove('active');
          burger.setAttribute('aria-expanded', 'false');
        }
      });

      window.addEventListener('resize', function(){
        if (window.innerWidth > 900){
          links.classList.remove('open');
          burger.classList.remove('active');
        }
      });
    }
  }

  /* ==========================================================
     LIGHTBOX
     ========================================================== */
  function initLightbox(){
    const lb = $('#lightbox');
    const img = $('#lbImg');
    const cap = $('#lbCaption');
    const close = $('#lbClose');
    const grid = $('#galleryGrid');
    if (!lb || !img || !close || !grid) return;

    grid.addEventListener('click', function(e){
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const idx = parseInt(item.getAttribute('data-index'), 10);
      const g = state.gallery[idx];
      if (!g) return;

      img.src = g.img;
      if (cap) cap.textContent = g.caption || '';
      lb.classList.add('open');
      document.body.classList.add('no-scroll');
    });

    function closeLb(){
      lb.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    close.addEventListener('click', closeLb);

    lb.addEventListener('click', function(e){
      if (e.target === lb) closeLb();
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){
        closeLb();
        closeAdmin();
      }
    });
  }

  /* ==========================================================
     CONTACT FORM
     ========================================================== */
  function initContactForm(){
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e){
      e.preventDefault();

      const nameEl = $('#cfName');
      const svcEl  = $('#cfService');
      const msgEl  = $('#cfMsg');

      const name = nameEl ? nameEl.value.trim() : '';
      const service = svcEl ? svcEl.value : '';
      const msg = msgEl ? msgEl.value.trim() : '';

      if (!name){
        toast('Please enter your name.', 'err');
        if (nameEl) nameEl.focus();
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

  /* ==========================================================
     DROPZONE
     ========================================================== */
  function setupDropzone(zoneEl, onFiles){
    if (!zoneEl) return;
    const input = zoneEl.querySelector('input[type=file]');
    if (!input) return;

    zoneEl.addEventListener('click', function(e){
      if (e.target === input) return;
      input.click();
    });

    input.addEventListener('change', function(){
      if (input.files && input.files.length) onFiles(Array.prototype.slice.call(input.files));
      input.value = '';
    });

    ['dragenter', 'dragover'].forEach(function(ev){
      zoneEl.addEventListener(ev, function(e){
        e.preventDefault();
        e.stopPropagation();
        zoneEl.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(function(ev){
      zoneEl.addEventListener(ev, function(e){
        e.preventDefault();
        e.stopPropagation();
        if (ev === 'dragleave' && zoneEl.contains(e.relatedTarget)) return;
        zoneEl.classList.remove('dragover');
      });
    });

    zoneEl.addEventListener('drop', function(e){
      const dt = e.dataTransfer;
      if (!dt || !dt.files || !dt.files.length) return;
      const files = Array.prototype.slice.call(dt.files).filter(function(f){
        return f.type.indexOf('image/') === 0;
      });
      if (files.length) onFiles(files);
    });
  }

  function handleSingleImage(file, maxSize, quality, cb){
    if (!file || file.type.indexOf('image/') !== 0){
      toast('Please choose a valid image file.', 'err');
      return;
    }
    compressImage(file, maxSize, maxSize, quality).then(cb).catch(function(err){
      console.error(err);
      toast('Could not process that image.', 'err');
    });
  }

  /* ==========================================================
     ADMIN
     ========================================================== */
  function openAdmin(){
    const admin = $('#admin');
    if (!admin) return;
    admin.classList.add('open');
    document.body.classList.add('no-scroll');

    if (sessionStorage.getItem(SESSION_KEY) === '1'){
      showDashboard();
    } else {
      const loginEl = $('#adminLogin');
      const dashEl  = $('#adminDash');
      const outBtn  = $('#logoutBtn');
      if (loginEl) loginEl.hidden = false;
      if (dashEl)  dashEl.hidden = true;
      if (outBtn)  outBtn.hidden = true;
      setTimeout(function(){
        const p = $('#adminPass');
        if (p) p.focus();
      }, 200);
    }
  }

  function closeAdmin(){
    const admin = $('#admin');
    if (!admin) return;
    admin.classList.remove('open');
    document.body.classList.remove('no-scroll');
    const err = $('#loginError');
    if (err) err.textContent = '';
    const p = $('#adminPass');
    if (p) p.value = '';
  }

  function showDashboard(){
    const loginEl = $('#adminLogin');
    const dashEl  = $('#adminDash');
    const outBtn  = $('#logoutBtn');
    if (loginEl) loginEl.hidden = true;
    if (dashEl)  dashEl.hidden = false;
    if (outBtn)  outBtn.hidden = false;

    renderAdminServices();
    renderAdminTransport();
    renderAdminGallery();
    renderBusinessForm();
    renderBrandImages();
  }

  function initAdmin(){
    const adminLink = $('#adminLink');
    const adminClose = $('#adminClose');
    if (adminLink) adminLink.addEventListener('click', openAdmin);
    if (adminClose) adminClose.addEventListener('click', closeAdmin);

    const admin = $('#admin');
    if (admin){
      admin.addEventListener('click', function(e){
        if (e.target === admin) closeAdmin();
      });
    }

    /* Login */
    function tryLogin(){
      const passEl = $('#adminPass');
      const errEl = $('#loginError');
      if (!passEl) return;
      if (passEl.value === state.business.password){
        sessionStorage.setItem(SESSION_KEY, '1');
        if (errEl) errEl.textContent = '';
        passEl.value = '';
        showDashboard();
        toast('Welcome back, owner.', 'ok');
      } else {
        if (errEl) errEl.textContent = 'Incorrect password. Please try again.';
        passEl.select();
      }
    }
    const loginBtn = $('#loginBtn');
    if (loginBtn) loginBtn.addEventListener('click', tryLogin);
    const passInp = $('#adminPass');
    if (passInp){
      passInp.addEventListener('keydown', function(e){
        if (e.key === 'Enter') tryLogin();
      });
    }

    const logoutBtn = $('#logoutBtn');
    if (logoutBtn){
      logoutBtn.addEventListener('click', function(){
        sessionStorage.removeItem(SESSION_KEY);
        const loginEl = $('#adminLogin');
        const dashEl  = $('#adminDash');
        if (loginEl) loginEl.hidden = false;
        if (dashEl)  dashEl.hidden = true;
        logoutBtn.hidden = true;
        toast('Logged out.');
      });
    }

    /* Tabs */
    $$('.tab').forEach(function(tab){
      tab.addEventListener('click', function(){
        const name = tab.getAttribute('data-tab');
        $$('.tab').forEach(function(t){ t.classList.toggle('active', t === tab); });
        $$('.tab-panel').forEach(function(p){
          p.classList.toggle('active', p.getAttribute('data-panel') === name);
        });
      });
    });

    /* Wipe */
    const wipeBtn = $('#wipeBtn');
    if (wipeBtn){
      wipeBtn.addEventListener('click', function(){
        if (!confirm('This will erase ALL saved content and restore the original demo data. Continue?')) return;
        localStorage.removeItem(STORE_KEY);
        state = loadState();
        renderAll();
        toast('Website data has been reset.', 'ok');
      });
    }

    /* ---------- SANITATION CRUD ---------- */
    const svcSave = $('#svcSave');
    if (svcSave) svcSave.addEventListener('click', saveService);
    const svcReset = $('#svcReset');
    if (svcReset) svcReset.addEventListener('click', resetServiceForm);

    const adminServiceList = $('#adminServiceList');
    if (adminServiceList){
      adminServiceList.addEventListener('click', function(e){
        const editBtn = e.target.closest('[data-edit]');
        const delBtn  = e.target.closest('[data-del]');

        if (editBtn) editService(editBtn.getAttribute('data-edit'));

        if (delBtn){
          const id = delBtn.getAttribute('data-del');
          const svc = state.services.filter(function(s){ return s.id === id; })[0];
          if (!svc) return;
          if (!confirm('Delete "' + svc.title + '"?')) return;
          state.services = state.services.filter(function(s){ return s.id !== id; });
          if (saveState()){
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
    }

    setupDropzone($('#svcDrop'), function(files){
      handleSingleImage(files[0], 1000, 0.80, function(dataURL){
        pendingServiceImage = dataURL;
        const prev = $('#svcPreview');
        if (prev) prev.innerHTML = '<img src="' + dataURL + '" alt="preview">';
      });
    });

    /* ---------- TRANSPORT CRUD ---------- */
    const tspSave = $('#tspSave');
    if (tspSave) tspSave.addEventListener('click', saveTransport);
    const tspReset = $('#tspReset');
    if (tspReset) tspReset.addEventListener('click', resetTransportForm);

    const adminTransportList = $('#adminTransportList');
    if (adminTransportList){
      adminTransportList.addEventListener('click', function(e){
        const editBtn = e.target.closest('[data-tedit]');
        const delBtn  = e.target.closest('[data-tdel]');

        if (editBtn) editTransport(editBtn.getAttribute('data-tedit'));

        if (delBtn){
          const id = delBtn.getAttribute('data-tdel');
          const tsp = state.transportServices.filter(function(t){ return t.id === id; })[0];
          if (!tsp) return;
          if (!confirm('Delete "' + tsp.title + '"?')) return;
          state.transportServices = state.transportServices.filter(function(t){ return t.id !== id; });
          if (saveState()){
            renderTransport();
            renderQuickServices();
            renderServiceSelect();
            renderFooterServices();
            renderAdminTransport();
            resetTransportForm();
            toast('Transport service deleted.', 'ok');
          }
        }
      });
    }

    setupDropzone($('#tspDrop'), function(files){
      handleSingleImage(files[0], 1000, 0.80, function(dataURL){
        pendingTransportImage = dataURL;
        const prev = $('#tspPreview');
        if (prev) prev.innerHTML = '<img src="' + dataURL + '" alt="preview">';
      });
    });

    /* ---------- GALLERY ---------- */
    setupDropzone($('#galDrop'), function(files){
      toast('Processing ' + files.length + ' image(s)…');
      let remaining = files.length;
      let added = 0;

      files.forEach(function(file){
        compressImage(file, 1000, 1000, 0.75).then(function(dataURL){
          state.gallery.push({
            id: uid('g'),
            img: dataURL,
            caption: file.name.replace(/\.[^.]+$/, '')
          });
          added++;
        }).catch(function(err){
          console.warn('Could not process', file.name, err);
        }).then(function(){
          remaining--;
          if (remaining === 0){
            if (added && saveState()){
              renderGallery();
              renderAdminGallery();
              toast(added + ' image(s) added to gallery.', 'ok');
            } else if (!added){
              toast('No images were added.', 'err');
            }
          }
        });
      });
    });

    const adminGallery = $('#adminGallery');
    if (adminGallery){
      adminGallery.addEventListener('click', function(e){
        const btn = e.target.closest('[data-galdel]');
        if (!btn) return;
        const id = btn.getAttribute('data-galdel');
        if (!confirm('Remove this image from the gallery?')) return;
        state.gallery = state.gallery.filter(function(g){ return g.id !== id; });
        if (saveState()){
          renderGallery();
          renderAdminGallery();
          toast('Image removed.', 'ok');
        }
      });
    }

    /* ---------- BRANDING ---------- */
    setupDropzone($('#logoDrop'), function(files){
      handleSingleImage(files[0], 420, 0.92, function(dataURL){
        state.images.logo = dataURL;
        if (saveState()){
          renderBusiness();
          renderBrandImages();
          toast('Logo updated.', 'ok');
        }
      });
    });

    setupDropzone($('#heroDrop'), function(files){
      handleSingleImage(files[0], 1800, 0.78, function(dataURL){
        state.images.hero = dataURL;
        if (saveState()){
          renderBrandImages();
          toast('Hero background updated.', 'ok');
        }
      });
    });

    setupDropzone($('#aboutDrop'), function(files){
      handleSingleImage(files[0], 1200, 0.80, function(dataURL){
        state.images.about = dataURL;
        if (saveState()){
          renderBrandImages();
          toast('About image updated.', 'ok');
        }
      });
    });

    $$('[data-reset]').forEach(function(btn){
      btn.addEventListener('click', function(){
        const which = btn.getAttribute('data-reset');
        if (which === 'logo')  state.images.logo  = '';
        if (which === 'hero')  state.images.hero  = DEFAULTS.images.hero;
        if (which === 'about') state.images.about = DEFAULTS.images.about;

        if (saveState()){
          renderBusiness();
          renderBrandImages();
          toast('Restored to default.', 'ok');
        }
      });
    });

    /* ---------- BUSINESS INFO ---------- */
    const bizSave = $('#bizSave');
    if (bizSave){
      bizSave.addEventListener('click', function(){
        const b = state.business;
        const getVal = function(sel){ const el = $(sel); return el ? el.value.trim() : ''; };

        b.name      = getVal('#bizName') || DEFAULTS.business.name;
        b.suffix    = getVal('#bizTagline');
        b.phone     = getVal('#bizPhone');
        b.whatsapp  = getVal('#bizWhats');
        b.email     = getVal('#bizEmail');
        b.address   = getVal('#bizAddress');
        b.hours     = getVal('#bizHours');
        b.about     = getVal('#bizAbout');
        b.password  = getVal('#bizPass') || 'admin123';
        b.shortName = b.name.split('(')[0].trim() || b.name;
        b.tagline   = DEFAULTS.business.tagline;

        if (saveState()){
          renderAll();
          toast('Business information saved.', 'ok');
        }
      });
    }

    const bizReset = $('#bizReset');
    if (bizReset){
      bizReset.addEventListener('click', function(){
        renderBusinessForm();
        toast('Changes discarded.');
      });
    }
  }

  /* ==========================================================
     SERVICE / TRANSPORT FORM HANDLERS
     ========================================================== */
  function saveService(){
    const titleEl = $('#svcTitle');
    const priceEl = $('#svcPrice');
    const descEl  = $('#svcDesc');
    const idEl    = $('#svcId');

    const title = titleEl ? titleEl.value.trim() : '';
    const price = priceEl ? priceEl.value.trim() : '';
    const desc  = descEl  ? descEl.value.trim()  : '';

    if (!title){ toast('Please enter a service name.', 'err'); if (titleEl) titleEl.focus(); return; }
    if (!price){ toast('Please enter a price.', 'err'); if (priceEl) priceEl.focus(); return; }
    if (!desc) { toast('Please enter a description.', 'err'); if (descEl) descEl.focus(); return; }

    const id = idEl ? idEl.value : '';

    if (id){
      const svc = state.services.filter(function(s){ return s.id === id; })[0];
      if (!svc) return;
      svc.title = title;
      svc.price = price;
      svc.desc  = desc;
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

    if (saveState()){
      renderServices();
      renderQuickServices();
      renderServiceSelect();
      renderFooterServices();
      renderAdminServices();
      resetServiceForm();
      toast(id ? 'Service updated.' : 'Service added.', 'ok');
    }
  }

  function editService(id){
    const svc = state.services.filter(function(s){ return s.id === id; })[0];
    if (!svc) return;

    setVal('#svcId', svc.id);
    setVal('#svcTitle', svc.title);
    setVal('#svcPrice', svc.price);
    setVal('#svcDesc', svc.desc);

    pendingServiceImage = null;
    const prev = $('#svcPreview');
    if (prev) prev.innerHTML = svc.img ? '<img src="' + svc.img + '" alt="preview">' : '';
    const title = $('#serviceFormTitle');
    if (title) title.textContent = 'Edit Service';

    const tEl = $('#svcTitle');
    if (tEl) tEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetServiceForm(){
    setVal('#svcId', '');
    setVal('#svcTitle', '');
    setVal('#svcPrice', '');
    setVal('#svcDesc', '');
    const prev = $('#svcPreview');
    if (prev) prev.innerHTML = '';
    pendingServiceImage = null;
    const title = $('#serviceFormTitle');
    if (title) title.textContent = 'Add Sanitation Service';
  }

  function saveTransport(){
    const titleEl = $('#tspTitle');
    const priceEl = $('#tspPrice');
    const descEl  = $('#tspDesc');
    const idEl    = $('#tspId');

    const title = titleEl ? titleEl.value.trim() : '';
    const price = priceEl ? priceEl.value.trim() : '';
    const desc  = descEl  ? descEl.value.trim()  : '';

    if (!title){ toast('Please enter a service name.', 'err'); if (titleEl) titleEl.focus(); return; }
    if (!price){ toast('Please enter a price.', 'err'); if (priceEl) priceEl.focus(); return; }
    if (!desc) { toast('Please enter a description.', 'err'); if (descEl) descEl.focus(); return; }

    const id = idEl ? idEl.value : '';

    if (id){
      const tsp = state.transportServices.filter(function(t){ return t.id === id; })[0];
      if (!tsp) return;
      tsp.title = title;
      tsp.price = price;
      tsp.desc  = desc;
      if (pendingTransportImage) tsp.img = pendingTransportImage;
    } else {
      state.transportServices.push({
        id: uid('t'),
        title: title,
        price: price,
        desc: desc,
        img: pendingTransportImage || DEFAULTS.transportServices[0].img
      });
    }

    if (saveState()){
      renderTransport();
      renderQuickServices();
      renderServiceSelect();
      renderFooterServices();
      renderAdminTransport();
      resetTransportForm();
      toast(id ? 'Transport service updated.' : 'Transport service added.', 'ok');
    }
  }

  function editTransport(id){
    const tsp = state.transportServices.filter(function(t){ return t.id === id; })[0];
    if (!tsp) return;

    setVal('#tspId', tsp.id);
    setVal('#tspTitle', tsp.title);
    setVal('#tspPrice', tsp.price);
    setVal('#tspDesc', tsp.desc);

    pendingTransportImage = null;
    const prev = $('#tspPreview');
    if (prev) prev.innerHTML = tsp.img ? '<img src="' + tsp.img + '" alt="preview">' : '';
    const title = $('#tspFormTitle');
    if (title) title.textContent = 'Edit Transport Service';

    const tEl = $('#tspTitle');
    if (tEl) tEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetTransportForm(){
    setVal('#tspId', '');
    setVal('#tspTitle', '');
    setVal('#tspPrice', '');
    setVal('#tspDesc', '');
    const prev = $('#tspPreview');
    if (prev) prev.innerHTML = '';
    pendingTransportImage = null;
    const title = $('#tspFormTitle');
    if (title) title.textContent = 'Add Transport Service';
  }

  /* ==========================================================
     BOOTSTRAP
     ========================================================== */
  function init(){
    state = loadState();

    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    renderAll();
    initNav();
    initLightbox();
    initContactForm();
    initAdmin();

    /* subtle parallax on hero image */
    const heroImg = $('#heroImg');
    if (heroImg && window.matchMedia('(min-width: 900px)').matches){
      window.addEventListener('scroll', function(){
        const y = window.scrollY;
        if (y < window.innerHeight){
          heroImg.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.06)';
        }
      }, { passive: true });
    }

    console.log('%cCLAMMY CAB (PTY) LTD', 'color:#0ea5e9;font-weight:900;font-size:14px;');
    console.log('Admin panel: click "Admin" in the menu. Default password: admin123');
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();