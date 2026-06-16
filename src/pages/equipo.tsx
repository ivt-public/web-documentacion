import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './equipo.module.css';

/* ── Inline SVG icons ──────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

/* ── Types ─────────────────────────────────────────────── */
type RoleVariant = 'cto' | 'architect' | 'lead' | 'ai' | 'devops' | 'fullstack' | 'backend';

type Member = {
  id: string;
  name: string;
  role: string;
  roleVariant: RoleVariant;
  description: string;
  img: string;
  imgPosition?: string; // posición personalizada para recorte de rostro
  linkedin: string;
  github: string;
  x: string;
};

/* ── Data ──────────────────────────────────────────────── */
const TEAM: Member[] = [
  {
    id: 'risco',
    name: 'Marco Risco',
    role: 'Chief Technology Officer',
    roleVariant: 'cto',
    description:
      'Lidera la visión tecnológica de ARGOS. Dirige la arquitectura de la plataforma, la estrategia de producto y la innovación en identidad digital y servicios financieros.',
    img: '/img/team/risco.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'abel',
    name: 'Abel Chingo',
    role: 'Solutions Architect',
    roleVariant: 'architect',
    description:
      'Diseña las soluciones de arquitectura que sostienen la plataforma, garantizando escalabilidad, alta disponibilidad y seguridad en cada capa del sistema.',
    img: '/img/team/abel.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'cumpa',
    name: 'Josué Cumpa',
    role: 'Technical Lead',
    roleVariant: 'lead',
    description:
      'Coordina al equipo de desarrollo, asegura la calidad del código y lidera la entrega continua de funcionalidades críticas para la plataforma.',
    img: '/img/team/cumpa.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'diaz',
    name: 'Cristhian Diaz',
    role: 'AI Engineer',
    roleVariant: 'ai',
    description:
      'Desarrolla y optimiza los modelos de inteligencia artificial para verificación biométrica facial y reconocimiento de identidad resistente al envejecimiento.',
    img: '/img/team/diaz.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'espino',
    name: 'Jampierre Espino',
    role: 'DevOps Engineer',
    roleVariant: 'devops',
    description:
      'Gestiona la infraestructura cloud y los pipelines CI/CD que garantizan despliegues seguros, rápidos y con alta disponibilidad en producción.',
    img: '/img/team/espino.png',
    imgPosition: 'center top',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'hoyos',
    name: 'Alex Hoyos',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Construye las interfaces y APIs que conectan la experiencia de usuario con la lógica de negocio de la billetera digital.',
    img: '/img/team/hoyos.png',
    imgPosition: 'center top',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'hernandez',
    name: 'Alex Hernandez',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Desarrolla funcionalidades end-to-end con foco en rendimiento y en la mejor experiencia posible para el usuario final.',
    img: '/img/team/hernandez.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'gonzales',
    name: 'Anggelo Gonzales',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Contribuye al desarrollo integral de la plataforma con soluciones robustas orientadas al usuario y al crecimiento del producto.',
    img: '/img/team/gonzales.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'bernilla',
    name: 'Anthony Bernilla',
    role: 'DevOps Engineer',
    roleVariant: 'devops',
    description:
      'Automatiza y mantiene los entornos de infraestructura cloud, asegurando la resiliencia del sistema y optimizando los flujos de integración y despliegue continuo.',
    img: '/img/team/bernilla.png',
    imgPosition: 'center top',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'leon',
    name: 'Saúl Leon',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Implementa soluciones full stack con énfasis en la seguridad y escalabilidad de las transacciones financieras en la plataforma ARGOS.',
    img: '/img/team/leon.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'vera',
    name: 'Paul Vera',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Desarrolla e integra módulos clave de la plataforma, garantizando coherencia entre el frontend y los servicios de backend.',
    img: '/img/team/vera.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'yovera',
    name: 'Emmanuel Yovera',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Construye y mantiene componentes de la plataforma asegurando calidad de código, cobertura de pruebas y alineación con los objetivos del producto.',
    img: '/img/team/yovera.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'alberca',
    name: 'Manuel Alberca',
    role: 'Backend Engineer',
    roleVariant: 'backend',
    description:
      'Diseña y desarrolla los servicios de backend que potencian la lógica de negocio, las integraciones y el procesamiento seguro de datos en la plataforma.',
    img: '/img/team/alberca.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'llontop',
    name: 'Bryan Llontop',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Construye y mantiene componentes de la plataforma asegurando calidad de código, cobertura de pruebas y alineación con los objetivos del producto.',
    img: '/img/team/llontop.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },
  {
    id: 'monteza',
    name: 'Joseph Monteza',
    role: 'Full Stack Developer',
    roleVariant: 'fullstack',
    description:
      'Construye y mantiene componentes de la plataforma asegurando calidad de código, cobertura de pruebas y alineación con los objetivos del producto.',
    img: '/img/team/monteza.png',
    linkedin: '#',
    github: '#',
    x: '#',
  },

];

const STATS = [
  { value: '10+',  label: 'Miembros del equipo' },
  { value: '16+',  label: 'Años de experiencia' },
  { value: '7',   label: 'APIs en producción' },
  { value: '1',   label: 'Plataforma unificada' },
];

/* ── MemberCard ────────────────────────────────────────── */
function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  return (
    <article className={clsx(styles.card, styles[member.roleVariant], {[styles.featured]: featured})}>
      <div className={clsx(styles.photoRing, styles[`ring_${member.roleVariant}`])}>
        <img
          src={member.img}
          alt={member.name}
          className={styles.photo}
          style={member.imgPosition ? {objectPosition: member.imgPosition} : undefined}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1A202C&color=fff&size=128`;
          }}
        />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.name}>{member.name}</h3>
        <span className={clsx(styles.roleBadge, styles[`badge_${member.roleVariant}`])}>
          {member.role}
        </span>
        <p className={styles.description}>{member.description}</p>

        <div className={styles.socials}>
          <a href={member.linkedin} className={styles.socialBtn} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          <a href={member.x} className={styles.socialBtn} aria-label="X / Twitter" target="_blank" rel="noopener noreferrer">
            <XIcon />
          </a>
          <a href={member.github} className={styles.socialBtn} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function Equipo(): ReactNode {
  const [risco, abel, ...rest] = TEAM;

  return (
    <Layout title="Equipo" description="Conoce al equipo detrás de ARGOS — Billetera Digital">
      <main className={styles.page}>

        {/* ── Header ── */}
        <section className={styles.header}>
          <span className={styles.sectionLabel}>EQUIPO ARGOS</span>
          <h1 className={styles.title}>
            Conoce al equipo detrás de{' '}
            <span className={styles.highlight}>ARGOS</span>
          </h1>
          <p className={styles.subtitle}>
            Somos un grupo de ingenieros apasionados por construir el futuro
            de las finanzas digitales con tecnología de vanguardia.
          </p>
        </section>

        {/* ── Stats ── */}
        <section className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Team grid ── */}
        <section className={styles.teamSection}>
          <h2 className={styles.teamTitle}>Nuestro Equipo</h2>
          <p className={styles.teamSubtitle}>
            Profesionales dedicados a construir el futuro de las finanzas digitales.
          </p>

          {/* CTO — destacado, centrado */}
          <div className={styles.featuredRow}>
            <MemberCard member={risco} featured />
          </div>

          {/* Solutions Architect — centrado */}
          <div className={styles.secondRow}>
            <MemberCard member={abel} />
          </div>

          {/* Resto — matriz 3 columnas */}
          <div className={styles.grid}>
            {rest.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </section>

      </main>
    </Layout>
  );
}
