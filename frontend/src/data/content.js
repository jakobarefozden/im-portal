// src/data/content.js

export const classes = [
  {
    id: "im-vg1",
    code: "IM Vg1",
    name: "IM Vg1 – Felles programfag",
    description:
      "Konseptutvikling og programmering, Produksjon og historiefortelling, Teknologiforståelse og YFF.",
    courses: [
      {
        id: "konseptutvikling-programmering",
        title: "Konseptutvikling og programmering",
        shortDescription:
          "Idéutvikling, prototyping, programmering og enkel webutvikling.",
        ndlaUrl:
          "https://ndla.no/f/konseptutvikling-og-programmering-im-ikm-vg1/7bc23d06d79d",
        themes: [
          {
            id: "apputvikling-prototyping",
            title: "Apputvikling og prototyping",
            shortDescription:
              "Brukeropplevelse, skisser og enkle prototyper av apper.",
          },
          {
            id: "webutvikling",
            title: "Webutvikling",
            shortDescription:
              "Planlegging og utvikling av enkle nettsider med HTML og CSS.",
          },
        ],
      },
      {
        id: "produksjon-historiefortelling",
        title: "Produksjon og historiefortelling",
        shortDescription:
          "Historiefortelling med tekst, lyd, bilde og video.",
        ndlaUrl:
          "https://ndla.no/f/produksjon-og-historiefortelling-im-ikm-vg1/6b4ff88031e7",
        themes: [
          {
            id: "visuelle-medier",
            title: "Visuelle medier",
            shortDescription:
              "Bruk av bilde, utsnitt og komposisjon for å fortelle visuelt.",
          },
        ],
      },
{
  id: "teknologiforstaelse",
  title: "Teknologiforståelse",
  shortDescription:
    "Hvordan digitale systemer fungerer, og hvordan vi bruker dem trygt.",
  ndlaUrl:
    "https://ndla.no/f/teknologiforstaelse-im-ikm-vg1/087c23101fc5",
  themes: [
    {
      id: "digital-teknologi",
      title: "Digital teknologi",
      shortDescription:
        "Grunnleggende om maskinvare, programvare og binære tall.",
      subthemes: [
        {
          id: "maskinvare-grunnleggende",
          title: "Maskinvare – det fysiske i datamaskinen",
          shortDescription:
            "CPU, RAM, lagring og hovedkort – hva gjør de egentlig?",
          description:
            "I denne underdelen ser vi på de viktigste komponentene i en datamaskin og hvordan de samarbeider. Elevene skal kunne peke ut delene og forklare hovedfunksjonen deres.",
          notePdf: "/pdf/im-vg1/teknologiforstaelse/maskinvare-notat.pdf",
          tasksPdf:
            "/pdf/im-vg1/teknologiforstaelse/maskinvare-oppgaver.pdf",
          images: [
            "/img/im-vg1/teknologiforstaelse/maskinvare-1.jpg",
            "/img/im-vg1/teknologiforstaelse/maskinvare-2.jpg",
          ],
          formUrl: "", // ileride Microsoft Form gömmek istersen
        },
      ],
    },
    {
      id: "datasikkerhet",
      title: "Datasikkerhet",
      shortDescription:
        "Trusler mot datasikkerhet og hvordan vi beskytter oss.",
      subthemes: [
        {
          id: "passord-tofaktor",
          title: "Passord og tofaktor",
          shortDescription:
            "Hva er et sterkt passord, og hvorfor er tofaktor viktig?",
          description:
            "I denne delen jobber vi med gode passordvaner, passord-manager og hvordan tofaktor-autentisering beskytter kontoene våre. Elevene får eksempler på dårlige og gode passord og ser hvordan passord kan knekkes.",
          notePdf:
            "/pdf/im-vg1/teknologiforstaelse/datasikkerhet-passord-notat.pdf",
          tasksPdf:
            "/pdf/im-vg1/teknologiforstaelse/datasikkerhet-passord-oppgaver.pdf",
          images: [
            "/img/im-vg1/teknologiforstaelse/passord-1.png",
          ],
          formUrl: "", // buraya istersen Microsoft Forms linki koyarsın
        },
        {
          id: "phishing-svindel",
          title: "Phishing og svindel",
          shortDescription:
            "Lure e-poster, falske nettsider og hvordan vi kan avsløre dem.",
          description:
            "Her ser vi på eksempler på phishing-eposter og falske nettsider. Elevene lærer å se etter faresignaler og diskuterer hva man bør gjøre hvis man har klikket på noe mistenkelig.",
          notePdf:
            "/pdf/im-vg1/teknologiforstaelse/datasikkerhet-phishing-notat.pdf",
          tasksPdf: null, // bu alt temada ekstra oppgave PDF yok
          images: [
            "/img/im-vg1/teknologiforstaelse/phishing-1.png",
          ],
          formUrl: "",
        },
      ],
    },
  ],
},

      {
        id: "yff",
        title: "Yrkesfaglig fordypning",
        shortDescription:
          "Praktisk arbeid og øving mot yrker innen IT og medieproduksjon.",
        ndlaUrl:
          "https://ndla.no/f/yrkesfaglig-fordypning-im-ikm-vg1/20c25d6ed9b1",
        themes: [
          {
            id: "praktisk-it",
            title: "Praktisk IT",
            shortDescription:
              "Oppgaver som ligner på arbeid i ekte bedrifter.",
          },
        ],
      },
    ],
  },
  {
    id: "it-vg2",
    code: "IT Vg2",
    name: "Informasjonsteknologi Vg2",
    description:
      "Brukerstøtte, driftsstøtte og utvikling for IT-systemer og nettverk.",
    courses: [
      {
        id: "brukerstotte",
        title: "Brukerstøtte",
        shortDescription:
          "Kundebehandling, feilsøking og kommunikasjon med brukere.",
        ndlaUrl: "https://ndla.no/f/brukerstotte-im-itk-vg2/b678ae6a074d",
        themes: [
          {
            id: "arbeidsmiljo-hms",
            title: "Arbeidsmiljø og HMS",
            shortDescription:
              "Lover og regler for et trygt og godt arbeidsmiljø.",
          },
          {
            id: "motet-med-brukeren",
            title: "Møtet med brukeren",
            shortDescription:
              "God service, forventninger og kommunikasjon.",
          },
        ],
      },
      {
        id: "driftsstotte",
        title: "Driftsstøtte",
        shortDescription:
          "Nettverk, lagring og drift av IT-infrastruktur.",
        ndlaUrl: "https://ndla.no/f/driftsstotte-im-itk-vg2/2c20017628cc",
        themes: [
          {
            id: "komponenter-datanettverk",
            title: "Komponentene i datanettverk",
            shortDescription:
              "Routere, switcher, kabler og andre nettverkskomponenter.",
          },
        ],
      },
      {
        id: "utvikling",
        title: "Utvikling",
        shortDescription:
          "Programmering, databaser og utvikling av løsninger.",
        ndlaUrl: "https://ndla.no/f/utvikling-im-itk-vg2/17e6fbba25ef",
        themes: [
          {
            id: "algoritmer-python",
            title: "Algoritmer med Python",
            shortDescription:
              "Hvordan vi planlegger og koder algoritmer i Python.",
          },
          {
            id: "dynamiske-nettsider-nosql",
            title: "Dynamiske nettsider med NoSQL",
            shortDescription:
              "Enkle webapplikasjoner med database i bakgrunnen.",
          },
        ],
      },
    ],
  },
  {
    id: "mp-vg2",
    code: "MP Vg2",
    name: "Medieproduksjon Vg2",
    description:
      "Design, kommunikasjon og produksjon for ulike mediekanaler.",
    courses: [
      {
        id: "design-visualisering",
        title: "Design og visualisering",
        shortDescription:
          "Grafisk design, typografi og visuell kommunikasjon.",
        ndlaUrl:
          "https://ndla.no/f/design-og-visualisering-im-med-vg2---ressurssamling/e8dc781c09f0",
        themes: [
          {
            id: "grafisk-design",
            title: "Innføring i grafisk design",
            shortDescription:
              "Farge, form og typografi i grafisk design.",
          },
        ],
      },
      {
        id: "konseptutvikling-kommunikasjon",
        title: "Konseptutvikling og kommunikasjon",
        shortDescription:
          "Idéutvikling, målgrupper og historiefortelling i medier.",
        ndlaUrl:
          "https://ndla.no/f/konseptutvikling-og-kommunikasjon-im-med-vg2---ressurssamling/b6acdbfab214",
        themes: [
          {
            id: "forteljeteknikk",
            title: "Forteljeteknikk og verkemiddel",
            shortDescription:
              "Hvordan vi bruker virkemidler for å nå målgruppen.",
          },
        ],
      },
      {
        id: "teknologi-produksjon",
        title: "Teknologi og produksjon",
        shortDescription:
          "Tekniske verktøy og arbeidsflyt i medieproduksjon.",
        ndlaUrl:
          "https://ndla.no/f/technology-and-production-im-med-vg2---resources/9211e55ef0eb",
        themes: [
          {
            id: "video-2",
            title: "Video 2",
            shortDescription:
              "Videre arbeid med levende bilder og videoproduksjon.",
          },
        ],
      },
    ],
  },
];
