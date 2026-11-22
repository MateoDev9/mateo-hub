import { projects, linkedin } from './content.mjs';
import { services } from './services.mjs';

const origin = 'https://mateodev9.github.io';
const person = 'José Antonio Mateo Lara';

const locales = {
  es: {
    work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto', skip: 'Saltar al contenido',
    headline: ['Cuéntame qué parte', 'de tu trabajo te está', 'dando problemas.'],
    intro: 'Soy José Antonio Mateo Lara. Desarrollo software a medida y automatizo procesos. Desde 2022 trabajo en proyectos para Airbus a través de ALTEN, convirtiendo problemas de planificación y seguimiento industrial en herramientas que los equipos pueden usar.',
    action: 'Cuéntame tu problema', selected: 'Proyectos seleccionados',
    filters: ['Todos', 'Negocio', 'Palantir'], email: 'Tu correo', name: 'Tu nombre (opcional)',
    message: '¿Qué te gustaría resolver?', send: 'Enviar mensaje', sending: 'Enviando…',
    sent: 'Mensaje enviado. Gracias por escribirme.', error: 'No se pudo enviar el mensaje. Puedes volver a intentarlo o escribirme por LinkedIn.',
    privacy: 'Usaré tu correo y el mensaje para responder a tu consulta.',
    thinking: '¿Qué te gustaría resolver?', linkedin: 'Escríbeme por LinkedIn', next: 'Siguiente proyecto',
    aboutHead: 'Del problema a una herramienta útil.',
    availability: 'Trabajo con profesionales y negocios de La Línea de la Concepción y del resto del Campo de Gibraltar. También colaboro en remoto.',
    title: 'Mateo | Software a medida en La Línea y Palantir Foundry',
    description: 'José Antonio Mateo Lara. Desarrollo de software a medida y automatización en La Línea y el Campo de Gibraltar. Experiencia en Palantir Foundry.',
    aboutCopy: 'En proyectos para Airbus he trabajado con equipos que necesitan saber qué suministros pueden cubrir, qué piezas quedan pendientes o qué entregables ponen en riesgo un hito. Mi trabajo consiste en entender esas decisiones, convertir las reglas del proceso en software y dar al equipo una forma clara de actuar. Aplico el mismo método a proyectos freelance y al desarrollo de HeavyDesk.',
    role: 'Desarrollador full stack en ALTEN, en proyectos para Airbus desde octubre de 2022.',
    back: 'Todos los proyectos', lang: 'Ver en inglés', filterLabel: 'Filtrar proyectos',
  },
  en: {
    work: 'Work', about: 'About', contact: 'Contact', skip: 'Skip to content',
    headline: ['Tell me what part', 'of your work is', 'causing trouble.'],
    intro: 'I’m José Antonio Mateo Lara. I build custom software and automate workflows. Since 2022 I’ve worked on Airbus projects through ALTEN, turning industrial planning and tracking problems into tools teams can use.',
    action: 'Tell me what’s getting in the way', selected: 'Selected work',
    filters: ['All', 'Business', 'Palantir'], email: 'Your email', name: 'Your name (optional)',
    message: 'What would you like to solve?', send: 'Send message', sending: 'Sending…',
    sent: 'Message sent. Thanks for getting in touch.', error: 'The message could not be sent. Please try again or contact me on LinkedIn.',
    privacy: 'I’ll use your email and message to reply to your enquiry.',
    thinking: 'What would you like to solve?', linkedin: 'Message me on LinkedIn', next: 'Next project',
    aboutHead: 'From a problem to a tool that helps.',
    availability: 'I work with professionals and businesses in La Línea de la Concepción and across Campo de Gibraltar. I also work remotely.',
    title: 'Mateo | Custom software in La Línea & Palantir Foundry',
    description: 'José Antonio Mateo Lara. Custom software and workflow automation in La Línea and Campo de Gibraltar, with hands-on Palantir Foundry experience.',
    aboutCopy: 'On Airbus projects I’ve worked with teams that need to know which orders they can cover, which parts are outstanding, and which deliverables could put a milestone at risk. My job is to understand those decisions, translate process rules into software and give the team a clear way to act. I take the same approach to freelance projects and to building HeavyDesk.',
    role: 'Full-stack developer at ALTEN, working on projects for Airbus since October 2022.',
    back: 'All projects', lang: 'View in Spanish', filterLabel: 'Filter projects',
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
const picture = (base, source, alt, eager = false) => source
  ? `<img src="${base}portfolio/${source}" alt="${safe(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
  : '';

export function sitemap(base) {
  const urls = [...routes.keys()].map(path => `  <url><loc>${safe(origin + base + path)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function render(template, route, base) {
  const { lang, project, service } = route;
  const t = locales[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const local = (id) => `${base}${home[lang]}#${id}`;
  const pageUrl = code => origin + base + routePath(code, route);
  const data = service?.[lang] ?? project?.[lang] ?? t;
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
    name: data.heading, url: pageUrl(lang), description, serviceType: data.type,
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
        <a href="${local('work')}">${t.work}</a><a href="${local('about')}">${t.about}</a><a href="${project || service ? '#contact' : local('contact')}">${t.contact}</a>
        <a class="language" data-language href="${base + routePath(other, route)}" hreflang="${other}" lang="${other}" aria-label="${t.lang}" title="${t.lang}"><span aria-hidden="true">${lang === 'es' ? '<b>ES</b> / EN' : 'ES / <b>EN</b>'}</span></a>
      </nav>
    </header>`;
  const footer = `<footer class="shell footer"><a href="${origin}/">${person}</a><a href="${linkedin}">LinkedIn ${arrow}</a></footer>`;
  const head = `<title>${safe(title)}</title>
    <meta name="description" content="${safe(description)}">
    ${lang === 'es' && !project && !service ? '<meta name="google-site-verification" content="-5q8QG7-0vFgUDLC2TU6EKFohXRDH50HHSsExHz3bIw">' : ''}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${person}">
    <meta property="og:title" content="${safe(title)}">
    <meta property="og:description" content="${safe(description)}">
    <meta property="og:url" content="${pageUrl(lang)}">
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}
    <meta name="theme-color" content="#f7f3e8">
    <link rel="icon" href="${base}favicon.png" type="image/png" sizes="96x96">
    ${['es', 'en'].map(code => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code)}">`).join('')}
    <link rel="alternate" hreflang="x-default" href="${pageUrl('es')}">
    <link rel="canonical" href="${pageUrl(lang)}">`;
  const form = contact(t, lang, project?.id ?? service?.es.path.slice(0, -1));
  const body = service ? servicePage(service, lang, base, form)
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
  return `<main id="main">
    <section class="shell hero">
      <div class="hero-copy">
        <h1>${t.headline.map(line => `<span>${line}</span>`).join(' ')}</h1>
        <p>${t.intro}</p>
        <a class="button blue" href="#contact">${t.action} ${arrow}</a>
      </div>
      <a class="hero-project" href="${base + projectPath(lang, featured)}">
        <div class="hero-shot">${picture(base, featured.image, data.alt, true)}</div>
        <div class="hero-caption"><div><strong>HeavyDesk</strong><span>${data.label}</span></div>${arrow}</div>
      </a>
    </section>
    <section class="shell work" id="work" aria-labelledby="work-title">
      <div class="section-head"><h2 id="work-title">${t.selected}</h2>
      <div class="filter" role="group" aria-label="${t.filterLabel}" data-filters hidden>
      ${['all', 'business', 'palantir'].map((key, index) => `<button type="button" data-filter="${key}" aria-pressed="${index === 0}">${t.filters[index]}</button>`).join('')}
      </div></div>
      <div class="project-grid">${projects.map(item => {
        const data = item[lang];
        return `<article class="project ${item.id}" data-category="${item.category}">
          <a href="${base + projectPath(lang, item)}">
          ${picture(base, item.image, data.alt)}
          <div class="project-copy"><p class="label">${data.label}</p><h3>${data.title}</h3><p>${data.intro}</p><span class="case-arrow" aria-hidden="true">↗</span></div>
          </a></article>`;
      }).join('')}</div>
    </section>
    <section class="about" id="about"><div class="shell about-inner">
      <h2>${t.aboutHead}</h2><div><p>${t.availability}</p><p>${t.aboutCopy}</p><p><strong>${t.role}</strong></p>
      <ul class="related-links">${Object.values(services).map(service => `<li><a href="${base + service[lang].path}">${service[lang].nav} ${arrow}</a></li>`).join('')}</ul></div>
    </div></section>
    ${form}
  </main>`;
}

function servicePage(service, lang, base, form) {
  const data = service[lang];
  const examples = service.projects.map(id => projects.find(project => project.id === id));
  return `<main id="main">
    <section class="shell case-hero">
      <a class="back" href="${base + home[lang]}">← Portfolio</a>
      <h1>${data.heading}</h1>
      <p class="case-intro">${data.intro}</p>
      <a class="button blue service-action" href="#contact">${data.action} ${arrow}</a>
    </section>
    <section class="shell case-body">
      ${data.sections.map(([title, copy]) => `<section class="case-section"><h2>${title}</h2><p>${copy}</p></section>`).join('')}
      <section class="case-section"><h2>${data.examples}</h2>
        <ul class="related-links">${examples.map(project => `<li><a href="${base + projectPath(lang, project)}">${project[lang].title} ${arrow}</a><p>${project[lang].intro}</p></li>`).join('')}</ul>
      </section>
    </section>
    ${form}
  </main>`;
}

function casePage(project, lang, base, t, form) {
  const data = project[lang];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const service = services[project.category === 'palantir' ? 'palantir' : 'local'][lang];
  return `<main id="main">
    <section class="shell case-hero ${project.category}">
      <a class="back" href="${base + home[lang]}#work">← ${t.back}</a>
      <p class="label">${data.label}</p>
      <h1>${data.title}</h1>
      <p class="case-intro">${data.intro}</p>
      ${picture(base, project.image, data.alt, true)}
    </section>
    <article class="shell case-body">
      ${data.sections.map(([title, copy, image, alt]) => `<section class="case-section"><h2>${title}</h2><div><p>${copy}</p>${picture(base, image, alt)}</div></section>`).join('')}
      ${project.url ? `<a class="button blue" href="${project.url}">${data.link} ${arrow}</a>` : ''}
    </article>
    <div class="shell next"><a href="${base + projectPath(lang, next)}">${t.next} <strong>${next[lang].title}</strong> ${arrow}</a>
    <ul class="related-links"><li><a href="${base + service.path}">${service.nav} ${arrow}</a></li></ul></div>
    ${form}
  </main>`;
}

function contact(t, lang, source) {
  return `<section class="contact" id="contact"><div class="shell contact-inner">
    <div><h2>${t.thinking}</h2><a href="${linkedin}">${t.linkedin} ${arrow}</a></div>
    <form method="post" data-contact data-lang="${lang}" data-project="${source ?? ''}" data-sending="${t.sending}" data-sent="${t.sent}" data-error="${t.error}" hidden>
      <label for="visitor-email">${t.email}</label><input id="visitor-email" type="email" name="email" autocomplete="email" required maxlength="254">
      <label for="visitor-name">${t.name}</label><input id="visitor-name" name="name" autocomplete="name" maxlength="120">
      <label for="visitor-message">${t.message}</label><textarea id="visitor-message" name="message" rows="4" maxlength="5000" required aria-describedby="privacy"></textarea>
      <div hidden><label for="website">Website</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
      <p class="privacy" id="privacy">${t.privacy}</p>
      <button class="button ink" type="submit">${t.send} ${arrow}</button>
      <p class="form-status" role="status"></p>
    </form>
  </div></section>`;
}
