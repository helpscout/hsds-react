import {
  convertLinksToHTML,
  escapeHTML,
  newlineToHTML,
  repeat,
} from '../strings'
import * as urlUtils from '../urls'

describe('newlineToHTML', () => {
  test('Returns string, untouched, if there are no newlines', () => {
    const string = 'word1 word2'
    expect(newlineToHTML(string)).toEqual(string)
  })

  test('Replaces newline with <br /> tag', () => {
    const string = 'word1\nword2'
    expect(newlineToHTML(string)).toEqual('word1<br>word2')
  })

  test('Replaces multiple newline with multiple <br /> tag', () => {
    const string = 'word1\nword2\nword3'
    expect(newlineToHTML(string)).toEqual('word1<br>word2<br>word3')
  })
})

describe('repeat', () => {
  test('Repeats characters to specified amount', () => {
    expect(repeat('a', 5)).toBe('aaaaa')
  })

  test('Repeats characters to 1', () => {
    expect(repeat('a', 1)).toBe('a')
  })

  test('Repeats characters to 0', () => {
    expect(repeat('a', 0)).toBe('')
  })
})

describe('escapeHTML', () => {
  it('should not escape non HTML characters', () => {
    expect(escapeHTML('This contains no HTML')).toEqual('This contains no HTML')
  })

  it('should escape HTML tags', () => {
    expect(escapeHTML('<p>Hello</p>')).toEqual('&lt;p&gt;Hello&lt;/p&gt;')
  })

  it('should escape double quotes', () => {
    expect(escapeHTML('"Double quoted"')).toEqual('&quot;Double quoted&quot;')
  })

  it('should escape single quotes', () => {
    expect(escapeHTML("'Single quoted'")).toEqual('&#x27;Single quoted&#x27;')
  })

  it('should escape ampersands', () => {
    expect(escapeHTML('This & that')).toEqual('This &amp; that')
  })
})

describe('convertLinksToHTML', () => {
  const withUrls = [
    [
      'www.example.com',
      '<a href="http://www.example.com" target="_blank" rel="noopener">www.example.com</a>',
    ],
    [
      'http://www.example.com/',
      '<a href="http://www.example.com/" target="_blank" rel="noopener">http://www.example.com/</a>',
    ],
    [
      'https://www.example.com/',
      '<a href="https://www.example.com/" target="_blank" rel="noopener">https://www.example.com/</a>',
    ],
    [
      'http://www.example.com',
      '<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a>',
    ],
    [
      'www.example.com/',
      '<a href="http://www.example.com/" target="_blank" rel="noopener">www.example.com/</a>',
    ],
    [
      'www.example.engineering/example',
      '<a href="http://www.example.engineering/example" target="_blank" rel="noopener">www.example.engineering/example</a>',
    ],
    [
      'www.example.com/example/',
      '<a href="http://www.example.com/example/" target="_blank" rel="noopener">www.example.com/example/</a>',
    ],
    [
      'http://www.example.com/example',
      '<a href="http://www.example.com/example" target="_blank" rel="noopener">http://www.example.com/example</a>',
    ],
    [
      'http://www.example.marketing/example/',
      '<a href="http://www.example.marketing/example/" target="_blank" rel="noopener">http://www.example.marketing/example/</a>',
    ],
    [
      'www.example.com　',
      '<a href="http://www.example.com" target="_blank" rel="noopener">www.example.com</a>　',
    ],

    // Skipping this test due to updating the regex so we don't match every possible letter character.
    // The large regex string was causing some bundle size problems.
    //
    // [
    //   'Линк: https://ru.wikipedia.org/wiki/Футбол',
    //   'Линк: <a href="https://ru.wikipedia.org/wiki/Футбол" target="_blank" rel="noopener">https://ru.wikipedia.org/wiki/Футбол</a>',
    // ],
    [
      '(http://www.example.com/)',
      '(<a href="http://www.example.com/" target="_blank" rel="noopener">http://www.example.com/</a>)',
    ],
    [
      'http://www.example.com/)',
      '<a href="http://www.example.com/" target="_blank" rel="noopener">http://www.example.com/</a>)',
    ],
    [
      'www.example.cool/)',
      '<a href="http://www.example.cool/" target="_blank" rel="noopener">www.example.cool/</a>)',
    ],
    [
      'website:http://www.example.com/example',
      'website:<a href="http://www.example.com/example" target="_blank" rel="noopener">http://www.example.com/example</a>',
    ],
    [
      'http://www.example.com/example-example/.',
      '<a href="http://www.example.com/example-example/" target="_blank" rel="noopener">http://www.example.com/example-example/</a>.',
    ],
    [
      'http://www.example.com/example-example/-',
      '<a href="http://www.example.com/example-example/-" target="_blank" rel="noopener">http://www.example.com/example-example/-</a>',
    ],
    [
      'www.example.com/example?fdasfs=24fa3fd32',
      '<a href="http://www.example.com/example?fdasfs=24fa3fd32" target="_blank" rel="noopener">www.example.com/example?fdasfs=24fa3fd32</a>',
    ],
    [
      'www.example.com/example?fdasfs=24fa3fd32&asdsa=af5t34tw',
      '<a href="http://www.example.com/example?fdasfs=24fa3fd32&amp;asdsa=af5t34tw" target="_blank" rel="noopener">www.example.com/example?fdasfs=24fa3fd32&amp;asdsa=af5t34tw</a>',
    ],
    [
      'http://www.example.com/example?fdasfs=24fa3fd32',
      '<a href="http://www.example.com/example?fdasfs=24fa3fd32" target="_blank" rel="noopener">http://www.example.com/example?fdasfs=24fa3fd32</a>',
    ],
    [
      'http://www.example.com/example?fdasfs=24fa3fd32&asdsa=af5t34tw',
      '<a href="http://www.example.com/example?fdasfs=24fa3fd32&amp;asdsa=af5t34tw" target="_blank" rel="noopener">http://www.example.com/example?fdasfs=24fa3fd32&amp;asdsa=af5t34tw</a>',
    ],
    [
      '(www-example.example.example.com).',
      '(<a href="http://www-example.example.example.com" target="_blank" rel="noopener">www-example.example.example.com</a>).',
    ],
    [
      'http://www.example.com/example.aspx',
      '<a href="http://www.example.com/example.aspx" target="_blank" rel="noopener">http://www.example.com/example.aspx</a>',
    ],
    [
      '(www.example.com/example.php)',
      '(<a href="http://www.example.com/example.php" target="_blank" rel="noopener">www.example.com/example.php</a>)',
    ],
    [
      '.http://www.example.com',
      '.<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a>',
    ],
    [
      '/http://www.example.com',
      '/<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a>',
    ],
    [
      '"http://www.example.com"',
      '&quot;<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a>&quot;',
    ],
    [
      "'http://www.example.com'",
      '&#x27;<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a>&#x27;',
    ],
    [
      '"example.com/"',
      '&quot;<a href="http://example.com/" target="_blank" rel="noopener">example.com/</a>&quot;',
    ],
    [
      'http://mail.example.com/example/compose?to=example@example.com',
      '<a href="http://mail.example.com/example/compose?to=example@example.com" target="_blank" rel="noopener">http://mail.example.com/example/compose?to=example@example.com</a>',
    ],
    [
      'http://example.com/something?co,m,m,as,',
      '<a href="http://example.com/something?co,m,m,as" target="_blank" rel="noopener">http://example.com/something?co,m,m,as</a>,',
    ],
    [
      'example.com/',
      '<a href="http://example.com/" target="_blank" rel="noopener">example.com/</a>',
    ],
    [
      'example.com/example/example',
      '<a href="http://example.com/example/example" target="_blank" rel="noopener">example.com/example/example</a>',
    ],
    [
      'example.example.com/',
      '<a href="http://example.example.com/" target="_blank" rel="noopener">example.example.com/</a>',
    ],
    [
      'example.example.com/example/example',
      '<a href="http://example.example.com/example/example" target="_blank" rel="noopener">example.example.com/example/example</a>',
    ],
    [
      'example.com/example#example',
      '<a href="http://example.com/example#example" target="_blank" rel="noopener">example.com/example#example</a>',
    ],
    [
      'http://example.com/example#example',
      '<a href="http://example.com/example#example" target="_blank" rel="noopener">http://example.com/example#example</a>',
    ],
    [
      'www.example.com/example.pdf',
      '<a href="http://www.example.com/example.pdf" target="_blank" rel="noopener">www.example.com/example.pdf</a>',
    ],
    [
      'www-example.example.com.',
      '<a href="http://www-example.example.com" target="_blank" rel="noopener">www-example.example.com</a>.',
    ],
    [
      'http://ex.am/pLE',
      '<a href="http://ex.am/pLE" target="_blank" rel="noopener">http://ex.am/pLE</a>',
    ],
    [
      'http://www.example.com/~example/example.html',
      '<a href="http://www.example.com/~example/example.html" target="_blank" rel="noopener">http://www.example.com/~example/example.html</a>',
    ],
    [
      'examplehttp://www.example.com',
      'example<a href="http://www.example.com" target="_blank" rel="noopener">http://www.example.com</a>',
    ],
    [
      'examplewww.example.com/',
      '<a href="http://examplewww.example.com/" target="_blank" rel="noopener">examplewww.example.com/</a>',
    ],
    [
      '<p>www.example.com</p>',
      '&lt;p&gt;<a href="http://www.example.com" target="_blank" rel="noopener">www.example.com</a>&lt;/p&gt;',
    ],
    [
      'www.example.com www.helpscout.com',
      '<a href="http://www.example.com" target="_blank" rel="noopener">www.example.com</a> <a href="http://www.helpscout.com" target="_blank" rel="noopener">www.helpscout.com</a>',
    ],
    [
      'example@example.com',
      '<a href="mailto:example@example.com">example@example.com</a>',
    ],
    [
      "example.a'ddress@example.com",
      '<a href="mailto:example.a&#x27;ddress@example.com">example.a&#x27;ddress@example.com</a>',
    ],
    [
      'example+address@example.com',
      '<a href="mailto:example+address@example.com">example+address@example.com</a>',
    ],
    [
      'exam-ple@example.com',
      '<a href="mailto:exam-ple@example.com">exam-ple@example.com</a>',
    ],
    [
      'example@example.example.com',
      '<a href="mailto:example@example.example.com">example@example.example.com</a>',
    ],
    [
      'example@exam-ple.example.com',
      '<a href="mailto:example@exam-ple.example.com">example@exam-ple.example.com</a>',
    ],
    [
      'Lorem example@example.com ipsum.',
      'Lorem <a href="mailto:example@example.com">example@example.com</a> ipsum.',
    ],
    [
      'Lorem ipsum example@example.com dolor sit amet.',
      'Lorem ipsum <a href="mailto:example@example.com">example@example.com</a> dolor sit amet.',
    ],
    [
      'example@example.com.',
      '<a href="mailto:example@example.com">example@example.com</a>.',
    ],
    [
      'example@example.com,',
      '<a href="mailto:example@example.com">example@example.com</a>,',
    ],
    [
      'example@example.example.com.',
      '<a href="mailto:example@example.example.com">example@example.example.com</a>.',
    ],
    [
      'example@example.example.com　',
      '<a href="mailto:example@example.example.com">example@example.example.com</a>　',
    ],

    // Skipping this test due to updating the regex so we don't match every possible letter character.
    // The large regex string was causing some bundle size problems.
    //
    // [
    //   'Привет example@example.com!',
    //   'Привет <a href="mailto:example@example.com">example@example.com</a>!',
    // ],

    [
      '(example@example.com)',
      '(<a href="mailto:example@example.com">example@example.com</a>)',
    ],
    [
      '(example@example.example.com)',
      '(<a href="mailto:example@example.example.com">example@example.example.com</a>)',
    ],
    [
      '(example@example.com),',
      '(<a href="mailto:example@example.com">example@example.com</a>),',
    ],
    [
      '(example@example.com).',
      '(<a href="mailto:example@example.com">example@example.com</a>).',
    ],
    [
      'example@example.com).',
      '<a href="mailto:example@example.com">example@example.com</a>).',
    ],
    [
      '(example@example.com',
      '(<a href="mailto:example@example.com">example@example.com</a>',
    ],
    [
      'mailto:example@example.com',
      'mailto:<a href="mailto:example@example.com">example@example.com</a>',
    ],
    [
      '(mailto:example@example.com)or',
      '(mailto:<a href="mailto:example@example.com">example@example.com</a>)or',
    ],
    [
      'Email:example@example.com',
      'Email:<a href="mailto:example@example.com">example@example.com</a>',
    ],
    [
      'http://example.com?email=example@example.com',
      '<a href="http://example.com?email=example@example.com" target="_blank" rel="noopener">http://example.com?email=example@example.com</a>',
    ],
    [
      'example@example.engineering',
      '<a href="mailto:example@example.engineering">example@example.engineering</a>',
    ],
    [
      'example@example.designer',
      '<a href="mailto:example@example.designer">example@example.designer</a>',
    ],
    [
      'example@example.XNAAVERMGENSBERATUNGAPWB',
      '<a href="mailto:example@example.XNAAVERMGENSBERATUNGAPWB">example@example.XNAAVERMGENSBERATUNGAPWB</a>',
    ],
    [
      'example@example.XNAAVERMGENSBERATUNGAPWBABGSDGA',
      '<a href="mailto:example@example.XNAAVERMGENSBERATUNGAPWB">example@example.XNAAVERMGENSBERATUNGAPWB</a>ABGSDGA',
    ],
    [
      'www.example.engineering',
      '<a href="http://www.example.engineering" target="_blank" rel="noopener">www.example.engineering</a>',
    ],
    [
      'www.example.designer',
      '<a href="http://www.example.designer" target="_blank" rel="noopener">www.example.designer</a>',
    ],
    [
      'www.example.XNAAVERMGENSBERATUNGAPWB',
      '<a href="http://www.example.XNAAVERMGENSBERATUNGAPWB" target="_blank" rel="noopener">www.example.XNAAVERMGENSBERATUNGAPWB</a>',
    ],
    [
      'www.example.XNAAVERMGENSBERATUNGAPWBABGSDGA',
      '<a href="http://www.example.XNAAVERMGENSBERATUNGAPWB" target="_blank" rel="noopener">www.example.XNAAVERMGENSBERATUNGAPWB</a>ABGSDGA',
    ],
    [
      'http://www.test./path',
      '<a href="http://www.test" target="_blank" rel="noopener">http://www.test</a>./path',
    ],
  ]

  withUrls.forEach(fixture => {
    it(`should autolink URLs in "${fixture[0]}"`, () => {
      expect(convertLinksToHTML(fixture[0])).toEqual(fixture[1])
    })
  })

  it('should normalize the url if one is provided', () => {
    const urlUtilSpy = jest.spyOn(urlUtils, 'normalizeUrl')

    convertLinksToHTML('www.google.com')
    expect(urlUtilSpy).toHaveBeenCalled()
  })

  const withoutUrls = [
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor.sit amet.',
    'Lorem ipsum dolor@sit amet',
    'Lorem ipsum 8.15am dolor 4.30pm.',
    'Lorem:ipsum',
    'Lorem/ipsum',
    'Lorem://ipsum',
    'Lorem://ipsum/dolor',
    'helpscout.com',
    'www.test./path',
    'http://www.',
  ]

  withoutUrls.forEach(fixture => {
    it(`should not autolink non URLs "${fixture}"`, () => {
      expect(convertLinksToHTML(fixture)).toEqual(fixture)
    })
  })
})
