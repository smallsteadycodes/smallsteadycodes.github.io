'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Noto_Sans_KR } from 'next/font/google';

const noto = Noto_Sans_KR({ subsets: ['latin'], weight: ['400','500','700'] });

// Anchors for sections
const SECTIONS = [
  { id: 'about', labelKo: '경력 요약', labelEn: 'Summary' },
  { id: 'stack', labelKo: '기술 스택', labelEn: 'Tech Stack' },
  { id: 'exp', labelKo: '경력', labelEn: 'Experience' },
  { id: 'projects', labelKo: '프로젝트', labelEn: 'Projects' },
  { id: 'edu', labelKo: '학력 및 자격', labelEn: 'Education & Certifications' },
];

export default function Page() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [active, setActive] = useState<string>('about');

  useEffect(() => {
    const handler = () => {
      const offsets = SECTIONS.map(s => ({ id: s.id, el: document.getElementById(s.id) })).filter(x => x.el);
      const y = window.scrollY + 100; // offset for sticky nav
      let current = 'about';
      for (const o of offsets as { id: string; el: HTMLElement }[]) {
        if (o.el.offsetTop <= y) current = o.id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const ContactItem = ({ label, value, href }: { label: string; value: string; href?: string }) => (
    <div className="text-[13px] text-gray-700">
      <span className="font-medium text-gray-800">{label}</span>
      {': '}
      {href ? (
        <a className="underline decoration-gray-300 underline-offset-2 hover:decoration-gray-700" href={href} target="_blank">
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="mb-10 break-inside-avoid scroll-mt-24">
      <h2 className="mb-3 border-b border-gray-200 pb-1 text-[15px] font-semibold text-gray-900 print:border-gray-300">
        {title}
      </h2>
      <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/60 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </section>
  );

  const Nav = () => (
    <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-[980px] items-center justify-between gap-3 px-4 py-2">
        <a href="#about" className="text-sm font-semibold tracking-tight text-gray-900">SmallSteadyCodes</a>
        <ul className="hidden gap-4 sm:flex">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`text-sm hover:text-gray-900 ${active === s.id ? 'text-gray-900 font-medium' : 'text-gray-600'}`}
              >
                {lang === 'ko' ? s.labelKo : s.labelEn}
                {active === s.id && <span className="ml-2 inline-block h-[2px] w-4 bg-gray-900 align-middle" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle language"
            onClick={() => setLang(l => (l === 'ko' ? 'en' : 'ko'))}
            className="rounded-lg border px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            {lang === 'ko' ? 'EN' : 'KO'}
          </button>
          <a href="#" onClick={(e)=>{e.preventDefault();window.print();}} className="hidden rounded-lg border px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 sm:inline-block">Print / PDF</a>
        </div>
      </div>
    </nav>
  );

  // === Korean content (MUST remain EXACT) ===
  const KoreanContent = (
    <>
      {/* 헤더 */}
      <header className="mb-8 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold text-gray-900">프리랜서 개발자 이은진</h1><br></br>
          <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-1">
            <ContactItem label="Email" value="smallsteadycodes@gmail.com" href="mailto:smallsteadycodes@gmail.com" />
            {/* <ContactItem label="Phone" value="010-9209-8125" href="tel:010-9209-8125" />
            <ContactItem label="GitHub" value="github.com/heygomak" href="https://github.com/heygomak" /> */}
            <ContactItem label="Blog" value="dog-foot-story.tistory.com" href="https://dog-foot-story.tistory.com" />
          </div>
        </div>
        <div className="shrink-0">
          <Image
            src="/profile.jpg" // 업로드한 사진 파일 경로
            alt="이은진 프로필"
            width={104}
            height={104}
            className="h-26 w-26 rounded-full border border-gray-200 object-cover shadow-sm"
          />
        </div>
      </header>

      {/* 소개문 */}
      <Section id="about" title="경력 요약">
        <div>
          <p>안녕하세요. 프리랜서 개발자 이은진입니다.</p>
          <p>저는 5년 이상의 Java &amp; Python 기반 ERP·공공 시스템 개발 경험을 바탕으로,</p>
          <p>고객이 필요로 하는 서비스의 복잡한 비즈니스 로직을 빠르고 안정적으로 구현하는 것을 추구합니다.</p>
          <br></br>
          <p>실제로 트랜잭션 분할 및 SQL 튜닝을 통해 ERP 주문·출하 처리 성능을 80% 이상 단축하고,</p>
          <p>공공기관 예산시스템의 웹 전환과 자동화 프로세스 구축으로 업무 효율을 크게 향상시킨 경험이 있습니다.</p>
          <br></br>
          <p>다양한 도메인 경험을 바탕으로 현업 사용자가 <b>‘진짜 필요로 하는 기능’</b>을 설계하고 구현합니다.</p>
          <p>프로젝트를 진행할 때는 명확한 커뮤니케이션과 책임 있는 일정 관리로 함께 일하는 파트너에게 신뢰받는 개발자가 되기 위해 노력합니다.</p>
        </div>
      </Section>

      {/* 기술 스택 */}
      <Section id="stack" title="기술 스택">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <h3 className="mb-1 text-[13px] font-semibold text-gray-900">Backend &amp; Frameworks</h3>
            <p>Java, Python, Spring Boot, Spring Batch, Django</p>
          </div>
          <div>
            <h3 className="mb-1 text-[13px] font-semibold text-gray-900">Database &amp; Infra</h3>
            <p>Oracle, MySQL, MariaDB, AWS, Docker, Linux, Jenkins, NGINX</p>
          </div>
          <div>
            <h3 className="mb-1 text-[13px] font-semibold text-gray-900">Auth &amp; Tools</h3>
            <p>JWT, OAuth2, Git, IntelliJ IDEA, PyCharm, WebSquare, Postman, Kibana</p>
          </div>
        </div>
      </Section>

      {/* 경력 */}
      <Section id="exp" title="경력">
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">더존비즈온 | SCM 개발 Unit | 주임연구원</h3>
              <span className="text-[13px] text-gray-500">2021.11 – 2025.07 (3년 9개월)</span>
            </div>
            <p className="text-[13px] text-gray-600">기업용 솔루션 전문기업 · 풀스택 개발 및 운영</p>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">CODAA | 기업부설연구소 | 연구원</h3>
              <span className="text-[13px] text-gray-500">2021.03 – 2021.10 (8개월)</span>
            </div>
            <p className="text-[13px] text-gray-600">녹색건축 컨설팅 전문기업 · 설계 및 풀스택 개발</p>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">아이티아이즈 | 공금융사업부 | 주임</h3>
              <span className="text-[13px] text-gray-500">2019.12 – 2021.01 (1년 2개월)</span>
            </div>
            <p className="text-[13px] text-gray-600">금융 솔루션 전문기업 · 프론트엔드 개발</p>
          </div>
        </div>
      </Section>

      {/* 프로젝트 */}
      <Section id="projects" title="프로젝트">
        <div className="space-y-6">
          {/* 더존 ERP SCM */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">더존비즈온 ERP SCM 시스템</h3>
              <span className="text-[13px] text-gray-500">2021.11 – 2025.07</span>
            </div>
            <p className="text-[13px] text-gray-600"> Java · SpringBoot · Oracle · MariaDB · GitLab · JavaScript · Confluence · Jenkins · Kibana</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>고객사별 물류 프로세스 커스터마이징: <b>OMS/WMS/MES 연동</b> 포함 복잡한 비즈니스 로직 처리</li>
              <li>다양한 주문 채널 통합: I/F 송수신, Batch Job, 그룹웨어, 엑셀 업로드</li>
              <li>
                대용량 주문·재고·수불 처리: 트랜잭션 분할 · 인덱스 · SQL 튜닝 · 페이징 적용 (조회 기준 30분 → 2분 30초)
              </li>
              <li>서비스 안정화: 예외처리 로직 개선, 에러메시지 공통화, 로그 모니터링 (월 평균 장애 4.75건 → 1.6건)</li>
              <li>AI 기반 자동 주문 추천·시각화·알림 서비스 구현, 다국어 적용, 개인정보 암복호화</li>
            </ul>
          </div>

          {/* B2B 이커머스 연동 */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">B2B 이커머스 플랫폼 (MRO마켓)</h3>
              <span className="text-[13px] text-gray-500">2022.11 – 2023.01</span>
            </div>
            <p className="text-[13px] text-gray-600">JWT · Spring Batch</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>ERP ↔ 이커머스 플랫폼 간 상품 동기화 및 주문·배송·결제 정보 연동 신규 구축</li>
              <li>JWT 인증 및 HTTP 통신 이슈 해결로 연동 안정성 확보</li>
            </ul>
          </div>

          {/* 녹색건축 Codetect */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">중소벤처기업부 창업성장기술개발사업 (녹색건축플랫폼)</h3>
              <span className="text-[13px] text-gray-500">2021.03 – 2021.10</span>
            </div>
            <p className="text-[13px] text-gray-600">Python · Django · MySQL · NGINX · AWS · Linux · OAuth2</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>건축법 뷰어: 국가법령정보 공동활용 Open API 기반의 실사용 서비스 구현</li>
              <li>에너지 평가 모듈: 클라우드 인프라 구축 및 소셜 로그인 구현</li>
            </ul>
          </div>

          {/* dBrain+ */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">기획재정부 차세대 디지털예산회계시스템 (dBrain+)</h3>
              <span className="text-[13px] text-gray-500">2020.01 – 2021.01</span>
            </div>
            <p className="text-[13px] text-gray-600">Java · eGovFramework · Oracle · WebSquare</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>연간 500조 원 규모 예산 운용 시스템의 예산편성 파트 담당 개발</li>
              <li>AS-IS 분석을 통한 TO-BE 설계 산출물 작성 및 기능 구현</li>
              <li>Clip Report 기반 단년도/중기/추경 예산 리포트 자동 생성 프로세스 구축</li>
              <li>예산요구서 작성 및 심의 프로세스 전산화, 웹한글기안기 연동 최초 적용</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 학력/자격 */}
      <Section id="edu" title="학력 및 자격">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-900">동덕여자대학교 · 정보통계학과</h3>
            <p className="text-[13px] text-gray-600">2013 – 2020 (졸업)</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">자격증</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-gray-700">
              <li>정보처리기사 — 한국산업인력공단 (2019.08)</li>
              <li>데이터분석 준전문가(ADsP) — 한국데이터산업진흥원 (2019.07)</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );

  // === English view (placeholder uses same content until EN copy is provided) ===
  const EnglishContent = (
    <>
      {/* Header */}
      <header className="mb-8 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold text-gray-900">Freelance Developer Eunjin Lee</h1>
          <div className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-1">
            <ContactItem label="Email" value="smallsteadycodes@gmail.com" href="mailto:smallsteadycodes@gmail.com" />
            <ContactItem label="Blog" value="dog-foot-story.tistory.com" href="https://dog-foot-story.tistory.com" />
          </div>
        </div>
        <div className="shrink-0">
          <Image
            src="/profile.jpg"
            alt="Eunjin Lee profile"
            width={104}
            height={104}
            className="h-26 w-26 rounded-full border border-gray-200 object-cover shadow-sm"
          />
        </div>
      </header>

      {/* Summary */}
      <Section id="about" title="Summary">
        <div>
          <p>Hello, I’m Eunjin Lee, a freelance developer.</p>
          <p>With over 5 years of experience in Java &amp; Python–based ERP and public-sector systems,</p>
          <p>I focus on implementing complex business logic quickly and reliably to meet customer needs.</p>
          <br />
          <p>In practice, I reduced ERP order and shipment processing time by over 80% through transaction partitioning and SQL tuning,</p>
          <p>and significantly improved operational efficiency by migrating a public-sector budgeting system to the web and building automation processes.</p>
          <br />
          <p>Leveraging broad domain experience, I design and ship <b>what on‑site users truly need</b>.</p>
          <p>During projects, I prioritize clear communication and accountable schedule management to be a developer trusted by every partner I work with.</p>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section id="stack" title="Tech Stack">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <h3 className="mb-1 text-[13px] font-semibold text-gray-900">Backend &amp; Frameworks</h3>
            <p>Java, Python, Spring Boot, Spring Batch, Django</p>
          </div>
          <div>
            <h3 className="mb-1 text-[13px] font-semibold text-gray-900">Database &amp; Infra</h3>
            <p>Oracle, MySQL, MariaDB, AWS, Docker, Linux, Jenkins, NGINX</p>
          </div>
          <div>
            <h3 className="mb-1 text-[13px] font-semibold text-gray-900">Auth &amp; Tools</h3>
            <p>JWT, OAuth2, Git, IntelliJ IDEA, PyCharm, WebSquare, Postman, Kibana</p>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="exp" title="Experience">
        <div className="space-y-4">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">Douzone Bizon | SCM Development Unit | Full Stack developer</h3>
              <span className="text-[13px] text-gray-500">Nov 2021 – Jul 2025 (3 yrs 9 mos)</span>
            </div>
            <p className="text-[13px] text-gray-600">Enterprise solution provider · Full stack development &amp; operations</p>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">CODAA | Corporate R&amp;D Center | Full Stack developer</h3>
              <span className="text-[13px] text-gray-500">Mar 2021 – Oct 2021 (8 mos)</span>
            </div>
            <p className="text-[13px] text-gray-600">Green‑building consulting company · Solution design &amp; full‑stack development</p>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">ITEyes | Public Finance Division | Fronend developer</h3>
              <span className="text-[13px] text-gray-500">Dec 2019 – Jan 2021 (1 yr 2 mos)</span>
            </div>
            <p className="text-[13px] text-gray-600">Financial solutions company · Front‑end development</p>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="space-y-6">
          {/* Douzone ERP SCM */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">Douzone Bizon ERP SCM System</h3>
              <span className="text-[13px] text-gray-500">Nov 2021 – Jul 2025</span>
            </div>
            <p className="text-[13px] text-gray-600">Java · Spring Boot · Oracle · MariaDB · GitLab · JavaScript · Confluence · Jenkins · Kibana</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Customer‑specific logistics process customization: complex business logic including <b>OMS/WMS/MES integrations</b></li>
              <li>Unified multiple order channels: I/F messaging, batch jobs, groupware, Excel upload</li>
              <li>High‑volume order/inventory/ledger processing: applied transaction partitioning, indexing, SQL tuning, and paging (key query 30 min → 2 min 30 sec)</li>
              <li>Service stabilization: improved exception handling, standardized error messages, log monitoring (monthly incidents 4.75 → 1.6)</li>
              <li>AI‑based automatic order recommendations · visualization · alerts, multi‑language, personal data encryption/decryption</li>
            </ul>
          </div>

          {/* B2B E‑commerce integration */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">B2B E‑commerce Platform (MRO Market)</h3>
              <span className="text-[13px] text-gray-500">Nov 2022 – Jan 2023</span>
            </div>
            <p className="text-[13px] text-gray-600">JWT · Spring Batch</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Built new integrations for product sync and order/shipping/payment data between ERP and the platform</li>
              <li>Resolved JWT authentication and HTTP communication issues to secure integration stability</li>
            </ul>
          </div>

          {/* Green building Codetect */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">Startup Growth R&amp;D (Green Building Platform)</h3>
              <span className="text-[13px] text-gray-500">Mar 2021 – Oct 2021</span>
            </div>
            <p className="text-[13px] text-gray-600">Python · Django · MySQL · NGINX · AWS · Linux · OAuth2</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Building Act viewer: production service based on the National Law Information Open API</li>
              <li>Energy assessment module: cloud infrastructure and social login implemented</li>
            </ul>
          </div>

          {/* dBrain+ */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-gray-900">Ministry of Economy &amp; Finance — Next‑Gen Digital Budget &amp; Accounting (dBrain+)</h3>
              <span className="text-[13px] text-gray-500">Jan 2020 – Jan 2021</span>
            </div>
            <p className="text-[13px] text-gray-600">Java · eGovFramework · Oracle · WebSquare</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Developed the budgeting module for a system handling ~KRW 500T annual expenditures</li>
              <li>Produced TO‑BE designs based on AS‑IS analysis and implemented features</li>
              <li>Built automated reporting for annual/mid‑term/supplementary budgets with Clip Report</li>
              <li>Digitized budget request &amp; review workflows, first adoption of Web‑HWP editor integration</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Education & Certifications */}
      <Section id="edu" title="Education & Certifications">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-900">Dongduk Women’s University · Information & Statistics</h3>
            <p className="text-[13px] text-gray-600">2013 – 2020 (Graduated)</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Certificates</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-gray-700">
              <li>Engineer Information Processing — HRDKorea (2019.08)</li>
              <li>ADsP, Advanced Data Analytics Semi‑Professional — Kdata (2019.07)</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );

  useEffect(() => {
    const h1 = document.querySelector('h1');
    if (h1) {
      document.title = h1.textContent || 'Portfolio';
    }
  }, [lang]);

  return (
    <div className={`${noto.className} min-h-screen bg-[conic-gradient(at_120%_-20%,#fff, #fafafa)] text-[14px] leading-7 text-gray-800`}>      
      <Nav />
      <main className="mx-auto max-w-[880px] px-4 py-8 print:px-0">
        {lang === 'ko' ? KoreanContent : EnglishContent}
      </main>

      {/* 인쇄 최적화 */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @media print {
          @page { margin: 16mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          nav { display: none !important; }
          main { box-shadow: none !important; padding: 0 !important; }
          h1 { font-size: 18pt !important; }
          h2 { font-size: 12pt !important; }
          p, li, td { font-size: 10.5pt !important; }
          
          /* 섹션 자체 마진/패딩 제거 (Tailwind mb-8/mb-10 무력화) */
          section,
          section.mb-8,
          section.mb-10 {
            margin: 0 !important;
            padding: 5 !important;
            break-before: avoid !important;
            page-break-before: avoid !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* 섹션 연속 배치 시 상단 여백 제거 */
          section + section {
            margin-top: 0 !important;
          }

          /* 섹션 제목: 아래 간격만 최소화, 페이지 경계에서 분리 금지 */
          section > h2 {
            margin: 0 0 6pt !important;
            padding: 0 0 3pt !important;
            border-bottom: 0.5pt solid #bbb !important;
            break-after: avoid !important;
            page-break-after: avoid !important;
          }

          /* 섹션 카드(네가 넣은 rounded-xl 래퍼)의 여백·보더·배경 정리 */
          section > .rounded-xl {
            margin: 0 !important;
            padding: 8pt 10pt !important; /* 인쇄에 적절한 타이트 패딩 */
            border: 0 !important;         /* 보더로 인한 '여백처럼 보이는' 구분선 제거 */
            box-shadow: none !important;   /* 그림자 제거(여백 착시 방지) */
            background: #fff !important;   /* 그라데이션 제거(프린트 잔여띠 방지) */
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* Tailwind의 space-y-* 유틸이 만드는 간격을 인쇄용으로 축소 */
          .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 8pt !important; }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 6pt !important; }

          /* 일반 블록 요소의 내부 분리 규칙(문단 쪼개짐 방지) */
          p, ul, ol, li, h1, h2, h3, .break-inside-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* 기본 p 여백 타이트하게 */
          p { 
            margin: 0 0 6pt !important; 
            widows: 3; 
            orphans: 3;
          }
          p + p { margin-top: 6pt !important; }

          /* 예외: '경력 요약' 섹션(about) 내부는 원래 여백 유지 */
          #about p {
            margin: 0 0 8pt !important; /* or 12pt 정도 — 원래 화면 간격과 비슷하게 */
            line-height: 1.6 !important;
          }
          #about p + p {
            margin-top: 8pt !important;
          }
        }
      `}</style>
    </div>
  );
}
