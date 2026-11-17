/* Zeo · gatito asistente de Zeobent Cat’s.
   Widget de chat para toda la web. Los textos, números, horarios y preguntas frecuentes se editan en data/zeo.js.
   Usa los productos de data/products.js (precios, enlaces de Mercado Libre / Amazon) y respeta el idioma ES/EN/PT de la web. */
(function () {
  'use strict';
  const Z = window.ZC && window.ZC.zeo;
  if (!Z || document.getElementById('zeo-root')) return;

  // ---------- utilidades ----------
  const LANGS = ['es', 'en', 'pt'];
  const lang = () => { const l = (document.documentElement.lang || 'es').slice(0, 2); return LANGS.includes(l) ? l : 'es'; };
  // Marcadores [[vos|usted]] en los textos en español: se elige según la edad declarada (más de 50 → usted; menos → vos).
  const vz = s => (lang() === 'es' ? String(s).replace(/\[\[([^|\]]*)\|([^\]]*)\]\]/g, (m, a, b) => (S.vos ? a : b)) : String(s));
  const U = (k, v) => {
    let t = (Z.ui[lang()] || {})[k]; if (t == null) t = Z.ui.es[k]; if (t == null) t = '';
    t = vz(t);
    return v ? t.replace(/\{(\w+)\}/g, (m, x) => (v[x] != null ? v[x] : '')) : t;
  };
  const UE = k => Z.ui.es[k] || '';
  const L10 = o => vz((o && (o[lang()] || o.es)) || '');
  const norm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const clean = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n || 300);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const money = n => '$ ' + Number(n).toLocaleString('es-AR');
  const prods = () => ((window.ZC && window.ZC.products) || []).filter(p => p.visible !== false);
  const cfgDesc = () => Object.assign({ min: 10, pct: 10 }, (window.ZC && window.ZC.config && window.ZC.config.desc) || {});
  const safeUrl = u => { try { const x = new URL(u, location.href); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch (_) { return ''; } };
  const store = { get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (_) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (_) {} } };
  const local = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (_) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} } };
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const k in (attrs || {})) { if (k === 'class') e.className = attrs[k]; else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]); else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k]); }
    kids.flat().forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  }
  // Texto con **negrita**, viñetas y saltos de línea; todo como texto (nunca HTML).
  function fmt(text, into) {
    String(text).split('\n').forEach((line, i) => {
      if (i) into.append(document.createElement('br'));
      line.split(/\*\*(.+?)\*\*/g).forEach((part, j) => { if (!part) return; if (j % 2) into.append(h('b', null, part)); else into.append(document.createTextNode(part)); });
    });
  }
  const fill = (s, extra) => {
    const d = cfgDesc();
    return String(s).replace(/\{(\w+)\}/g, (m, k) => ({ min: d.min, pct: d.pct, hours: L10(Z.horario.texto), email: Z.email, phones: Z.telefonos, web: Z.web, wa_ar: (Z.wa_texto || {}).ar, wa_us: (Z.wa_texto || {}).us }[k] ?? (extra && extra[k]) ?? m));
  };
  const waNum = m => { const w = Z.whatsapp; return !w ? '' : typeof w === 'string' ? w : (w[m] || w.us || w.ar || ''); };
  const tzAR = () => { try { return /^America\/Argentina/.test(Intl.DateTimeFormat().resolvedOptions().timeZone || ''); } catch (_) { return false; } };
  // Argentina → WhatsApp Business de Argentina; resto del mundo → WhatsApp Business de EE.UU.
  const market = () => {
    const z = S.zone || (S.lead.pais ? parseZone(S.lead.pais) : null);
    if (z === 'ros' || z === 'ar') return 'ar'; if (z === 'us' || z === 'other') return 'us';
    return tzAR() ? 'ar' : 'us';
  };
  const wa = (msg, m) => { const n = waNum(m || market()); return n ? 'https://wa.me/' + String(n).replace(/\D/g, '') + '?text=' + encodeURIComponent(msg) : ''; };
  const mail = (subj, body) => 'mailto:' + Z.email + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
  function openNow() {
    try {
      const H = Z.horario, p = new Intl.DateTimeFormat('en-US', { timeZone: H.tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      const g = t => p.find(x => x.type === t).value, wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[g('weekday')];
      const m = (+g('hour') % 24) * 60 + +g('minute'), hm = s => { const q = s.split(':'); return +q[0] * 60 + +q[1]; };
      return H.dias.includes(wd) && m >= hm(H.desde) && m < hm(H.hasta);
    } catch (_) { return null; }
  }

  // ---------- comprensión de texto libre ----------
  function score(t, kws) {
    const pad = ' ' + t + ' '; let s = 0;
    for (const k0 of kws) { const k = norm(k0); if (!k) continue; if (k.length <= 3 ? pad.includes(' ' + k + ' ') : pad.includes(' ' + k)) s += k.length; }
    return s;
  }
  function route(text) {
    const t = norm(text); if (!t) return null;
    let best = null, bs = 0;
    Z.intents.forEach(it => { const s = score(t, it.k) * (it.go === 'wholesale' || it.go === 'human' ? 2 : 1); if (s > bs) { bs = s; best = { go: it.go }; } });
    Z.faq.forEach(f => { const s = score(t, f.k); if (s > bs) { bs = s; best = { faq: f }; } });
    return best;
  }
  const GREET = /^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hi|hello|hey|good morning|good afternoon|oi|ola|bom dia|boa tarde|boa noite)\b/;
  const THANKS = /\b(gracias|muchas gracias|thanks|thank you|obrigado|obrigada|valeu)\b/;
  const CANCEL = ['menu', 'inicio', 'cancelar', 'cancel', 'salir', 'volver', 'back', 'sair', 'voltar', 'home'];
  const AR = ['argentina', 'arg', 'buenos aires', 'caba', 'cordoba', 'mendoza', 'santa fe', 'tucuman', 'salta', 'neuquen', 'chaco', 'entre rios', 'misiones', 'corrientes', 'la plata', 'mar del plata', 'bahia blanca', 'san luis', 'jujuy', 'san juan', 'la pampa', 'chubut', 'rio negro', 'santa cruz', 'tierra del fuego', 'formosa', 'catamarca', 'la rioja', 'santiago del estero', 'rafaela', 'venado tuerto', 'parana', 'posadas', 'resistencia'];
  const US = ['estados unidos', 'eeuu', 'ee uu', 'usa', 'us', 'u s', 'united states', 'america', 'florida', 'california', 'texas', 'new york', 'miami', 'nueva york', 'estados unidos da america'];
  function parseZone(text) {
    const t = norm(text), pad = ' ' + t + ' ';
    if (pad.includes(' rosario ')) return 'ros';
    if (AR.some(k => pad.includes(' ' + k + ' '))) return 'ar';
    if (US.some(k => pad.includes(' ' + k + ' '))) return 'us';
    return 'other';
  }

  // ---------- estado ----------
  const S = { mode: null, f: null, zone: null, lead: {}, log: [], user: 0, started: false, age: null, vos: false, minor: false };
  const saved = store.get('zeo_s') || {};
  if (saved.lead) S.lead = saved.lead;
  if (saved.age) { S.age = saved.age; S.minor = saved.age === 'minor'; S.vos = saved.age !== 'senior'; }
  const known = local.get('zeo_u') || {};
  if (!S.lead.nombre && known.n && !S.minor) S.known = known.n;
  const persist = () => store.set('zeo_s', { open: !panel.hidden, log: S.log.slice(-30), lead: S.lead, user: S.user, age: S.age });

  // ---------- interfaz ----------
  const AV = 'assets/zeo-avatar.webp';
  const fab = h('button', { class: 'zeo-fab', type: 'button', 'aria-controls': 'zeo-panel', 'aria-expanded': 'false' }, h('img', { src: AV, alt: '' }), h('span', { class: 'zeo-dot', 'aria-hidden': 'true' }));
  const tipTxt = h('span'), tipX = h('button', { type: 'button', class: 'zeo-tipx' }, '×');
  const tip = h('div', { class: 'zeo-tip', role: 'note', hidden: true }, tipTxt, tipX);
  const title = h('b'), sub = h('span'), closeB = h('button', { type: 'button', class: 'zeo-x' }, '×');
  const waB = h('a', { class: 'zeo-wa', target: '_blank', rel: 'noopener' });
  const log = h('div', { class: 'zeo-log', role: 'log', 'aria-live': 'polite', tabindex: '0' });
  const qbox = h('div', { class: 'zeo-q' });
  const inp = h('input', { type: 'text', maxlength: '300', autocomplete: 'off', enterkeyhint: 'send' });
  const sendB = h('button', { type: 'submit', class: 'zeo-send' });
  const form = h('form', { class: 'zeo-f' }, inp, sendB);
  const disc = h('p', { class: 'zeo-d' });
  const panel = h('section', { id: 'zeo-panel', class: 'zeo-panel', role: 'dialog', 'aria-modal': 'false', hidden: true },
    h('header', { class: 'zeo-h' }, h('img', { src: AV, alt: '' }), h('div', { class: 'zeo-ht' }, title, sub), waB, closeB), log, qbox, form, disc);
  const root = h('div', { id: 'zeo-root' }, tip, panel, fab);

  function chrome() {
    title.textContent = U('title'); sub.textContent = U('online') + ' · ' + U('sub');
    closeB.setAttribute('aria-label', U('aria_close')); fab.setAttribute('aria-label', U('aria_open'));
    log.setAttribute('aria-label', U('aria_log')); panel.setAttribute('aria-label', U('title'));
    inp.placeholder = U('placeholder'); inp.setAttribute('aria-label', U('placeholder')); sendB.textContent = U('send');
    disc.textContent = U('disclaimer'); tipTxt.textContent = U('bubble'); tipX.setAttribute('aria-label', U('aria_close'));
    const w = S.minor ? '' : wa(U('wa_generic')); waB.hidden = !w; if (w) { waB.href = w; waB.textContent = U('wa'); waB.title = U('wa_title'); waB.setAttribute('aria-label', U('wa_title')); }
  }
  const scroll = () => { log.scrollTop = log.scrollHeight; };
  function addMsg(who, text, rec) {
    const bd = h('div', { class: 'zeo-b' }); fmt(text, bd);
    const m = h('div', { class: 'zeo-m ' + who }, who === 'bot' ? h('img', { src: AV, alt: '' }) : null, bd);
    log.append(m); scroll();
    if (rec !== false) { S.log.push({ w: who, t: text }); persist(); }
    return bd;
  }
  let typing = null;
  const showTyping = () => { typing = h('div', { class: 'zeo-m bot zeo-typing', 'aria-hidden': 'true' }, h('img', { src: AV, alt: '' }), h('div', { class: 'zeo-b' }, h('i'), h('i'), h('i'))); log.append(typing); scroll(); };
  const hideTyping = () => { if (typing) typing.remove(); typing = null; };
  const reduced = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) { return false; } };
  async function say(text, build) {
    const d = reduced() ? 0 : Z.demora;
    if (d > 0) { showTyping(); await sleep(d); hideTyping(); }
    const bd = addMsg('bot', text); if (build) build(bd); scroll(); return bd;
  }
  const me = t => { addMsg('me', t); S.user++; persist(); };
  const link = (href, label, cls, ext) => h('a', { class: 'zeo-lk ' + (cls || ''), href, target: ext ? '_blank' : null, rel: ext ? 'noopener' : null }, label);
  const links = (arr, bd) => { if (!arr || !arr.length) return; bd.append(h('div', { class: 'zeo-links' }, arr.map(x => link(x.h, U(x.l))))); };

  let chain = Promise.resolve();
  const enqueue = fn => (chain = chain.then(fn).catch(e => console.error('Zeo:', e)));
  function setChips(list, note) {
    qbox.textContent = ''; qbox.classList.toggle('tiles', !!(list || []).some(c => c.tile));
    if (note) qbox.append(h('div', { class: 'zeo-step' }, note));
    (list || []).forEach(c => {
      const m = c.tile && c.l.match(/^(\p{Extended_Pictographic}\S*)\s+(.*)$/u);
      qbox.append(h('button', { type: 'button', class: 'zeo-chip' + (c.tile ? ' zeo-tile' : ''), onclick: () => { setChips([]); me(c.l); enqueue(c.fn); } }, m ? [h('span', { class: 'zeo-ico', 'aria-hidden': 'true' }, m[1]), h('span', null, m[2])] : c.l));
    });
    qbox.hidden = !qbox.children.length; qbox.scrollTop = 0;
  }
  const chip = (k, fn, tile) => ({ l: U(k), fn, tile: !!tile });
  const cancelChip = () => chip('c_cancel', cancel);

  // ---------- menú y respuestas ----------
  const menuChips = () => (S.minor
    ? [chip('m_prod', goProduct, 1), chip('m_price', goPrice, 1), chip('m_faq', goFaq, 1)]
    : [chip('m_prod', goProduct, 1), chip('m_price', goPrice, 1), chip('m_buy', goBuy, 1), chip('m_whole', goWholesale, 1), chip('m_faq', goFaq, 1), chip('m_human', goHuman, 1)]);
  const minorOnly = () => S.minor;
  async function blockMinor() { S.mode = null; S.f = null; await say(U('minor_block')); setChips(menuChips()); }
  async function menu(intro) { S.mode = null; S.f = null; await say(intro || U('ask_menu')); setChips(menuChips()); }
  const after = () => (S.minor ? [chip('m_faq', goFaq), chip('m_menu', () => menu())] : [chip('m_buy', goBuy), chip('m_faq', goFaq), chip('m_human', goHuman), chip('m_menu', () => menu())]);

  const ageGate_chips = () => setChips([{ l: U('b_age_minor'), fn: () => setAge('minor') }, { l: U('b_age_adult'), fn: () => setAge('adult') }, { l: U('b_age_senior'), fn: () => setAge('senior') }]);
  async function ageGate() {
    S.mode = 'age'; await say(U('age_ask'));
    setChips([{ l: U('b_age_minor'), fn: () => setAge('minor') }, { l: U('b_age_adult'), fn: () => setAge('adult') }, { l: U('b_age_senior'), fn: () => setAge('senior') }]);
  }
  async function setAge(b) {
    S.age = b; S.minor = b === 'minor'; S.vos = b !== 'senior'; S.mode = null; chrome(); persist();
    await say(U(S.minor ? 'minor_msg' : 'safe_note')); await greet();
  }
  const ageFromText = t => { const m = String(t).match(/\d{1,3}/); if (!m) return null; const n = +m[0]; return n < 18 ? 'minor' : n <= 50 ? 'adult' : 'senior'; };
  async function greet() {
    const n = S.minor ? '' : (S.lead.nombre || S.known);
    await say(n ? U('hello_back', { n }) : U('hello')); await menu();
  }
  async function goProduct() { S.mode = null; await say(U('prod_intro'), bd => links([{ h: 'producto.html', l: 'l_product' }], bd)); await say(U('prod_next')); setChips([chip('m_price', goPrice), chip('m_buy', goBuy), chip('m_faq', goFaq), chip('m_menu', () => menu())]); }
  async function goFaq() {
    S.mode = null; await say(U('faq_intro'));
    setChips(Z.faq.filter(f => f.menu).map(f => ({ l: L10(f.q), fn: () => answerFaq(f) })).concat([chip('m_human', goHuman), chip('m_menu', () => menu())]));
  }
  async function answerFaq(f) { S.mode = null; await say(fill(L10(f.a)), bd => links(f.link, bd)); setChips(after()); }
  async function goHours() {
    S.mode = null; const o = openNow();
    await say(U('hours_line', { hours: L10(Z.horario.texto) }) + (o == null ? '' : '\n' + U(o ? 'open_now' : 'closed_now')));
    setChips(after());
  }
  async function goPrice() {
    S.mode = null; const d = cfgDesc(), lines = prods().map(p => {
      const tags = [p.promo && U('price_promo'), p.oferta && U('price_offer'), p.envio_gratis_local && U('price_free')].filter(Boolean);
      return '• **' + (p.corto || p.nombre) + '** — ' + (p.precio != null ? money(p.precio) : U('price_ask')) + (tags.length ? ' (' + tags.join(', ') + ')' : '');
    });
    await say(U('price_intro') + '\n' + lines.join('\n') + '\n' + U('price_disc', d) + '\n' + U('price_abroad'));
    setChips([chip('m_buy', goBuy), chip('m_whole', goWholesale), chip('m_human', goHuman), chip('m_menu', () => menu())]);
  }

  // ---------- compra guiada: Mercado Libre (Argentina) / Amazon (resto del mundo) ----------
  async function goBuy() {
    if (minorOnly()) return blockMinor();
    S.mode = 'zone'; await say(U('buy_ask'));
    setChips([chip('c_ros', () => setZone('ros')), chip('c_ar', () => setZone('ar')), chip('c_us', () => setZone('us')), chip('c_other', () => setZone('other')), cancelChip()]);
  }
  const zoneInput = text => setZone(parseZone(text), clean(text, 60));
  async function setZone(z, typed) {
    S.mode = null; S.zone = z; chrome();
    if (!S.lead.pais) S.lead.pais = z === 'ros' ? 'Rosario, Argentina' : z === 'ar' ? 'Argentina' : z === 'us' ? 'Estados Unidos' : (typed && norm(typed) !== norm(U('c_other')) ? typed : '');
    persist();
    const ar = z === 'ros' || z === 'ar';
    let list = prods();
    if (!ar) list = list.filter(p => p.id !== 'granel').sort((a, b) => (b.id === 'caja-18lb') - (a.id === 'caja-18lb'));
    if (!list.length) { await say(U('buy_none')); return askLead(); }
    await say(U({ ros: 'buy_ros', ar: 'buy_ar', us: 'buy_us', other: 'buy_other' }[z]), bd => {
      const box = h('div', { class: 'zeo-cards' }); list.forEach(p => box.append(card(p, z))); bd.append(box);
      if (z === 'ros') bd.append(h('div', { class: 'zeo-links' }, link('carrito.html', U('btn_cart'))));
    });
    return askLead();
  }
  async function askLead() {
    await say(U('buy_after'));
    setChips([chip('c_yes_lead', goLead), chip('m_whole', goWholesale), chip('m_human', goHuman), chip('c_no_lead', () => menu())]);
  }
  function card(p, z) {
    const ar = z === 'ros' || z === 'ar', acts = h('div', { class: 'zeo-acts' });
    const ml = safeUrl(p.ml_url), am = safeUrl(p.amazon_url || Z.amazon_tienda);
    if (p.precio == null && ar) acts.append(link('pedidos.html?producto=' + encodeURIComponent(p.id), U('btn_quote'), 'alt'));
    else if (ar) {
      acts.append(ml ? link(ml, U('btn_ml'), 'ml', true) : h('span', { class: 'zeo-soon' }, U('btn_ml_soon')));
      const add = h('button', { type: 'button', class: 'zeo-lk', onclick: () => { if (typeof addCart === 'function') { addCart(p.id, 1, true); add.textContent = U('added'); add.disabled = true; } else location.href = 'carrito.html'; } }, U('btn_add'));
      acts.append(add);
    } else acts.append(am ? link(am, U('btn_amz'), 'ml', true) : h('span', { class: 'zeo-soon' }, U('btn_amz_soon')));
    const price = ar ? (p.precio != null ? money(p.precio) : U('price_ask')) : U('lk_price_abroad');
    return h('div', { class: 'zeo-card' }, h('img', { src: p.img, alt: '' }), h('div', null, h('b', null, p.corto || p.nombre), h('span', { class: 'zeo-pr' }, price), acts));
  }

  // ---------- formularios conversacionales (clientes, mayoristas, derivación a persona) ----------
  const ok = v => ({ ok: true, v });
  const isMail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const isPhone = v => /^[+\d][\d\s()\-.]{5,}$/.test(v) && v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15;
  const prodChips = extra => () => prods().map(p => ({ l: p.corto || p.nombre, v: p.corto || p.nombre })).concat(extra ? [{ l: U(extra), v: '' }] : []);
  const STEP = {
    nombre: { f: 'nombre', q: 'q_name', val: v => (v.length >= 2 && v.length <= 60 && /[a-zA-ZÀ-ÿ]/.test(v) ? ok(v) : { err: 'err_name' }) },
    empresa: { f: 'empresa', q: 'q_company', chips: () => [{ l: U('c_skip'), v: '' }], val: v => ok(clean(v, 80)) },
    pais: { f: 'pais', q: 'q_country', skip: () => !!S.lead.pais, chips: () => [{ l: U('c_p_ar'), v: UE('c_p_ar') }, { l: U('c_p_us'), v: UE('c_p_us') }, { l: U('c_p_br'), v: UE('c_p_br') }], val: v => (v.length >= 2 ? ok(clean(v, 80)) : { err: 'q_country' }) },
    rol: { f: 'rol', q: 'q_role', chips: () => [{ l: U('c_role_retail'), v: U('c_role_retail') }, { l: U('c_role_whole'), v: U('c_role_whole') }, { l: U('c_role_imp'), v: U('c_role_imp') }, { l: U('c_role_vet'), v: U('c_role_vet') }], val: v => ok(clean(v, 60)) },
    interes: { f: 'producto', q: 'q_interest', chips: prodChips('c_unsure'), val: v => ok(clean(v, 80)) },
    producto: { f: 'producto', q: 'q_product', chips: prodChips(), val: v => ok(clean(v, 80)) },
    dudas: { f: 'dudas', q: 'q_doubts', skip: () => false, chips: () => [{ l: U('c_nodoubts'), v: '' }], val: v => ok(clean(v, 200)) },
    volumen: { f: 'volumen', q: 'q_volume', chips: () => [1, 2, 3, 4].map(i => ({ l: U('c_vol' + i), v: UE('c_vol' + i) })), val: v => (v.length >= 1 ? ok(clean(v, 120)) : { err: 'q_volume' }) },
    consulta: { f: 'dudas', q: 'q_query', skip: () => !!S.lead.dudas, val: v => (v.length >= 2 ? ok(clean(v, 250)) : { err: 'q_query' }) },
    contacto: { f: 'contacto', q: 'q_contact', chips: () => [{ l: U('c_nocontact'), v: '' }], val: v => (v === '' || isMail(v) || isPhone(v) ? ok(v) : { err: 'err_contact' }) },
    contactoReq: { f: 'contacto', q: 'q_contact_req', val: v => (isMail(v) || isPhone(v) ? ok(v) : { err: 'err_contact' }) },
    consent: { f: 'consent', q: 'q_consent', skip: () => !S.lead.contacto, chips: () => [{ l: U('c_consent_all'), v: 'all' }, { l: U('c_consent_reply'), v: 'reply' }, { l: U('c_consent_no'), v: 'no' }], val: v => ok(['all', 'reply', 'no'].includes(v) ? v : 'reply') }
  };
  const KINDS = {
    lead: ['nombre', 'pais', 'interes', 'dudas', 'contacto', 'consent'],
    mayorista: ['nombre', 'empresa', 'pais', 'rol', 'producto', 'volumen', 'contactoReq', 'consent'],
    persona: ['nombre', 'consulta']
  };
  function startForm(kind, intro) {
    if (minorOnly()) return blockMinor();
    S.mode = 'form'; S.f = { kind, steps: KINDS[kind].slice(), i: 0 };
    return (async () => { if (intro) await say(intro); await nextStep(); })();
  }
  const goLead = () => startForm('lead', U('lead_intro'));
  const goWholesale = () => startForm('mayorista', U('whole_intro'));
  const goHuman = () => startForm('persona', U('human_intro'));
  async function nextStep() {
    const F = S.f;
    while (F.i < F.steps.length && STEP[F.steps[F.i]].skip && STEP[F.steps[F.i]].skip()) F.i++;
    if (F.i >= F.steps.length) return finish();
    const st = STEP[F.steps[F.i]], cs = (st.chips ? st.chips() : []).map(c => ({ l: c.l, fn: () => formAnswer(c.v) }));
    const stat = n => (n === 'pais' || n === 'consulta') && STEP[n].skip(), tot = F.steps.filter(n => !stat(n)).length, cur = F.steps.slice(0, F.i + 1).filter(n => !stat(n)).length;
    await say(U(st.q, { n: S.lead.nombre }));
    setChips(cs.concat([cancelChip()]), U('paso', { i: cur, n: tot }));
  }
  async function formAnswer(raw) {
    const F = S.f; if (!F) return; const st = STEP[F.steps[F.i]], v = clean(raw), r = st.val(v);
    if (!r.ok) { await say(U(r.err)); return; }
    S.lead[st.f] = r.v; if (st.f === 'consent' && r.v === 'no') S.lead.contacto = '';
    persist(); F.i++; return nextStep();
  }
  async function cancel() { S.mode = null; S.f = null; await say(U('cancelled')); await menu(); }

  function summary(kind) {
    const L = S.lead, E = Z.ui.es, rows = [];
    const add = (k, v) => { if (v) rows.push('• ' + k + ': ' + v); };
    const t = { lead: 'Cliente interesado', mayorista: 'COTIZACIÓN MAYORISTA', persona: 'Consulta' }[kind];
    add(E.wm_ask, t); add(E.wm_type, L.rol); add(E.wm_company, L.empresa); add(E.wm_country, L.pais);
    add(E.wm_prod, L.producto); add(E.wm_vol, L.volumen); add(E.wm_query, L.dudas); add(E.wm_contact, L.contacto);
    if (L.consent) add(E.wm_news, L.consent === 'all' ? E.wm_yes : E.wm_no);
    add(E.wm_lang, lang().toUpperCase());
    return E.wm_hello.replace('{n}', L.nombre || '') + '\n' + rows.join('\n');
  }
  async function deliver(kind, msg) {
    const L = S.lead; let sent = false;
    const ep = typeof CFG !== 'undefined' && CFG && CFG.endpoint;
    if (ep && L.consent && L.consent !== 'no' && L.contacto) {
      try {
        const d = new FormData(); d.append('_subject', 'Zeo chat - ' + kind); d.append('mensaje', msg);
        ['nombre', 'empresa', 'pais', 'rol', 'producto', 'volumen', 'dudas', 'contacto', 'consent'].forEach(k => { if (L[k]) d.append(k, L[k]); });
        const r = await fetch(ep, { method: 'POST', body: d, headers: { Accept: 'application/json' } }); sent = r.ok;
      } catch (_) {}
    }
    return sent;
  }
  async function finish() {
    const kind = S.f.kind, L = S.lead, msg = summary(kind); S.mode = null; S.f = null;
    if (L.nombre) local.set('zeo_u', { n: L.nombre });
    const sent = await deliver(kind, msg), hours = L10(Z.horario.texto), o = openNow();
    await say(U('summary_title') + '\n' + msg);
    const w = wa(msg), subj = kind === 'mayorista' ? 'Cotización mayorista - Zeobent Cat’s' : 'Consulta web - Zeobent Cat’s';
    await say((sent ? U('sent_ok') : U(w ? 'sent_wa' : 'sent_nowa')), bd => {
      const row = h('div', { class: 'zeo-acts' });
      if (w) row.append(link(w, U('btn_wa'), 'wa', true));
      row.append(link(mail(subj, msg), U('btn_mail')));
      if (kind === 'mayorista') row.append(link('pedidos.html?producto=granel', U('btn_form')));
      bd.append(row);
    });
    await say(U(kind === 'mayorista' ? 'done_whole' : kind === 'persona' ? 'done_human' : 'done_retail', { n: L.nombre, hours }) + (kind === 'lead' ? '' : (o == null ? '' : '\n' + U(o ? 'open_now' : 'closed_now'))));
    if (kind === 'lead') await say(U('fidel'), bd => links([{ h: 'ofertas.html', l: 'l_offers' }, { h: 'comunidad.html', l: 'l_comm' }], bd));
    setChips([chip('m_buy', goBuy), chip('m_faq', goFaq), chip('m_menu', () => menu())]);
  }

  // ---------- entrada de texto ----------
  async function freeText(text) {
    const t = norm(text), r = route(text);
    if (r && r.faq) return answerFaq(r.faq);
    if (r && r.go) return ({ human: goHuman, wholesale: goWholesale, buy: goBuy, price: goPrice, hours: goHours, product: goProduct, faq: goFaq })[r.go]();
    if (THANKS.test(t)) { await say(U('thanks')); return setChips(after()); }
    if (GREET.test(t) && t.split(' ').length <= 4) { await say(U('greet')); return setChips(menuChips()); }
    const d = clean(text, 150);
    if (d && !S.lead.dudas) { S.lead.dudas = d; persist(); }
    await say(U('nomatch'));
    setChips([chip('m_human', goHuman), chip('m_faq', goFaq), chip('m_menu', () => menu())]);
  }
  const DEL = /\b(borrar|eliminar|apagar|delete|erase|remove)\b.*\b(datos|dados|data)\b/;
  async function handle(text) {
    if (DEL.test(norm(text))) { S.lead = {}; S.known = ''; try { localStorage.removeItem('zeo_u'); } catch (_) {} persist(); await say(U('privacy_deleted')); return setChips(menuChips()); }
    if (S.mode === 'age') { const b = ageFromText(text); if (b) return setAge(b); await say(U('age_ask')); return ageGate_chips(); }
    if (CANCEL.includes(norm(text))) return S.mode ? cancel() : menu();
    if (S.mode === 'form') return formAnswer(text);
    if (S.mode === 'zone') return zoneInput(text);
    return freeText(text);
  }
  form.addEventListener('submit', e => {
    e.preventDefault(); const v = clean(inp.value); if (!v) return; inp.value = '';
    setChips([]); me(v); enqueue(() => handle(v));
  });

  // ---------- abrir / cerrar ----------
  function open(focus) {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); fab.hidden = false; tip.hidden = true; root.classList.add('on');
    if (!S.started) { S.started = true; start(); }
    persist(); if (focus !== false) setTimeout(() => inp.focus(), 30); scroll();
  }
  function close() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); root.classList.remove('on'); persist(); fab.focus(); }
  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeB.addEventListener('click', close);
  tipX.addEventListener('click', () => { tip.hidden = true; store.set('zeo_tip', 1); });
  tip.addEventListener('click', e => { if (e.target !== tipX) open(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });

  function start() {
    if (saved.log && saved.log.length && saved.age) {
      S.log = saved.log.slice(); S.user = saved.user || 0;
      S.log.forEach(m => addMsg(m.w, m.t, false));
      setChips(menuChips()); return;
    }
    enqueue(ageGate);
  }

  // ---------- idioma: sigue el selector ES / EN / PT de la web ----------
  new MutationObserver(() => {
    chrome();
    if (S.started && !S.user) { log.textContent = ''; S.log = []; setChips([]); enqueue(S.age ? greet : ageGate); } else if (S.started && !S.mode) setChips(menuChips());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  // ---------- montaje ----------
  function mount() {
    document.body.append(root); chrome(); qbox.hidden = true;
    if (saved.open) open(false);
    else if (Z.burbuja && !store.get('zeo_tip')) setTimeout(() => { if (panel.hidden) { tip.hidden = false; store.set('zeo_tip', 1); setTimeout(() => { tip.hidden = true; }, 12000); } }, 3500);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  // API mínima para pruebas / enlaces: window.ZeoChat.open()
  window.ZeoChat = { open: () => open(), close, say: t => enqueue(() => say(t)) };
})();
