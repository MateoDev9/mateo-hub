// Data for the tools/apps
const apps = [
  {
    id: 'lobo',
    title: 'Lobo: El Pacto',
    description: 'Gestor o herramienta para las partidas de Lobo: El Pacto.',
    icon: '🐺',
    url: 'http://localhost:5174/', // Actualizar si se hostea en otro lugar
    color: '#8b5cf6'
  },
  {
    id: 'moonlighter',
    title: 'Precios Perfectos',
    description: 'Guía de precios y gestión de inventario para Moonlighter.',
    icon: '💰',
    url: 'http://localhost:5173/moonlighter_prices_guide/', // Actualizar si se hostea en otro lugar
    color: '#ec4899'
  },
  {
    id: 'villarecogedora',
    title: 'Villarecogedora',
    description: 'Herramienta de recolección y gestión.',
    icon: '🌾',
    url: '#', // TODO: Reemplazar con la URL real de Villarecogedora
    color: '#06b6d4'
  },
  {
    id: 'poke-tactics',
    title: 'Poke-Tactics',
    description: 'Herramienta táctica y de estrategia para Pokémon.',
    icon: '⚡',
    url: 'https://poke-tactics.web.app/',
    color: '#fbbf24'
  },
  {
    id: 'more',
    title: 'Próximamente',
    description: 'Nuevas herramientas y utilidades se añadirán aquí.',
    icon: '✨',
    url: '#',
    color: '#f59e0b'
  }
];

// Initialize the grid
const initGrid = () => {
  const grid = document.getElementById('apps-grid');
  
  apps.forEach(app => {
    // Create card element
    const card = document.createElement('a');
    card.href = app.url;
    card.className = 'card';
    card.target = app.url !== '#' ? '_blank' : '_self';
    card.rel = app.url !== '#' ? 'noopener noreferrer' : '';

    // Create icon
    const icon = document.createElement('div');
    icon.className = 'card-icon';
    icon.textContent = app.icon;
    icon.style.color = app.color;
    icon.style.textShadow = `0 0 15px ${app.color}80`;
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = app.title;
    
    // Create description
    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = app.description;

    // Create arrow
    const arrow = document.createElement('div');
    arrow.className = 'card-arrow';
    arrow.innerHTML = '→';

    // Append all parts to card
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(arrow);
    
    // Append card to grid
    grid.appendChild(card);
  });
};

// Add mouse tracking for the glow effect on cards
const initMouseTracking = () => {
  document.getElementById('apps-grid').onmousemove = e => {
    for(const card of document.getElementsByClassName('card')) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };
};

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initGrid();
  initMouseTracking();
});
