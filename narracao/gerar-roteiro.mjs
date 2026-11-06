// Gera o roteiro de narração da Iara a partir do código do jogo.
// Uso: node narracao/gerar-roteiro.mjs
// Saída: narracao/roteiro-narracao.csv (para a ferramenta de voz) e narracao/roteiro-narracao.md (leitura).
//
// Cada linha é um áudio curto e independente (um "clipe"). As falas que no jogo são montadas na hora
// (ex.: "Você pescou um Tucunaré! Sabia que... Ele come...") viram clipes separados que o jogo toca em sequência.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, '..', 'pescaria-lendaria.html'), 'utf8');

// Lê uma constante (array/objeto literal) do código do jogo.
function grab(name) {
  const i = src.indexOf(`const ${name} = `);
  if (i < 0) throw new Error(`constante ${name} não encontrada`);
  let j = src.indexOf('=', i) + 1;
  while (/\s/.test(src[j])) j++;
  const open = src[j], close = open === '[' ? ']' : '}';
  let depth = 0, k = j, q = null;
  for (; k < src.length; k++) {
    const c = src[k];
    if (q) { if (c === '\\') { k++; continue; } if (c === q) q = null; continue; }
    if (c === "'" || c === '"' || c === '`') { q = c; continue; }
    if (c === open || c === '[' || c === '{') depth++;
    else if (c === close || c === ']' || c === '}') { depth--; if (depth === 0) break; }
  }
  return new Function(`return ${src.slice(j, k + 1)}`)();
}

const ZONES_SEA = grab('ZONES_SEA'), ZONES_RIO = grab('ZONES_RIO');
const RODS = grab('RODS'), LINES = grab('LINES'), BAITS = grab('BAITS');
const SPECIES = grab('SPECIES'), FOOD = grab('FOOD'), LIKES = grab('LIKES');
const CHEERS = grab('CHEERS'), ENDS = grab('ENDS'), BITES = grab('BITES'), SNAPS = grab('SNAPS');
const BAIT = Object.fromEntries(BAITS.map((b) => [b.id, b]));
for (const s of SPECIES) {
  s.loc = s.loc || 'mar'; s.art = FOOD[s.id][0]; s.food = FOOD[s.id][1];
  const l = LIKES[s.id]; s.only = l.startsWith('!'); s.likes = l.replace('!', '').split(' ');
}
const zonesOf = (sp) => (sp.loc === 'rio' ? ZONES_RIO : ZONES_SEA);
const ele = (sp) => (sp.art === 'a' ? 'Ela' : 'Ele');
const OA = (sp) => (sp.art === 'a' ? 'A' : 'O');
const um = (sp) => (sp.art === 'a' ? 'uma' : 'um');
const sabia = (f) => 'Sabia que ' + f.charAt(0).toLowerCase() + f.slice(1);
const clean = (t) => t.replace(/["“”]/g, '').replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, '').replace(/\s+/g, ' ').trim();

const rows = [];
let section = '';
const sec = (title, note) => { section = title; rows.push({ section: title, note }); };
const add = (id, quando, texto, obs = '') => rows.push({ id, grupo: section, quando, texto: clean(texto), obs });

/* ---------------- Falas ---------------- */
sec('Abertura e conta', 'Falas da tela inicial e do login.');
add('abertura_primeira', 'Primeira vez que a criança toca em JOGAR', 'Oi! Eu sou a Iara, e vou pescar com você! Toca em Lançar pra jogar o anzol na água!');
add('abertura_volta_1', 'Ao voltar a jogar (sorteia 1 de 3)', 'Oi de novo! Que bom que você voltou! Vamos pescar?');
add('abertura_volta_2', 'Ao voltar a jogar (sorteia 1 de 3)', 'Eba, você voltou! Bora pescar uns peixes incríveis!');
add('abertura_volta_3', 'Ao voltar a jogar (sorteia 1 de 3)', 'Oi, pescador! Pronto pra mais uma aventura?');
add('conta_entrou', 'Depois de entrar com o Google', 'Oi, pescador! Seu progresso agora fica salvo na sua conta!', 'No jogo atual ela diz o primeiro nome da pessoa; a versão gravada usa "pescador".');
add('conta_saiu', 'Ao sair da conta', 'Até logo! Agora você está jogando como convidado.');
add('admin_atualizou', 'Quando o admin altera o progresso do jogador', 'Olha só! O pessoal do porto atualizou o seu jogo!');
add('evento_x2', 'Ao abrir o jogo com evento de moedas x2', 'Hoje tem evento especial: as moedas valem o dobro!', 'O aviso livre do painel admin continua com a voz do aparelho, porque o texto muda.');
add('evento_x3', 'Ao abrir o jogo com evento de moedas x3', 'Hoje tem evento especial: as moedas valem o triplo!');

sec('Pescaria', 'Falas durante a descida e a luta com o peixe.');
add('fisgou_tutorial', 'Fisgou um peixe (nas 2 primeiras pescarias)', 'Fisgou! Agora segura o botão pra puxar, e solta quando a linha ficar vermelha!');
BITES.forEach((t, i) => add(`fisgou_${i + 1}`, `Fisgou um peixe (sorteia 1 de ${BITES.length})`, t));
['Solta um pouquinho, senão a linha arrebenta!', 'Cuidado! Solta o botão!', 'Calma, solta um pouco!']
  .forEach((t, i) => add(`solta_${i + 1}`, 'Linha quase arrebentando (sorteia 1 de 3)', t, 'Tom de alerta, rápido.'));
SNAPS.forEach((t, i) => add(`arrebentou_${i + 1}`, `A linha arrebentou (sorteia 1 de ${SNAPS.length})`, t, 'Tom de consolo, carinhoso.'));
add('limite_vara', 'O anzol chegou no limite da vara', 'Sua vara chegou no limite! Vamos esperar um peixe aqui. Depois a gente junta moedas pra comprar uma vara maior!');
for (const [loc, zs] of [['mar', ZONES_SEA], ['rio', ZONES_RIO]]) {
  for (const z of zs) if (z.from > 0) add(`zona_${loc}_${z.id}`, `Primeira vez chegando em: ${z.name} (${z.from} m)`, z.hi);
}

sec('Peixe pescado (montagem)', 'O jogo toca: comemoração + "Você pescou…" + (alvo / novo / gigante ou recorde) + "Sabia que…" + "Ele come…" + (loja ou final). Cada parte é um áudio.');
CHEERS.forEach((t, i) => add(`comemora_${i + 1}`, `Início da fala ao pescar (sorteia 1 de ${CHEERS.length})`, t, 'Bem animada!'));
for (const sp of SPECIES.filter((s) => !s.legend)) add(`pescou_${sp.id}`, `Pescou: ${sp.name}`, `Você pescou ${um(sp)} ${sp.name}!`);
add('alvo_cumprido', 'Quando o peixe pescado era o alvo escolhido', 'Missão cumprida! Era o peixe que você escolheu!');
add('peixe_novo', 'Quando é a primeira vez daquele peixe', 'Peixe novo pro álbum!');
add('peixe_gigante', 'Quando o peixe veio gigante', 'E que peixe gigante!');
add('peixe_recorde', 'Quando é o maior daquela espécie', 'É o seu maior até agora!');
for (const sp of SPECIES) add(`sabia_${sp.id}`, `Curiosidade: ${sp.name}`, sabia(sp.fact), 'Tom de quem conta um segredo legal.');
for (const sp of SPECIES) add(`come_${sp.id}`, `O que come: ${sp.name}`, `${ele(sp)} ${sp.legend ? 'comia' : 'come'} ${sp.food}.`);
add('final_loja', 'Fim da fala quando já dá para comprar algo', 'E você já pode comprar coisa nova na loja!');
ENDS.forEach((t, i) => add(`final_${i + 1}`, `Fim da fala (às vezes, sorteia 1 de ${ENDS.length})`, t));
for (const sp of SPECIES) add(`nome_${sp.id}`, `Botão Ouvir do álbum: começa pelo nome (${sp.name})`, `${sp.name}!`);

sec('Megalodon', 'Momentos especiais do tubarão lendário.');
add('mega_chegando', 'O Megalodon vem na direção do anzol', 'Nossa! Tem alguma coisa enorme chegando… Será que é ele?', 'Suspense, voz mais baixa.');
add('mega_fisgou', 'O Megalodon mordeu a isca', 'É o Megalodon! Segura firme! Eu sei que você consegue!', 'Muita energia.');
add('mega_passou', 'O Megalodon passou sem a Isca Lendária', 'Você viu aquilo? Era o Megalodon! Ele só morde a Isca Lendária. Um dia a gente pega ele!');
add('mega_pescou', 'Pescou o Megalodon (antes de sabia_megalodon e come_megalodon)', 'Você conseguiu! Você pescou o Megalodon! Você é um pescador lendário!', 'O momento mais feliz do jogo!');
add('mega_orgulho', 'Fim da fala do Megalodon', 'Eu tô muito orgulhosa de você!');

sec('Mochila: escolher peixe e iscas', 'Falas da aba Escolher peixe, da troca de isca e das cores.');
for (const sp of SPECIES) {
  const z = zonesOf(sp)[sp.zone];
  add(`alvo_${sp.id}`, `Escolheu o alvo: ${sp.name}`, `Bora pescar ${sp.art === 'a' ? 'a' : 'o'} ${sp.name}! ${ele(sp)} mora ${z.at}, entre ${z.from} e ${z.to} metros.`);
}
for (const [loc, zs] of [['mar', ZONES_SEA], ['rio', ZONES_RIO]]) {
  for (const z of zs) add(`alvo_misterio_${loc}_${z.id}`, `Escolheu um peixe ainda desconhecido de: ${z.name}`, `Bora pescar esse peixe misterioso! Ele mora ${z.at}, entre ${z.from} e ${z.to} metros.`);
}
for (const b of BAITS) add(`alvo_isca_${b.id}`, `Depois de escolher o alvo, a isca colocada: ${b.name}`, `Coloquei ${b.name} no anzol!`);
add('alvo_linha_fraca', 'Depois de escolher o alvo, se a linha for fraca', 'A linha é fraquinha pra ele, então solta bastante!');
add('alvo_nenhum', 'Tirou o alvo', 'Tudo bem! Vamos pescar o que aparecer!');
for (const b of BAITS) add(`isca_${b.id}`, `Trocou a isca para: ${b.name}`, `${b.name} no anzol!`);
for (const sp of SPECIES.filter((s) => s.only && !s.legend)) {
  const fav = BAIT[sp.likes[0]];
  add(`recusou_${sp.id}`, `${sp.name} chegou perto e recusou a isca`, `${OA(sp)} ${sp.name} chegou pertinho, mas não quis essa isca. ${ele(sp)} prefere ${fav.name}!`, 'No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".');
}
for (const id of [...new Set(SPECIES.filter((s) => s.only && !s.legend).map((s) => s.likes[0]))]) {
  add(`recusou_misterio_${id}`, `Peixe desconhecido recusou a isca (ele gosta de ${BAIT[id].name})`, `Um peixe misterioso chegou perto, mas não quis essa isca. Acho que ele gosta de ${BAIT[id].name}!`);
}
for (const [id, req] of [['album10', '10 peixes no álbum'], ['album20', '20 peixes no álbum'], ['mega', 'Pesque o Megalodon']]) {
  add(`cor_bloqueada_${id}`, `Tocou numa cor bloqueada (${req})`, `Pra liberar essa cor: ${req}!`);
}

sec('Loja e viagem', 'Falas ao comprar e ao viajar entre o mar e o rio.');
for (const b of BAITS.filter((b) => b.cost > 0 && b.id !== 'lendaria')) {
  add(`compra_isca_${b.id}`, `Comprou a isca: ${b.name}`, `Uhuul! ${b.name} no anzol! Os peixes que adoram ${b.name.toLowerCase()} vão vir correndo!`);
}
add('compra_isca_lendaria', 'Comprou a Isca Lendária', 'A Isca Lendária! Agora o Megalodon vai querer morder. Vamos lá pro Abismo!', 'Empolgação máxima.');
RODS.slice(1).forEach((r, i) => add(`compra_vara_${i + 1}`, `Comprou: ${r.name}`, `Uhuul! Com a ${r.name} dá pra descer até ${r.depth} metros! Vamos descobrir peixes novos!`));
LINES.slice(1).forEach((l, i) => add(`compra_linha_${i + 1}`, `Comprou: ${l.name}`, `Que legal! Você comprou: ${l.name}!`, 'No jogo atual a frase é sorteada entre 3 jeitos; a versão gravada usa este.'));
add('compra_rio', 'Comprou a viagem para o Rio Amazonas', 'Eba! Agora a gente pode viajar pro Rio Amazonas! Toca no botão do barquinho lá em cima!');
add('viagem_rio', 'Chegou no Rio Amazonas', 'Chegamos no Rio Amazonas, o maior rio do mundo! Aqui tem piranha, tucunaré, tambaqui, pirarucu, poraquê e muito mais!');
add('viagem_mar', 'Voltou para o mar', 'De volta ao mar! Bora pescar!');

/* ---------------- Saídas ---------------- */
const clips = rows.filter((r) => r.id);
const ids = new Set(); for (const c of clips) { if (ids.has(c.id)) throw new Error(`id repetido: ${c.id}`); ids.add(c.id); }
const csvCell = (v) => { const s = String(v ?? ''); return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const csv = ['id;arquivo;grupo;quando_toca;texto;caracteres;observacao']
  .concat(clips.map((c) => [c.id, `${c.id}.mp3`, c.grupo, c.quando, c.texto, c.texto.length, c.obs].map(csvCell).join(';')));
writeFileSync(join(here, 'roteiro-narracao.csv'), '\uFEFF' + csv.join('\n') + '\n');

const totalChars = clips.reduce((a, c) => a + c.texto.length, 0);
const names = SPECIES.map((s) => s.name);
const md = [];
md.push('# Roteiro de narração: Iara, a ajudante da Pescaria Lendária', '');
md.push(`Gerado automaticamente a partir do código do jogo em ${new Date().toLocaleDateString('pt-BR')}. **${clips.length} falas**, ${totalChars.toLocaleString('pt-BR')} caracteres no total.`, '');
md.push('## A personagem', '');
md.push('- **Quem é:** Iara, uma menina sereia de uns 9 ou 10 anos, ajudante de pesca.');
md.push('- **Voz:** feminina, infantil, alegre e carinhosa. Português do Brasil, jeito informal ("pra", "bora", "tô").');
md.push('- **Ritmo:** animado, mas sem correr. Ela fala com uma criança pequena, então cada palavra precisa ficar clara.');
md.push('- **Emoções:** comemora muito quando pescam; consola com carinho quando a linha arrebenta; conta as curiosidades como quem conta um segredo legal; faz suspense com o Megalodon.', '');
md.push('## Como gravar ou gerar', '');
md.push('- Cada linha é **um áudio separado**. O nome do arquivo está na coluna `arquivo` do CSV (ex.: `pescou_tucunare.mp3`).');
md.push('- Deixe um respiro curto no começo e no fim de cada áudio, porque o jogo junta vários em sequência.');
md.push('- Formato sugerido: MP3, 44,1 kHz, mono, volume normalizado igual em todos.');
md.push('- No momento de pescar, o jogo toca na ordem: `comemora_N` → `pescou_<peixe>` → (`alvo_cumprido`) → (`peixe_novo`) → (`peixe_gigante` ou `peixe_recorde`) → `sabia_<peixe>` → `come_<peixe>` → (`final_loja` ou `final_N`).', '');
md.push('## Pronúncia', '');
md.push('Nomes que merecem atenção (sílaba forte em **negrito**):', '');
md.push('- Tucuna**ré**, Pira**í**ba, Pira**ru**cu, Arua**nã**, Jara**qui**, Pora**quê**, Tamba**qui**, Lamba**ri**, Pa**cu**, Ja**ú**');
md.push('- Cela**can**to, Megalo**don**, Espa**dar**te, Ga**rou**pa, Baia**cu**');
md.push(`- Todos os peixes: ${names.join(', ')}.`, '');
for (const r of rows) {
  if (!r.id) { md.push(`## ${r.section}`, '', r.note, '', '| Arquivo | Quando toca | Fala |', '| --- | --- | --- |'); continue; }
  const fala = r.texto.replace(/\|/g, '\\|') + (r.obs ? `<br><small>*${r.obs.replace(/\|/g, '\\|')}*</small>` : '');
  md.push(`| \`${r.id}\` | ${r.quando.replace(/\|/g, '\\|')} | ${fala} |`);
}
md.push('', '## Falas que continuam com a voz do aparelho', '');
md.push('- **Aviso livre do painel admin:** o texto é escrito na hora, então não dá para gravar antes.');
md.push('- **Primeiro nome no login:** a versão gravada usa "pescador" no lugar do nome.', '');
writeFileSync(join(here, 'roteiro-narracao.md'), md.join('\n') + '\n');

console.log(`${clips.length} falas · ${totalChars} caracteres → narracao/roteiro-narracao.csv e .md`);
