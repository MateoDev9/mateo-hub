export const linkedin = 'https://www.linkedin.com/in/jose-mateo-dev/';

export const projects = [
  {
    id: 'heavydesk', category: 'business', image: 'heavydesk-resumen.webp',
    es: {
      title: 'HeavyDesk', label: 'Software para gimnasios', alt: 'Resumen de gestión de un centro en HeavyDesk',
      intro: 'De la recepción al entrenamiento, un mismo producto para gestionar el gimnasio.',
      sections: [
        ['El problema', 'Recepción necesita consultar socios, cuotas y accesos. El entrenador prepara rutinas. El socio quiere ver su plan y registrar lo que hace. Construimos HeavyDesk para que esos tres momentos compartan el mismo sistema.', 'heavydesk-recepcion.webp', 'Ficha de socio en la recepción de HeavyDesk'],
        ['Una rutina que sigue al socio', 'Conectamos la gestión de rutinas del centro con un portal móvil donde el socio puede consultar su entrenamiento, registrar series y revisar su progreso. El trabajo de preparación del entrenador se refleja en la experiencia del socio.', 'heavydesk-entreno.webp', 'Registro de un entrenamiento en la vista móvil de HeavyDesk'],
        ['Un producto para centros distintos', 'El centro puede elegir su color y aplicarlo tanto al panel de gestión como al portal del socio. El modo claro u oscuro se decide por dispositivo. Así, cada gimnasio puede dar continuidad a su identidad sin mantener una aplicación distinta.', 'heavydesk-cuotas.webp', 'Pantalla de cuotas del panel de administración de HeavyDesk'],
        ['Mi papel y el piloto', 'He trabajado en el diseño y desarrollo del producto, desde los flujos del panel y del portal hasta su puesta en funcionamiento. El piloto publicado reúne gestión de socios, cuotas, tienda y rutinas, además del portal de entrenamiento.'],
      ],
      link: 'Visitar HeavyDesk',
    },
    en: {
      title: 'HeavyDesk', label: 'Gym management software', alt: 'Overview of gym operations in HeavyDesk',
      intro: 'One product for running a gym, from the front desk to the training floor.',
      sections: [
        ['The problem', 'Front-desk staff need to check memberships, fees, and access. Coaches prepare routines. Members want to see their plan and record what they do. We built HeavyDesk so all three can work in the same system.', 'heavydesk-recepcion.webp', 'Member record at the HeavyDesk front desk'],
        ['A routine that follows the member', 'We connected gym-side routine management to a mobile portal where members can see their workout, log sets, and review their progress. The coach’s preparation carries through to the member’s experience.', 'heavydesk-entreno.webp', 'Workout logging in the HeavyDesk mobile portal'],
        ['One product for different gyms', 'A gym can choose an accent colour for both its admin panel and the member portal. Each device can independently use light or dark mode. That gives each gym a consistent identity within a shared product.', 'heavydesk-cuotas.webp', 'Membership fees in the HeavyDesk management panel'],
        ['My role and the pilot', 'I worked on the product’s design and development, from admin and member workflows to getting the product running. The published pilot covers members, fees, the shop, routines, and the training portal.'],
      ],
      link: 'Visit HeavyDesk',
    },
    url: 'https://heavydesk.es/',
  },
  {
    id: 'planificacion-de-suministros', category: 'palantir',
    es: {
      title: 'Planificación de suministros', label: 'Palantir · Planificación',
      intro: 'Trasladar la lógica de planificación de una hoja de cálculo a Palantir.',
      sections: [
        ['El problema', 'Una hoja de cálculo reunía cálculos de pedidos y cobertura. A medida que crecía la lógica, mantener las fórmulas y procesar los datos se volvía más difícil.'],
        ['Mi aportación', 'Trabajé en sustituir fórmulas por Apps Script. Cuando los tiempos máximos de ejecución se convirtieron en un límite, pasé a trabajar en el traslado de esa lógica a Palantir con PySpark.'],
        ['Una regla, en términos sencillos', 'Para saber qué pedidos se pueden cubrir, la lógica los recorre por prioridad. Empieza por el stock disponible y después asigna suministro previsto. También registra la demanda que sigue pendiente.'],
        ['Resultado', 'El desarrollo reunió en Palantir el cálculo de cobertura y una vista para consultar qué pedidos se podían cubrir y cuáles seguían pendientes.'],
      ],
    },
    en: {
      title: 'Supply planning', label: 'Palantir · Planning',
      intro: 'Moving spreadsheet-based planning logic into Palantir.',
      sections: [
        ['The problem', 'A spreadsheet combined order and supply coverage calculations. As the logic grew, maintaining the formulas and processing the data became harder.'],
        ['My contribution', 'I worked on replacing formulas with Apps Script. When run-time limits became a constraint, I worked on moving the logic to Palantir with PySpark.'],
        ['One rule in plain English', 'To see which orders can be covered, the logic processes them in priority order. It uses available stock first, then assigns expected supply. It also records demand that remains uncovered.'],
        ['Outcome', 'The solution brought supply coverage calculations into Palantir alongside a view showing which orders could be covered and which still needed supply.'],
      ],
    },
  },
  {
    id: 'flexit', category: 'business', image: 'flexit-demo.jpg',
    es: {
      title: 'FlexIt', label: 'Gestión del trabajo freelance', alt: 'Proyecto ficticio de citas en FlexIt con tareas, horas registradas e importe por cobrar',
      intro: 'Proyectos, tareas, horas y facturación en un mismo sitio.',
      sections: [
        ['El problema', 'Cuando un encargo se reparte entre una lista de tareas, un registro de horas y varios enlaces, cuesta recuperar lo que hiciste y cuánto tiempo te llevó.'],
        ['Lo que construí', 'Desarrollé FlexIt para organizar mis proyectos. Puedo abrir un encargo, registrar el trabajo y el tiempo que le dedico y luego volver a consultarlo al preparar la facturación.'],
        ['El recorrido', 'En un proyecto de ejemplo para una web de citas, registro el calendario de disponibilidad como tarea y anoto el tiempo que le dedico. Más tarde, la ficha del proyecto reúne esa tarea, el estado del trabajo, las horas y el importe por cobrar.'],
      ],
    },
    en: {
      title: 'FlexIt', label: 'Freelance work management', alt: 'Sample appointment website project in FlexIt with tasks, logged time, and an outstanding balance',
      intro: 'Projects, tasks, time, and billing in one place.',
      sections: [
        ['The problem', 'When assignments are split across task lists, time logs, and links, it takes work to recover what you did and how long it took.'],
        ['What I built', 'I developed FlexIt to organise my own projects. I can open a job, record the work and time I spend, and look it up again when preparing billing.'],
        ['An example workflow', 'For a sample appointment website, I log the availability calendar as a task and record the time it took. The project record then brings together the task, work status, logged time, and outstanding balance.'],
      ],
    },
  },
  {
    id: 'seguimiento-de-aeronaves', category: 'palantir',
    es: {
      title: 'Seguimiento operativo de aeronaves', label: 'Palantir · Seguimiento industrial',
      intro: 'Un panel operativo para consultar el estado de las aeronaves, piezas pendientes y planificación.',
      sections: [
        ['El problema', 'Los equipos necesitaban consultar información de planificación y entender qué incidencias seguían afectando a cada aeronave.'],
        ['Mi aportación', 'Trabajé en el resumen y detalle de piezas faltantes, en la visualización de hitos de planificación y en las reglas que resumen el estado de las incidencias abiertas y cerradas.'],
        ['Resultado', 'Las mejoras de planificación, seguimiento de piezas y estados operativos llegaron a producción. El panel permite pasar del resumen al detalle por aeronave.'],
      ],
    },
    en: {
      title: 'Aircraft operations tracking', label: 'Palantir · Industrial operations',
      intro: 'An operations dashboard for aircraft status, missing parts, and planning.',
      sections: [
        ['The problem', 'Teams needed to check planning information and understand which issues were still affecting each aircraft.'],
        ['My contribution', 'I worked on the missing-parts summary and detail views, the planning milestone display, and rules that summarise the status of open and closed issues.'],
        ['Outcome', 'Improvements to planning, parts tracking, and operational status went live. The dashboard lets teams move from the summary to the detail for an individual aircraft.'],
      ],
    },
  },
  {
    id: 'del-chat-al-pedido', category: 'business', image: 'chat-pedido-revision.webp',
    es: {
      title: 'Del chat al pedido', label: 'Automatización · Piloto', alt: 'Panel de venta asistida con un bolso detectado y un mensaje de compra pendiente de revisión',
      intro: 'Un asistente de voz y chat que convierte mensajes del directo en propuestas de pedido para revisar.',
      sections: [
        ['El problema', 'Una vendedora presenta artículos, responde preguntas y recibe pedidos en el mismo directo. Capturar cada compra compite con la atención al público.'],
        ['Lo que construí', 'Trabajé en una herramienta que combina señales del chat y de la voz para sugerir un pedido. La vendedora puede corregir el artículo o la variante antes de confirmar. El historial conserva los pedidos confirmados.'],
        ['Un ejemplo', 'El asistente detecta un bolso y sus variantes. Cuando entra un mensaje de compra, la vendedora revisa el artículo y el color antes de confirmar. El panel conserva el historial de pedidos confirmados.', 'chat-pedido-confirmados.webp', 'Panel de prueba con un artículo corregido y dos pedidos confirmados'],
        ['Estado del piloto', 'Se probaron casos controlados de voz y chat, corrección manual y confirmación. Quedan por validar el flujo en un nuevo directo y la impresión física de etiquetas en ese recorrido.'],
      ],
    },
    en: {
      title: 'From chat to order', label: 'Automation · Pilot', alt: 'Assisted sales panel showing a detected handbag and a purchase request awaiting review',
      intro: 'A voice and chat assistant that turns livestream messages into order suggestions for review.',
      sections: [
        ['The problem', 'A seller presents products, answers questions, and takes orders in the same livestream. Recording each purchase competes with keeping the audience engaged.'],
        ['What I built', 'I worked on a tool that combines chat and voice signals to suggest an order. The seller can correct the product or variant before confirming. Confirmed orders stay in the history.'],
        ['An example', 'The assistant detects a handbag and its variants. When a purchase request comes in, the seller checks the item and colour before confirming. The panel keeps a history of confirmed orders.', 'chat-pedido-confirmados.webp', 'Test panel showing a corrected product and two confirmed orders'],
        ['Pilot status', 'Controlled tests covered voice and chat, manual corrections, and confirmation. The workflow still needs validation in another livestream, including physical label printing.'],
      ],
    },
  },
  {
    id: 'evaluacion-de-riesgo-y-complejidad', category: 'palantir',
    es: {
      title: 'Evaluación de riesgo y complejidad', label: 'Palantir · Evaluación industrial',
      intro: 'Una herramienta para evaluar la complejidad de cada versión y revisar el riesgo de sus componentes.',
      sections: [
        ['El problema', 'El equipo necesitaba preparar evaluaciones para nuevas versiones de aeronaves y consultar las anteriores, incluso cuando una versión todavía no figuraba en la planificación.'],
        ['Mi aportación', 'Trabajé en una aplicación en Palantir para registrar la complejidad de cada versión, seleccionar componentes de un catálogo y revisarlos individualmente. También incorporé un flujo para editar evaluaciones previas.'],
        ['Resultado', 'La aplicación permite registrar versiones antes de que aparezcan en la planificación y recuperar los componentes de evaluaciones anteriores al abrirlas para editar.'],
      ],
    },
    en: {
      title: 'Risk and complexity assessment', label: 'Palantir · Industrial assessment',
      intro: 'A tool for assessing the complexity of each configuration and reviewing component risks.',
      sections: [
        ['The problem', 'The team needed to prepare assessments for new aircraft configurations and consult previous ones, including for configurations that were still absent from the planning data.'],
        ['My contribution', 'I worked on a Palantir application for recording each configuration’s complexity, selecting components from a catalogue, and reviewing them individually. I also added a workflow for editing previous assessments.'],
        ['Outcome', 'The application lets the team register configurations before they appear in the planning data and restores previously selected components when an assessment is reopened for editing.'],
      ],
    },
  },
  {
    id: 'seguimiento-de-hitos', category: 'palantir',
    es: {
      title: 'Seguimiento de hitos de desarrollo', label: 'Palantir · Coordinación de entregables',
      intro: 'Una vista para revisar entregables de cabina por versión de aeronave y detectar qué queda por resolver antes de cada hito.',
      sections: [
        ['El problema', 'En cada revisión del desarrollo de cabina, el equipo necesitaba consultar qué entregables correspondían a cada hito y qué incidencias seguían abiertas para una versión concreta.'],
        ['Mi aportación', 'Desarrollé en Palantir una matriz que organiza los entregables por categoría y por hito. Trabajé también en el registro de revisiones, comentarios e incidencias para dar seguimiento a los puntos abiertos.'],
        ['Resultado', 'La vista permite pasar del resumen de una versión al detalle de su revisión. Así se puede consultar el estado de los entregables y ver qué puntos requieren seguimiento.'],
      ],
    },
    en: {
      title: 'Development milestone tracking', label: 'Palantir · Deliverable coordination',
      intro: 'A view for reviewing cabin deliverables by aircraft configuration and spotting what needs attention before each milestone.',
      sections: [
        ['The problem', 'During cabin development reviews, the team needed to see which deliverables belonged to each milestone and which issues were still open for a given configuration.'],
        ['My contribution', 'I developed a matrix in Palantir that organises deliverables by category and milestone. I also worked on recording reviews, comments, and issues so the team could follow up on open items.'],
        ['Outcome', 'The view lets the team move from a configuration overview to the details of its review, where they can check deliverable status and see what needs follow-up.'],
      ],
    },
  },
];
