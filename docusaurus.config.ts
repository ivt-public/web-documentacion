import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Documentación de APIS ARGOS',
  tagline: 'Mi cultura debe ser tu cultura',
  favicon: 'img/favicon-argos.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://documentacion.walletargos.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docredcash', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['en','es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: ['./src/css/custom.css','./src/css/imprimir.css',]
          
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            id: 'argos-ivt',
            spec: 'openapi/argos-ivt.json',
            route: '/api/argos-ivt/',
          },
          {
            id: 'argos-ocr',
            spec: 'openapi/ocr-ivt.json',
            route: '/api/argos-ocr/',
          },
        ],
        theme: {
          primaryColor: '#E53935',
          options: {
            expandResponses: '200,201',
            requiredPropsFirst: true,
            sortPropsAlphabetically: false,
            disableSearch: false,
            scrollYOffset: 60,
            hideDownloadButton: false,
            pathInMiddlePanel: true,
            nativeScrollbars: false,
          },
          theme: {
            typography: {
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '15px',
              lineHeight: '1.65',
              headings: {
                fontFamily: '"Inter", sans-serif',
                fontWeight: '600',
              },
              code: {
                fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
                fontSize: '13px',
              },
            },
            sidebar: {
              width: '280px',
              groupItems: {
                textTransform: 'uppercase',
              },
            },
          },
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo-argos.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Inicio',
      logo: {
        alt: 'Logo ARGOS',
        src: 'img/logo-argos.png',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Documentación API',
          position: 'left',
          items: [
            { label: 'Identidad', href: '#' },
            { label: 'Prueba de vida', to: '/api/argos-ivt/', style: { marginLeft: '15px' } },
            { label: 'OCR - DNI', to: '/api/argos-ocr/', style: { marginLeft: '15px' } },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/equipo', label: 'Equipo', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'javascript:window.print()', // Acción de imprimir directa
          label: '📄 Exportar a PDF',
          position: 'right',
          className: 'button button--outline button--primary margin-left--md print-button',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/argos',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Argos, Inc. Built for Innovación tecnológica y Empresarial.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
