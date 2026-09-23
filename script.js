/* ============================================================
   CLAMMY CAB (PTY) LTD — Application Script
   Transport · Sanitation · Tiyi Nail Bar
   All data stored offline in localStorage.
   ============================================================ */

(function () {
  'use strict';

  var STORE_KEY   = 'clammycab_data_v5';
  var SESSION_KEY = 'clammycab_admin_session';

  var DEFAULTS = {
    business: {
      name: 'CLAMMY CAB (PTY) LTD',
      shortName: 'CLAMMY CAB',
      suffix: 'Transport · Sanitation · Nail Bar',
      tagline: 'Door-to-door transport between Gauteng and Tzaneen · Sanitation in Soweto · Tiyi Nail Bar.',
      phone: '+27739782453',
      whatsapp: '+27739782453',
      nailPhone: '0733686687',
      nailTiktok: 'https://www.tiktok.com/@tiyinailbar',
      email: 'clammymaholobela@gmail.com',
      address: '1039, Soweto, South Africa',
      hours: 'Mon – Sat: 07:00 – 18:00',
      about: 'CLAMMY CAB (PTY) LTD is a proudly South African transport & capping company based in Soweto, 1039. We run daily door-to-door trips between Gauteng (Johannesburg, Soweto, Pretoria) and Tzaneen, Limpopo — carrying passengers, parcels, furniture and cargo safely and on time. The same trusted team also runs sanitation services across Soweto and Tiyi Nail Bar for beauty.',
      password: 'admin123'
    },
    images: {
      logo: '',
      hero: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1800&q=80',
      about: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80'
    },
    services: [
      { id:'s1', title:'Portable Toilet Hire', price:'From R450 / day',
        desc:'Clean, sanitised portable toilets delivered, set up and collected for events, construction sites and gatherings. Includes paper, sanitiser and weekly servicing.',
        img:'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80' },
      { id:'s2', title:'Septic Tank & Pit Emptying', price:'From R850 / load',
        desc:'Fast vacuum tanker emptying of septic tanks, pit latrines and conservancy tanks. Fully compliant disposal with no mess left behind.',
        img:'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80' },
      { id:'s3', title:'Deep Cleaning & Disinfection', price:'From R600 / room',
        desc:'Hospital-grade deep cleaning and disinfection for homes, offices, clinics, schools and ablution blocks. Kills germs and removes odours.',
        img:'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
      { id:'s4', title:'High-Pressure Washing', price:'From R500 / area',
        desc:'Pavements, driveways, walls, bins and refuse areas blasted clean with industrial pressure equipment and eco-friendly detergents.',
        img:'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=80' },
      { id:'s5', title:'Hygiene & Consumables Supply', price:'Quote on request',
        desc:'Bulk supply and refilling of hand sanitiser, toilet paper, bin liners, air fresheners and cleaning chemicals for your business.',
        img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80' },
      { id:'s6', title:'Event Sanitation Packages', price:'From R1 800 / event',
        desc:'Complete sanitation setup for weddings, funerals, church gatherings and festivals — toilets, handwash stations, bins and on-site attendants.',
        img:'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80' }
    ],
    transportServices: [
      { id:'t1', title:'Gauteng to Tzaneen — Door to Door', price:'From R350 / passenger',
        desc:'Daily scheduled trips from Johannesburg, Soweto and Pretoria directly to Tzaneen. Door-to-door pickup and drop-off with luggage included.',
        img:'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=900&q=80' },
      { id:'t2', title:'Tzaneen to Gauteng — Return Trips', price:'From R350 / passenger',
        desc:'Comfortable return journeys from Tzaneen back to Gauteng. Book early to secure your seat. Door-to-door service available.',
        img:'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80' },
      { id:'t3', title:'Parcel & Cargo Capping', price:'From R120 / parcel',
        desc:'Fast, secure capping of parcels, boxes and small cargo between Gauteng and Tzaneen. Tracked and handled with care.',
        img:'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80' },
      { id:'t4', title:'Furniture & Appliance Transport', price:'Quote on request',
        desc:'Moving a couch, fridge, bed or full household? We safely load, wrap, transport and offload at your new address.',
        img:'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=80' },
      { id:'t5', title:'Group & Event Transport', price:'Quote on request',
        desc:'Book a full vehicle for weddings, funerals, church trips or family groups travelling between Gauteng and Limpopo.',
        img:'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80' },
      { id:'t6', title:'Custom Route / Charter', price:'Quote on request',
        desc:'Need a different route or a full-day charter? Tell us where you are going and we will arrange a dedicated vehicle.',
        img:'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80' }
    ],
    nailServices: [
      { id:'n1', title:'Gel Nails & Acrylics', price:'From R180',
        desc:'Sculpted acrylics, gel overlays, French tips, nail art and custom designs — long-lasting, glossy and shaped just for you.',
        img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80' },
      { id:'n2', title:'Braiding & Cornrows', price:'From R250',
        desc:'Knotless braids, box braids, cornrows, twists and feed-ins — neat, long-lasting and gentle on your edges.',
        img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80' },
      { id:'n3', title:'Weave Install & Unplant', price:'From R350',
        desc:'Sew-in installs, closures, frontals and unplant services. Neat, natural-looking and finished to perfection.',
        img:'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80' },
      { id:'n4', title:'Eyelash Extensions', price:'From R200',
        desc:'Classic, hybrid and volume lash sets applied lash-by-lash. Lightweight, comfortable and long-lasting.',
        img:'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80' },
      { id:'n5', title:'Hair Relax & Treatment', price:'From R180',
        desc:'Professional relaxer application, deep conditioning and scalp treatments for smooth, healthy and manageable hair.',
        img:'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=900&q=80' },
      { id:'n6', title:'Manicure & Pedicure', price:'From R150',
        desc:'Classic manicure and pedicure with soak, scrub, cuticle care, massage and polish. Pure relaxation.',
        img:'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=80' }
    ],
    gallery: [
      { id:'g1', img:'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80', caption:'Long-haul trip — Gauteng to Tzaneen' },
      { id:'g2', img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80', caption:'Our transport fleet' },
      { id:'g3', img:'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80', caption:'Parcel capping deliveries' },
      { id:'g4', img:'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80', caption:'Deep cleaning team on site' },
      { id:'g5', img:'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80', caption:'Gel nail designs' },
      { id:'g6', img:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80', caption:'Braiding & cornrows' },
      { id:'g7', img:'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80', caption:'Sanitised portable toilets' },
      { id:'g8', img:'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80', caption:'Eyelash extensions' }
    ]
  };

  var state = null;
  var pendingServiceImage   = null;
  var pendingTransportImage = null;
  var pendingNailImage      = null;

  function $(sel, root){ return (root || document).querySelector(sel); }
  function $$(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function uid(p){ return (p || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  function escapeHTML(str){
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function digitsOnly(s){ return String(s || '').replace(/[^0-9]/g, ''); }
  function prettyPhone(raw){
    var d = digitsOnly(raw);
    if (d.length === 11 && d.indexOf('27') === 0) return '+27 ' + d.slice(2,4) + ' ' + d.slice(4,7) + ' ' + d.slice(7);
    if (d.length === 10) return d.slice(0,3) + ' ' + d.slice(3,6) + ' ' + d.slice(6);
    return raw || '';
  }
  function waLink(msg, num){
    var n = digitsOnly(num || state.business.whatsapp);
    var t = msg ? '?text=' + encodeURIComponent(msg) : '';
    return 'https://wa.me/' + n + t;
  }
  function telLink(num){ return 'tel:' + String(num || state.business.phone).replace(/\s/g, ''); }

  var toastTimer = null;
  function toast(msg, type){
    var el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ el.className = 'toast' + (type ? ' ' + type : ''); }, 2600);
  }

  function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

  function loadState(){
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return deepClone(DEFAULTS);
      var p = JSON.parse(raw);
      return {
        business:          Object.assign({}, DEFAULTS.business, p.business || {}),
        images:            Object.assign({}, DEFAULTS.images,   p.images   || {}),
        services:          Array.isArray(p.services)          ? p.services          : deepClone(DEFAULTS.services),
        transportServices: Array.isArray(p.transportServices) ? p.transportServices : deepClone(DEFAULTS.transportServices),
        nailServices:      Array.isArray(p.nailServices)      ? p.nailServices      : deepClone(DEFAULTS.nailServices),
        gallery:           Array.isArray(p.gallery)           ? p.gallery           : deepClone(DEFAULTS.gallery)
      };
    } catch (err){
      console.warn('Could not read saved data, using defaults.', err);
      return deepClone(DEFAULTS);
    }
  }

  function saveState(){
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); return true; }
    catch (err){ console.error('Save failed', err); toast('Storage is full. Remove a few images.', 'err'); return false; }
  }

  function fileToDataURL(file){
    return new Promise(function(res, rej){
      var r = new FileReader();
      r.onload = function(){ res(r.result); };
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }
  function loadImage(src){
    return new Promise(function(res, rej){
      var img = new Image();
      img.onload = function(){ res(img); };
      img.onerror = rej;
      img.src = src;
    });
  }
  function compressImage(file, maxW, maxH, quality){
    maxW = maxW || 1200; maxH = maxH || 1200; quality = quality || 0.78;
    return fileToDataURL(file).then(function(url){ return loadImage(url); }).then(function(img){
      var w = img.width, h = img.height;
      var r = Math.min(maxW / w, maxH / h, 1);
      w = Math.round(w * r); h = Math.round(h * r);
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      var isPNG = file.type === 'image/png';
      return c.toDataURL(isPNG ? 'image/png' : 'image/jpeg', quality);
    });
  }

  function applyImageToElement(el, src){
    if (!el) return;
    if (src){ el.src = src; el.style.display = ''; }
    else { el.removeAttribute('src'); el.style.display = 'none'; }
  }
  function setHref(sel, href){ var el = $(sel); if (el) el.setAttribute('href', href); }
  function setVal(sel, val){ var el = $(sel); if (el) el.value = val == null ? '' : val; }
  function previewHTML(src){ return src ? '<img src="' + src + '" alt="preview">' : ''; }

  function renderBusiness(){
    var b = state.business;
    document.title = b.name + ' | Transport Gauteng ↔ Tzaneen · Sanitation · Tiyi Nail Bar';

    var el;
    el = $('#navName');    if (el) el.textContent = b.shortName || b.name;
    el = $('#navSuffix');  if (el) el.textContent = b.suffix || '';
    el = $('#footerName'); if (el) el.textContent = b.name;
    el = $('#footerTag');  if (el) el.textContent = b.tagline || '';
    el = $('#aboutText');  if (el) el.textContent = b.about || '';

    el = $('#contactPhone');       if (el) el.textContent = prettyPhone(b.phone);
    el = $('#contactWhats');       if (el) el.textContent = prettyPhone(b.whatsapp);
    el = $('#contactNailPhone');   if (el) el.textContent = prettyPhone(b.nailPhone);
    el = $('#contactAddress');     if (el) el.textContent = b.address;
    el = $('#contactHours');       if (el) el.textContent = b.hours;
    el = $('#contactEmail');       if (el) el.textContent = b.email;
    el = $('#nailPhone');          if (el) el.textContent = prettyPhone(b.nailPhone);

    el = $('#footerPhone');   if (el) el.textContent = prettyPhone(b.phone);
    el = $('#footerWhats');   if (el) el.textContent = prettyPhone(b.whatsapp);
    el = $('#footerNail');    if (el) el.textContent = 'Tiyi Nail Bar: ' + prettyPhone(b.nailPhone);
    el = $('#footerAddress'); if (el) el.textContent = b.address;
    el = $('#footerEmail');   if (el) el.textContent = b.email;

    setHref('#heroWa',      waLink('Hello CLAMMY CAB, I would like to book a transport trip.'));
    setHref('#heroCardWa',  waLink('Hello CLAMMY CAB, I would like a free quote please.'));
    setHref('#aboutWa',     waLink('Hello CLAMMY CAB, I would like to know more about your company.'));
    setHref('#servicesWa',  waLink('Hello CLAMMY CAB, I need a sanitation quote.'));
    setHref('#transportWa', waLink('Hello CLAMMY CAB, I would like to book a transport / capping trip between Gauteng and Tzaneen.'));
    setHref('#navWaMobile', waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));
    setHref('#contactWa',   waLink('Hello CLAMMY CAB, I would like to get in touch.'));
    setHref('#fabWa',       waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));
    setHref('#footerWa',    waLink('Hello CLAMMY CAB, I would like to enquire about your services.'));

    setHref('#nailWa',          waLink('Hello Tiyi Nail Bar, I would like to book an appointment.', b.nailPhone));
    setHref('#nailCall',        telLink(b.nailPhone));
    setHref('#contactNailCall', telLink(b.nailPhone));
    setHref('#nailTiktokCard',  b.nailTiktok);
    setHref('#nailTiktokBtn',   b.nailTiktok);

    setHref('#navCall',     telLink(b.phone));
    setHref('#heroCall',    telLink(b.phone));
    setHref('#contactCall', telLink(b.phone));
    setHref('#footerCall',  telLink(b.phone));

    applyImageToElement($('#navLogo'), state.images.logo);
    applyImageToElement($('#footerLogo'), state.images.logo);
    var fb = $('#logoFallback');
    if (fb) fb.style.display = state.images.logo ? 'none' : 'grid';
  }

  function renderBrandImages(){
    var h = $('#heroImg');  if (h) h.src = state.images.hero  || DEFAULTS.images.hero;
    var a = $('#aboutImg'); if (a) a.src = state.images.about || DEFAULTS.images.about;
    var hp = $('#heroPreview');  if (hp) hp.innerHTML = previewHTML(state.images.hero);
    var ap = $('#aboutPreview'); if (ap) ap.innerHTML = previewHTML(state.images.about);
    var lp = $('#logoPreview');  if (lp) lp.innerHTML = previewHTML(state.images.logo);
  }

  function renderTransport(){
    var g = $('#transportGrid'); if (!g) return;
    if (!state.transportServices.length){ g.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No transport services yet.</p>'; return; }
    g.innerHTML = state.transportServices.map(function(t){
      var msg = 'Hello CLAMMY CAB Transport, I am interested in your "' + t.title + '" service (' + t.price + '). Please send me more information.';
      return '<article class="transport-card reveal">' +
        '<div class="transport-img"><img src="' + escapeHTML(t.img) + '" alt="' + escapeHTML(t.title) + '" loading="lazy"><span class="transport-price">' + escapeHTML(t.price) + '</span></div>' +
        '<div class="transport-body"><h3>' + escapeHTML(t.title) + '</h3><p>' + escapeHTML(t.desc) + '</p>' +
        '<a class="transport-btn" target="_blank" rel="noopener" href="' + waLink(msg) + '"><svg class="ico-fill" viewBox="0 0 24 24"><use href="#i-wa"/></svg> Book on WhatsApp</a></div></article>';
    }).join('');
    observeReveals();
  }

  function renderServices(){
    var g = $('#servicesGrid'); if (!g) return;
    if (!state.services.length){ g.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No services yet. Open Admin to add one.</p>'; return; }
    g.innerHTML = state.services.map(function(s){
      var msg = 'Hello CLAMMY CAB, I am interested in your "' + s.title + '" service (' + s.price + '). Please send me more information.';
      return '<article class="service-card reveal">' +
        '<div class="service-img"><img src="' + escapeHTML(s.img || DEFAULTS.services[0].img) + '" alt="' + escapeHTML(s.title) + '" loading="lazy"><span class="service-price">' + escapeHTML(s.price) + '</span></div>' +
        '<div class="service-body"><h3>' + escapeHTML(s.title) + '</h3><p>' + escapeHTML(s.desc) + '</p>' +
        '<a class="service-btn" target="_blank" rel="noopener" href="' + waLink(msg) + '"><svg class="ico-fill" viewBox="0 0 24 24"><use href="#i-wa"/></svg> Enquire on WhatsApp</a></div></article>';
    }).join('');
    observeReveals();
  }

  function renderNails(){
    var g = $('#nailGrid'); if (!g) return;
    if (!state.nailServices.length){ g.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No nail services yet.</p>'; return; }
    g.innerHTML = state.nailServices.map(function(n){
      var msg = 'Hello Tiyi Nail Bar, I would like to book "' + n.title + '" (' + n.price + '). When are you available?';
      return '<article class="nail-card reveal">' +
        '<div class="nail-img"><img src="' + escapeHTML(n.img) + '" alt="' + escapeHTML(n.title) + '" loading="lazy"><span class="nail-price">' + escapeHTML(n.price) + '</span></div>' +
        '<div class="nail-body"><h3>' + escapeHTML(n.title) + '</h3><p>' + escapeHTML(n.desc) + '</p>' +
        '<a class="nail-btn" target="_blank" rel="noopener" href="' + waLink(msg, state.business.nailPhone) + '"><svg class="ico-fill" viewBox="0 0 24 24"><use href="#i-wa"/></svg> Book on WhatsApp</a></div></article>';
    }).join('');
    observeReveals();
  }

  function renderQuickServices(){
    var box = $('#heroQuickServices');
    if (!box) return;
    var picks = state.transportServices.slice(0, 3).concat(state.services.slice(0, 1));
    if (!picks.length){ box.innerHTML = ''; return; }
    box.innerHTML = picks.map(function(s){
      var msg = 'Hello CLAMMY CAB, I am interested in your "' + s.title + '" service. Please send me a quote.';
      return '<a class="hero-card-item" target="_blank" rel="noopener" href="' + waLink(msg) + '"><span>' + escapeHTML(s.title) + '</span><span>' + escapeHTML(s.price) + '</span></a>';
    }).join('');
  }

  function renderServiceSelect(){
    var sel = $('#cfService'); if (!sel) return;
    var tOpts = state.transportServices.map(function(t){ return '<option value="Transport: ' + escapeHTML(t.title) + '">Transport — ' + escapeHTML(t.title) + '</option>'; }).join('');
    var sOpts = state.services.map(function(s){ return '<option value="Sanitation: ' + escapeHTML(s.title) + '">Sanitation — ' + escapeHTML(s.title) + '</option>'; }).join('');
    var nOpts = state.nailServices.map(function(n){ return '<option value="Nail Bar: ' + escapeHTML(n.title) + '">Tiyi Nail Bar — ' + escapeHTML(n.title) + '</option>'; }).join('');
    sel.innerHTML = '<option value="">Select a service…</option>' +
      '<optgroup label="Transport">' + tOpts + '</optgroup>' +
      '<optgroup label="Sanitation">' + sOpts + '</optgroup>' +
      '<optgroup label="Tiyi Nail Bar">' + nOpts + '</optgroup>' +
      '<option value="Other">Other / Not sure</option>';
  }

  function renderFooterServices(){
    var box = $('#footerServices'); if (!box) return;
    var t = state.transportServices.slice(0, 2).map(function(x){ return '<a href="#transport">' + escapeHTML(x.title) + '</a>'; }).join('');
    var s = state.services.slice(0, 2).map(function(x){ return '<a href="#services">' + escapeHTML(x.title) + '</a>'; }).join('');
    var n = state.nailServices.slice(0, 2).map(function(x){ return '<a href="#nailbar">' + escapeHTML(x.title) + '</a>'; }).join('');
    box.innerHTML = (t + s + n) || '<a href="#services">Our Services</a>';
  }

  function renderGallery(){
    var g = $('#galleryGrid'); if (!g) return;
    if (!state.gallery.length){ g.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);">No gallery images yet.</p>'; return; }
    g.innerHTML = state.gallery.map(function(x, i){
      return '<figure class="gallery-item reveal" data-index="' + i + '"><img src="' + escapeHTML(x.img) + '" alt="' + escapeHTML(x.caption || 'Gallery image') + '" loading="lazy">' +
        (x.caption ? '<figcaption class="gallery-cap">' + escapeHTML(x.caption) + '</figcaption>' : '') + '</figure>';
    }).join('');
    observeReveals();
  }

  function renderAdminServices(){
    var l = $('#adminServiceList'); if (!l) return;
    var c = $('#svcCount'); if (c) c.textContent = state.services.length;
    if (!state.services.length){ l.innerHTML = '<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:20px 0;">No services yet.</p>'; return; }
    l.innerHTML = state.services.map(function(s){
      return '<div class="admin-item"><div class="admin-item-thumb"><img src="' + escapeHTML(s.img) + '" alt=""></div>' +
        '<div class="admin-item-info"><b>' + escapeHTML(s.title) + '</b><small>' + escapeHTML(s.price) + '</small><p>' + escapeHTML(s.desc) + '</p></div>' +
        '<div class="admin-item-actions"><button class="icon-btn edit" data-edit="' + s.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-edit"/></svg></button>' +
        '<button class="icon-btn del" data-del="' + s.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-trash"/></svg></button></div></div>';
    }).join('');
  }

  function renderAdminTransport(){
    var l = $('#adminTransportList'); if (!l) return;
    var c = $('#tspCount'); if (c) c.textContent = state.transportServices.length;
    if (!state.transportServices.length){ l.innerHTML = '<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:20px 0;">No transport services yet.</p>'; return; }
    l.innerHTML = state.transportServices.map(function(t){
      return '<div class="admin-item"><div class="admin-item-thumb"><img src="' + escapeHTML(t.img) + '" alt=""></div>' +
        '<div class="admin-item-info"><b>' + escapeHTML(t.title) + '</b><small>' + escapeHTML(t.price) + '</small><p>' + escapeHTML(t.desc) + '</p></div>' +
        '<div class="admin-item-actions"><button class="icon-btn edit" data-tedit="' + t.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-edit"/></svg></button>' +
        '<button class="icon-btn del" data-tdel="' + t.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-trash"/></svg></button></div></div>';
    }).join('');
  }

  function renderAdminNails(){
    var l = $('#adminNailList'); if (!l) return;
    var c = $('#nailCount'); if (c) c.textContent = state.nailServices.length;
    if (!state.nailServices.length){ l.innerHTML = '<p style="color:var(--muted);font-size:.88rem;text-align:center;padding:20px 0;">No nail services yet.</p>'; return; }
    l.innerHTML = state.nailServices.map(function(n){
      return '<div class="admin-item"><div class="admin-item-thumb"><img src="' + escapeHTML(n.img) + '" alt=""></div>' +
        '<div class="admin-item-info"><b>' + escapeHTML(n.title) + '</b><small>' + escapeHTML(n.price) + '</small><p>' + escapeHTML(n.desc) + '</p></div>' +
        '<div class="admin-item-actions"><button class="icon-btn edit" data-nedit="' + n.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-edit"/></svg></button>' +
        '<button class="icon-btn del" data-ndel="' + n.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-trash"/></svg></button></div></div>';
    }).join('');
  }

  function renderAdminGallery(){
    var b = $('#adminGallery'); if (!b) return;
    var c = $('#galCount'); if (c) c.textContent = state.gallery.length;
    if (!state.gallery.length){ b.innerHTML = '<p style="color:var(--muted);font-size:.88rem;grid-column:1/-1;text-align:center;padding:16px 0;">No images yet.</p>'; return; }
    b.innerHTML = state.gallery.map(function(g){
      return '<div class="admin-gal-item"><img src="' + escapeHTML(g.img) + '" alt="">' +
        '<button class="admin-gal-del" data-galdel="' + g.id + '" type="button"><svg class="ico" viewBox="0 0 24 24"><use href="#i-x"/></svg></button></div>';
    }).join('');
  }

  function renderBusinessForm(){
    var b = state.business;
    setVal('#bizName', b.name);
    setVal('#bizTagline', b.suffix);
    setVal('#bizPhone', b.phone);
    setVal('#bizWhats', b.whatsapp);
    setVal('#bizNailPhone', b.nailPhone);
    setVal('#bizNailTiktok', b.nailTiktok);
    setVal('#bizEmail', b.email);
    setVal('#bizAddress', b.address);
    setVal('#bizHours', b.hours);
    setVal('#bizAbout', b.about);
    setVal('#bizPass', b.password);
  }

  function renderAll(){
    renderBusiness();
    renderBrandImages();
    renderTransport();
    renderServices();
    renderNails();
    renderQuickServices();
    renderServiceSelect();
    renderFooterServices();
    renderGallery();
    renderAdminTransport();
    renderAdminServices();
    renderAdminNails();
    renderAdminGallery();
    renderBusinessForm();
    observeReveals();
  }

  var revealObserver = null;
  function observeReveals(){
    if (!('IntersectionObserver' in window)){ $$('.reveal').forEach(function(el){ el.classList.add('in'); }); return; }
    if (!revealObserver){
      revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal:not(.in)').forEach(function(el){ revealObserver.observe(el); });
  }

  function spyScroll(){
    var sections = ['home','about','transport','services','nailbar','gallery','contact'];
    var pos = window.scrollY + 140;
    var current = 'home';
    sections.forEach(function(id){
      var el = document.getElementById(id);
      if (el && el.offsetTop <= pos) current = id;
    });
    $$('.nav-link').forEach(function(link){
      var h = link.getAttribute('href');
      if (!h) return;
      link.classList.toggle('active', h === '#' + current);
    });
  }

  function initNav(){
    var nav = $('#nav');
    var burger = $('#hamburger');
    var links = $('#navLinks');
    function onScroll(){
      if (nav){ if (window.scrollY > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
      spyScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (burger && links){
      burger.addEventListener('click', function(){
        var open = links.classList.toggle('open');
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

  function initLightbox(){
    var lb = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCaption'), close = $('#lbClose'), grid = $('#galleryGrid');
    if (!lb || !img || !close || !grid) return;
    grid.addEventListener('click', function(e){
      var item = e.target.closest('.gallery-item');
      if (!item) return;
      var idx = parseInt(item.getAttribute('data-index'), 10);
      var g = state.gallery[idx];
      if (!g) return;
      img.src = g.img;
      if (cap) cap.textContent = g.caption || '';
      lb.classList.add('open');
      document.body.classList.add('no-scroll');
    });
    function closeLb(){ lb.classList.remove('open'); document.body.classList.remove('no-scroll'); }
    close.addEventListener('click', closeLb);
    lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ closeLb(); closeAdmin(); } });
  }

  function initContactForm(){
    var form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var nameEl = $('#cfName'), svcEl = $('#cfService'), msgEl = $('#cfMsg');
      var name = nameEl ? nameEl.value.trim() : '';
      var service = svcEl ? svcEl.value : '';
      var msg = msgEl ? msgEl.value.trim() : '';
      if (!name){ toast('Please enter your name.', 'err'); if (nameEl) nameEl.focus(); return; }

      var isNail = service.indexOf('Nail Bar') === 0;
      var num = isNail ? state.business.nailPhone : state.business.whatsapp;

      var lines = [
        isNail ? 'Hello Tiyi Nail Bar,' : 'Hello CLAMMY CAB (PTY) LTD,',
        '',
        'Name: ' + name,
        'Service: ' + (service || 'Not specified'),
        msg ? 'Message: ' + msg : ''
      ].filter(Boolean);

      window.open(waLink(lines.join('\n'), num), '_blank', 'noopener');
      toast('Opening WhatsApp…', 'ok');
      form.reset();
    });
  }

  function setupDropzone(zoneEl, onFiles){
    if (!zoneEl) return;
    var input = zoneEl.querySelector('input[type=file]');
    if (!input) return;
    zoneEl.addEventListener('click', function(e){ if (e.target === input) return; input.click(); });
    input.addEventListener('change', function(){
      if (input.files && input.files.length) onFiles(Array.prototype.slice.call(input.files));
      input.value = '';
    });
    ['dragenter','dragover'].forEach(function(ev){
      zoneEl.addEventListener(ev, function(e){ e.preventDefault(); e.stopPropagation(); zoneEl.classList.add('dragover'); });
    });
    ['dragleave','drop'].forEach(function(ev){
      zoneEl.addEventListener(ev, function(e){
        e.preventDefault(); e.stopPropagation();
        if (ev === 'dragleave' && zoneEl.contains(e.relatedTarget)) return;
        zoneEl.classList.remove('dragover');
      });
    });
    zoneEl.addEventListener('drop', function(e){
      var dt = e.dataTransfer;
      if (!dt || !dt.files || !dt.files.length) return;
      var files = Array.prototype.slice.call(dt.files).filter(function(f){ return f.type.indexOf('image/') === 0; });
      if (files.length) onFiles(files);
    });
  }

  function handleSingleImage(file, maxSize, quality, cb){
    if (!file || file.type.indexOf('image/') !== 0){ toast('Please choose a valid image file.', 'err'); return; }
    compressImage(file, maxSize, maxSize, quality).then(cb).catch(function(err){
      console.error(err); toast('Could not process that image.', 'err');
    });
  }

  function openAdmin(){
    var a = $('#admin'); if (!a) return;
    a.classList.add('open');
    document.body.classList.add('no-scroll');
    if (sessionStorage.getItem(SESSION_KEY) === '1'){ showDashboard(); }
    else {
      var l = $('#adminLogin'), d = $('#adminDash'), o = $('#logoutBtn');
      if (l) l.hidden = false;
      if (d) d.hidden = true;
      if (o) o.hidden = true;
      setTimeout(function(){ var p = $('#adminPass'); if (p) p.focus(); }, 200);
    }
  }
  function closeAdmin(){
    var a = $('#admin'); if (!a) return;
    a.classList.remove('open');
    document.body.classList.remove('no-scroll');
    var err = $('#loginError'); if (err) err.textContent = '';
    var p = $('#adminPass'); if (p) p.value = '';
  }
  function showDashboard(){
    var l = $('#adminLogin'), d = $('#adminDash'), o = $('#logoutBtn');
    if (l) l.hidden = true;
    if (d) d.hidden = false;
    if (o) o.hidden = false;
    renderAdminTransport();
    renderAdminServices();
    renderAdminNails();
    renderAdminGallery();
    renderBusinessForm();
    renderBrandImages();
  }

  function initAdmin(){
    var link = $('#adminLink'), close = $('#adminClose'), admin = $('#admin');
    if (link) link.addEventListener('click', openAdmin);
    if (close) close.addEventListener('click', closeAdmin);
    if (admin) admin.addEventListener('click', function(e){ if (e.target === admin) closeAdmin(); });

    function tryLogin(){
      var p = $('#adminPass'), err = $('#loginError');
      if (!p) return;
      if (p.value === state.business.password){
        sessionStorage.setItem(SESSION_KEY, '1');
        if (err) err.textContent = '';
        p.value = '';
        showDashboard();
        toast('Welcome back, owner.', 'ok');
      } else {
        if (err) err.textContent = 'Incorrect password. Please try again.';
        p.select();
      }
    }
    var loginBtn = $('#loginBtn'); if (loginBtn) loginBtn.addEventListener('click', tryLogin);
    var passInp = $('#adminPass'); if (passInp) passInp.addEventListener('keydown', function(e){ if (e.key === 'Enter') tryLogin(); });

    var logoutBtn = $('#logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', function(){
      sessionStorage.removeItem(SESSION_KEY);
      var l = $('#adminLogin'), d = $('#adminDash');
      if (l) l.hidden = false;
      if (d) d.hidden = true;
      logoutBtn.hidden = true;
      toast('Logged out.');
    });

    $$('.tab').forEach(function(tab){
      tab.addEventListener('click', function(){
        var name = tab.getAttribute('data-tab');
        $$('.tab').forEach(function(t){ t.classList.toggle('active', t === tab); });
        $$('.tab-panel').forEach(function(p){ p.classList.toggle('active', p.getAttribute('data-panel') === name); });
      });
    });

    var wipeBtn = $('#wipeBtn');
    if (wipeBtn) wipeBtn.addEventListener('click', function(){
      if (!confirm('This will erase ALL saved content and restore original demo data. Continue?')) return;
      localStorage.removeItem(STORE_KEY);
      state = loadState();
      renderAll();
      toast('Website data has been reset.', 'ok');
    });

    var tspSave = $('#tspSave'); if (tspSave) tspSave.addEventListener('click', saveTransport);
    var tspReset = $('#tspReset'); if (tspReset) tspReset.addEventListener('click', resetTransportForm);
    var adminTL = $('#adminTransportList');
    if (adminTL) adminTL.addEventListener('click', function(e){
      var eb = e.target.closest('[data-tedit]'), db = e.target.closest('[data-tdel]');
      if (eb) editTransport(eb.getAttribute('data-tedit'));
      if (db){
        var id = db.getAttribute('data-tdel');
        var t = state.transportServices.filter(function(x){ return x.id === id; })[0];
        if (!t) return;
        if (!confirm('Delete "' + t.title + '"?')) return;
        state.transportServices = state.transportServices.filter(function(x){ return x.id !== id; });
        if (saveState()){ renderTransport(); renderQuickServices(); renderServiceSelect(); renderFooterServices(); renderAdminTransport(); resetTransportForm(); toast('Transport service deleted.', 'ok'); }
      }
    });
    setupDropzone($('#tspDrop'), function(files){
      handleSingleImage(files[0], 1000, 0.80, function(url){
        pendingTransportImage = url;
        var p = $('#tspPreview'); if (p) p.innerHTML = '<img src="' + url + '" alt="preview">';
      });
    });

    var svcSave = $('#svcSave'); if (svcSave) svcSave.addEventListener('click', saveService);
    var svcReset = $('#svcReset'); if (svcReset) svcReset.addEventListener('click', resetServiceForm);
    var adminSL = $('#adminServiceList');
    if (adminSL) adminSL.addEventListener('click', function(e){
      var eb = e.target.closest('[data-edit]'), db = e.target.closest('[data-del]');
      if (eb) editService(eb.getAttribute('data-edit'));
      if (db){
        var id = db.getAttribute('data-del');
        var s = state.services.filter(function(x){ return x.id === id; })[0];
        if (!s) return;
        if (!confirm('Delete "' + s.title + '"?')) return;
        state.services = state.services.filter(function(x){ return x.id !== id; });
        if (saveState()){ renderServices(); renderQuickServices(); renderServiceSelect(); renderFooterServices(); renderAdminServices(); resetServiceForm(); toast('Service deleted.', 'ok'); }
      }
    });
    setupDropzone($('#svcDrop'), function(files){
      handleSingleImage(files[0], 1000, 0.80, function(url){
        pendingServiceImage = url;
        var p = $('#svcPreview'); if (p) p.innerHTML = '<img src="' + url + '" alt="preview">';
      });
    });

    var nailSave = $('#nailSave'); if (nailSave) nailSave.addEventListener('click', saveNail);
    var nailReset = $('#nailReset'); if (nailReset) nailReset.addEventListener('click', resetNailForm);
    var adminNL = $('#adminNailList');
    if (adminNL) adminNL.addEventListener('click', function(e){
      var eb = e.target.closest('[data-nedit]'), db = e.target.closest('[data-ndel]');
      if (eb) editNail(eb.getAttribute('data-nedit'));
      if (db){
        var id = db.getAttribute('data-ndel');
        var n = state.nailServices.filter(function(x){ return x.id === id; })[0];
        if (!n) return;
        if (!confirm('Delete "' + n.title + '"?')) return;
        state.nailServices = state.nailServices.filter(function(x){ return x.id !== id; });
        if (saveState()){ renderNails(); renderServiceSelect(); renderFooterServices(); renderAdminNails(); resetNailForm(); toast('Nail service deleted.', 'ok'); }
      }
    });
    setupDropzone($('#nailDrop'), function(files){
      handleSingleImage(files[0], 1000, 0.80, function(url){
        pendingNailImage = url;
        var p = $('#nailPreview'); if (p) p.innerHTML = '<img src="' + url + '" alt="preview">';
      });
    });

    setupDropzone($('#galDrop'), function(files){
      toast('Processing ' + files.length + ' image(s)…');
      var remaining = files.length, added = 0;
      files.forEach(function(file){
        compressImage(file, 1000, 1000, 0.75).then(function(url){
          state.gallery.push({ id: uid('g'), img: url, caption: file.name.replace(/\.[^.]+$/, '') });
          added++;
        }).catch(function(err){ console.warn('Could not process', file.name, err); })
        .then(function(){
          remaining--;
          if (remaining === 0){
            if (added && saveState()){ renderGallery(); renderAdminGallery(); toast(added + ' image(s) added to gallery.', 'ok'); }
            else if (!added){ toast('No images were added.', 'err'); }
          }
        });
      });
    });

    var ag = $('#adminGallery');
    if (ag) ag.addEventListener('click', function(e){
      var btn = e.target.closest('[data-galdel]');
      if (!btn) return;
      var id = btn.getAttribute('data-galdel');
      if (!confirm('Remove this image from the gallery?')) return;
      state.gallery = state.gallery.filter(function(g){ return g.id !== id; });
      if (saveState()){ renderGallery(); renderAdminGallery(); toast('Image removed.', 'ok'); }
    });

    setupDropzone($('#logoDrop'), function(files){
      handleSingleImage(files[0], 420, 0.92, function(url){
        state.images.logo = url;
        if (saveState()){ renderBusiness(); renderBrandImages(); toast('Logo updated.', 'ok'); }
      });
    });
    setupDropzone($('#heroDrop'), function(files){
      handleSingleImage(files[0], 1800, 0.78, function(url){
        state.images.hero = url;
        if (saveState()){ renderBrandImages(); toast('Hero background updated.', 'ok'); }
      });
    });
    setupDropzone($('#aboutDrop'), function(files){
      handleSingleImage(files[0], 1200, 0.80, function(url){
        state.images.about = url;
        if (saveState()){ renderBrandImages(); toast('About image updated.', 'ok'); }
      });
    });

    $$('[data-reset]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var which = btn.getAttribute('data-reset');
        if (which === 'logo')  state.images.logo  = '';
        if (which === 'hero')  state.images.hero  = DEFAULTS.images.hero;
        if (which === 'about') state.images.about = DEFAULTS.images.about;
        if (saveState()){ renderBusiness(); renderBrandImages(); toast('Restored to default.', 'ok'); }
      });
    });

    var bizSave = $('#bizSave');
    if (bizSave) bizSave.addEventListener('click', function(){
      var b = state.business;
      var g = function(sel){ var el = $(sel); return el ? el.value.trim() : ''; };
      b.name         = g('#bizName') || DEFAULTS.business.name;
      b.suffix       = g('#bizTagline');
      b.phone        = g('#bizPhone');
      b.whatsapp     = g('#bizWhats');
      b.nailPhone    = g('#bizNailPhone');
      b.nailTiktok   = g('#bizNailTiktok') || DEFAULTS.business.nailTiktok;
      b.email        = g('#bizEmail');
      b.address      = g('#bizAddress');
      b.hours        = g('#bizHours');
      b.about        = g('#bizAbout');
      b.password     = g('#bizPass') || 'admin123';
      b.shortName    = b.name.split('(')[0].trim() || b.name;
      if (saveState()){ renderAll(); toast('Business information saved.', 'ok'); }
    });
    var bizReset = $('#bizReset');
    if (bizReset) bizReset.addEventListener('click', function(){ renderBusinessForm(); toast('Changes discarded.'); });
  }

  function saveTransport(){
    var titleEl = $('#tspTitle'), priceEl = $('#tspPrice'), descEl = $('#tspDesc'), idEl = $('#tspId');
    var title = titleEl ? titleEl.value.trim() : '';
    var price = priceEl ? priceEl.value.trim() : '';
    var desc  = descEl  ? descEl.value.trim()  : '';
    var id    = idEl    ? idEl.value : '';
    if (!title){ toast('Please enter a service name.', 'err'); return; }
    if (!price){ toast('Please enter a price.', 'err'); return; }
    if (!desc) { toast('Please enter a description.', 'err'); return; }
    if (id){
      var t = state.transportServices.filter(function(x){ return x.id === id; })[0];
      if (!t) return;
      t.title = title; t.price = price; t.desc = desc;
      if (pendingTransportImage) t.img = pendingTransportImage;
    } else {
      state.transportServices.push({ id: uid('t'), title: title, price: price, desc: desc, img: pendingTransportImage || DEFAULTS.transportServices[0].img });
    }
    if (saveState()){
      renderTransport(); renderQuickServices(); renderServiceSelect(); renderFooterServices(); renderAdminTransport();
      resetTransportForm();
      toast(id ? 'Transport service updated.' : 'Transport service added.', 'ok');
    }
  }
  function editTransport(id){
    var t = state.transportServices.filter(function(x){ return x.id === id; })[0];
    if (!t) return;
    setVal('#tspId', t.id); setVal('#tspTitle', t.title); setVal('#tspPrice', t.price); setVal('#tspDesc', t.desc);
    pendingTransportImage = null;
    var p = $('#tspPreview'); if (p) p.innerHTML = t.img ? '<img src="' + t.img + '" alt="preview">' : '';
    var ti = $('#tspFormTitle'); if (ti) ti.textContent = 'Edit Transport Service';
    var s = $('#tspTitle'); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function resetTransportForm(){
    setVal('#tspId', ''); setVal('#tspTitle', ''); setVal('#tspPrice', ''); setVal('#tspDesc', '');
    var p = $('#tspPreview'); if (p) p.innerHTML = '';
    pendingTransportImage = null;
    var ti = $('#tspFormTitle'); if (ti) ti.textContent = 'Add Transport Service';
  }

  function saveService(){
    var titleEl = $('#svcTitle'), priceEl = $('#svcPrice'), descEl = $('#svcDesc'), idEl = $('#svcId');
    var title = titleEl ? titleEl.value.trim() : '';
    var price = priceEl ? priceEl.value.trim() : '';
    var desc  = descEl  ? descEl.value.trim()  : '';
    var id    = idEl    ? idEl.value : '';
    if (!title){ toast('Please enter a service name.', 'err'); return; }
    if (!price){ toast('Please enter a price.', 'err'); return; }
    if (!desc) { toast('Please enter a description.', 'err'); return; }
    if (id){
      var s = state.services.filter(function(x){ return x.id === id; })[0];
      if (!s) return;
      s.title = title; s.price = price; s.desc = desc;
      if (pendingServiceImage) s.img = pendingServiceImage;
    } else {
      state.services.push({ id: uid('s'), title: title, price: price, desc: desc, img: pendingServiceImage || DEFAULTS.services[0].img });
    }
    if (saveState()){
      renderServices(); renderQuickServices(); renderServiceSelect(); renderFooterServices(); renderAdminServices();
      resetServiceForm();
      toast(id ? 'Service updated.' : 'Service added.', 'ok');
    }
  }
  function editService(id){
    var s = state.services.filter(function(x){ return x.id === id; })[0];
    if (!s) return;
    setVal('#svcId', s.id); setVal('#svcTitle', s.title); setVal('#svcPrice', s.price); setVal('#svcDesc', s.desc);
    pendingServiceImage = null;
    var p = $('#svcPreview'); if (p) p.innerHTML = s.img ? '<img src="' + s.img + '" alt="preview">' : '';
    var ti = $('#serviceFormTitle'); if (ti) ti.textContent = 'Edit Sanitation Service';
    var i = $('#svcTitle'); if (i) i.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function resetServiceForm(){
    setVal('#svcId', ''); setVal('#svcTitle', ''); setVal('#svcPrice', ''); setVal('#svcDesc', '');
    var p = $('#svcPreview'); if (p) p.innerHTML = '';
    pendingServiceImage = null;
    var ti = $('#serviceFormTitle'); if (ti) ti.textContent = 'Add Sanitation Service';
  }

  function saveNail(){
    var titleEl = $('#nailTitle'), priceEl = $('#nailPrice'), descEl = $('#nailDesc'), idEl = $('#nailId');
    var title = titleEl ? titleEl.value.trim() : '';
    var price = priceEl ? priceEl.value.trim() : '';
    var desc  = descEl  ? descEl.value.trim()  : '';
    var id    = idEl    ? idEl.value : '';
    if (!title){ toast('Please enter a service name.', 'err'); return; }
    if (!price){ toast('Please enter a price.', 'err'); return; }
    if (!desc) { toast('Please enter a description.', 'err'); return; }
    if (id){
      var n = state.nailServices.filter(function(x){ return x.id === id; })[0];
      if (!n) return;
      n.title = title; n.price = price; n.desc = desc;
      if (pendingNailImage) n.img = pendingNailImage;
    } else {
      state.nailServices.push({ id: uid('n'), title: title, price: price, desc: desc, img: pendingNailImage || DEFAULTS.nailServices[0].img });
    }
    if (saveState()){
      renderNails(); renderServiceSelect(); renderFooterServices(); renderAdminNails();
      resetNailForm();
      toast(id ? 'Nail service updated.' : 'Nail service added.', 'ok');
    }
  }
  function editNail(id){
    var n = state.nailServices.filter(function(x){ return x.id === id; })[0];
    if (!n) return;
    setVal('#nailId', n.id); setVal('#nailTitle', n.title); setVal('#nailPrice', n.price); setVal('#nailDesc', n.desc);
    pendingNailImage = null;
    var p = $('#nailPreview'); if (p) p.innerHTML = n.img ? '<img src="' + n.img + '" alt="preview">' : '';
    var ti = $('#nailFormTitle'); if (ti) ti.textContent = 'Edit Nail Bar Service';
    var i = $('#nailTitle'); if (i) i.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function resetNailForm(){
    setVal('#nailId', ''); setVal('#nailTitle', ''); setVal('#nailPrice', ''); setVal('#nailDesc', '');
    var p = $('#nailPreview'); if (p) p.innerHTML = '';
    pendingNailImage = null;
    var ti = $('#nailFormTitle'); if (ti) ti.textContent = 'Add Nail Bar Service';
  }

  function init(){
    state = loadState();
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    renderAll();
    initNav();
    initLightbox();
    initContactForm();
    initAdmin();

    var heroImg = $('#heroImg');
    if (heroImg && window.matchMedia('(min-width: 900px)').matches){
      window.addEventListener('scroll', function(){
        var yy = window.scrollY;
        if (yy < window.innerHeight){
          heroImg.style.transform = 'translateY(' + (yy * 0.18) + 'px) scale(1.06)';
        }
      }, { passive: true });
    }

    console.log('%cCLAMMY CAB (PTY) LTD — Transport · Sanitation · Tiyi Nail Bar', 'color:#f97316;font-weight:900;font-size:14px;');
    console.log('Admin: click "Admin" in the menu. Default password: admin123');
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();