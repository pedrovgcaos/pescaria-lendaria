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

Sem configuração, o jogo funciona como convidado (progresso salvo no navegador). Para ligar o login:

1. **Neon:** no projeto da Vercel → *Storage* → *Create Database* → **Neon** (região São Paulo, `gru1`) e conecte ao projeto `pescaria-lendaria`. Isso cria a variável `DATABASE_URL`. As tabelas `players` e `saves` são criadas automaticamente no primeiro login.
2. **Google:** no Google Cloud Console → *APIs e serviços* → *Credenciais* → *Criar ID do cliente OAuth* → tipo **Aplicativo da Web**. Em *Origens JavaScript autorizadas*, adicione `https://pescarialendaria.housemedia.app` e `https://pescaria-lendaria.vercel.app`. Não é preciso URI de redirecionamento nem Client Secret.
3. Na Vercel, crie a variável de ambiente `GOOGLE_CLIENT_ID` com o ID do cliente (termina em `.apps.googleusercontent.com`) e faça um novo deploy.
4. **Blob:** o store `pescaria-lendaria-blob` (privado) já está conectado (`BLOB_READ_WRITE_TOKEN`). Ele guarda uma cópia de segurança diária do progresso de cada conta em `backups/<conta>/<data>.json`.

Opcional: defina `SESSION_SECRET` (texto aleatório longo) para assinar as sessões. Sem ela, a chave é derivada das credenciais do banco.

### Rotas

- `GET /api/config`: se o login está ligado e qual Client ID usar.
- `POST /api/auth`: recebe o token do botão do Google, confere a assinatura e abre a sessão (cookie `HttpOnly`).
- `DELETE /api/auth`: sai da conta.
- `GET /api/me`: conta logada e progresso.
- `PUT /api/save`: grava o progresso (e a cópia diária no Blob).
