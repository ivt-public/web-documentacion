import {useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/** Colores que rotan con cada frase — visibles en el fondo navy oscuro */
const TAGLINE_COLORS = [
  'rgba(255, 255, 255, 0.90)',  // blanco — billetera digital
  '#90CDF4',                    // azul suave — finanzas
  '#76E4F7',                    // cyan — biométrico / tecnología
  '#9AE6B4',                    // verde suave — transacciones seguras
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const taglines = [
    translate({ id: 'hero.tagline.1', message: 'La billetera digital que protege tu futuro.' }),
    translate({ id: 'hero.tagline.2', message: 'Gestiona tus finanzas con seguridad y simplicidad.' }),
    translate({ id: 'hero.tagline.3', message: 'Tecnología biométrica avanzada para proteger tus activos.' }),
    translate({ id: 'hero.tagline.4', message: 'Transacciones rápidas, seguras y sin complicaciones.' }),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      const swap = setTimeout(() => {
        setIdx(prev => (prev + 1) % taglines.length);
        setFade(true);
      }, 350);
      return () => clearTimeout(swap);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    if (i === idx) return;
    setFade(false);
    setTimeout(() => { setIdx(i); setFade(true); }, 350);
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>

        <p
          className={clsx(styles.rotatingTagline, fade ? styles.fadeIn : styles.fadeOut)}
          style={{color: TAGLINE_COLORS[idx]}}>
          {taglines[idx]}
        </p>

        <div className={styles.dots} aria-hidden="true">
          {taglines.map((_, i) => (
            <button
              key={i}
              className={clsx(styles.dot, {[styles.dotActive]: i === idx})}
              style={i === idx ? {background: TAGLINE_COLORS[i]} : undefined}
              onClick={() => goTo(i)}
              aria-label={`Frase ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.heroBtn)}
            to="/api/argos-ivt/">
            <Translate id="hero.cta">Explorar Documentación</Translate>
            {' →'}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentación oficial de las APIs de ARGOS — Billetera Digital">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
