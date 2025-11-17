import React, { useMemo, useState } from "react";

/**
 * HAN DYNASTY JEOPARDY
 * ---------------------------------------------------------
 * Exact Jeopardy-style board with 4 categories x 5 clues each.
 * Classroom ready: long, teacherly clues and post-reveal explanations.
 * No source lists. No em dashes.
 */

// -----------------------------
// Data model
// -----------------------------

type Clue = {
  value: number;
  prompt: string; // what students see as the clue
  response: string; // expected response in Jeopardy form
  explanation: string; // teaching paragraph shown after reveal
  explanationVideo?: string; // optional video URL for teaching note
};

type Category = {
  id: string;
  title: string;
  clues: Clue[]; // five ascending values
};

const CATEGORIES: Category[] = [
  {
    id: "rise",
    title: "Rise to Power",
    clues: [
      {
        value: 200,
        prompt:
          "Identify the lowly leader who defeated rivals following the fall of the Qin, gained widespread support by promising stability and moderation, and established a new imperial line renowned for its more resilient institutions and softer political style. Later on, he was Emperor Gaozu. Who was he?",
        response: "Who is Liu Bang?",
        explanationVideo: "sandbox:/mnt/data/1.mp4",
        explanation:
          "Liu Bang began as a minor official and rebel commander during the chaotic years that followed the Qin dynasty. His success rested on coalition building, moderation in policy, and a reputation for pragmatism. He kept the useful parts of Qin centralization while stepping back from the harshest controls. This combination built trust among regional elites and commoners and created a stable base for the early Han. Remember that legitimacy in this period came from restoring order, lowering burdens when possible, and rewarding loyalty. Liu Bang embodies the shift from short lived conquest to long term governance." ,
      },
      {
        value: 400,
        prompt:
          "A crucial Qin era structure was retained by the new rulers following unification. Selection increasingly rewarded merit through training, evaluations, and promotion for competent local talent. Provinces were set up as centrally supervised commanderies with appointed officials, a clear chain of reporting, standardized procedures, and frequent audits. Identify this administrative model that created manageable units out of a vast realm.",
        response: "What is a centralized commandery based bureaucracy?",
        explanationVideo: "sandbox:/mnt/data/2.mp4",
        explanation:
          "Commanderies were the backbone of Han administration. Each had officials chosen by the central court rather than by local hereditary nobles. This curbed regional independence and allowed laws, taxation, justice, and military levies to be coordinated across the empire. Over time the number of commanderies grew as territory and population increased. The practical effect was predictable governance, easier mobilization in crises, and less reliance on personal ties. When you hear commandery, think standardization, records, and salaried officials whose careers depended on performance rather than birth alone." ,
      },
      {
        value: 600,
        prompt:
          "The early Han combined a humanizing ideology that promoted moderation, virtue, and filial piety with legalist-style governance. This moral framework justified strong central authority while providing rulers with a language of duty. Identify the philosophy that the court advanced in order to convert control into consent.",
        response: "What is Confucianism?",
        explanationVideo: "sandbox:/mnt/data/3.mp4",
        explanation:
          "Confucian classics framed rule as a moral project. Officials studied canonical texts and were expected to model propriety, loyalty, and care for the people. This public ethic softened the image of centralized power. It also linked education to service, making literary learning a path to office. The fusion mattered. Legalist tools supplied organization and law. Confucian teaching supplied legitimacy and expectation. Together they made imperial rule feel orderly and righteous, which reduced resistance and increased cooperation among elites and households across distant regions." ,
      },
      {
        value: 800,
        prompt:
          "The local administration map was completed during consolidation. As the population grew and the frontiers expanded, these districts increased from a few dozen to over eighty. Identify the territorial divisions that show the empire's progress toward integration.",
        response: "What are commanderies?",
        explanationVideo: "sandbox:/mnt/data/4.mp4",
        explanation:
          "Growing numbers of commanderies show institutional reach. Each new unit brought registries of households, tax rolls, conscription records, and courts into closer contact with the center. Expansion also meant more frequent contact with steppe peoples and distant markets, which required reliable logistics and messaging. Think of commanderies as the grid that allowed roads, garrisons, and officials to function together. The increase in their count is a quantitative sign that state capacity and territorial control were deepening, not just spreading thinly." ,
      },
      {
        value: 1000,
        prompt:
          "Typically, the dynasty is split into two protracted periods, each with its own capital. Determine which seat anchored court life, archives, and ritual: the western phase seat and the later eastern phase seat. Give the names of both cities.",
        response: "What are Chang'an and Luoyang?",
        explanationVideo: "sandbox:/mnt/data/5.mp4",
        explanation:
          "Chang'an served as the political and ritual heart of the early period. After the brief Xin interlude, the restored dynasty shifted east to Luoyang. Capitals were more than palaces. They were hubs for taxation, storage, crafts, scholarship, and recruiting. Court rituals and law codes radiated outward along courier roads. Moving the capital also reflected strategic geography and changing frontier pressures. Knowing the two capitals helps you track continuity and adaptation across four centuries of imperial life." ,
      },
    ],
  },
  {
    id: "maintain",
    title: "Maintaining Power",
    clues: [
      {
        value: 200,
        prompt:
          "Imperial officials were paid according to state granaries and agricultural output. This stabilized wages during coin shortages and connected service to the food supply. What was the standard unit of measurement for salaries?",
        response: "What is grain?",
        explanationVideo: "sandbox:/mnt/data/6.mp4",
        explanation:
          "Paying officials in grain connected administration to the rural economy that sustained the empire. Granary systems balanced regional shortages and surpluses through transport and storage. Salaries in kind reduced volatility when metal currency was scarce or debased. This practice also reminded officials that good governance depended on harvests, irrigation, and flood control. It is a concrete example of how the Han converted agricultural strength into administrative reliability and loyalty." ,
      },
      {
        value: 400,
        prompt:
          "The long-lasting governing formula blended a moral curriculum that instilled loyalty and harmony with a Legalist toolkit of institutions and laws. Identify the moral code that made bureaucratic control a common civic ideal and a path to political power for the well-educated.",
        response: "What is the Music Bureau, or Yuefu?",
        explanationVideo: "sandbox:/mnt/data/7.mp4",
        explanation:
          "Confucian schooling supplied a common language for officials across the empire. Mastery of classics, history, and ritual offered a way to evaluate talent and to socialize elites into a single service culture. This did not eliminate corruption or faction, but it did sustain expectations about conduct, filial duty, and care for the people. The blend explains why the Han could demand obedience while also presenting themselves as guardians of order and education rather than as mere conquerors." ,
      },
is the Music Bureau, or Yuefu?",
        explanation:
          "Confucian schooling supplied a common language for officials across the empire. Mastery of classics, history, and ritual offered a way to evaluate talent and to socialize elites into a single service culture. This did not eliminate corruption or faction, but it did sustain expectations about conduct, filial duty, and care for the people. The blend explains why the Han could demand obedience while also presenting themselves as guardians of order and education rather than as mere conquerors." ,
      },
      {
        value: 600,
        prompt:
          "The court used a combination of punishment expeditions, garrisons, walls, and marriage diplomacy with steppe confederations like the Xiongnu on the northern and western frontiers. What was the actual name of this combination approach, particularly the policy of peace through marital alliances?",
        response: "What is heqin and the wider Han strategy toward the Xiongnu?",
        explanationVideo: "sandbox:/mnt/data/8.mp4",
        explanation:
          "Frontier policy mixed force with accommodation. Heqin marriages created kinship ties and exchanged gifts for periods of peace. Fortified lines and mobile columns responded to raids or political shifts on the steppe. Control of corridors into Central Asia protected caravans and secured horses and other strategic goods. This was not a single tactic but a repertoire adjusted to ecology, seasons, and rival coalitions. The goal was to reduce unpredictability at the borders while securing trade routes that enriched the core." ,
      },
      {
        value: 800,
        prompt:
          "Two landmark histories shaped how the state remembered itself. Using biographies and annals, one examined all previous eras. The other organized lives to emphasize moral lessons and concentrated on the current dynasty. List the two pieces along with their creators.",
        response: "What are Sima Qian's Shiji and Ban Gu's Han Shu?",
        explanationVideo: "sandbox:/mnt/data/9.mp4",
        explanation:
          "Sima Qian created a comprehensive model that blended chronology, biography, tables, and treatises. Ban Gu adapted that architecture to write a focused account of the Former Han. Together they fixed the narrative of institutions, exemplary conduct, and policy debates. History here functioned as political education. Officials learned from successes and failures while the public saw the state as part of a long moral project. The books also standardized categories that later dynasties used to measure themselves." ,
      },
      {
        value: 1000,
        prompt:
          "Silk, horses, glassware, and ideas were transported by traders and emissaries across the trans-Eurasian network. The network's name demonstrates how the dynasty used both trade and armed conflict to extend its power well beyond its borders. Which network was it?",
        response: "What is the Silk Road?",
        explanationVideo: "sandbox:/mnt/data/10.mp4",
        explanation:
          "The Silk Road linked the Han realm to Inner Asia and the Mediterranean world. Caravans required safe corridors, stable provisioning points, and diplomatic understandings with local powers. As goods moved, so did technologies, musical forms, and religious ideas. Participation increased state revenue through taxes and indirect growth. It also advertised the court's power and taste, since prestige goods and envoys arrived at the capitals. Trade created soft power that complemented fortifications and armies." ,
      },
    ],
  },
  {
    id: "display",
    title: "Displaying Power",
    clues: [
      {
        value: 200,
        prompt:
          "Glossy cups and trays that hold up after two thousand years are among the items found in excavated tombs. Layers of refined sap, meticulous curing, and exquisite decoration were all necessary for the craft. Identify this high-end technology that represented wealth, expertise, and courtly taste.",
        response: "What is lacquerware?",
        explanationVideo: "sandbox:/mnt/data/11.mp4",
        explanation:
          "Lacquerware production involved specialized workshops, long drying times, and intricate painting. Objects traveled as gifts and tribute, spreading a shared aesthetic across the elite world. In tombs, these pieces show how the court projected refinement and permanence. For our theme of power, lacquerware reveals state capacity to organize skilled labor, control materials, and set cultural standards that distinguished the imperial center from local society." ,
      },
      {
        value: 400,
        prompt:
          "Writing material innovation increased bureaucratic learning and memory. Compared to bamboo slips, it was easier to store and less expensive than silk. Name the technology that aided in the expansion of scholarship and administration.",
        response: "What is paper?",
        explanationVideo: "sandbox:/mnt/data/12.mp4",
        explanation:
          "Paper changed how the state recorded taxes, laws, and correspondence. It lowered the cost of copying classics and histories, which widened access to learning for would be officials. The logistics of empire depend on reliable records and fast communication. Paper improved both. It is a quiet technology of power that let a large bureaucracy coordinate actions across long distances and across generations." ,
      },
      {
        value: 600,
        prompt:
          "In addition to organizing performances for banquets and rituals, a specialized office at court gathered and described instruments, methods, and songs. Identify this bureau that demonstrates how music strengthened ceremony and authority.",
        response: "What is the Music Bureau, or Yuefu?",
        explanationVideo: "sandbox:/mnt/data/13.mp4",
        explanation:
          "Ritual music communicated hierarchy and harmony. Processions, sacrifices, and audiences used sound and choreography to teach order through experience. The bureau documented repertoire, trained performers, and staged events that linked the emperor to cosmic cycles and ancestral rites. Managing culture in this way projected stability and sophistication. It also tied local elites to the center through shared ceremonial forms." ,
      },
ened ceremony and authority.",
        response: "What is the Music Bureau, or Yuefu?",
        explanation:
          "Ritual music communicated hierarchy and harmony. Processions, sacrifices, and audiences used sound and choreography to teach order through experience. The bureau documented repertoire, trained performers, and staged events that linked the emperor to cosmic cycles and ancestral rites. Managing culture in this way projected stability and sophistication. It also tied local elites to the center through shared ceremonial forms." ,
      },
      {
        value: 800,
        prompt:
          "Figures, house models, and protective designs found in Han tombs suggest a paired view of the deceased. Identify the two elements that these customs aimed to protect and guide in the afterlife.",
        response: "What are the hun and the bo?",
        explanationVideo: "sandbox:/mnt/data/14.mp4",
        explanation:
          "Many Han beliefs described a light, mobile aspect often translated as soul and a heavier, bodily aspect that remained connected to the tomb. Burials supplied goods, attendants, and architecture to provide for both. For the living, grand tombs signaled rank and legitimacy. For our power theme, mortuary culture shows how rulers invested in religious meaning that justified status, cared for ancestors, and displayed resources through durable monuments." ,
      },
      {
        value: 1000,
        prompt:
          "In order for the center to send troops or aid, court scientists created a device that could detect distant earthquakes. Name the tool that best exemplifies the integration of engineering, state response, and observation.",
        response: "What is the seismograph?",
        explanationVideo: "sandbox:/mnt/data/15.mp4",
        explanation:
          "The device used mechanical triggers to register seismic waves from far away. Its purpose was administrative, not merely curious. Fast awareness of disasters helped authorities coordinate relief, prevent unrest, and maintain legitimacy. This is a clear example of how technical innovation served governance. Science at court was part of practical statecraft and was celebrated as evidence that imperial order matched the rhythms of the natural world." ,
      },
    ],
  },
  {
    id: "decline",
    title: "Decline of Power",
    clues: [
      {
        value: 200,
        prompt:
          "In 184 CE, a mass movement that demanded renewal under a religious banner and wore distinctive headgear was fueled by local abuses, land inequality, and fiscal pressure. Identify this internal rebellion that rocked the dynasty.",
        response: "What is the Yellow Turban Rebellion?",
        explanationVideo: "sandbox:/mnt/data/16.mp4",
        explanation:
          "The rebellion drew on grievances of overtaxed and displaced peasants as well as frustrated local elites. It exposed how weakened central authority and corruption had eroded consent. Suppressing the revolt required empowering regional generals, which later undermined the court. The event marks a tipping point where fiscal and social strains translated into organized resistance and long term fragmentation of military loyalty." ,
      },
      {
        value: 400,
        prompt:
          "The dynasty reestablished itself with a new capital farther east after a brief usurpation. Identify this later stage that saw the rise of warlords and stronger aristocratic clans while maintaining institutions.",
        response: "What is the Eastern Han?",
        explanationVideo: "sandbox:/mnt/data/17.mp4",
        explanation:
          "The Eastern Han kept the administrative template but ruled from Luoyang and contended with new patterns of elite power. Court factions, eunuch influence, and regional armies steadily constrained imperial choices. The institutions still worked on paper yet were harder to direct in practice. This phase shows how form can outlast function when political coalitions shift and when the center relies on strongmen to manage crises." ,
      },
      {
        value: 600,
        prompt:
          "The last emperor formally ceded the throne to a powerful northerner in 220 CE, who went on to establish a successor state. Name the person whose ascent signifies the beginning of a new kingdom and the end of unified Han rule.",
        response: "Who is Cao Pi?",
        explanationVideo: "sandbox:/mnt/data/18.mp4",
        explanation:
          "Cao Pi accepted the abdication of the Han emperor, a ritual that framed regime change as orderly. In reality the transfer capped decades of warlord dominance. By claiming the Mandate he justified a new political order while acknowledging that the Han court could no longer command armies or revenue on its own. The moment is a textbook example of how legitimacy is redefined at the end of a dynasty." ,
      },
      {
        value: 800,
        prompt:
          "Three rival states shared power after the unity fell. Name two polities that fought for dominance in the third century and replaced the single empire.",
        response: "What are Wei, Shu, and Wu?",
        explanationVideo: "sandbox:/mnt/data/19.mp4",
        explanation:
          "The Three Kingdoms era emerged from the same structural forces that weakened the late Han. Regional military bases, resource rich zones, and charismatic leaders produced competing courts. Administrations continued to tax, legislate, and fight yet none could reassemble the entire realm for many decades. This division illustrates how imperial infrastructures can be repurposed by rival centers once the core can no longer coordinate them." ,
      },
      {
        value: 1000,
        prompt:
          "Describe the final process where the court relied on great clans and provincial generals for revenue and security, only to discover that these allies undermined central authority and forced partition.",
        response: "What is warlordism and elite clan dominance?",
        explanationVideo: "sandbox:/mnt/data/20.mp4",
        explanation:
          "As rebellions and invasions multiplied, the court delegated more power to local strongmen. They built personal armies, controlled tax bases, and negotiated with the center from a position of strength. Over time the bureaucracy and courier roads served these regional bosses as much as the emperor. The pattern shows how short term solutions to crises can dissolve the very cohesion they aim to save, leading to formal abdication and competing states." ,
      },
    ],
  },
];

// -----------------------------
// UI helpers
// -----------------------------

const money = (v: number) => `$${v.toLocaleString()}`;

const BOARD_COLORS = {
  bg: "bg-blue-900",
  tile: "bg-blue-700",
  tileHover: "hover:bg-blue-600",
  text: "text-yellow-300",
  tileText: "text-yellow-100",
};

// -----------------------------
// Main component
// -----------------------------

export default function HanJeopardy() {
  const [used, setUsed] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<{ key: string; clue: Clue; cat: Category } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [teams, setTeams] = useState([
    { name: "Team 1", score: 0 },
    { name: "Team 2", score: 0 },
  ]);

  const openClue = (cat: Category, clue: Clue) => {
    const key = `${cat.id}-${clue.value}`;
    if (used[key]) return; // locked
    setOpen({ key, clue, cat });
    setShowAnswer(false);
  };

  const award = (i: number, delta: number) => {
    setTeams((prev) => prev.map((t, idx) => (idx === i ? { ...t, score: t.score + delta } : t)));
  };

  const updateTeamCount = (n: number) => {
    setTeams((prev) => {
      const next = prev.slice(0, n);
      while (next.length < n) {
        next.push({ name: `Team ${next.length + 1}`, score: 0 });
      }
      return next;
    });
  };

  const lockTile = () => {
    if (open) setUsed((u) => ({ ...u, [open.key]: true }));
    setOpen(null);
    setShowAnswer(false);
  };

  const resetBoard = () => {
    setUsed({});
    setShowAnswer(false);
    setOpen(null);
  };

  return (
    <div className={`min-h-screen ${BOARD_COLORS.bg} ${BOARD_COLORS.text} font-sans`}>
      <div className="mx-auto max-w-7xl px-4 py-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Han Dynasty Jeopardy</h1>
            <p className="text-blue-200 mt-1 text-sm">4 categories x 5 clues. Click a tile to open. Reveal the answer then teach with the summary below.</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-blue-200">Teams:</label>
            <select
              value={teams.length}
              onChange={(e) => updateTeamCount(parseInt(e.target.value))}
              className="rounded-md bg-white/10 px-2 py-1 text-white"
            >
              {[1,2,3,4,5,6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button onClick={resetBoard} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20">Reset Board</button>
          </div>
        </header>

        {/* Teams */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-6">
          {teams.map((t, i) => (
            <div key={i} className="rounded-xl bg-black/20 p-3">
              <input
                value={t.name}
                onChange={(e) => setTeams((prev) => prev.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))}
                className="w-full rounded-md bg-black/30 px-2 py-1 text-white placeholder:text-blue-200 focus:outline-none"
              />
              <div className="mt-2 text-2xl font-bold">{money(t.score)}</div>
            </div>
          ))}
        </section>

        {/* Board */}
        <main className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="rounded-xl overflow-hidden border border-blue-800">
              <div className="bg-blue-800 p-3 text-center font-bold uppercase tracking-wide">{cat.title}</div>
              {cat.clues.map((clue) => {
                const key = `${cat.id}-${clue.value}`;
                const isUsed = used[key];
                return (
                  <button
                    key={key}
                    onClick={() => openClue(cat, clue)}
                    className={`w-full p-6 ${BOARD_COLORS.tile} ${BOARD_COLORS.tileHover} ${isUsed ? "opacity-30 cursor-not-allowed" : ""}`}
                    disabled={isUsed}
                    aria-label={`Play ${cat.title} for ${clue.value}`}
                  >
                    <span className={`text-3xl font-extrabold ${BOARD_COLORS.tileText}`}>{money(clue.value)}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </main>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4" onClick={() => setOpen(null)}>
            <div className="w-full max-w-3xl rounded-2xl bg-white text-neutral-900" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b px-5 py-3">
                <h2 className="text-lg font-semibold">{open.cat.title} {" "} {money(open.clue.value)}</h2>
                <button onClick={() => setOpen(null)} className="rounded-md border px-2 py-1 text-sm">Close</button>
              </div>

              <div className="px-5 py-4">
                <p className="text-xl leading-8">{open.clue.prompt}</p>

                {!showAnswer ? (
                  <button onClick={() => setShowAnswer(true)} className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-600">Reveal Answer</button>
                ) : (
                  <>
                    <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
                      <div className="text-sm uppercase text-green-700 font-semibold">Expected Response</div>
                      <div className="mt-1 text-lg">{open.clue.response}</div>
                    </div>
                    <div className="mt-4 rounded-lg bg-neutral-50 border p-3">
                      <div className="text-sm uppercase text-neutral-700 font-semibold">{open.clue.explanationVideo ? "Teaching video" : "Teaching note"}</div>
{open.clue.explanationVideo ? (
  <div className="mt-2">
    <video controls preload="metadata" className="w-full rounded-lg">
      <source src={open.clue.explanationVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="mt-1 text-xs text-neutral-600 break-all">
      <a href={open.clue.explanationVideo} target="_blank" rel="noreferrer">Open video in new tab</a>
    </div>
  </div>
) : (
  <p className="mt-1 leading-7 text-neutral-800">{open.clue.explanation}</p>
)}
                    </div>
                  </>
                )}

                {/* Award or Deduct */}
                <div className="mt-5">
                  <div className="text-sm font-semibold text-neutral-700">Score this clue</div>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {teams.map((t, i) => (
                      <div key={i} className="rounded-lg border p-2">
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <button onClick={() => award(i, open.clue.value)} className="rounded bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-500">+{money(open.clue.value)}</button>
                          <button onClick={() => award(i, -open.clue.value)} className="rounded bg-rose-600 px-2 py-1 text-white hover:bg-rose-500">-{money(open.clue.value)}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lock tile */}
                <div className="mt-5 flex justify-end">
                  <button onClick={lockTile} className="rounded-md bg-neutral-900 px-3 py-1.5 text-white hover:bg-neutral-700">Mark Tile Complete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-6 text-blue-200 text-xs">Exact Jeopardy layout. Long clues and explanations for live teaching. No source lists shown.</footer>
      </div>
    </div>
  );
}
