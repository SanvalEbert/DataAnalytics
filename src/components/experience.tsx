"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ALargeSmall,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BrainCircuit,
  Contrast,
  Database,
  Expand,
  GraduationCap,
  Menu,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  applications,
  careers,
  cases,
  chapters,
  ecosystem,
  learningPlatforms,
  maturity,
  pipeline,
  university,
} from "@/data/content";

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function Experience() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("inicio");
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(5);

  const sectionIds = useMemo(() => chapters.map((item) => item.id), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!presenting) return;
      const current = sectionIds.findIndex((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -120 && rect.top < window.innerHeight * 0.45;
      });

      if (event.key === "Escape") setPresenting(false);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        const next = sectionIds[Math.min(sectionIds.length - 1, Math.max(0, current + 1))];
        document.getElementById(next)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        const prev = sectionIds[Math.max(0, current - 1)];
        document.getElementById(prev)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presenting, reducedMotion, sectionIds]);

  useEffect(() => {
    const updateScrollState = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.36) current = id;
      }
      setActiveSection(current);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [sectionIds]);

  const goToSection = (direction: 1 | -1) => {
    const currentIndex = Math.max(0, sectionIds.indexOf(activeSection));
    const targetIndex = Math.min(sectionIds.length - 1, Math.max(0, currentIndex + direction));
    document.getElementById(sectionIds[targetIndex])?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const sharePage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Data Science & Analytics",
          text: "Dos dados à transformação",
          url: window.location.href,
        });
        setShareStatus("Compartilhado");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copiado");
      }
    } catch {
      setShareStatus("");
      return;
    }
    window.setTimeout(() => setShareStatus(""), 1800);
  };

  const activeChapterIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeSection));
  const activeChapter = chapters[activeChapterIndex] ?? chapters[0];
  const career = careers[selectedCareer];

  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.34, ease: "easeOut" as const },
      };

  return (
    <main
      className={[
        presenting ? "presentation-mode" : "",
        largeText ? "large-text" : "",
        highContrast ? "high-contrast" : "",
      ].filter(Boolean).join(" ")}
    >
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir ao início">
          <span className="brand-mark">DA</span>
          <span>Data Science & Analytics</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {chapters.slice(1).map((chapter) => (
            <a
              href={`#${chapter.id}`}
              key={chapter.id}
              className={activeSection === chapter.id ? "active" : ""}
              aria-current={activeSection === chapter.id ? "true" : undefined}
            >
              {chapter.label}
            </a>
          ))}
        </nav>

        <div className="top-actions">
          <button className="present-button" onClick={() => setPresenting((value) => !value)}>
            <Expand size={16} />
            {presenting ? "Sair" : "Apresentar"}
          </button>
          <button
            className="icon-button mobile-only"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {chapters.map((chapter) => (
              <a href={`#${chapter.id}`} key={chapter.id} onClick={() => setMenuOpen(false)}>
                {chapter.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <section id="inicio" className="hero section-shell">
        <motion.div className="hero-copy" {...reveal}>
          <div className="institution-kicker">
            <span>{university.name}</span>
            <span className="dot" />
            <span>Pós-graduação</span>
          </div>

          <div className="eyebrow-pill">
            <Sparkles size={15} />
            Aula inaugural
          </div>

          <h1>
            Dos dados à <span>transformação.</span>
          </h1>

          <p>
            Dados ganham valor quando se transformam em conhecimento, decisões,
            produtos e inteligência.
          </p>

          <a className="primary-cta" href="#pipeline">
            Iniciar jornada <ArrowDown size={17} />
          </a>

          <div className="hero-question">
            <span>Comece por uma pergunta</span>
            <strong>Que problema você gostaria de resolver usando dados?</strong>
          </div>
        </motion.div>

        <motion.div className="hero-system" {...reveal}>
          <div className="hero-node hero-node-main">
            <Database size={20} />
            <span>DADOS</span>
            <strong>Evidências do mundo real</strong>
          </div>

          <div className="hero-connector" aria-hidden="true"><span /></div>

          <div className="hero-node-row">
            <div className="hero-node">
              <span>ANALYTICS</span>
              <strong>Compreender padrões</strong>
            </div>
            <div className="hero-node">
              <span>DATA SCIENCE</span>
              <strong>Modelar possibilidades</strong>
            </div>
          </div>

          <div className="hero-connector" aria-hidden="true"><span /></div>

          <div className="hero-node hero-node-accent">
            <BrainCircuit size={20} />
            <span>INTELIGÊNCIA ARTIFICIAL</span>
            <strong>Ampliar capacidade de decisão</strong>
          </div>

          <div className="hero-connector" aria-hidden="true"><span /></div>

          <div className="hero-node">
            <span>IMPACTO</span>
            <strong>Transformar produtos, processos e experiências</strong>
          </div>
        </motion.div>
      </section>

      <section id="pipeline" className="section-band band-lilac">
        <div className="section-shell">
          <SectionTitle
            eyebrow="01 · O coração da jornada"
            title="Problema → dados → inteligência → ação → impacto"
            text="O valor não nasce da ferramenta. Nasce da capacidade de transformar uma pergunta relevante em uma solução que funciona."
          />

          <div className="pipeline-flow">
            {pipeline.map((item, index) => (
              <motion.article className="pipeline-step" key={item.title} {...reveal}>
                <div className="pipeline-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="pipeline-dot" aria-hidden="true" />
                {index < pipeline.length - 1 ? <div className="pipeline-line" aria-hidden="true" /> : null}
                <small>{item.kicker}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="quiet-callout">
            <span>Tecnologia é o meio.</span>
            <strong>Transformação é o objetivo.</strong>
          </div>
        </div>
      </section>

      <section id="maturidade" className="section-shell">
        <SectionTitle
          eyebrow="02 · Uma mesma pergunta, diferentes capacidades"
          title="Como uma organização amadurece com dados"
          text="A pergunta evolui da descrição do passado para sistemas capazes de recomendar e agir."
        />

        <div className="maturity-grid">
          {maturity.map((item, index) => (
            <motion.article className="maturity-card" key={item.label} {...reveal}>
              <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
              <h3>{item.label}</h3>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ecossistema" className="section-band band-gradient">
        <div className="section-shell">
          <SectionTitle
            eyebrow="03 · Ecossistema técnico"
            title="Ferramentas mudam. Fundamentos permanecem."
            text="Compreenda o fluxo completo e aprofunde-se nas partes que mais se conectam à sua trajetória."
          />

          <div className="ecosystem-grid">
            {ecosystem.map(({ title, items, icon: Icon }) => (
              <motion.article className="tech-card" key={title} {...reveal}>
                <div className="icon-wrap"><Icon size={21} /></div>
                <h3>{title}</h3>
                <div className="chips">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="statement">
            <small>Uma ideia essencial</small>
            <h3>Um modelo que funciona no notebook ainda não é uma solução.</h3>
            <p>
              Software Engineering + Data Engineering + AI Engineering transformam
              experimentos em produtos confiáveis.
            </p>
          </div>
        </div>
      </section>

      <section id="aplicacoes" className="section-shell">
        <SectionTitle
          eyebrow="04 · Onde isso ganha vida"
          title="Dados e IA atravessam setores, produtos e decisões"
          text="A mesma base técnica pode se desdobrar em problemas completamente diferentes."
        />

        <div className="applications-grid">
          {applications.map(({ title, text, icon: Icon }) => (
            <motion.article className="application-card" key={title} {...reveal}>
              <div className="application-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="casos" className="section-band band-lilac">
        <div className="section-shell">
          <SectionTitle
            eyebrow="05 · Quem já faz isso em escala"
            title="Big techs transformam dados em produtos, decisões e experiências"
            text="Quatro exemplos conectam o pipeline da aula a aplicações reais em escala."
          />

          <div className="cases-grid">
            {cases.map((item) => (
              <motion.a
                className="case-card"
                key={item.provider}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                {...reveal}
              >
                <div className="case-brand-row">
                  <span className="provider">{item.provider}</span>
                  <ArrowRight size={17} />
                </div>
                <div className="case-metric">{item.metric}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="case-flow">
                  {item.tags.map((tag, index) => (
                    <span key={tag}>
                      {tag}
                      {index < item.tags.length - 1 ? <ArrowRight size={12} /> : null}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="aprendizagem" className="section-shell">
        <SectionTitle
          eyebrow="06 · Continue sua jornada"
          title="Conecte a pós-graduação aos ecossistemas oficiais de aprendizagem"
          text="Aprenda, pratique, certifique, construa e transforme esse conhecimento em evidências profissionais."
        />

        <div className="learning-grid">
          {learningPlatforms.map((item) => (
            <motion.article className="learning-card" key={item.provider} {...reveal}>
              <div className="learning-head">
                <span className="provider">{item.provider}</span>
                <GraduationCap size={20} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="learning-actions">
                <a href={item.url} target="_blank" rel="noreferrer">
                  Explorar trilha <ArrowRight size={15} />
                </a>
                <a href={item.academicUrl} target="_blank" rel="noreferrer" className="secondary-link">
                  {item.academic}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="learning-mantra">
          <span>APRENDA</span>
          <ArrowRight />
          <span>PRATIQUE</span>
          <ArrowRight />
          <span>CERTIFIQUE</span>
          <ArrowRight />
          <span>CONSTRUA</span>
          <ArrowRight />
          <span>COMPARTILHE</span>
        </div>
      </section>

      <section id="carreiras" className="section-band band-gradient">
        <div className="section-shell">
          <SectionTitle
            eyebrow="07 · Onde você quer atuar?"
            title="Uma pós-graduação, múltiplas trajetórias profissionais"
            text="Explore as funções e conecte cada uma a competências, tecnologias e um primeiro projeto possível."
          />

          <div className="career-explorer">
            <div className="career-list" role="tablist" aria-label="Trajetórias profissionais">
              {careers.map((item, index) => (
                <button
                  type="button"
                  key={item.role}
                  className={index === selectedCareer ? "career-option active" : "career-option"}
                  onClick={() => setSelectedCareer(index)}
                  role="tab"
                  aria-selected={index === selectedCareer}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.role}</strong>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>

            <motion.div
              className="career-detail"
              key={career.role}
              initial={reducedMotion ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22 }}
              role="tabpanel"
            >
              <div className="career-label">DATA & AI</div>
              <h3>{career.role}</h3>
              <p className="career-description">{career.text}</p>

              <div className="career-detail-grid">
                <div>
                  <small>Foco</small>
                  <strong>{career.focus}</strong>
                </div>
                <div>
                  <small>Stack típica</small>
                  <div className="chips">
                    {career.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
                <div>
                  <small>Competências</small>
                  <div className="chips">
                    {career.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </div>
                <div>
                  <small>Primeiro projeto</small>
                  <strong>{career.project}</strong>
                </div>
              </div>

              <div className="career-learning">
                <GraduationCap size={18} />
                <div>
                  <small>Continue aprendendo</small>
                  <strong>{career.learning}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="finale section-shell">
        <motion.div className="finale-card" {...reveal}>
          <span>Hoje</span>
          <h2>“Qual ferramenta devo aprender?”</h2>
          <ArrowDown />
          <span>A pergunta que permanece</span>
          <h2>“Que problema sou capaz de resolver?”</h2>
          <p>Data Science & Analytics · sua jornada começa aqui.</p>
        </motion.div>
      </section>

      <div className="section-status" aria-live="polite">
        <span>{String(activeChapterIndex + 1).padStart(2, "0")}/{String(chapters.length).padStart(2, "0")}</span>
        <strong>{activeChapter.label}</strong>
      </div>

      <div className="floating-dock" aria-label="Controles rápidos">
        <button
          type="button"
          className="dock-button"
          data-label="Voltar ao topo"
          aria-label="Voltar ao topo"
          onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}
        >
          <ArrowUp size={18} />
        </button>
        <button
          type="button"
          className="dock-button"
          data-label="Próxima seção"
          aria-label="Ir para a próxima seção"
          onClick={() => goToSection(1)}
        >
          <ArrowDown size={18} />
        </button>
        <button
          type="button"
          className={`dock-button ${largeText ? "is-active" : ""}`}
          data-label="Aumentar texto"
          aria-label="Alternar texto ampliado"
          aria-pressed={largeText}
          onClick={() => setLargeText((value) => !value)}
        >
          <ALargeSmall size={18} />
        </button>
        <button
          type="button"
          className={`dock-button ${highContrast ? "is-active" : ""}`}
          data-label="Alto contraste"
          aria-label="Alternar alto contraste"
          aria-pressed={highContrast}
          onClick={() => setHighContrast((value) => !value)}
        >
          <Contrast size={18} />
        </button>
        <button
          type="button"
          className="dock-button"
          data-label="Compartilhar"
          aria-label="Compartilhar esta aula"
          onClick={sharePage}
        >
          <Share2 size={17} />
        </button>
      </div>

      <AnimatePresence>
        {shareStatus ? (
          <motion.div
            className="share-toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
          >
            {shareStatus}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer>
        <div className="institution-brand">
          <img src={university.logo} alt="Universidade SENAI CIMATEC" />
          <span>{university.name}</span>
        </div>
        <span>Data Science & Analytics · Dos dados à transformação</span>
      </footer>
    </main>
  );
}
