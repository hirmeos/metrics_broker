import { fakeToken } from './fakeToken';

const postFakeWork = (req, res) => {
  if (req.headers.authorization !== `Bearer ${fakeToken()}`) {
    res.json({
      status: 'error',
      code: 403,
      count: 0,
      data: [],
      description: '',
      message: 'You do not have permissions to access this resource.'
    });
    return;
  }
  const { type, title, uri } = req.body;
  res.json({
    status: 'ok',
    count: 1,
    code: 200,
    data: [{ title, uri, type, UUID: 'efa6e4f6-41b7-46c8-a68f-c19711cde8da' }]
  });
};

const getFakeWorks = (req, res) => {
  if (req.headers.authorization !== `Bearer ${fakeToken()}`) {
    res.json({
      status: 'error',
      code: 403,
      count: 0,
      data: [],
      description: '',
      message: 'You do not have permissions to access this resource.'
    });
    return;
  }
  res.json({
    status: 'ok',
    count: 21,
    code: 200,
    data: [
      {
        title: [
          "A Musicology of Performance: Theory and Method Based on Bach's Solos for Violin"
        ],
        type: 'monograph',
        UUID: 'd6b4d2bf-8348-436a-b1a4-5ac1076eac09',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'books.openedition.org/obp/1852'
            },
            score: 0,
            URI: 'http://books.openedition.org/obp/1852',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'http',
              value: 'www.openbookpublishers.com/product/346'
            },
            score: 0,
            URI: 'http://www.openbookpublishers.com/product/346',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0064'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0064',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741526'
            },
            score: 0,
            URI: 'urn:isbn:9781783741526',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741533'
            },
            score: 0,
            URI: 'urn:isbn:9781783741533',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741540'
            },
            score: 0,
            URI: 'urn:isbn:9781783741540',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741557'
            },
            score: 0,
            URI: 'urn:isbn:9781783741557',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741564'
            },
            score: 0,
            URI: 'urn:isbn:9781783741564',
            canonical: false
          }
        ]
      },
      {
        title: ['A People Passing Rude: British Responses to Russian Culture'],
        type: 'monograph',
        UUID: 'bcc54d42-bcab-448b-b998-62d52bec588f',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'books.openedition.org/obp/1555'
            },
            score: 0,
            URI: 'http://books.openedition.org/obp/1555',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'http',
              value: 'www.openbookpublishers.com/product/160'
            },
            score: 0,
            URI: 'http://www.openbookpublishers.com/product/160',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0022'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0022',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254107'
            },
            score: 0,
            URI: 'urn:isbn:9781909254107',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254114'
            },
            score: 0,
            URI: 'urn:isbn:9781909254114',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254121'
            },
            score: 0,
            URI: 'urn:isbn:9781909254121',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254138'
            },
            score: 0,
            URI: 'urn:isbn:9781909254138',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254145'
            },
            score: 0,
            URI: 'urn:isbn:9781909254145',
            canonical: false
          }
        ]
      },
      {
        title: ['A Portrait of George Yeats'],
        type: 'book-chapter',
        UUID: 'fe037bd6-d556-4fa1-b9fb-59e069694759',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0028.07'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0028.07',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0028.07'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0028.07',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254350'
            },
            score: 0,
            URI: 'urn:isbn:9781909254350',
            canonical: false
          }
        ]
      },
      {
        title: ['5. A Puzzle for Dogmatism'],
        type: 'book-chapter',
        UUID: '8d0fc641-61db-49b9-a6bd-76f7021ebbc2',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0104.07'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0104.07',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0104.07'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0104.07',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742837'
            },
            score: 0,
            URI: 'urn:isbn:9781783742837',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742844'
            },
            score: 0,
            URI: 'urn:isbn:9781783742844',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742851'
            },
            score: 0,
            URI: 'urn:isbn:9781783742851',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742868'
            },
            score: 0,
            URI: 'urn:isbn:9781783742868',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742875'
            },
            score: 0,
            URI: 'urn:isbn:9781783742875',
            canonical: false
          }
        ]
      },
      {
        title: ['3. A Right of Self-Termination?'],
        type: 'book-chapter',
        UUID: '04c619ff-5e32-4886-93af-644bf3b49202',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0061.03'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0061.03',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0061.03'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0061.03',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741670'
            },
            score: 0,
            URI: 'urn:isbn:9781783741670',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741687'
            },
            score: 0,
            URI: 'urn:isbn:9781783741687',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741694'
            },
            score: 0,
            URI: 'urn:isbn:9781783741694',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741700'
            },
            score: 0,
            URI: 'urn:isbn:9781783741700',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741717'
            },
            score: 0,
            URI: 'urn:isbn:9781783741717',
            canonical: false
          }
        ]
      },
      {
        title: ['A Rising or Setting Sun?'],
        type: 'book-chapter',
        UUID: '41f16b96-214c-4f44-a78f-ae24573ac21b',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0040.06'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0040.06',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0040.06'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0040.06',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740123'
            },
            score: 0,
            URI: 'urn:isbn:9781783740123',
            canonical: false
          }
        ]
      },
      {
        title: [
          'A Select Checklist of the Writings of Alexander Norman Jeffares (1920-2005)'
        ],
        type: 'book-chapter',
        UUID: '99b3d95c-307e-450b-b5d0-13cc63f79db5',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0028.13'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0028.13',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0028.13'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0028.13',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254350'
            },
            score: 0,
            URI: 'urn:isbn:9781909254350',
            canonical: false
          }
        ]
      },
      {
        title: [
          '5. A Sense of Multiple Belonging: Translocal Relations and Narratives of Change Within a Dungan Community'
        ],
        type: 'book-chapter',
        UUID: 'f306d735-331c-4c36-9702-1e2e066669a8',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0114.05'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0114.05',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0114.05'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0114.05',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783743339'
            },
            score: 0,
            URI: 'urn:isbn:9781783743339',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783743346'
            },
            score: 0,
            URI: 'urn:isbn:9781783743346',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783743353'
            },
            score: 0,
            URI: 'urn:isbn:9781783743353',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783743360'
            },
            score: 0,
            URI: 'urn:isbn:9781783743360',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783743377'
            },
            score: 0,
            URI: 'urn:isbn:9781783743377',
            canonical: false
          }
        ]
      },
      {
        title: [
          'A Slightly Complicated Door: The Ethnography and Conceptualisation of North Asian Borders'
        ],
        type: 'book-chapter',
        UUID: '32f4e81b-16a7-48db-b470-15646833b576',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0026.01'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0026.01',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0026.01'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0026.01',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781906924874'
            },
            score: 0,
            URI: 'urn:isbn:9781906924874',
            canonical: false
          }
        ]
      },
      {
        title: ['A Time Travel Dialogue'],
        type: 'monograph',
        UUID: '2226af47-3fb5-4025-aa0e-b48b7f602eee',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'books.openedition.org/obp/2556'
            },
            score: 0,
            URI: 'http://books.openedition.org/obp/2556',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'http',
              value: 'www.openbookpublishers.com/product/256'
            },
            score: 0,
            URI: 'http://www.openbookpublishers.com/product/256',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0043'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0043',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740376'
            },
            score: 0,
            URI: 'urn:isbn:9781783740376',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740383'
            },
            score: 0,
            URI: 'urn:isbn:9781783740383',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740390'
            },
            score: 0,
            URI: 'urn:isbn:9781783740390',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740406'
            },
            score: 0,
            URI: 'urn:isbn:9781783740406',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740413'
            },
            score: 0,
            URI: 'urn:isbn:9781783740413',
            canonical: false
          }
        ]
      },
      {
        title: ['A Time of Strife'],
        type: 'book-chapter',
        UUID: '50c64124-345e-49b1-84bc-dce4379ab542',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0040.08'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0040.08',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0040.08'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0040.08',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740123'
            },
            score: 0,
            URI: 'urn:isbn:9781783740123',
            canonical: false
          }
        ]
      },
      {
        title: ['A Venetian Experiment on Perpetual Copyright'],
        type: 'book-chapter',
        UUID: 'c228c9c6-25e1-4858-90f0-56c6eff8f328',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0007.06'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0007.06',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0007.06'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0007.06',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781906924188'
            },
            score: 0,
            URI: 'urn:isbn:9781906924188',
            canonical: false
          }
        ]
      },
      {
        title: ['A Vision (1925): A Review Essay'],
        type: 'book-chapter',
        UUID: '214f54d6-4f2e-4fa5-913f-3ee6d506f802',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0028.14'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0028.14',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0028.14'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0028.14',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254350'
            },
            score: 0,
            URI: 'urn:isbn:9781909254350',
            canonical: false
          }
        ]
      },
      {
        title: ['A Vision and Yeats’s Late Masks'],
        type: 'book-chapter',
        UUID: '389c805d-4799-4468-81a0-6475fca2efd3',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0038.07'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0038.07',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0038.07'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0038.07',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783740178'
            },
            score: 0,
            URI: 'urn:isbn:9781783740178',
            canonical: false
          }
        ]
      },
      {
        title: ['A World of Discovery: Joachim Heirich Campe'],
        type: 'book-chapter',
        UUID: '6b25dcbf-eb28-4b6a-81bb-7fddfe6358a6',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0004.02'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0004.02',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0004.02'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0004.02',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781906924096'
            },
            score: 0,
            URI: 'urn:isbn:9781906924096',
            canonical: false
          }
        ]
      },
      {
        title: ['Abbreviations, references and cross-references'],
        type: 'book-chapter',
        UUID: '0a54ae55-f3e1-405b-88e4-a5167896acd2',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0092.02'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0092.02',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0092.02'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0092.02',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742233'
            },
            score: 0,
            URI: 'urn:isbn:9781783742233',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742240'
            },
            score: 0,
            URI: 'urn:isbn:9781783742240',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742257'
            },
            score: 0,
            URI: 'urn:isbn:9781783742257',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742264'
            },
            score: 0,
            URI: 'urn:isbn:9781783742264',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742271'
            },
            score: 0,
            URI: 'urn:isbn:9781783742271',
            canonical: false
          }
        ]
      },
      {
        title: ['15. Accelerating Infrastructure Finance'],
        type: 'book-chapter',
        UUID: '3c52a944-3f2e-4417-8346-f077192d8357',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0106.15'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0106.15',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0106.15'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0106.15',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742936'
            },
            score: 0,
            URI: 'urn:isbn:9781783742936',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742943'
            },
            score: 0,
            URI: 'urn:isbn:9781783742943',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742950'
            },
            score: 0,
            URI: 'urn:isbn:9781783742950',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742967'
            },
            score: 0,
            URI: 'urn:isbn:9781783742967',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783742974'
            },
            score: 0,
            URI: 'urn:isbn:9781783742974',
            canonical: false
          }
        ]
      },
      {
        title: [
          'Access and Accessibility at ELAR, A Social Networking Archive for Endangered Languages Documentation'
        ],
        type: 'book-chapter',
        UUID: 'c15694f2-fb76-4104-a92a-9174e160f060',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0032.03'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0032.03',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0032.03'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0032.03',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254305'
            },
            score: 0,
            URI: 'urn:isbn:9781909254305',
            canonical: false
          }
        ]
      },
      {
        title: ['Acculturation and the Digital Humanities Community'],
        type: 'book-chapter',
        UUID: '55ef81fe-2622-4f9d-9135-3bc0246ab587',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0024.08'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0024.08',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0024.08'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0024.08',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781909254251'
            },
            score: 0,
            URI: 'urn:isbn:9781909254251',
            canonical: false
          }
        ]
      },
      {
        title: ["Adalbert von Chamisso's Peter Schlemihl"],
        type: 'book-chapter',
        UUID: '7ac06344-a56c-4826-9193-99af1059ed78',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'dx.doi.org/10.11647/obp.0004.09'
            },
            score: 0,
            URI: 'http://dx.doi.org/10.11647/obp.0004.09',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0004.09'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0004.09',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781906924096'
            },
            score: 0,
            URI: 'urn:isbn:9781906924096',
            canonical: false
          }
        ]
      },
      {
        title: ['Advanced Problems in Mathematics: Preparing for University'],
        type: 'monograph',
        UUID: '5d3b0b81-0389-44d8-8ac9-a955a1f5d1ca',
        URI: [
          {
            URI_parts: {
              scheme: 'http',
              value: 'www.openbookpublishers.com/product/342'
            },
            score: 0,
            URI: 'http://www.openbookpublishers.com/product/342',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'info:doi',
              value: '10.11647/obp.0075'
            },
            score: 0,
            URI: 'info:doi:10.11647/obp.0075',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741427'
            },
            score: 0,
            URI: 'urn:isbn:9781783741427',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741441'
            },
            score: 0,
            URI: 'urn:isbn:9781783741441',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741458'
            },
            score: 0,
            URI: 'urn:isbn:9781783741458',
            canonical: false
          },
          {
            URI_parts: {
              scheme: 'urn:isbn',
              value: '9781783741465'
            },
            score: 0,
            URI: 'urn:isbn:9781783741465',
            canonical: false
          }
        ]
      }
    ]
  });
};

export default {
  'GET /works': getFakeWorks,
  'POST /works': postFakeWork
};
