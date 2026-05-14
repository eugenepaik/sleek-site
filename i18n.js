/* -------------------------------------------------------------
   SLEEK — simple client-side i18n
   Tag elements with data-i18n="namespace.key" and they'll be
   swapped to the selected language on toggle. The first run
   caches the element's original English innerHTML into
   data-i18n-en, so switching back to EN restores verbatim.

   TO ADD A TRANSLATION:
     1) Add a new key to the `ko` dictionary below.
     2) Tag the HTML element you want translated with
        data-i18n="your.key" and put the English copy inside.
     3) That's it — toggle will pick it up on next load.

   NOTE: Korean copy here is a functional first pass. Have a
   native-level copywriter review before going live.
   ------------------------------------------------------------- */
(function () {
  'use strict';

  const LANG_KEY = 'sleek:lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'ko'];

  const translations = {
    ko: {
      // Header / nav (every page)
      'nav.about':        '소개',
      'nav.experience':   '시설',
      'nav.membership':   '멤버십',
      'nav.visit':        '오시는 길',
      'header.meta':      '코리아타운 &nbsp;·&nbsp; 로스앤젤레스',
      'header.login':     '멤버 로그인',

      // Home hero
      'home.hero.eyebrow':   '지금 오픈 · 코리아타운',
      'home.hero.h1':        '더 나은 것을 원하는<br><em>사람들을 위해.</em>',
      'home.hero.lede':      '슬릭은 로스앤젤레스 코리아타운에 위치한 프리미엄 피트니스입니다. 평범함에 만족하지 않는 회원들을 위해 설계되었습니다 &mdash; 최고급 장비, 여유로운 플로어, 그리고 대부분의 체육관이 신경 쓰지 않는 디테일까지.',
      'home.hero.cta.join':  '리스트에 등록',
      'home.hero.cta.see':   '공간 둘러보기',

      // Home hero KV
      'home.kv.location.label':  '위치',
      'home.kv.location.value':  '코리아타운 플라자, 로스앤젤레스',
      'home.kv.hours.label':     '운영시간',
      'home.kv.hours.value':     '오전 7시 — 오후 11시 &nbsp;·&nbsp; 매일',
      'home.kv.opening.label':   '상태',
      'home.kv.opening.value':   '지금 오픈',

      // Home — The Idea
      'home.idea.eyebrow': '아이디어',
      'home.idea.h2':      '단 하나의 기준, <em>그리고 그것은 최고의 기준.</em>',
      'home.idea.p1':      '대부분의 헬스장은 타협으로 만들어집니다. 저렴한 플레이트. 혼잡한 플로어. 거의 맞는 선택의 장비들. 슬릭은 반대에서 출발합니다 &mdash; 소싱할 수 있는 최고의 장비를, 제대로 사용할 수 있는 공간과 함께, 진지한 훈련을 추구하는 사람들에게 어울리는 공간에 배치합니다.',
      'home.idea.p2':      '코리아타운은 오랫동안 이런 곳이 필요했습니다. 이제 만들어집니다.',

      // Home — Inside Sleek
      'home.inside.eyebrow': '슬릭 내부',
      'home.inside.h2':      '오픈짐. 필라테스. 트레이닝.',
      'home.inside.t1.h4':   '오픈짐',
      'home.inside.t1.p':    '전체 근력 및 컨디셔닝 플로어 &mdash; 플레이트, 케이블, 덤벨, 카디오 &mdash; 랙을 기다리지 않고 운동 사이를 이동할 수 있는 여유로운 공간.',
      'home.inside.t2.h4':   '필라테스',
      'home.inside.t2.p':    '매일 리포머 클래스. 인증된 강사가 진행하는 전용 스튜디오. 멤버십 애드온 또는 번들로 제공.',
      'home.inside.t3.h4':   '트레이닝',
      'home.inside.t3.p':    '엄선된 전문가와의 퍼스널 트레이닝과 프라이빗 필라테스. 세션 단위 예약 &mdash; 장기 계약도, 강요도 없음.',
      'home.inside.learn':   '더 알아보기',

      // Home — Membership teaser
      'home.member.eyebrow': '멤버십',
      'home.member.h2':      '세 가지 운동.<br><em>일관된 기준.</em>',
      'home.member.p':       '하나의 오픈짐 멤버십. 원한다면 필라테스 애드온 추가. 퍼스널 트레이닝과 프라이빗 필라테스는 세션 단위로 &mdash; 패키지 없이. 실제로 체육관을 사용하는 사람들을 위해 만들어졌습니다.',

      // Home — Location teaser
      'home.location.eyebrow': '위치',
      'home.location.h2':      '코리아타운 플라자.<br><em>K-타운의 중심.</em>',
      'home.location.p':       '928 S Western Ave, Suite 333 &mdash; 코리아타운 플라자 내부. 코리아타운 중심가에서 도보 거리, 메트로에서 가깝고, 주 7일 오전 7시부터 오후 11시까지 오픈.',
      'home.location.cta':     '방문 세부정보',

      // Home — Signup section
      'home.signup.eyebrow':   '업데이트 받기',
      'home.signup.h2':        '함께 <em>훈련해요.</em>',
      'home.signup.p':         '이름을 남겨주시면 연락드립니다 &mdash; 투어, 세션, 멤버십 가입에 관한 안내와 함께.',
      'home.signup.formLabel': '슬릭 리스트에 등록',
      'home.signup.formBtn':   '리스트 등록',
      'home.signup.formNote':  '<strong>스팸 없음.</strong> 체육관에 관한 실질적인 업데이트만 보내드립니다.',
      'home.signup.success':   '등록되셨습니다.&nbsp;곧 연락드리겠습니다.',

      // Experience hero
      'exp.hero.eyebrow':  '시설',
      'exp.hero.h1':       '세 가지 운동.<br><em>일관된 기준.</em>',
      'exp.hero.lede':     '오픈짐. 리포머 필라테스. 1:1 세션. 슬릭의 모든 공간은 같은 기준으로 설계되었습니다 &mdash; 최고급 장비, 충분한 공간, 그리고 회원을 존중하는 팀.',

      // Experience — Open Gym
      'exp.gym.eyebrow':   '01 &nbsp;·&nbsp; 오픈짐',
      'exp.gym.h2':        '제대로 된 <em>플로어.</em>',
      'exp.gym.p1':        '전체 근력 및 컨디셔닝 플로어 &mdash; 랙, 플레이트, 덤벨, 케이블, 카디오 &mdash; 한 점 한 점 선별되었고, 제대로 사용할 수 있는 공간과 함께 배치되었습니다. 벤치를 찾아 헤맬 일 없습니다. 유일한 스쿼트 랙에 세 명이 줄 설 일 없습니다. 진지한 리프터들이 실제로 훈련하는 무게의 장비.',
      'exp.gym.p2':        '플레이트 로디드와 핀 로디드 장비는 <strong>Panatta</strong>와 <strong>Newtech</strong>. <strong>XMASTER</strong> 덤벨, 웨이트 플레이트, 바벨이 플로어 전체에. 카디오는 <strong>Life Fitness</strong> 플래그십 라인업.',
      'exp.gym.p3':        '주 7일, 오전 7시부터 오후 11시까지 오픈. 아침에는 더 조용하고, 저녁에는 더 깊은 벤치 &mdash; 하지만 훈련 일정을 무너뜨리는 혼잡함은 절대 없습니다.',

      // Experience — Pilates
      'exp.pil.eyebrow':   '02 &nbsp;·&nbsp; 필라테스',
      'exp.pil.h2':        '리포머 클래스, <em>매일.</em>',
      'exp.pil.p1':        '주 7일, 하루 두 번, 메인 플로어와 분리된 전용 리포머 스튜디오에서 클래스가 진행됩니다. 인증된 필라테스 강사 &mdash; PMA, STOTT, BASI 또는 동등 자격 &mdash; 가 제대로 코칭할 수 있는 인원으로 제한됩니다.',
      'exp.pil.p2':        '<strong>Balanced Body</strong>로 전체 구성 &mdash; 리포머, 타워, 체어, 배럴, 그리고 풀 어패러터스 라인업. 스튜디오 필라테스의 골드 스탠다드.',
      'exp.pil.p3':        '필라테스 무제한은 모든 멤버십에 애드온으로 추가하거나, 결합 요금으로 오픈짐과 번들로 이용할 수 있습니다. 클래스는 멤버 앱을 통해 예약합니다.',

      // Experience — Training
      'exp.tr.eyebrow':    '03 &nbsp;·&nbsp; 트레이닝',
      'exp.tr.h2':         '1:1, <em>당신의 방식대로.</em>',
      'exp.tr.p1':         '엄선된 전문가와의 퍼스널 트레이닝 및 프라이빗 필라테스 세션 &mdash; 근력, 가동성, 재활, 체중 감량, 스포츠. 모든 트레이너는 인증을 받았으며 (PT는 NASM, ACE, NSCA 또는 동등 자격; 필라테스는 PMA, STOTT, BASI), 코칭 능력을 검증받았습니다.',
      'exp.tr.p2':         '세션 단위로 예약 &mdash; 패키지 없이. 근력 트레이닝이든 프라이빗 필라테스든, 단일 세션 가격으로 단순하게. 가격은 문의 시 확인 가능.',

      // Experience — The Standard
      'exp.std.eyebrow':   '기준',
      'exp.std.h2':        '일반적인 <em>타협 없이.</em>',
      'exp.std.p1':        '대부분의 체육관은 회원이 느낄 수 있는 부분을 잘라냅니다. 얇은 매트. 제대로 로드되지 않는 플레이트. 실제로 사용하는 회원이 아니라 가장 낮은 공통 회원을 위해 만들어진 플로어. 슬릭은 반대 가정에서 출발합니다 &mdash; 슬릭을 선택하는 회원들은 디테일이 제대로 되어 있기를 원하기 때문에.',
      'exp.std.p2':        '그것은 슬릭이 구매하는 것, 인력을 두는 방식, 거절하는 것에 드러납니다. 더 적은 머신, 더 좋은 머신. 더 적은 클래스, 더 좋은 코치. 더 적은 트레이너, 모두 검증됨. 결과는 보이는 것보다 더 조용한 체육관입니다 &mdash; 모든 것이 있어야 할 곳에 있고, 어떤 것도 과도하게 예약되지 않기 때문에.',

      // Experience — CTA
      'exp.cta.eyebrow':   '다음',
      'exp.cta.h2':        '<em>멤버십이 어떤지</em> 보세요.',

      // Membership hero
      'mem.hero.eyebrow':  '멤버십',
      'mem.hero.h1':       '멤버십.<br><em>당신의 방식에 맞춰.</em>',
      'mem.hero.lede':     '하나의 오픈짐 멤버십. 원한다면 필라테스 추가. 트레이닝은 세션 단위로, 패키지 없이. <strong>투어를 위해 들러주시거나, 리스트에 등록하시면 가입 안내를 연락드립니다.</strong>',

      // Membership — Inquiry card
      'mem.found.badge':   '시작하기',
      'mem.found.h3':      '함께 <em>들어와요.</em>',
      'mem.found.p':       '이름을 남겨주시면 연락드립니다 &mdash; 투어, 세션, 멤버십 가입에 관한 안내와 함께. 운영 시간 내에 직접 방문도 가능합니다.',

      // Membership — Ways to Train
      'mem.ways.eyebrow':  '운동 방식',
      'mem.ways.h2':       '실제로 운동하는 <em>방식대로.</em>',
      'mem.ways.lead':     '실제로 운동하는 방식에 맞춰 멤버십을 구성하세요. 아래 모든 옵션은 지금 이용 가능합니다.',
      'mem.row1.name':     '오픈짐 멤버십',
      'mem.row1.desc':     '근력 플로어, 카디오, 시설 전체 이용. 주 7일, 오전 7시부터 오후 11시까지.',
      'mem.row2.name':     '필라테스 애드온',
      'mem.row2.desc':     '오픈짐 멤버십에 무제한 리포머 클래스 추가.',
      'mem.row3.name':     '오픈짐 + 필라테스 번들',
      'mem.row3.desc':     '오픈짐과 무제한 필라테스를 결합 요금으로 함께.',
      'mem.row4.name':     '퍼스널 트레이닝',
      'mem.row4.desc':     '인증된 트레이너와의 1:1 세션. 패키지 없음 &mdash; 세션 단위로 예약.',
      'mem.row5.name':     '프라이빗 필라테스',
      'mem.row5.desc':     '인증된 필라테스 강사와의 1:1 리포머 세션.',

      // Membership — What's Included
      'mem.inc.eyebrow':   '포함 사항',
      'mem.inc.h2':        '필요한 모든 것. <em>그 이상은 없음.</em>',
      'mem.inc.p':         '모든 오픈짐 멤버십에는 운영 시간 내 무제한 이용, 샤워실과 탈의실, 타월 서비스, 근력 및 카디오 플로어 전체 이용이 포함됩니다. 라커 사용료 없음. 깜짝 청구서에 숨겨진 게스트 사용료 없음. 클래스와 1:1 세션은 별도 요금이므로, 사용한 만큼만 지불합니다.',

      // Membership — FAQ
      'mem.faq.eyebrow':   'FAQ',

      // Membership — CTA
      'mem.cta.eyebrow':   '시작하기',
      'mem.cta.h2':        '함께 <em>훈련해요.</em>',
      'mem.cta.p':         '이름을 남겨주시면 투어, 세션, 가입에 관한 안내를 연락드립니다. 운영 시간 내에 직접 방문도 가능합니다.',

      // Visit hero
      'visit.hero.eyebrow': '오시는 길',
      'visit.hero.h1':      '코리아타운 플라자.<br><em>K-타운의 중심.</em>',
      'visit.hero.lede':    '928 S Western Ave, Suite 333 &mdash; 코리아타운 플라자 내부. 코리아타운 중심가에서 도보 거리, 메트로에서 가깝고, 주 7일 오전 7시부터 오후 11시까지 오픈.',

      // Visit — Location meta
      'visit.row1.label':   '주소',
      'visit.row2.label':   '운영시간',
      'visit.row2.value':   '월요일 &ndash; 일요일<br>오전 7:00 &ndash; 오후 11:00',
      'visit.row3.label':   '교통',
      'visit.row3.value':   '윌셔/웨스턴 메트로역에서 도보 거리.<br>코리아타운 플라자 내 무료 검증 주차, 충분한 공간.',
      'visit.row4.label':   '상태',
      'visit.row4.value':   '지금 오픈',

      // Visit — Contact
      'visit.contact.eyebrow': '연락처',
      'visit.contact.h2':      '연락하세요.',
      'visit.contact.p':       '멤버십 문의, 언론, 파트너십, 그 외 무엇이든 &mdash; 연락 기다립니다.',

      // Visit — Getting Here FAQ
      'visit.faq.eyebrow':  '오시는 방법',

      // Visit — CTA
      'visit.cta.eyebrow':  '업데이트 받기',
      'visit.cta.h2':       '함께 <em>훈련해요.</em>',

      // About hero
      'about.hero.eyebrow':  '소개',
      'about.hero.h1':       '더 높은 기준을,<br><em>코리아타운에 세우다.</em>',
      'about.hero.lede':     '슬릭은 코리아타운이 마땅히 누려야 할 피트니스 공간입니다. 진지하게 운동하는 사람들을 위한 공간. 코리아타운 플라자에서 지금 오픈.',

      // About — Story
      'about.story.eyebrow': '스토리',
      'about.story.h2':      '슬릭이 <em>존재하는 이유.</em>',
      'about.story.p':       '코리아타운이 마땅히 누려야 할 체육관이 없었습니다. 그 어떤 가격에도. 이 동네의 모든 곳에서 &mdash; 레스토랑, 뷰티, 리테일, 호스피탈리티 &mdash; 코리아타운은 안목이 있고 질을 요구합니다. 피트니스만이 여전히 타협하고 있던 마지막 카테고리였습니다. 슬릭이 그 간극을 채웁니다.',

      // About — Philosophy
      'about.phi.eyebrow': '철학',
      'about.phi.h2':      '하나의 기준, <em>모든 곳에서.</em>',
      'about.phi.p1':      '테스트는 간단합니다. 훈련할 가치가 없는 장비는 들어오지 않습니다. 들을 가치가 없는 클래스는 편성되지 않습니다. 예약할 가치가 없는 트레이너는 플로어에 서지 않습니다.',
      'about.phi.p2':      '이것이 전체 운영 원칙입니다. 멤버가 느끼는 타협은 없습니다. 경험을 희생하여 마진을 위한 결정은 없습니다.',

      // About — Space
      'about.space.eyebrow': '공간',
      'about.space.h2':      '코리아타운, <em>의도적으로.</em>',
      'about.space.p1':      '슬릭은 코리아타운 플라자 내부, 928 S Western Ave에 위치합니다 &mdash; K-타운에서 가장 보행하기 좋고 대중교통이 발달한 주소 중 하나. 위치는 타협이 아니라 핵심 전제입니다. 프리미엄은 회원이 이미 있는 곳에 있어야 합니다.',
      'about.space.p2':      '16,000 제곱피트. 전용 필라테스 스튜디오 하나. 장비 경쟁 없이 진지한 훈련을 수용하도록 설계된 근력 플로어. 숨 쉴 공간 &mdash; 대부분의 LA 체육관이 신경 쓰지 않는 것.',
      'about.space.p3':      '장비도 같은 기준으로 선택되었습니다: 플레이트 로디드와 핀 로디드는 <strong>Panatta</strong>와 <strong>Newtech</strong>. 덤벨, 웨이트 플레이트, 바벨은 <strong>XMASTER</strong>. 카디오는 <strong>Life Fitness</strong>. 필라테스 스튜디오 전체는 <strong>Balanced Body</strong>.',

      // About — Team
      'about.team.eyebrow': '팀',
      'about.team.h2':      '같은 기준으로 <em>엄선된 사람들.</em>',
      'about.team.p1':      '슬릭의 모든 트레이너와 강사는 엄선되었습니다 &mdash; 인증을 받고, 실제 티칭 방식을 검증받고, 회원이 다시 찾는 코칭을 위해 선택됩니다.',
      'about.team.p2':      '트레이닝, 클래스, 멤버십에 관해 문의하세요. <a href="index.html#signup" style="color: var(--white); border-bottom: 1px solid var(--hair-strong);">연락주시면</a> 안내해드립니다.',

      // About — CTA
      'about.cta.eyebrow': '업데이트 받기',
      'about.cta.h2':      '함께 <em>훈련해요.</em>',
      'about.cta.p':       '운영 시간 내에 들러주시거나, 이름을 남겨주시면 투어, 세션, 멤버십에 관한 안내를 연락드립니다.',

      // Common CTAs (reused)
      'cta.join':         '리스트에 등록',
      'cta.membership':   '멤버십',
      'cta.inquire':      '문의하기',
      'cta.plan':         '방문 계획',
      'cta.see':          '공간 둘러보기',

      // Cookie banner
      'cookie.text':      '슬릭은 방문자 분석을 위해 쿠키를 사용합니다. 자세한 내용은 <a href="legal/privacy.html">개인정보 처리방침</a>을 확인하세요.',
      'cookie.accept':    '동의',
      'cookie.decline':   '거부',

      // Footer
      'footer.col.explore':  '둘러보기',
      'footer.col.connect':  '연결',
      'footer.desc':         '프리미엄 피트니스.<br>로스앤젤레스 코리아타운.<br>지금 오픈.'
    }
  };

  function readLang() {
    try {
      const v = localStorage.getItem(LANG_KEY);
      return SUPPORTED.indexOf(v) >= 0 ? v : DEFAULT_LANG;
    } catch (e) { return DEFAULT_LANG; }
  }
  function writeLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function cacheOriginals(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!el.hasAttribute('data-i18n-en')) {
        el.setAttribute('data-i18n-en', el.innerHTML);
      }
    });
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (lang === 'en') {
        const en = el.getAttribute('data-i18n-en');
        if (en != null) el.innerHTML = en;
      } else {
        const dict = translations[lang] || {};
        const txt = dict[key];
        if (txt != null) el.innerHTML = txt;
      }
    });

    document.querySelectorAll('.lang-toggle a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-lang') === lang);
      a.setAttribute('aria-current', a.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = DEFAULT_LANG;
    writeLang(lang);
    apply(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    cacheOriginals();
    apply(readLang());

    document.querySelectorAll('.lang-toggle a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(a.getAttribute('data-lang'));
      });
    });
  });

  // expose for console / future use
  window.SleekI18n = { setLang: setLang, getLang: readLang };
})();
