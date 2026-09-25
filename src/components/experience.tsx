"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Expand,
  Menu,
  MousePointer2,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { applications, careers, cases, chapters, ecosystem, learningPlatforms, maturity, pipeline, university } from "@/data/content";

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
        document.getElementById(next)?.scrollIntoView({ behavior: "smooth" });
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        const prev = sectionIds[Math.max(0, current - 1)];
        document.getElementById(prev)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presenting, sectionIds]);

  const reveal = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } };

  return (
    <main className={presenting ? "presentation-mode" : ""}>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir ao início">
          <span className="brand-mark">DA</span>
          <span>Data Science & Analytics</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {chapters.slice(1).map((chapter) => (
            <a href={`#${chapter.id}`} key={chapter.id}>{chapter.label}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="present-button" onClick={() => setPresenting((v) => !v)}>
            <Expand size={16} />
            {presenting ? "Sair" : "Apresentar"}
          </button>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {chapters.map((chapter) => (
              <a href={`#${chapter.id}`} key={chapter.id} onClick={() => setMenuOpen(false)}>{chapter.label}</a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <section id="inicio" className="hero section-shell">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <motion.div className="hero-copy" {...reveal}>
          <div className="eyebrow-pill"><Sparkles size={16} /> Aula inaugural</div>
          <h1>Dos dados à <span>transformação.</span></h1>
          <p>
            Uma jornada para compreender como problemas reais se conectam a dados,
            analytics, ciência de dados, inteligência artificial e novas possibilidades profissionais.
          </p>
          <div className="hero-question">
            <span>Comece por uma pergunta</span>
            <strong>Que problema você gostaria de resolver usando dados?</strong>
          </div>
          <div className="verb-cloud" aria-label="Possibilidades com dados">
            {["compreender", "prever", "detectar", "recomendar", "automatizar", "otimizar"].map((verb) => <span key={verb}>{verb}</span>)}
          </div>
        </motion.div>

        <motion.div className="hero-visual" {...reveal}>
          <div className="visual-grid">
            <div className="visual-card focal">
              <span>DADOS</span>
              <strong>evidências do mundo real</strong>
            </div>
            <div className="visual-card"><span>ANALYTICS</span><strong>compreender</strong></div>
            <div className="visual-card"><span>IA</span><strong>ampliar</strong></div>
            <div className="visual-card"><span>IMPACTO</span><strong>transformar</strong></div>
          </div>
          <div className="visual-caption"><MousePointer2 size={16} /> Explore cada camada ao longo da página</div>
        </motion.div>

        <a className="scroll-cue" href="#pipeline"><ArrowDown size={18} /> seguir a jornada</a>
      </section>

      <section id="pipeline" className="section-shell">
        <SectionTitle eyebrow="01 · O coração da jornada" title="Problema → dados → inteligência → ação → impacto" text="O valor não nasce da ferramenta. Nasce da capacidade de transformar uma pergunta relevante em uma solução que funciona." />
        <div className="pipeline">
          {pipeline.map((item, index) => (
            <motion.article className="pipeline-card" key={item.title} {...reveal}>
              <span className="step">{String(index + 1).padStart(2, "0")}</span>
              <small>{item.kicker}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {index < pipeline.length - 1 ? <ArrowRight className="pipeline-arrow" aria-hidden="true" /> : null}
            </motion.article>
          ))}
        </div>
        <div className="callout">Tecnologia é o meio. <strong>Transformação é o objetivo.</strong></div>
      </section>

      <section id="maturidade" className="section-shell section-tint">
        <SectionTitle eyebrow="02 · Uma mesma pergunta, diferentes capacidades" title="Como uma organização amadurece com dados" text="A pergunta evolui da descrição do passado para a construção de sistemas capazes de agir." />
        <div className="maturity-grid">
          {maturity.map((item, index) => (
            <motion.article className="maturity-card" key={item.label} {...reveal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.label}</h3>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ecossistema" className="section-shell">
        <SectionTitle eyebrow="03 · Ecossistema técnico" title="Ferramentas mudam. Fundamentos permanecem." text="O profissional precisa compreender o fluxo completo e dominar profundamente partes dele." />
        <div className="ecosystem-grid">
          {ecosystem.map(({ title, items, icon: Icon }) => (
            <motion.article className="tech-card" key={title} {...reveal}>
              <div className="icon-wrap"><Icon size={22} /></div>
              <h3>{title}</h3>
              <div className="chips">{items.map((item) => <span key={item}>{item}</span>)}</div>
            </motion.article>
          ))}
        </div>
        <div className="statement">
          <small>Uma ideia essencial</small>
          <h3>Um modelo que funciona no notebook ainda não é uma solução.</h3>
          <p>Software Engineering + Data Engineering + AI Engineering transformam experimentos em produtos confiáveis.</p>
        </div>
      </section>

      <section id="aplicacoes" className="section-shell section-dark">
        <SectionTitle eyebrow="04 · Onde isso ganha vida" title="Dados e IA atravessam setores, produtos e decisões" text="A mesma base técnica pode se desdobrar em problemas completamente diferentes." />
        <div className="applications-grid">
          {applications.map(({ title, text, icon: Icon }) => (
            <motion.article className="application-card" key={title} {...reveal}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="casos" className="section-shell">
        <SectionTitle
          eyebrow="05 · Quem já faz isso em escala"
          title="Big techs transformam dados em produtos, decisões e experiências"
          text="Os exemplos abaixo conectam o pipeline da aula a iniciativas reais: dados em tempo real, plataformas analíticas, inteligência artificial e agentes."
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
                <span className={`provider provider-${item.provider.toLowerCase()}`}>{item.provider}</span>
                <ArrowRight size={18} />
              </div>
              <small>{item.metric}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="chips">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="aprendizagem" className="section-shell learning-section">
        <SectionTitle
          eyebrow="06 · Continue aprendendo"
          title="Conecte a pós-graduação aos ecossistemas oficiais de aprendizagem"
          text="Use estas plataformas para aprofundar competências, praticar em laboratórios e construir uma trilha complementar de certificações e projetos."
        />
        <div className="learning-grid">
          {learningPlatforms.map((item) => (
            <motion.article className="learning-card" key={item.provider} {...reveal}>
              <div className="learning-head">
                <span className={`provider provider-${item.provider.toLowerCase()}`}>{item.provider}</span>
                <GraduationCap size={21} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="learning-actions">
                <a href={item.url} target="_blank" rel="noreferrer">
                  Plataforma oficial <ArrowRight size={15} />
                </a>
                <a href={item.academicUrl} target="_blank" rel="noreferrer" className="secondary-link">
                  {item.academic}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="learning-callout">
          <div>
            <small>Da sala de aula para o ecossistema</small>
            <strong>Aprenda → pratique → certifique → construa → compartilhe.</strong>
          </div>
          <p>O portfólio profissional começa quando o conhecimento passa a produzir evidências de aplicação.</p>
        </div>
      </section>

      <section id="carreiras" className="section-shell">
        <SectionTitle eyebrow="07 · Onde você entra?" title="Uma pós-graduação, múltiplas trajetórias profissionais" text="O objetivo não é escolher uma caixa hoje, mas compreender o ecossistema para decidir onde gerar valor." />
        <div className="career-map">
          {careers.map((item, index) => (
            <motion.article className="career-card" key={item.role} {...reveal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.role}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
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
