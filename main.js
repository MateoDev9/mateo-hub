const filters = document.querySelector('[data-filters]');
const language = document.querySelector('[data-language]');
const categories = ['business', 'palantir'];
const filterParameter = 'filter';

if (filters) {
  const cards = [...document.querySelectorAll('[data-category]')];
  const buttons = [...filters.querySelectorAll('button')];
  function applyFilter() {
    const page = new URL(location.href);
    const value = page.searchParams.get(filterParameter);
    const selected = categories.includes(value) ? value : 'all';
    const alternate = new URL(language.href);
    if (selected === 'all') alternate.searchParams.delete(filterParameter);
    else alternate.searchParams.set(filterParameter, selected);
    if (['#work', '#about', '#contact'].includes(page.hash)) alternate.hash = page.hash;
    else alternate.hash = '';
    language.href = alternate;
    for (const card of cards) card.hidden = selected !== 'all' && selected !== card.dataset.category;
    for (const button of buttons) button.setAttribute('aria-pressed', String(selected === button.dataset.filter));
  }
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const page = new URL(location.href);
    const selected = button.dataset.filter;
    if (selected === 'all') page.searchParams.delete(filterParameter);
    else page.searchParams.set(filterParameter, selected);
    history.pushState(null, '', page);
    applyFilter();
  });
  addEventListener('popstate', applyFilter);
  addEventListener('hashchange', applyFilter);
  applyFilter();
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
