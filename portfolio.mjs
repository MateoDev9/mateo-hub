import { projects, linkedin } from './content.mjs';

const locales = {
  es: {
    work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto', skip: 'Saltar al contenido',
    headline: ['Cuéntame qué parte', 'de tu trabajo te está', 'dando problemas.'],
    intro: 'Soy José Antonio Mateo Lara. Desarrollo herramientas a medida y automatizo procesos. Trabajo en proyectos de digitalización para Airbus a través de ALTEN.',
    action: 'Cuéntame tu problema', selected: 'Proyectos seleccionados',
    filters: ['Todos', 'Negocio', 'Palantir'], email: 'Tu correo', name: 'Tu nombre (opcional)',
    message: '¿Qué te gustaría resolver?', send: 'Enviar mensaje', sending: 'Enviando…',
    sent: 'Mensaje enviado. Gracias por escribirme.', error: 'No se pudo enviar el mensaje. Puedes volver a intentarlo o escribirme por LinkedIn.',
    privacy: 'Usaré tu correo y el mensaje para responder a tu consulta.',
    thinking: '¿Qué te gustaría resolver?', linkedin: 'Escríbeme por LinkedIn', next: 'Siguiente proyecto',
    aboutHead: 'Herramientas para el trabajo real.',
    availability: 'Trabajo con profesionales y negocios del Campo de Gibraltar y también colaboro en remoto.',
    aboutCopy: 'Combino el desarrollo freelance con el trabajo en un producto propio y la digitalización de procesos industriales. Me interesa entender cómo se hace el trabajo antes de decidir qué merece una aplicación, una integración o una automatización.',
    role: 'Desarrollador full stack en ALTEN, en proyectos para Airbus desde octubre de 2022.',
    back: 'Todos los proyectos', lang: 'Ver en inglés', filterLabel: 'Filtrar proyectos',
  },
  en: {
    work: 'Work', about: 'About', contact: 'Contact', skip: 'Skip to content',
    headline: ['Tell me what part', 'of your work is', 'causing trouble.'],
    intro: 'I’m José Antonio Mateo Lara. I build custom tools and automate workflows. I work on digitalisation projects for Airbus through ALTEN.',
    action: 'Tell me what’s getting in the way', selected: 'Selected work',
    filters: ['All', 'Business', 'Palantir'], email: 'Your email', name: 'Your name (optional)',
    message: 'What would you like to solve?', send: 'Send message', sending: 'Sending…',
    sent: 'Message sent. Thanks for getting in touch.', error: 'The message could not be sent. Please try again or contact me on LinkedIn.',
    privacy: 'I’ll use your email and message to reply to your enquiry.',
    thinking: 'What would you like to solve?', linkedin: 'Message me on LinkedIn', next: 'Next project',
    aboutHead: 'Tools for the work people do.',
    availability: 'I work with professionals and businesses in the Campo de Gibraltar area and also take on projects remotely.',
    aboutCopy: 'I combine freelance development with building my own product and digitalising industrial workflows. I like to understand how the work happens before deciding what needs an application, an integration, or automation.',
    role: 'Full-stack developer at ALTEN, working on projects for Airbus since October 2022.',
    back: 'All projects', lang: 'View in Spanish', filterLabel: 'Filter projects',
  },
};

const home = { es: '', en: 'en/' };
const projectPath = (lang, project) => home[lang] + (lang === 'es' ? 'proyectos/' : 'work/') + project.id + '/';
export const routes = new Map();
for (const lang of ['es', 'en']) {
  routes.set(home[lang], { lang });
  for (const project of projects) routes.set(projectPath(lang, project), { lang, project });
}

const safe = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const arrow = '<span aria-hidden="true">↗</span>';
const picture = (base, source, alt, eager = false) => source
  ? `<img src="${base}portfolio/${source}" alt="${safe(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
  : '';

export function render(template, { lang, project }, base) {
  const t = locales[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const local = (id) => `${base}${home[lang]}#${id}`;
  const langPath = (code) => base + (project ? projectPath(code, project) : home[code]);
  const person = 'José Antonio Mateo Lara';
  const title = project ? `${project[lang].title} — ${person}` : `${person} — ${lang === 'es' ? 'Desarrollo y automatización' : 'Software development and automation'}`;
  const header = `
    <a class="skip" href="#main">${t.skip}</a>
    <header class="shell top">
      <a href="${base + home[lang]}" class="signature">Mateo<span>.</span></a>
      <nav aria-label="${lang === 'es' ? 'Navegación principal' : 'Main navigation'}">
        <a href="${local('work')}">${t.work}</a><a href="${local('about')}">${t.about}</a><a href="${project ? '#contact' : local('contact')}">${t.contact}</a>
        <a class="language" data-language href="${langPath(other)}" hreflang="${other}" lang="${other}" aria-label="${t.lang}" title="${t.lang}"><span aria-hidden="true">${lang === 'es' ? '<b>ES</b> / EN' : 'ES / <b>EN</b>'}</span></a>
      </nav>
    </header>`;
  const footer = `<footer class="shell footer"><span>${person}</span><a href="${linkedin}">LinkedIn ${arrow}</a></footer>`;
  const head = `<title>${safe(title)}</title>
    <meta name="description" content="${safe(project ? project[lang].intro : t.intro)}">
    <meta name="theme-color" content="#f7f3e8">
    <link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
    ${['es', 'en'].map(code => `<link rel="alternate" hreflang="${code}" href="https://mateodev9.github.io${langPath(code)}">`).join('')}
    <link rel="canonical" href="https://mateodev9.github.io${langPath(lang)}">`;
  const form = contact(t, lang, project);
  return template
    .replace('<html lang="es">', `<html lang="${lang}">`)
    .replace('<!-- page-head -->', () => head)
    .replace('<!-- page-body -->', () => header + (project ? casePage(project, lang, base, t, form) : landing(lang, base, t, form)) + footer);
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
      <h2>${t.aboutHead}</h2><div><p>${t.availability}</p><p>${t.aboutCopy}</p><p><strong>${t.role}</strong></p></div>
    </div></section>
    ${form}
  </main>`;
}

function casePage(project, lang, base, t, form) {
  const data = project[lang];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
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
    <div class="shell next"><a href="${base + projectPath(lang, next)}">${t.next} <strong>${next[lang].title}</strong> ${arrow}</a></div>
    ${form}
  </main>`;
}

function contact(t, lang, project) {
  return `<section class="contact" id="contact"><div class="shell contact-inner">
    <div><h2>${t.thinking}</h2><a href="${linkedin}">${t.linkedin} ${arrow}</a></div>
    <form method="post" data-contact data-lang="${lang}" data-project="${project?.id ?? ''}" data-sending="${t.sending}" data-sent="${t.sent}" data-error="${t.error}" hidden>
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
