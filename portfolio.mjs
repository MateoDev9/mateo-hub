import { projects, linkedin } from './content.mjs';
import { services } from './services.mjs';

const person = 'José Antonio Mateo Lara';

const locales = {
  es: {
    work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto', skip: 'Saltar al contenido',
    headline: ['Cuéntame', 'qué necesitas.'],
    intro: 'Soy José Antonio Mateo Lara. Creo webs para captar clientes, mejoro las que ya existen y desarrollo software a medida. Si estás valorando una idea, también te ayudo a decidir cómo ponerla en marcha.',
    action: 'Hablemos', selected: 'Proyectos seleccionados',
    filters: ['Todos', 'Negocio', 'Palantir'], email: 'Tu correo', name: 'Tu nombre (opcional)',
    message: '¿En qué puedo ayudarte?', send: 'Enviar mensaje', sending: 'Enviando…',
    sent: 'Mensaje enviado. Gracias por escribirme.', error: 'No se pudo enviar el mensaje. Puedes volver a intentarlo o escribirme por LinkedIn.',
    privacy: 'Usaré tu correo y el mensaje para responder a tu consulta.',
    thinking: 'Hablemos.', linkedin: 'Escríbeme por LinkedIn', next: 'Siguiente proyecto',
    aboutHead: 'Cómo trabajo',
    availability: 'Trabajo con profesionales y negocios de La Línea de la Concepción y del resto del Campo de Gibraltar. También colaboro en remoto.',
    title: 'Mateo | Desarrollo web en La Línea y Palantir Foundry',
    description: 'José Antonio Mateo Lara. Desarrollo y mantenimiento web, software a medida y consultoría tecnológica en La Línea y el Campo de Gibraltar. Experiencia en Palantir Foundry.',
    steps: [
      ['Entiendo el punto de partida', 'Reviso qué tienes y qué quieres que cambie.'],
      ['Elegimos cómo resolverlo', 'Valoramos si conviene reparar, usar una herramienta existente o construir algo a medida.'],
      ['Acordamos el siguiente paso', 'Definimos qué decisión te llevas de la consulta o qué podrás revisar en la primera entrega.'],
    ],
    businessExperience: 'Trabajo con negocios', businessLink: 'Odoo y mantenimiento web',
    industrialExperience: 'Experiencia industrial', industrialLink: 'Ver casos en Palantir Foundry',
    role: 'Desarrollador full stack en ALTEN, en proyectos para Airbus desde octubre de 2022.',
    back: 'Todos los proyectos', lang: 'Ver en inglés', filterLabel: 'Filtrar proyectos',
    serviceLinks: 'Servicios',
    exploreServices: 'Ver servicios',
    serviceArea: 'La Línea, Campo de Gibraltar y en remoto',
    contactFor: 'Consulta sobre',
  },
  en: {
    work: 'Work', about: 'About', contact: 'Contact', skip: 'Skip to content',
    headline: ['Tell me what', 'you need.'],
    intro: 'I’m José Antonio Mateo Lara. I create websites to help businesses reach customers. I also improve existing sites, develop custom software and help you figure out how to put an idea into practice.',
    action: 'Let’s talk', selected: 'Selected work',
    filters: ['All', 'Business', 'Palantir'], email: 'Your email', name: 'Your name (optional)',
    message: 'How can I help?', send: 'Send message', sending: 'Sending…',
    sent: 'Message sent. Thanks for getting in touch.', error: 'The message could not be sent. Please try again or contact me on LinkedIn.',
    privacy: 'I’ll use your email and message to reply to your enquiry.',
    thinking: 'Let’s talk.', linkedin: 'Message me on LinkedIn', next: 'Next project',
    aboutHead: 'How I work',
    availability: 'I work with professionals and businesses in La Línea de la Concepción and across Campo de Gibraltar. I also work remotely.',
    title: 'Mateo | Web development in La Línea & Palantir Foundry',
    description: 'José Antonio Mateo Lara. Web development and maintenance, custom software and technology consulting in La Línea and Campo de Gibraltar. Palantir Foundry experience.',
    steps: [
      ['I understand where you’re starting', 'I look at what you have and what you’d like to change.'],
      ['We choose an approach', 'We weigh up fixing what you have, using an existing tool or building something custom.'],
      ['We agree on the next step', 'We decide what the consultation will help you choose or what you’ll review in the first delivery.'],
    ],
    businessExperience: 'Working with businesses', businessLink: 'Odoo and website maintenance',
    industrialExperience: 'Industrial experience', industrialLink: 'View Palantir Foundry case studies',
    role: 'Full-stack developer at ALTEN, working on projects for Airbus since October 2022.',
    back: 'All projects', lang: 'View in Spanish', filterLabel: 'Filter projects',
    serviceLinks: 'Services',
    exploreServices: 'View services',
    serviceArea: 'La Línea, Campo de Gibraltar and remote',
    contactFor: 'Enquiry about',
  },
};

const home = { es: '', en: 'en/' };
const projectPath = (lang, project) => home[lang] + (lang === 'es' ? 'proyectos/' : 'work/') + project.id + '/';
const routePath = (lang, { project, service }) => {
  if (project) return projectPath(lang, project);
  return service ? service[lang].path : home[lang];
};
export const routes = new Map();
for (const lang of ['es', 'en']) {
  routes.set(home[lang], { lang });
  for (const project of projects) routes.set(projectPath(lang, project), { lang, project });
  for (const service of Object.values(services)) routes.set(service[lang].path, { lang, service });
}

const safe = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const arrow = '<span aria-hidden="true">↗</span>';
const imageDimensions = {
  'chat-pedido-confirmados.webp': [1210, 530],
  'chat-pedido-revision.webp': [1210, 524],
  'flexit-demo.jpg': [1420, 950],
  'heavydesk-cuotas.webp': [3600, 3000],
  'heavydesk-entreno.webp': [1236, 2517],
  'heavydesk-recepcion.webp': [3600, 3000],
  'heavydesk-resumen.webp': [3600, 3000],
};
const imageSizes = {
  hero: '(max-width: 640px) calc(100vw - 45px), (max-width: 850px) 40vw, (max-width: 1592px) 35vw, 540px',
  featured: '(max-width: 640px) calc(100vw - 32px), (max-width: 1592px) 61vw, 970px',
  card: '(max-width: 640px) calc(100vw - 32px), (max-width: 850px) 45vw, (max-width: 1592px) 30vw, 480px',
  case: '(max-width: 1592px) 92vw, 1460px',
  detail: '(max-width: 640px) calc(100vw - 32px), (max-width: 1592px) 51vw, 820px',
};

function picture(base, source, alt, slot, eager = false) {
  if (!source) return '';
  const url = base + 'portfolio/' + source;
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
  const dimensions = imageDimensions[source];
  if (!dimensions) return `<img src="${url}" alt="${safe(alt)}" ${loading} decoding="async">`;
  const [width, height] = dimensions;
  const stem = url.slice(0, url.lastIndexOf('.'));
  const candidates = [480, 768, 1200].filter(size => size < width).map(size => `${stem}-${size}.webp ${size}w`);
  candidates.push(`${url} ${width}w`);
  return `<img src="${url}" srcset="${candidates.join(', ')}" sizes="${imageSizes[slot]}" width="${width}" height="${height}" alt="${safe(alt)}" ${loading} decoding="async">`;
}

export function sitemap(site) {
  const urls = [...routes.keys()].map(path => `  <url><loc>${safe(new URL(path, site).href)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function render(template, route, site) {
  const { origin, pathname: base } = site;
  const { lang, project, service } = route;
  const t = locales[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const local = (id) => `${base}${home[lang]}#${id}`;
  const pageUrl = code => new URL(routePath(code, route), site).href;
  const data = service?.[lang] ?? project?.[lang] ?? t;
  const localService = service === services.local;
  const contactHref = localService ? base + data.path + '#contact' : '#contact';
  const title = project
    ? `${data.title} | ${project.category === 'palantir' ? 'Palantir Foundry' : data.label}`
    : data.title;
  const description = data.description ?? data.intro;
  const author = {
    '@type': 'Person', '@id': origin + base + '#mateo',
    name: person, url: origin + base, sameAs: [linkedin],
  };
  const schema = service ? {
    '@context': 'https://schema.org', '@type': 'Service',
    name: data.heading, url: pageUrl(lang), description,
    serviceType: data.type ?? data.offers.map(({ title }) => title),
    provider: author,
    ...(service === services.local ? { areaServed: ['La Línea de la Concepción', 'Campo de Gibraltar'].map(name => ({ '@type': 'Place', name })) } : {}),
  } : !project ? {
    '@context': 'https://schema.org',
    '@graph': [author, { '@type': 'WebSite', name: person, alternateName: 'Mateo', url: origin + '/', creator: { '@id': author['@id'] }, inLanguage: ['es', 'en'] }],
  } : null;
  const header = `
    <a class="skip" href="#main">${t.skip}</a>
    <header class="shell top">
      <a href="${base + home[lang]}" class="signature">Mateo<span>.</span></a>
      <nav aria-label="${lang === 'es' ? 'Navegación principal' : 'Main navigation'}">
        <a href="${local('work')}">${t.work}</a><a href="${local('about')}">${t.about}</a><a href="${project || service ? contactHref : local('contact')}">${t.contact}</a>
        <a class="language" data-language href="${base + routePath(other, route)}" hreflang="${other}" lang="${other}" aria-label="${t.lang}" title="${t.lang}"><span aria-hidden="true">${lang === 'es' ? '<b>ES</b> / EN' : 'ES / <b>EN</b>'}</span></a>
      </nav>
    </header>`;
  const footer = `<footer class="shell footer"><a href="${origin}/">${person}</a><a href="${linkedin}">LinkedIn ${arrow}</a></footer>`;
  const head = `<title>${safe(title)}</title>
    <meta name="description" content="${safe(description)}">
    ${origin === 'https://mateodev9.github.io' && lang === 'es' && !project && !service ? '<meta name="google-site-verification" content="-5q8QG7-0vFgUDLC2TU6EKFohXRDH50HHSsExHz3bIw">' : ''}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${person}">
    <meta property="og:title" content="${safe(title)}">
    <meta property="og:description" content="${safe(description)}">
    <meta property="og:url" content="${pageUrl(lang)}">
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}
    <meta name="theme-color" content="#f7f3e8">
    <link rel="icon" href="${base}favicon.png" type="image/png" sizes="96x96">
    <link rel="preload" as="font" href="${base}fonts/archivo-black-latin.woff2" type="font/woff2" crossorigin>
    ${['es', 'en'].map(code => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code)}">`).join('')}
    <link rel="alternate" hreflang="x-default" href="${pageUrl('es')}">
    <link rel="canonical" href="${pageUrl(lang)}">`;
  const form = contact(t, lang, project?.id ?? service?.es.path.slice(0, -1), localService);
  const body = service ? servicePage(service, lang, other, base, form, contactHref)
    : project ? casePage(project, lang, base, t, form)
      : landing(lang, base, t, form);
  return template
    .replace('<html lang="es">', `<html lang="${lang}">`)
    .replace('<!-- page-head -->', () => head)
    .replace('<!-- page-body -->', () => header + body + footer);
}

function landing(lang, base, t, form) {
  const featured = projects[0];
  const data = featured[lang];
  const local = services.local[lang];
  const palantir = services.palantir[lang];
  const businessReference = local.offers.find(offer => offer.key === 'mantenimiento-web').reference;
  return `<main id="main" tabindex="-1">
    <section class="shell hero">
      <div class="hero-copy">
        <h1>${t.headline.map(line => `<span>${line}</span>`).join(' ')}</h1>
        <p>${t.intro}</p>
        <div class="hero-actions">
          <a class="button blue" href="#contact">${t.action} ${arrow}</a>
          <a class="text-link" href="#services">${t.exploreServices} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <a class="hero-project" href="${base + projectPath(lang, featured)}">
        <div class="hero-shot">${picture(base, featured.image, data.alt, 'hero', true)}</div>
        <div class="hero-caption"><div><strong>HeavyDesk</strong><span>${data.label}</span></div>${arrow}</div>
      </a>
    </section>
    <section class="services" id="services" aria-labelledby="services-title">
      <div class="shell services-inner">
        <div>
          <h2 id="services-title" tabindex="-1" data-fragment-focus>${t.serviceLinks}</h2>
          <p>${t.serviceArea}</p>
          <a class="specialty-link" href="${base + palantir.path}">${palantir.nav} ${arrow}</a>
        </div>
        <ul class="offer-list">
          ${local.offers.map(({ id, title, summary }) => `<li>
            <a href="${base + local.path}#${id}"><strong>${title}</strong>${arrow}</a>
            <p>${summary}</p>
          </li>`).join('')}
        </ul>
      </div>
    </section>
    <section class="shell work" id="work" aria-labelledby="work-title">
      <div class="section-head"><h2 id="work-title" tabindex="-1" data-fragment-focus>${t.selected}</h2>
      <div class="filter" role="group" aria-label="${t.filterLabel}" data-filters hidden>
      ${['all', 'business', 'palantir'].map((key, index) => `<button type="button" data-filter="${key}" aria-pressed="${index === 0}">${t.filters[index]}</button>`).join('')}
      </div></div>
      <div class="project-grid">${projects.map(item => {
        const data = item[lang];
        return `<article class="project ${item.id}" data-category="${item.category}">
          <a href="${base + projectPath(lang, item)}">
          ${picture(base, item.image, data.alt, item === featured ? 'featured' : 'card')}
          <div class="project-copy"><p class="label">${data.label}</p><h3>${data.title}</h3><p>${data.intro}</p><span class="case-arrow" aria-hidden="true">↗</span></div>
          </a></article>`;
      }).join('')}</div>
    </section>
    <section class="about" id="about" aria-labelledby="about-title"><div class="shell about-inner">
      <div class="about-intro">
        <h2 id="about-title" tabindex="-1" data-fragment-focus>${t.aboutHead}</h2>
        <p>${t.availability}</p>
      </div>
      <ol class="about-steps" role="list">
        ${t.steps.map(([title, copy]) => `<li><h3>${title}</h3><p>${copy}</p></li>`).join('')}
      </ol>
      <div class="about-proof">
        <div>
          <h3>${t.businessExperience}</h3>
          <a class="text-link" href="${base + local.path}#${businessReference.id}">${t.businessLink} ${arrow}</a>
        </div>
        <div>
          <h3>${t.industrialExperience}</h3>
          <p>${t.role}</p>
          <a class="text-link" href="${base + palantir.path}">${t.industrialLink} ${arrow}</a>
        </div>
      </div>
    </div></section>
    ${form}
  </main>`;
}

function servicePage(service, lang, other, base, form, contactHref) {
  const data = service[lang];
  const examples = service.projects.map(id => projects.find(project => project.id === id));
  return `<main id="main" tabindex="-1">
    <section class="shell case-hero service-hero">
      <a class="back" href="${base + home[lang]}">← Portfolio</a>
      <h1>${data.heading}</h1>
      <p class="case-intro">${data.intro}</p>
      <a class="button blue service-action" href="${contactHref}">${data.action} ${arrow}</a>
    </section>
    <section class="shell case-body">
      ${(data.offers ?? []).map(offer => serviceOffer(offer, service[other].offers.find(item => item.key === offer.key), lang, base)).join('')}
      ${data.sections.map(([title, copy]) => `<section class="case-section"><h2>${title}</h2><p>${copy}</p></section>`).join('')}
      <section class="case-section"><h2>${data.examples}</h2>
        <ul class="related-links">${examples.map(project => `<li><a href="${base + projectPath(lang, project)}">${project[lang].title} ${arrow}</a><p>${project[lang].contribution ?? project[lang].intro}</p></li>`).join('')}</ul>
      </section>
    </section>
    ${form}
  </main>`;
}

function serviceOffer(offer, alternate, lang, base) {
  const { id, key, title, copy, action, guidance, example, reference } = offer;
  const exampleUrl = example?.project
    ? base + projectPath(lang, projects.find(project => project.id === example.project))
    : base + home[lang];
  const contactUrl = base + services.local[lang].path + '?servicio=' + key + '#contact';
  return `<section class="case-section service-offer" id="${id}" data-alternate-fragment="${alternate.id}">
    <h2 tabindex="-1" data-fragment-focus>${title}</h2>
    <div class="offer-detail">
      <p>${copy}</p>
      ${example ? `<p class="offer-example"><a href="${exampleUrl}">${example.label} ${arrow}</a> ${example.copy}</p>` : ''}
      ${reference ? `<div class="offer-reference" id="${reference.id}" data-alternate-fragment="${alternate.reference.id}">
        <h3 tabindex="-1" data-fragment-focus>${reference.title}</h3>
        <p>${reference.copy}</p>
      </div>` : ''}
      <a class="text-link" href="${contactUrl}" data-offer-key="${key}" data-offer-title="${safe(title)}" data-offer-guidance="${safe(guidance)}">${action} ${arrow}</a>
    </div>
  </section>`;
}

function casePage(project, lang, base, t, form) {
  const data = project[lang];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const service = services[project.category === 'palantir' ? 'palantir' : 'local'][lang];
  return `<main id="main" tabindex="-1">
    <section class="shell case-hero ${project.category}">
      <a class="back" href="${base + home[lang]}#work">← ${t.back}</a>
      <p class="label">${data.label}</p>
      <h1>${data.title}</h1>
      <p class="case-intro">${data.intro}</p>
      ${picture(base, project.image, data.alt, 'case', true)}
    </section>
    <article class="shell case-body">
      ${data.sections.map(([title, copy, image, alt]) => `<section class="case-section"><h2>${title}</h2><div><p>${copy}</p>${picture(base, image, alt, 'detail')}</div></section>`).join('')}
      ${project.url ? `<a class="button blue" href="${project.url}">${data.link} ${arrow}</a>` : ''}
    </article>
    <div class="shell next"><a href="${base + projectPath(lang, next)}">${t.next} <strong>${next[lang].title}</strong> ${arrow}</a>
    <ul class="related-links"><li><a href="${base + service.path}">${service.nav} ${arrow}</a></li></ul></div>
    ${form}
  </main>`;
}

function contact(t, lang, source, localService) {
  return `<section class="contact" id="contact" aria-labelledby="contact-title"><div class="shell contact-inner">
    <div><h2 id="contact-title" tabindex="-1" data-fragment-focus>${t.thinking}</h2><a href="${linkedin}">${t.linkedin} ${arrow}</a></div>
    <form method="post" data-contact data-lang="${lang}" data-project="${source ?? ''}" data-sending="${t.sending}" data-sent="${t.sent}" data-error="${t.error}" hidden>
      ${localService ? `<p class="contact-context" data-contact-context hidden>${t.contactFor} <strong></strong></p>` : ''}
      <label for="visitor-email">${t.email}</label><input id="visitor-email" type="email" name="email" autocomplete="email" required maxlength="254">
      <label for="visitor-name">${t.name}</label><input id="visitor-name" name="name" autocomplete="name" maxlength="120">
      <label for="visitor-message">${t.message}</label>
      ${localService ? '<p class="contact-guidance" id="contact-guidance" hidden></p>' : ''}
      <textarea id="visitor-message" name="message" rows="4" maxlength="5000" required aria-describedby="privacy"></textarea>
      <div hidden><label for="website">Website</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
      <p class="privacy" id="privacy">${t.privacy}</p>
      <button class="button ink" type="submit">${t.send} ${arrow}</button>
      <p class="form-status" role="status"></p>
    </form>
  </div></section>`;
}
