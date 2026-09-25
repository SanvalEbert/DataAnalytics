import {
  Activity,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cloud,
  Database,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Network,
  Route,
  ShoppingCart,
  Sparkles,
  Workflow,
} from "lucide-react";

export const pipeline = [
  { title: "Problema", kicker: "Perguntar", text: "Todo projeto relevante começa por uma pergunta que importa." },
  { title: "Dados", kicker: "Observar", text: "Coletar, integrar e organizar evidências do mundo real." },
  { title: "Engenharia", kicker: "Preparar", text: "Construir pipelines, arquiteturas e bases confiáveis." },
  { title: "Analytics", kicker: "Compreender", text: "Explorar padrões, indicadores e relações." },
  { title: "Data Science", kicker: "Modelar", text: "Experimentar, prever, classificar e estimar." },
  { title: "IA", kicker: "Ampliar", text: "Transformar modelos em sistemas inteligentes." },
  { title: "Soluções", kicker: "Agir", text: "Automatizar, recomendar, detectar, personalizar e otimizar." },
  { title: "Impacto", kicker: "Transformar", text: "Melhorar decisões, experiências, produtos e processos." },
];

export const maturity = [
  { label: "Analytics", question: "O que aconteceu?", answer: "12% dos clientes cancelaram." },
  { label: "Diagnóstico", question: "Por que aconteceu?", answer: "O cancelamento cresceu entre clientes com baixa utilização." },
  { label: "Data Science", question: "O que tende a acontecer?", answer: "Este cliente apresenta alto risco de cancelamento." },
  { label: "Inteligência Artificial", question: "O que podemos fazer?", answer: "O sistema recomenda uma ação personalizada." },
  { label: "Agentes de IA", question: "Podemos agir automaticamente?", answer: "O agente analisa, decide, executa e aprende com o retorno." },
];

export const ecosystem = [
  { title: "Linguagens", items: ["Python", "SQL", "R"], icon: Activity },
  { title: "Dados", items: ["PostgreSQL", "MongoDB", "Data Lakes"], icon: Database },
  { title: "Engenharia", items: ["ETL/ELT", "Airflow", "Kafka", "dbt"], icon: Workflow },
  { title: "Cloud", items: ["AWS", "Azure", "Google Cloud"], icon: Cloud },
  { title: "Analytics", items: ["Power BI", "Tableau", "Looker"], icon: ChartNoAxesCombined },
  { title: "IA", items: ["Scikit-learn", "PyTorch", "LLMs", "RAG"], icon: BrainCircuit },
];

export const careers = [
  { role: "Data Analyst", text: "Transforma dados em informação para apoiar decisões." },
  { role: "Analytics Engineer", text: "Organiza a camada analítica e aproxima engenharia e negócio." },
  { role: "Data Engineer", text: "Constrói a infraestrutura para os dados fluírem com qualidade." },
  { role: "Data Scientist", text: "Transforma perguntas em experimentos, modelos e previsões." },
  { role: "ML Engineer", text: "Leva modelos para produção com confiabilidade e escala." },
  { role: "AI Engineer", text: "Integra modelos de IA a produtos, fluxos e aplicações." },
  { role: "Data / AI Architect", text: "Projeta arquiteturas e integrações de ponta a ponta." },
  { role: "Data & AI Leader", text: "Conecta dados, tecnologia, pessoas e estratégia." },
];

export const applications = [
  { title: "Saúde", text: "Predição, diagnóstico e monitoramento.", icon: HeartPulse },
  { title: "Indústria", text: "Qualidade, manutenção preditiva e otimização.", icon: Factory },
  { title: "Finanças", text: "Fraudes, risco e previsão.", icon: Landmark },
  { title: "Educação", text: "Personalização, engajamento e feedback.", icon: GraduationCap },
  { title: "Logística", text: "Rotas, estoques e demanda.", icon: Route },
  { title: "Varejo", text: "Recomendação, segmentação e pricing.", icon: ShoppingCart },
  { title: "Operações", text: "Automação, eficiência e decisão.", icon: Network },
  { title: "Novos produtos", text: "Copilotos, agentes e experiências inteligentes.", icon: Bot },
];

export const cases = [
  {
    provider: "AWS",
    title: "NFL Next Gen Stats",
    metric: "500M+ pontos de dados por temporada",
    text: "A NFL usa dados, analytics e machine learning na AWS para transformar rastreamento em tempo real em estatísticas, predição e experiências para equipes e fãs.",
    tags: ["dados em tempo real", "analytics", "machine learning"],
    url: "https://aws.amazon.com/pt/sports/nfl/",
  },
  {
    provider: "Microsoft",
    title: "TeamDynamix + Azure",
    metric: "até 70% menos carga de suporte",
    text: "A TeamDynamix combinou dados, automação e IA no Azure para acelerar a resolução de solicitações e operar fluxos de atendimento conduzidos por agentes.",
    tags: ["Azure", "automação", "agentes de IA"],
    url: "https://www.microsoft.com/en/customers/story/26835-teamdynamix-azure",
  },
  {
    provider: "Google",
    title: "Sunrise + BigQuery",
    metric: "carga noturna 25% mais rápida",
    text: "A Sunrise consolidou dados empresariais no BigQuery para criar uma base governada para analytics, personalização e novas aplicações orientadas por IA.",
    tags: ["BigQuery", "governança", "personalização"],
    url: "https://cloud.google.com/customers/sunrise-data-transformation",
  },
  {
    provider: "NVIDIA",
    title: "AI Factory",
    metric: "95%+ menos tempo no planejamento diário",
    text: "A própria NVIDIA conectou sua base interna de conhecimento, infraestrutura acelerada e agentes de IA para escalar centenas de fluxos de trabalho empresariais.",
    tags: ["RAG", "AI agents", "computação acelerada"],
    url: "https://www.nvidia.com/en-us/case-studies/ai-factory-drives-enterprise-innovation-at-scale/",
  },
];

export const learningPlatforms = [
  {
    provider: "Microsoft",
    title: "Microsoft Learn",
    text: "Roteiros, módulos e cursos para Data Analyst, Data Engineer, Data Scientist e AI Engineer.",
    url: "https://learn.microsoft.com/pt-br/training/",
    academic: "Microsoft Learn for Educators",
    academicUrl: "https://learn.microsoft.com/pt-br/training/educator-center/programs/msle/",
  },
  {
    provider: "AWS",
    title: "AWS Skill Builder",
    text: "Trilhas de cloud, data analytics e IA com conteúdo autoguiado, laboratórios e preparação para certificações.",
    url: "https://aws.amazon.com/pt/training/digital/",
    academic: "AWS Academy",
    academicUrl: "https://aws.amazon.com/pt/training/awsacademy/",
  },
  {
    provider: "Google",
    title: "Google Skills",
    text: "Treinamentos em Google Cloud, dados, IA generativa e certificações, com laboratórios práticos.",
    url: "https://cloud.google.com/learn/training?hl=pt-BR",
    academic: "Google Career Launchpad",
    academicUrl: "https://cloud.google.com/edu/faculty/career-launchpad",
  },
  {
    provider: "NVIDIA",
    title: "NVIDIA DLI",
    text: "Cursos e trilhas em deep learning, ciência de dados, IA generativa e computação acelerada.",
    url: "https://www.nvidia.com/pt-br/training/",
    academic: "Educator Programs / DLI Ambassador",
    academicUrl: "https://www.nvidia.com/pt-br/training/educator-programs/",
  },
];

export const university = {
  name: "Universidade SENAI CIMATEC",
  logo: "https://cpaia.senaicimatec.com.br/empresas/logo-cimatec.png",
};

export const chapters = [
  { id: "inicio", label: "Início", icon: Sparkles },
  { id: "pipeline", label: "Pipeline", icon: Workflow },
  { id: "maturidade", label: "Maturidade", icon: ChartNoAxesCombined },
  { id: "ecossistema", label: "Ecossistema", icon: Database },
  { id: "aplicacoes", label: "Aplicações", icon: BrainCircuit },
  { id: "casos", label: "Casos", icon: Sparkles },
  { id: "aprendizagem", label: "Aprender", icon: GraduationCap },
  { id: "carreiras", label: "Carreiras", icon: BriefcaseBusiness },
];
