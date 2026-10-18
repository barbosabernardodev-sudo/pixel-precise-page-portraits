import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Play, Pause, ShieldCheck, ChevronDown, Check } from "lucide-react";

// Substitua pelos valores reais
const CHECKOUT_URL = "#"; // [COLE AQUI O LINK DO CHECKOUT]
const PRICE = "R$ [00,00]";
const AUDIO_SRC = ""; // arquivo MP3 da prévia
const PHOTO_1 = "";
const PHOTO_2 = "";
const COVER = "";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "7 Orações que Purificam · Padre Isaque Luz" },
      { name: "description", content: "Sete orações guiadas para entregar a Deus o que pesa no seu coração. Acesso imediato e vitalício." },
      { property: "og:title", content: "7 Orações que Purificam · Padre Isaque Luz" },
      { property: "og:description", content: "Sete orações guiadas para entregar a Deus a ansiedade, o cansaço, a saudade e as mágoas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Lato:wght@400;700&display=swap" },
    ],
  }),
  component: Index,
});

const Cross = ({ className = "h-4 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 16" className={`${className} fill-gold shrink-0`} aria-hidden><rect x="5" y="0" width="2" height="16" /><rect x="1" y="4" width="10" height="2" /></svg>
);
const Tag = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"><Cross />{children}</p>
);
const G = ({ children }: { children: ReactNode }) => <em className="italic text-gold">{children}</em>;
const Placeholder = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center bg-cream-deep p-6 text-center text-sm text-muted-foreground ${className}`}>Imagem do Padre Isaque Luz</div>
);
const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

function fmt(s: number) { if (!isFinite(s)) return "0:00"; return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`; }

function Player({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const on = () => setPlaying(!a.paused), tu = () => setT(a.currentTime), lm = () => setD(a.duration);
    a.addEventListener("play", on); a.addEventListener("pause", on); a.addEventListener("timeupdate", tu); a.addEventListener("loadedmetadata", lm);
    return () => { a.removeEventListener("play", on); a.removeEventListener("pause", on); a.removeEventListener("timeupdate", tu); a.removeEventListener("loadedmetadata", lm); };
  }, [audioRef]);
  const toggle = () => { const a = audioRef.current; if (!a || !AUDIO_SRC) return; a.paused ? a.play() : a.pause(); };
  return (
    <div id="player" className="mt-8 max-w-md rounded-xl border border-gold/30 bg-cream/5 p-4">
      <p className="mb-3 text-sm text-cream/80">Ouça uma prévia da oração para a ansiedade</p>
      <div className="flex items-center gap-4">
        <button onClick={toggle} aria-label={playing ? "Pausar" : "Tocar"} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-cafe transition hover:brightness-110">
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
        <div className="min-w-0 flex-1">
          <input type="range" min={0} max={d || 0} step={0.1} value={t} aria-label="Progresso"
            onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = +e.target.value; }}
            className="w-full accent-gold" />
          <div className="flex justify-between text-xs text-cream/60"><span>{fmt(t)}</span><span>{AUDIO_SRC ? fmt(d) : "áudio em breve"}</span></div>
        </div>
      </div>
      <audio ref={audioRef} src={AUDIO_SRC || undefined} preload="metadata" />
    </div>
  );
}

const dores = [
  ["Ansiedade", "Minha mente não para e o coração vive acelerado."],
  ["Preocupação com o dinheiro", "As contas pesam e eu não sei como vou dar conta."],
  ["Saudade", "Sinto falta de quem se foi, e a saudade volta sem avisar."],
  ["Cansaço do corpo e da alma", "Estou esgotado e preciso de força para recomeçar."],
  ["Família", "Quero paz e união dentro da minha casa."],
  ["Falta de direção", "Tenho decisões a tomar e não enxergo o caminho."],
  ["Mágoa e culpa", "Tem algo preso em mim que eu queria soltar."],
];
const oracoes = [
  ["Oração para a ansiedade", "Para acalmar a mente e entregar a Deus o que você teme"],
  ["Oração pelas preocupações financeiras", "Para pedir sabedoria, esperança e portas abertas"],
  ["Oração para a saudade", "Para acolher a ausência com fé e ternura"],
  ["Oração por saúde e restauração", "Para pedir força, cuidado e renovação do corpo e da alma"],
  ["Oração pela família", "Para pedir paz, união e proteção para quem você ama"],
  ["Oração por direção e clareza", "Para pedir luz nas decisões e coragem para seguir"],
  ["Oração por perdão e libertação", "Para soltar mágoas, culpas e o que ainda pesa"],
];
const faqs = [
  ["Preciso saber rezar?", "Não. Cada oração é guiada, e você só precisa acompanhar."],
  ["Como acesso depois da compra?", "Você recebe o acesso por e-mail logo após o pagamento."],
  ["Posso usar no celular?", "Sim, funciona direto no navegador, sem instalar nada."],
  ["Quanto tempo dura cada oração?", "[PREENCHER]"],
  ["Isso substitui tratamento médico, psicológico ou acompanhamento espiritual?", "Não. É um material espiritual e devocional, que não substitui nenhum acompanhamento profissional."],
];
const links = [["sobre", "Sobre"], ["oracoes", "As 7 Orações"], ["perguntas", "Perguntas"]] as const;

function Index() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [faq, setFaq] = useState<number | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const listen = () => { go("player"); if (AUDIO_SRC) audioRef.current?.play(); };
  const Buy = ({ label, wide = false }: { label: string; wide?: boolean }) => (
    <a href={CHECKOUT_URL} className={`btn-gold ${wide ? "w-full" : ""}`}>{label}</a>
  );

  return (
    <div className="overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="bg-cafe/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <a href="#" className="flex min-w-0 items-center gap-2 font-display text-xl text-cream"><Cross /><span className="truncate">Padre Isaque Luz</span></a>
            <div className="hidden items-center gap-7 md:flex">
              {links.map(([id, l]) => (
                <button key={id} onClick={() => go(id)} className={`text-sm transition hover:text-gold ${active === id ? "text-gold" : "text-cream/85"}`}>{l}</button>
              ))}
              <button onClick={listen} className="btn-gold !px-5 !py-2 text-sm">Ouvir agora</button>
            </div>
            <button className="text-cream md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
          </div>
          {open && (
            <div className="flex flex-col gap-1 border-t border-gold/20 px-5 pb-5 pt-2 md:hidden">
              {links.map(([id, l]) => (
                <button key={id} onClick={() => go(id)} className={`py-2 text-left ${active === id ? "text-gold" : "text-cream"}`}>{l}</button>
              ))}
              <button onClick={listen} className="btn-gold mt-2 !py-3">Ouvir agora</button>
            </div>
          )}
        </nav>
        <div className="bg-wine py-1 text-center text-xs font-bold uppercase tracking-[0.2em] text-cream">Oferta de lançamento</div>
      </header>

      {/* 1 Topo */}
      <section className="bg-cafe px-5 pb-20 pt-36 text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"><Cross />Orações guiadas · Padre Isaque Luz</p>
            <h1 className="text-5xl md:text-7xl">7 Orações que <G>Purificam</G></h1>
            <p className="mt-6 max-w-lg text-lg text-cream/85">Sete orações para entregar a Deus o que pesa no seu coração: ansiedade, preocupações, saudade, cansaço, família, dúvidas e mágoas.</p>
            <div className="mt-8"><Buy label="Quero começar minha jornada" /></div>
            <p className="mt-3 text-sm text-cream/60">Acesso imediato · Garantia de 7 dias</p>
            <Player audioRef={audioRef} />
          </Reveal>
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-t-full border border-gold p-2">
              {PHOTO_1 ? <img src={PHOTO_1} alt="Padre Isaque Luz" loading="eager" className="aspect-[3/4] w-full rounded-t-full object-cover" /> : <Placeholder className="aspect-[3/4] rounded-t-full" />}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 */}
      <section className="bg-cream px-5 py-20">
        <Reveal className="mx-auto max-w-2xl text-center text-xl leading-relaxed">
          Tem dias em que a gente reza e parece que as palavras não chegam. A cabeça está cheia, o coração está apertado e falta um lugar para colocar tudo isso. Você não precisa carregar sozinho. Preparamos sete orações, uma para cada peso que mais cansa a alma, para você rezar no seu tempo e do seu jeito.
        </Reveal>
      </section>

      {/* 3 */}
      <section className="bg-cream-deep px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center"><Tag>Identificação</Tag><h2 className="text-4xl md:text-5xl">Reconhece alguma <G>dessas dores</G>?</h2></Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dores.map(([t, f]) => (
              <Reveal key={t} className="rounded-lg border border-gold/50 bg-paper p-6">
                <h3 className="font-sans text-base font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground">“{f}”</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center font-display text-2xl italic text-gold">Se você se reconheceu em alguma dessas frases, estas orações foram feitas para você.</Reveal>
        </div>
      </section>

      {/* 4 */}
      <section className="bg-cafe px-5 py-24 text-center text-cream">
        <Reveal className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center"><Cross className="h-8 w-6" /></div>
          <blockquote className="font-display text-3xl italic md:text-5xl">“Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.”</blockquote>
          <p className="mt-6 text-xs tracking-[0.3em] text-gold">MATEUS 11,28</p>
        </Reveal>
      </section>

      {/* 5 */}
      <section id="sobre" className="bg-cream px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <Reveal>{PHOTO_2 ? <img src={PHOTO_2} alt="Padre Isaque Luz" loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" /> : <Placeholder className="aspect-[4/5] rounded-lg" />}</Reveal>
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"><Cross />Sobre</p>
            <h2 className="text-4xl md:text-5xl">Quem guia estas <G>orações</G></h2>
            <p className="mt-6">O Padre Isaque Luz é a voz que acompanha o nosso trabalho de orações e reflexões no Instagram, onde, há [TEMPO REAL], compartilhamos mensagens de fé e acolhimento para quem está passando por dias difíceis. Estas sete orações nasceram dessa caminhada: palavras simples, inspiradas na tradição católica, para você rezar no seu tempo.</p>
            <p className="mt-6 text-sm text-muted-foreground">Personagem criado com inteligência artificial. Conteúdo espiritual, que não substitui um padre, acompanhamento espiritual ou profissional de saúde.</p>
          </Reveal>
        </div>
      </section>

      {/* 6 */}
      <section id="oracoes" className="bg-paper px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center"><Tag>As 7 orações</Tag><h2 className="text-4xl md:text-5xl">Sete orações. Sete pesos. <G>Um caminho de volta à paz.</G></h2></Reveal>
          <div className="mt-12 space-y-4">
            {oracoes.map(([t, d], i) => (
              <Reveal key={t} className="flex items-start gap-5 rounded-lg border border-gold/40 bg-cream p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold font-display text-xl text-cafe">{i + 1}</span>
                <div className="min-w-0"><h3 className="font-sans text-base font-bold">{t}</h3><p className="text-muted-foreground">{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 */}
      <section id="oferta" className="bg-cream px-5 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <Tag>Oferta</Tag>
          <h2 className="text-4xl md:text-5xl">Comece a rezar <G>ainda hoje</G></h2>
          <p className="mt-4 text-muted-foreground">Acesso imediato, no seu celular ou computador, quando e onde precisar.</p>
          <div className="mt-10 overflow-hidden rounded-xl border border-gold bg-paper text-left">
            {COVER ? <img src={COVER} alt="Capa 7 Orações que Purificam" loading="lazy" className="aspect-video w-full object-cover" /> : <Placeholder className="aspect-video" />}
            <div className="p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Orações guiadas</p>
              <h3 className="mt-2 text-3xl">7 Orações que Purificam</h3>
              <p className="text-muted-foreground">Orações guiadas pelo Padre Isaque Luz</p>
              <ul className="mt-6 space-y-3">
                {["As 7 orações completas", "Pause e retome quando quiser", "Acesse direto pelo navegador, sem instalar nada", "Sem hora certa: encaixe no seu dia", "Acesso vitalício, rezando quantas vezes quiser"].map((x) => (
                  <li key={x} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-gold" />{x}</li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <p className="font-display text-5xl">{PRICE}</p>
                <p className="mb-6 text-sm text-muted-foreground">pagamento único · acesso vitalício</p>
                <Buy label="Quero meu acesso" wide />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 8 */}
      <section className="bg-paper px-5 py-20">
        <Reveal className="mx-auto max-w-xl rounded-xl border border-gold/50 bg-cream p-8 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-gold" />
          <h2 className="mt-4 text-3xl">Garantia de 7 dias</h2>
          <p className="mt-3">Se você sentir que este material não era para você, é só pedir o reembolso em até 7 dias, sem burocracia.</p>
        </Reveal>
      </section>

      {/* 9 */}
      <section id="perguntas" className="bg-cream px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center"><Tag>Perguntas</Tag><h2 className="text-4xl md:text-5xl">Perguntas <G>frequentes</G></h2></Reveal>
          <div className="mt-10 divide-y divide-gold/30 border-y border-gold/30">
            {faqs.map(([q, a], i) => (
              <div key={q}>
                <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold" aria-expanded={faq === i}>
                  <span>{q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-gold transition ${faq === i ? "rotate-180" : ""}`} />
                </button>
                {faq === i && <p className="pb-5 text-muted-foreground">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 */}
      <section className="bg-cafe px-5 py-24 text-center text-cream">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-6xl">Não precisa carregar <G>sozinho</G></h2>
          <p className="mt-5 text-cream/80">Sete orações para você entregar a Deus o que pesa. Comece hoje, no seu tempo.</p>
          <div className="mt-8"><Buy label="Quero começar minha jornada" /></div>
        </Reveal>
      </section>

      <footer className="border-t border-gold/20 bg-cafe px-5 py-10 text-center text-sm text-cream/60">
        <p>Paz e bem. © 2026 Padre Isaque Luz</p>
        <p className="mx-auto mt-3 max-w-2xl text-xs">Conteúdo de caráter espiritual e devocional. Não substitui acompanhamento médico, psicológico ou financeiro. Personagem criado com inteligência artificial.</p>
      </footer>
    </div>
  );
}
