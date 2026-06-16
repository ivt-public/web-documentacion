import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  titleId: string;
  titleDefault: string;
  descId: string;
  descDefault: string;
  imgSrc: string;
  imgAlt: string;
};

const FeatureList: FeatureItem[] = [
  {
    titleId: 'feature.easy.title',
    titleDefault: 'Fácil de Usar',
    descId: 'feature.easy.desc',
    descDefault:
      'ARGOS fue diseñada desde cero para ser fácil de usar e instalar, para que puedas comenzar a administrar tus finanzas rápidamente.',
    imgSrc: require('@site/static/img/easy-use.png').default,
    imgAlt: 'Fácil de Usar',
  },
  {
    titleId: 'feature.focus.title',
    titleDefault: 'Enfócate en lo que Importa',
    descId: 'feature.focus.desc',
    descDefault:
      'ARGOS te ayuda a enfocarte en lo que importa, y nosotros nos ocupamos del resto. Organiza tus finanzas y gestiona tus transacciones desde un solo lugar.',
    imgSrc: require('@site/static/img/focus.png').default,
    imgAlt: 'Enfócate en lo que Importa',
  },
  {
    titleId: 'feature.security.title',
    titleDefault: 'Potenciado por Seguridad',
    descId: 'feature.security.desc',
    descDefault:
      'Tu seguridad es nuestra prioridad. ARGOS utiliza tecnología de encriptación avanzada para proteger tus datos y tu dinero en todo momento.',
    imgSrc: require('@site/static/img/security.png').default,
    imgAlt: 'Potenciado por Seguridad',
  },
];

function Feature({titleId, titleDefault, descId, descDefault, imgSrc, imgAlt}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.imageWrapper}>
        <img
          src={imgSrc}
          alt={imgAlt}
          className={styles.featureImg}
          loading="lazy"
        />
      </div>
      <div className={styles.featureBody}>
        <Heading as="h3" className={styles.featureTitle}>
          <Translate id={titleId}>{titleDefault}</Translate>
        </Heading>
        <p className={styles.featureDesc}>
          <Translate id={descId}>{descDefault}</Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', styles.featuresRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
