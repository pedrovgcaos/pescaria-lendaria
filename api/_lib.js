// Funções compartilhadas pelas rotas /api (arquivos com "_" não viram rotas na Vercel).
import { neon } from '@neondatabase/serverless';
import { SignJWT, jwtVerify, createRemoteJWKSet } from 'jose';

const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
export const sql = DB_URL ? neon(DB_URL) : null;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const HAS_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

export const configured = () => !!(sql && GOOGLE_CLIENT_ID);

// Cria as tabelas na primeira chamada (não precisa rodar SQL na mão).
let schemaReady = null;
export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`create table if not exists players (
        id text primary key,
        email text,
        name text,
        picture text,
        created_at timestamptz not null default now(),
        last_login timestamptz not null default now()
      )`;
      await sql`create table if not exists saves (
        player_id text primary key references players(id) on delete cascade,
        data jsonb not null,
        coins bigint not null default 0,
        album integer not null default 0,
        caught integer not null default 0,
        mega boolean not null default false,
        updated_at timestamptz not null default now()
      )`;
    })().catch((e) => { schemaReady = null; throw e; });
  }
  return schemaReady;
}

// Chave das sessões: usa SESSION_SECRET se existir; senão deriva de segredos que só o servidor conhece.
let keyPromise = null;
function sessionKey() {
  if (!keyPromise) {
    const base = process.env.SESSION_SECRET || `pescaria-lendaria:${DB_URL}:${process.env.BLOB_READ_WRITE_TOKEN || ''}`;
    keyPromise = crypto.subtle.digest('SHA-256', new TextEncoder().encode(base)).then((h) => new Uint8Array(h));
  }
  return keyPromise;
}

const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
export async function verifyGoogleCredential(credential) {
  const { payload } = await jwtVerify(credential, GOOGLE_JWKS, {
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    audience: GOOGLE_CLIENT_ID,
  });
  if (!payload.sub) throw new Error('token sem usuário');
  return payload;
}

const COOKIE = 'pl_session';
const MAX_AGE = 60 * 60 * 24 * 180; // 180 dias
export async function sessionCookie(playerId) {
  const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setSubject(playerId)
    .setIssuedAt().setExpirationTime(`${MAX_AGE}s`).sign(await sessionKey());
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
export async function sessionPlayer(request) {
  const m = (request.headers.get('cookie') || '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return null;
  try { const { payload } = await jwtVerify(m[1], await sessionKey()); return payload.sub || null; } catch { return null; }
}

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });
}

export async function loadPlayer(id) {
  const rows = await sql`select p.id, p.name, p.email, p.picture, s.data
    from players p left join saves s on s.player_id = p.id where p.id = ${id}`;
  if (!rows.length) return null;
  const r = rows[0];
  return { player: { id: r.id, name: r.name, email: r.email, picture: r.picture }, save: r.data || null };
}
