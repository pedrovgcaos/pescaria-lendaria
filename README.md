# Pescaria Lendária 🎣🦈

Jogo de pescaria educativo para crianças: canvas + JavaScript em um único HTML, com funções na Vercel para as contas.

**Jogue em:** https://pescarialendaria.housemedia.app

## Como jogar

- Toque em **LANÇAR**, e em **PARAR** na profundidade que quiser. Os peixes só mordem com o anzol parado.
- Quando um peixe morder, **segure o botão para puxar** e **solte quando a linha ficar vermelha**.
- Na **🎒 Mochila** você escolhe o peixe que quer pescar: a isca certa vai para o anzol e o anzol para sozinho na profundidade dele. Lá também dá para trocar a isca e personalizar as cores da vara, da linha e do barco.
- Na **🛒 Loja** você compra varas (descem mais fundo), linhas (aguentam peixes mais fortes), iscas e a viagem para o Rio Amazonas.
- Complete o **📖 Álbum** com os 35 peixes e pesque o **Megalodon** no Abismo.

## O que tem no jogo

- **Mar (21 peixes):** Águas Rasas, Recife de Coral, Mar Aberto, Profundezas e Abismo (até 900 m).
- **Rio Amazonas (14 peixes):** Margem, Meio do Rio, Canal Profundo e Poço do Rio (até 120 m).
- **Iscas:** cada peixe tem uma favorita, e alguns só mordem uma isca especial.
- **Iara**, a ajudante: fala com voz feminina em português (Web Speech API), conta curiosidades reais e incentiva o jogador.
- **👤 Painel do jogador:** estatísticas, sons e login com Google.

## Estrutura

| Arquivo | Para quê |
| --- | --- |
| `pescaria-lendaria.html` | Fonte do jogo (também publicada como artefato do Claude). |
| `index.html` | Página do site, gerada com `node build-index.mjs`. |
| `api/` | Funções da Vercel: login Google, progresso no Neon e cópias de segurança no Blob. |

Depois de editar `pescaria-lendaria.html`, rode `node build-index.mjs` e faça o commit dos dois arquivos. A Vercel publica a cada push na `main`.

## Contas (Google + Neon + Vercel Blob)

O login está ligado em `pescarialendaria.housemedia.app`. Sem login, o jogo funciona como convidado (progresso no navegador). Dentro do Claude (artefato) é sempre convidado.

O que está configurado:

- **Neon:** banco `pescaria-lendaria-db` (plano Free, região `iad1`, a mesma das funções), conectado ao projeto com o prefixo `DATABASE` (`DATABASE_URL`). As tabelas `players` e `saves` são criadas automaticamente no primeiro login.
- **Google Cloud:** projeto `pescaria-lendaria` da conta `housemediabrasil@gmail.com`. A tela de consentimento "Pescaria Lendária" é externa e está em produção, só com nome, e-mail e foto. O ID do cliente OAuth Web `Pescaria Lendaria Web` tem a origem `https://pescarialendaria.housemedia.app`. Não usamos Client Secret nem URI de redirecionamento.
- **Vercel:** variável `GOOGLE_CLIENT_ID` com o ID desse cliente.
- **Blob:** store `pescaria-lendaria-blob` (privado, `gru1`) conectado com `BLOB_READ_WRITE_TOKEN`. Ele guarda uma cópia de segurança diária do progresso de cada conta em `backups/<conta>/<data>.json`.
- **Páginas legais** exigidas pelo Google: `privacidade.html` e `termos.html`.

Para usar outro domínio, adicione a origem no ID do cliente OAuth (Google Cloud → Google Auth Platform → Clientes) e o domínio em *Branding → Domínios autorizados*.

Opcional: defina `SESSION_SECRET` (texto aleatório longo) para assinar as sessões. Sem ela, a chave é derivada das credenciais do banco.

### Rotas

- `GET /api/config`: se o login está ligado e qual Client ID usar.
- `POST /api/auth`: recebe o token do botão do Google, confere a assinatura e abre a sessão (cookie `HttpOnly`).
- `DELETE /api/auth`: sai da conta.
- `GET /api/me`: conta logada e progresso.
- `PUT /api/save`: grava o progresso (e a cópia diária no Blob).
