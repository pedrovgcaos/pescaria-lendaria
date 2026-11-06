// GET /api/ranking?por=album|moedas|lendarios|pescados → top 20 + a posição de quem está logado.
// Por privacidade (jogadores são crianças): mostra só o primeiro nome e a inicial do sobrenome, sem e-mail e sem foto.
import { configured, ensureSchema, sql, sessionPlayer, json } from './_lib.js';

const LEGENDS = ['tubaraobaleia', 'dunkleosteus', 'kraken', 'megalodon', 'megapiranha', 'boiuna'];
const METRICS = {
  album: 'album',
  moedas: 'earned',
  lendarios: 'legends',
  pescados: 'caught',
};

function shortName(name) {
  const parts = String(name || 'Pescador').trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
}

export async function GET(request) {
  if (!configured()) return json({ error: 'Ranking disponível só no site com login.' }, 503);
  await ensureSchema();
  const url = new URL(request.url);
  const key = METRICS[url.searchParams.get('por')] ? url.searchParams.get('por') : 'album';
  const col = sql.unsafe(METRICS[key]);
  const me = await sessionPlayer(request);
  const rows = await sql`with base as (
      select p.id, p.name, p.created_at,
        s.album::int as album, s.caught::int as caught,
        coalesce((s.data->'stats'->>'earned')::bigint, 0) as earned,
        (select count(*) from jsonb_object_keys(coalesce(s.data->'album', '{}'::jsonb)) k where k = any(${LEGENDS}))::int as legends
      from players p join saves s on s.player_id = p.id
      where coalesce((s.data->>'hideRank')::boolean, false) = false
    ), ranked as (
      select *, rank() over (order by ${col} desc) as pos, row_number() over (order by ${col} desc, created_at asc) as rn from base
    )
    select id, name, album, caught, earned, legends, pos::int as pos, rn from ranked
    where rn <= 20 or id = ${me || ''} order by rn limit 21`;
  const top = rows.map((r) => ({
    pos: r.pos, name: shortName(r.name), me: !!me && r.id === me,
    value: Number(r[METRICS[key]] || 0), album: r.album, caught: r.caught, earned: Number(r.earned), legends: r.legends,
  }));
  const [{ n }] = await sql`select count(*)::int as n from saves s where coalesce((s.data->>'hideRank')::boolean, false) = false`;
  return json({ por: key, total: n, top, logged: !!me });
}
