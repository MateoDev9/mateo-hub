const filters = document.querySelector('[data-filters]');
const language = document.querySelector('[data-language]');
const alternatePage = language.href;
const cards = [...document.querySelectorAll('[data-category]')];
const filterButtons = [...(filters?.querySelectorAll('button') ?? [])];
const categories = ['business', 'palantir'];
const filterParameter = 'filter';
const sectionFragments = ['#services', '#work', '#about', '#contact'];
const offerParameter = 'servicio';
const offers = new Map(
  [...document.querySelectorAll('[data-offer-key]')].map(link => [link.dataset.offerKey, link.dataset]),
);
const context = document.querySelector('[data-contact-context]');
const guidance = document.querySelector('#contact-guidance');
const message = document.querySelector('#visitor-message');

function selectedOffer(page) {
  return page.hash === '#contact' ? offers.get(page.searchParams.get(offerParameter)) : undefined;
}

function applyPageState() {
  const page = new URL(location.href);
  const value = page.searchParams.get(filterParameter);
  const selected = filters && categories.includes(value) ? value : 'all';
  const alternate = new URL(alternatePage);
  const target = document.getElementById(page.hash.slice(1));
  const offer = selectedOffer(page);

  if (selected !== 'all') alternate.searchParams.set(filterParameter, selected);
  if (target?.dataset.alternateFragment) alternate.hash = target.dataset.alternateFragment;
  else if (target && sectionFragments.includes(page.hash)) alternate.hash = page.hash;
  if (offer) alternate.searchParams.set(offerParameter, offer.offerKey);
  language.href = alternate;

  for (const card of cards) card.hidden = selected !== 'all' && selected !== card.dataset.category;
  for (const button of filterButtons) button.setAttribute('aria-pressed', String(selected === button.dataset.filter));

  if (context) {
    context.hidden = guidance.hidden = !offer;
    context.querySelector('strong').textContent = offer?.offerTitle ?? '';
    guidance.textContent = offer?.offerGuidance ?? '';
    message.setAttribute('aria-describedby', offer ? 'contact-guidance privacy' : 'privacy');
  }
}

function focusFragment() {
  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;
  const heading = target.matches('main, [data-fragment-focus]') ? target : target.querySelector('[data-fragment-focus]');
  heading?.focus();
}

if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const page = new URL(location.href);
    const selected = button.dataset.filter;
    if (selected === 'all') page.searchParams.delete(filterParameter);
    else page.searchParams.set(filterParameter, selected);
    history.pushState(null, '', page);
    applyPageState();
  });
}

const form = document.querySelector('[data-contact]');
if (form) {
  form.hidden = false;
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT ||
    (import.meta.env.DEV ? import.meta.env.BASE_URL + 'api/contact' : '');
  const status = form.querySelector('[role=status]');
  const button = form.querySelector('button[type=submit]');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    status.textContent = form.dataset.sending;
    try {
      if (!endpoint) throw new Error('Contact endpoint is missing');
      const fields = Object.fromEntries(new FormData(form));
      const offer = selectedOffer(new URL(location.href));
      if (offer) fields.service = offer.offerTitle;
      if (new URL(endpoint, location.href).hostname === 'formspree.io') {
        fields._gotcha = fields.website;
        delete fields.website;
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          project: form.dataset.project,
          lang: form.dataset.lang,
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok || !(await response.json()).ok) throw new Error('Message rejected');
      form.reset();
      status.textContent = form.dataset.sent;
    } catch {
      status.textContent = form.dataset.error;
    } finally {
      button.disabled = false;
    }
  });
}

addEventListener('popstate', applyPageState);
addEventListener('hashchange', () => {
  applyPageState();
  focusFragment();
});
applyPageState();
addEventListener('load', () => {
  if (document.activeElement === document.body) focusFragment();
}, { once: true });
