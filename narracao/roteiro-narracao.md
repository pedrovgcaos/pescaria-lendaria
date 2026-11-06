# Roteiro de narração: Iara, a ajudante da Pescaria Lendária

Gerado automaticamente a partir do código do jogo em 06/11/2026. **328 falas**, 17.341 caracteres no total.

## A personagem

- **Quem é:** Iara, uma menina sereia de uns 9 ou 10 anos, ajudante de pesca.
- **Voz:** feminina, infantil, alegre e carinhosa. Português do Brasil, jeito informal ("pra", "bora", "tô").
- **Ritmo:** animado, mas sem correr. Ela fala com uma criança pequena, então cada palavra precisa ficar clara.
- **Emoções:** comemora muito quando pescam; consola com carinho quando a linha arrebenta; conta as curiosidades como quem conta um segredo legal; faz suspense com o Megalodon.

## Como gravar ou gerar

- Cada linha é **um áudio separado**. O nome do arquivo está na coluna `arquivo` do CSV (ex.: `pescou_tucunare.mp3`).
- Deixe um respiro curto no começo e no fim de cada áudio, porque o jogo junta vários em sequência.
- Formato sugerido: MP3, 44,1 kHz, mono, volume normalizado igual em todos.
- No momento de pescar, o jogo toca na ordem: `comemora_N` → `pescou_<peixe>` → (`alvo_cumprido`) → (`peixe_novo`) → (`peixe_gigante` ou `peixe_recorde`) → `sabia_<peixe>` → `come_<peixe>` → (`final_loja` ou `final_N`).

## Pronúncia

Nomes que merecem atenção (sílaba forte em **negrito**):

- Tucuna**ré**, Pira**í**ba, Pira**ru**cu, Arua**nã**, Jara**qui**, Pora**quê**, Tamba**qui**, Lamba**ri**, Pa**cu**, Ja**ú**
- Cela**can**to, Megalo**don**, Espa**dar**te, Ga**rou**pa, Baia**cu**
- Todos os peixes: Sardinha, Tainha, Baiacu, Peixe-palhaço, Peixe-cirurgião, Peixe-papagaio, Garoupa, Arraia, Atum, Dourado-do-mar, Tubarão-martelo, Espadarte, Peixe-lanterna, Peixe-víbora, Peixe-diabo-negro, Celacanto, Peixe-remo, Tubarão-duende, Lula-colossal, Tubarão-da-Groenlândia, Tubarão-baleia, Dunkleosteus, Kraken, Megalodon, Lambari, Piranha, Pacu, Aruanã, Jaraqui, Tucunaré, Tambaqui, Pirarucu, Arraia-de-fogo, Poraquê, Pintado, Dourada, Jaú, Piraíba, Megapiranha, Boiúna.

## Abertura e conta

Falas da tela inicial e do login.

| Arquivo | Quando toca | Fala |
| --- | --- | --- |
| `abertura_primeira` | Primeira vez que a criança toca em JOGAR | Oi! Eu sou a Iara, e vou pescar com você! Toca em Lançar pra jogar o anzol na água! |
| `abertura_volta_1` | Ao voltar a jogar (sorteia 1 de 3) | Oi de novo! Que bom que você voltou! Vamos pescar? |
| `abertura_volta_2` | Ao voltar a jogar (sorteia 1 de 3) | Eba, você voltou! Bora pescar uns peixes incríveis! |
| `abertura_volta_3` | Ao voltar a jogar (sorteia 1 de 3) | Oi, pescador! Pronto pra mais uma aventura? |
| `conta_entrou` | Depois de entrar com o Google | Oi, pescador! Seu progresso agora fica salvo na sua conta!<br><small>*No jogo atual ela diz o primeiro nome da pessoa; a versão gravada usa "pescador".*</small> |
| `conta_saiu` | Ao sair da conta | Até logo! Agora você está jogando como convidado. |
| `admin_atualizou` | Quando o admin altera o progresso do jogador | Olha só! O pessoal do porto atualizou o seu jogo! |
| `evento_x2` | Ao abrir o jogo com evento de moedas x2 | Hoje tem evento especial: as moedas valem o dobro!<br><small>*O aviso livre do painel admin continua com a voz do aparelho, porque o texto muda.*</small> |
| `evento_x3` | Ao abrir o jogo com evento de moedas x3 | Hoje tem evento especial: as moedas valem o triplo! |
## Pescaria

Falas durante a descida e a luta com o peixe.

| Arquivo | Quando toca | Fala |
| --- | --- | --- |
| `fisgou_tutorial` | Fisgou um peixe (nas 2 primeiras pescarias) | Fisgou! Agora segura o botão pra puxar, e solta quando a linha ficar vermelha! |
| `fisgou_1` | Fisgou um peixe (sorteia 1 de 4) | Fisgou! Segura firme! |
| `fisgou_2` | Fisgou um peixe (sorteia 1 de 4) | Peixe na linha! Puxa! |
| `fisgou_3` | Fisgou um peixe (sorteia 1 de 4) | Opa, mordeu! Vai, você consegue! |
| `fisgou_4` | Fisgou um peixe (sorteia 1 de 4) | Pegou um! Puxa com calma! |
| `solta_1` | Linha quase arrebentando (sorteia 1 de 3) | Solta um pouquinho, senão a linha arrebenta!<br><small>*Tom de alerta, rápido.*</small> |
| `solta_2` | Linha quase arrebentando (sorteia 1 de 3) | Cuidado! Solta o botão!<br><small>*Tom de alerta, rápido.*</small> |
| `solta_3` | Linha quase arrebentando (sorteia 1 de 3) | Calma, solta um pouco!<br><small>*Tom de alerta, rápido.*</small> |
| `arrebentou_1` | A linha arrebentou (sorteia 1 de 3) | Ah, que pena! Tudo bem, todo pescador perde um peixe às vezes. Tenta de novo!<br><small>*Tom de consolo, carinhoso.*</small> |
| `arrebentou_2` | A linha arrebentou (sorteia 1 de 3) | Ops, a linha arrebentou! Não desiste não. Da próxima vez, solta quando ficar vermelho!<br><small>*Tom de consolo, carinhoso.*</small> |
| `arrebentou_3` | A linha arrebentou (sorteia 1 de 3) | Quase! Você foi muito bem. Lembra: quando a linha ficar vermelha, solta um pouquinho!<br><small>*Tom de consolo, carinhoso.*</small> |
| `limite_vara` | O anzol chegou no limite da vara | Sua vara chegou no limite! Vamos esperar um peixe aqui. Depois a gente junta moedas pra comprar uma vara maior! |
| `zona_mar_1` | Primeira vez chegando em: Recife de Coral (50 m) | Uau! Chegamos no Recife de Coral! Olha quantos peixes coloridos! |
| `zona_mar_2` | Primeira vez chegando em: Mar Aberto (150 m) | Chegamos no Mar Aberto! Aqui moram os peixes mais rápidos do mar! |
| `zona_mar_3` | Primeira vez chegando em: Profundezas (300 m) | Nossa, tá ficando escuro! Bem-vindo às Profundezas. Aqui tem peixe que brilha! |
| `zona_mar_4` | Primeira vez chegando em: Abismo (550 m) | Chegamos no Abismo, o lugar mais fundo do mar! Dizem que o Megalodon mora aqui… |
| `zona_rio_1` | Primeira vez chegando em: Meio do Rio (20 m) | Chegamos no Meio do Rio! Aqui moram o tucunaré e o tambaqui! |
| `zona_rio_2` | Primeira vez chegando em: Canal Profundo (50 m) | Chegamos no Canal Profundo! Cuidado com o poraquê, o peixe-elétrico! |
| `zona_rio_3` | Primeira vez chegando em: Poço do Rio (90 m) | Uau, o Poço do Rio! É aqui que moram os bagres gigantes da Amazônia! |
## Peixe pescado (montagem)

O jogo toca: comemoração + "Você pescou…" + (alvo / novo / gigante ou recorde) + "Sabia que…" + "Ele come…" + (loja ou final). Cada parte é um áudio.

| Arquivo | Quando toca | Fala |
| --- | --- | --- |
| `comemora_1` | Início da fala ao pescar (sorteia 1 de 9) | Oba!<br><small>*Bem animada!*</small> |
| `comemora_2` | Início da fala ao pescar (sorteia 1 de 9) | Uhuul!<br><small>*Bem animada!*</small> |
| `comemora_3` | Início da fala ao pescar (sorteia 1 de 9) | Muito bem!<br><small>*Bem animada!*</small> |
| `comemora_4` | Início da fala ao pescar (sorteia 1 de 9) | Que demais!<br><small>*Bem animada!*</small> |
| `comemora_5` | Início da fala ao pescar (sorteia 1 de 9) | Arrasou!<br><small>*Bem animada!*</small> |
| `comemora_6` | Início da fala ao pescar (sorteia 1 de 9) | Você é fera!<br><small>*Bem animada!*</small> |
| `comemora_7` | Início da fala ao pescar (sorteia 1 de 9) | Incrível!<br><small>*Bem animada!*</small> |
| `comemora_8` | Início da fala ao pescar (sorteia 1 de 9) | Mandou bem!<br><small>*Bem animada!*</small> |
| `comemora_9` | Início da fala ao pescar (sorteia 1 de 9) | Show de bola!<br><small>*Bem animada!*</small> |
| `pescou_sardinha` | Pescou: Sardinha | Você pescou uma Sardinha! |
| `pescou_tainha` | Pescou: Tainha | Você pescou uma Tainha! |
| `pescou_baiacu` | Pescou: Baiacu | Você pescou um Baiacu! |
| `pescou_palhaco` | Pescou: Peixe-palhaço | Você pescou um Peixe-palhaço! |
| `pescou_cirurgiao` | Pescou: Peixe-cirurgião | Você pescou um Peixe-cirurgião! |
| `pescou_papagaio` | Pescou: Peixe-papagaio | Você pescou um Peixe-papagaio! |
| `pescou_garoupa` | Pescou: Garoupa | Você pescou uma Garoupa! |
| `pescou_arraia` | Pescou: Arraia | Você pescou uma Arraia! |
| `pescou_atum` | Pescou: Atum | Você pescou um Atum! |
| `pescou_dourado` | Pescou: Dourado-do-mar | Você pescou um Dourado-do-mar! |
| `pescou_martelo` | Pescou: Tubarão-martelo | Você pescou um Tubarão-martelo! |
| `pescou_espadarte` | Pescou: Espadarte | Você pescou um Espadarte! |
| `pescou_lanterna` | Pescou: Peixe-lanterna | Você pescou um Peixe-lanterna! |
| `pescou_vibora` | Pescou: Peixe-víbora | Você pescou um Peixe-víbora! |
| `pescou_diabo` | Pescou: Peixe-diabo-negro | Você pescou um Peixe-diabo-negro! |
| `pescou_celacanto` | Pescou: Celacanto | Você pescou um Celacanto! |
| `pescou_remo` | Pescou: Peixe-remo | Você pescou um Peixe-remo! |
| `pescou_duende` | Pescou: Tubarão-duende | Você pescou um Tubarão-duende! |
| `pescou_lula` | Pescou: Lula-colossal | Você pescou uma Lula-colossal! |
| `pescou_groenlandia` | Pescou: Tubarão-da-Groenlândia | Você pescou um Tubarão-da-Groenlândia! |
| `pescou_lambari` | Pescou: Lambari | Você pescou um Lambari! |
| `pescou_piranha` | Pescou: Piranha | Você pescou uma Piranha! |
| `pescou_pacu` | Pescou: Pacu | Você pescou um Pacu! |
| `pescou_aruana` | Pescou: Aruanã | Você pescou um Aruanã! |
| `pescou_jaraqui` | Pescou: Jaraqui | Você pescou um Jaraqui! |
| `pescou_tucunare` | Pescou: Tucunaré | Você pescou um Tucunaré! |
| `pescou_tambaqui` | Pescou: Tambaqui | Você pescou um Tambaqui! |
| `pescou_pirarucu` | Pescou: Pirarucu | Você pescou um Pirarucu! |
| `pescou_arraiafogo` | Pescou: Arraia-de-fogo | Você pescou uma Arraia-de-fogo! |
| `pescou_poraque` | Pescou: Poraquê | Você pescou um Poraquê! |
| `pescou_pintado` | Pescou: Pintado | Você pescou um Pintado! |
| `pescou_dourada` | Pescou: Dourada | Você pescou uma Dourada! |
| `pescou_jau` | Pescou: Jaú | Você pescou um Jaú! |
| `pescou_piraiba` | Pescou: Piraíba | Você pescou uma Piraíba! |
| `alvo_cumprido` | Quando o peixe pescado era o alvo escolhido | Missão cumprida! Era o peixe que você escolheu! |
| `peixe_novo` | Quando é a primeira vez daquele peixe | Peixe novo pro álbum! |
| `peixe_gigante` | Quando o peixe veio gigante | E que peixe gigante! |
| `peixe_recorde` | Quando é o maior daquela espécie | É o seu maior até agora! |
| `peixe_raro` | Quando o peixe pescado é o raro dourado (logo depois de "Você pescou…") | Uau, é um peixe raro, todo dourado! Ele vale muito mais!<br><small>*Surpresa e alegria!*</small> |
| `sabia_sardinha` | Curiosidade: Sardinha | Sabia que sardinhas nadam em cardumes gigantes, com milhares de peixinhos juntos!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_tainha` | Curiosidade: Tainha | Sabia que a tainha é famosa por dar pulos para fora da água!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_baiacu` | Curiosidade: Baiacu | Sabia que quando leva um susto, o baiacu se enche de água e vira uma bola cheia de espinhos!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_palhaco` | Curiosidade: Peixe-palhaço | Sabia que o peixe-palhaço mora dentro das anêmonas, que protegem ele dos peixes maiores.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_cirurgiao` | Curiosidade: Peixe-cirurgião | Sabia que ele tem uma lâmina afiada perto do rabo, parecida com o bisturi de um cirurgião!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_papagaio` | Curiosidade: Peixe-papagaio | Sabia que o peixe-papagaio come coral e faz cocô de areia! Muitas praias de areia branca vêm dele.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_garoupa` | Curiosidade: Garoupa | Sabia que a garoupa é um peixão do recife que abre a boca bem rápido e engole a comida de uma vez!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_arraia` | Curiosidade: Arraia | Sabia que a arraia parece voar debaixo da água, batendo as nadadeiras como se fossem asas.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_atum` | Curiosidade: Atum | Sabia que o atum é um dos peixes mais rápidos do mar e passa a vida inteira nadando sem parar!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_dourado` | Curiosidade: Dourado-do-mar | Sabia que o dourado brilha em verde, azul e amarelo, e pode mudar de cor rapidinho!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_martelo` | Curiosidade: Tubarão-martelo | Sabia que a cabeça em forma de martelo deixa os olhos bem separados, e ele enxerga quase tudo ao redor!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_espadarte` | Curiosidade: Espadarte | Sabia que o espadarte tem um nariz comprido em forma de espada, que usa para caçar no meio dos cardumes.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_lanterna` | Curiosidade: Peixe-lanterna | Sabia que ele tem luzinhas no corpo que piscam no escuro do fundo do mar!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_vibora` | Curiosidade: Peixe-víbora | Sabia que os dentes do peixe-víbora são tão compridos que não cabem dentro da boca dele!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_diabo` | Curiosidade: Peixe-diabo-negro | Sabia que ele carrega uma lanterninha na cabeça para atrair outros peixes até a sua boca gigante.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_celacanto` | Curiosidade: Celacanto | Sabia que o celacanto é um fóssil vivo: os cientistas achavam que ele tinha sumido junto com os dinossauros!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_remo` | Curiosidade: Peixe-remo | Sabia que o peixe-remo é o peixe com ossos mais comprido do mundo: pode passar de 8 metros!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_duende` | Curiosidade: Tubarão-duende | Sabia que quando vai morder, a boca do tubarão-duende pula para fora, como um estilingue!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_lula` | Curiosidade: Lula-colossal | Sabia que a lula-colossal tem os maiores olhos de todos os animais: do tamanho de uma bola de futebol!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_groenlandia` | Curiosidade: Tubarão-da-Groenlândia | Sabia que ele pode viver mais de 250 anos! Nenhum outro animal com coluna vive tanto tempo.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_tubaraobaleia` | Curiosidade: Tubarão-baleia | Sabia que o tubarão-baleia é o maior peixe do mundo, maior que um ônibus! Mesmo gigante, ele é calmo e come bichinhos minúsculos.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_dunkleosteus` | Curiosidade: Dunkleosteus | Sabia que o Dunkleosteus viveu há 360 milhões de anos e tinha uma armadura de osso na cabeça. Em vez de dentes, cortava a comida com lâminas na boca!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_kraken` | Curiosidade: Kraken | Sabia que o Kraken é um monstro das lendas dos marinheiros do norte da Europa: diziam que era tão grande que parecia uma ilha! A lenda pode ter nascido da lula-gigante, que existe de verdade.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_megalodon` | Curiosidade: Megalodon | Sabia que o megalodon viveu há milhões de anos e foi o maior tubarão que já existiu! Cada dente era maior que a mão de um adulto.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_lambari` | Curiosidade: Lambari | Sabia que o lambari é pequenininho e vive em cardumes. Muitos peixes grandes do rio adoram comer lambari!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_piranha` | Curiosidade: Piranha | Sabia que a piranha tem dentes afiados que se encaixam como uma tesoura! Ela vive em grupos nos rios da Amazônia.<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_pacu` | Curiosidade: Pacu | Sabia que o pacu é primo da piranha, mas é bonzinho: come frutas e sementes, e tem dentes parecidos com os de gente!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_aruana` | Curiosidade: Aruanã | Sabia que o aruanã é chamado de macaco-d'água: ele pula até dois metros para fora do rio para pegar insetos nos galhos!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_jaraqui` | Curiosidade: Jaraqui | Sabia que em Manaus tem um ditado: quem come jaraqui não sai mais daqui!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_tucunare` | Curiosidade: Tucunaré | Sabia que o tucunaré tem uma pinta no rabo que parece um olho. Ela engana os predadores, que atacam o lado errado!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_tambaqui` | Curiosidade: Tambaqui | Sabia que o tambaqui come frutas que caem das árvores e espalha as sementes pelo rio. Ele ajuda a plantar a floresta!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_pirarucu` | Curiosidade: Pirarucu | Sabia que o pirarucu é um dos maiores peixes de rio do mundo e precisa subir até a superfície para respirar ar!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_arraiafogo` | Curiosidade: Arraia-de-fogo | Sabia que a arraia-de-fogo tem pintas laranja e um ferrão no rabo. Ela se esconde na areia do fundo do rio!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_poraque` | Curiosidade: Poraquê | Sabia que o poraquê é o peixe-elétrico da Amazônia: ele dá choques de até 800 volts para caçar e se defender!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_pintado` | Curiosidade: Pintado | Sabia que o pintado, também chamado de surubim, é um bagre cheio de pintas que caça de noite usando os bigodes!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_dourada` | Curiosidade: Dourada | Sabia que a dourada faz a maior viagem de todos os peixes de rio: nada mais de 11 mil quilômetros, das montanhas dos Andes até o mar e de volta!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_jau` | Curiosidade: Jaú | Sabia que o jaú é um bagre enorme e muito forte que mora nos poços mais fundos e nas corredeiras do rio!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_piraiba` | Curiosidade: Piraíba | Sabia que a piraíba é o maior bagre da Amazônia: pode passar de 2 metros e meio e tem bigodes compridos para sentir a comida!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_megapiranha` | Curiosidade: Megapiranha | Sabia que a megapiranha viveu há uns 8 milhões de anos nos rios da América do Sul e era bem maior que as piranhas de hoje, com dentes em zigue-zague!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `sabia_boiuna` | Curiosidade: Boiúna | Sabia que a Boiúna, ou Cobra-Grande, é uma lenda da Amazônia: dizem que é uma cobra enorme com olhos que brilham como lanternas no rio!<br><small>*Tom de quem conta um segredo legal.*</small> |
| `come_sardinha` | O que come: Sardinha | Ela come plâncton, que são bichinhos minúsculos que flutuam na água. |
| `come_tainha` | O que come: Tainha | Ela come algas e restinhos de plantas do fundo. |
| `come_baiacu` | O que come: Baiacu | Ele come mariscos, caranguejos e ouriços. |
| `come_palhaco` | O que come: Peixe-palhaço | Ele come algas e bichinhos pequenos. |
| `come_cirurgiao` | O que come: Peixe-cirurgião | Ele come algas. |
| `come_papagaio` | O que come: Peixe-papagaio | Ele come as algas que crescem no coral. |
| `come_garoupa` | O que come: Garoupa | Ela come peixes, polvos e caranguejos. |
| `come_arraia` | O que come: Arraia | Ela come mariscos e camarões escondidos na areia. |
| `come_atum` | O que come: Atum | Ele come peixes pequenos e lulas. |
| `come_dourado` | O que come: Dourado-do-mar | Ele come peixes-voadores e lulas. |
| `come_martelo` | O que come: Tubarão-martelo | Ele come peixes e arraias. |
| `come_espadarte` | O que come: Espadarte | Ele come peixes e lulas. |
| `come_lanterna` | O que come: Peixe-lanterna | Ele come plâncton. |
| `come_vibora` | O que come: Peixe-víbora | Ele come peixes pequenos. |
| `come_diabo` | O que come: Peixe-diabo-negro | Ele come os peixes que chegam perto da sua luz. |
| `come_celacanto` | O que come: Celacanto | Ele come peixes e lulas. |
| `come_remo` | O que come: Peixe-remo | Ele come plâncton e camarõezinhos. |
| `come_duende` | O que come: Tubarão-duende | Ele come peixes, lulas e camarões. |
| `come_lula` | O que come: Lula-colossal | Ela come peixes do fundo do mar. |
| `come_groenlandia` | O que come: Tubarão-da-Groenlândia | Ele come peixes, focas e quase tudo o que encontra. |
| `come_tubaraobaleia` | O que come: Tubarão-baleia | Ele come plâncton e peixinhos bem pequenos. |
| `come_dunkleosteus` | O que come: Dunkleosteus | Ele comia outros peixes grandes da sua época. |
| `come_kraken` | O que come: Kraken | Ele come peixes, baleias e, nas histórias dos marinheiros, até navios inteiros. |
| `come_megalodon` | O que come: Megalodon | Ele comia baleias e outros animais grandes do mar. |
| `come_lambari` | O que come: Lambari | Ele come sementes, insetos e bichinhos. |
| `come_piranha` | O que come: Piranha | Ela come peixes, sementes e frutas que caem na água. |
| `come_pacu` | O que come: Pacu | Ele come frutas e sementes. |
| `come_aruana` | O que come: Aruanã | Ele come insetos, aranhas e até passarinhos. |
| `come_jaraqui` | O que come: Jaraqui | Ele come o lodo e as algas das pedras e dos galhos. |
| `come_tucunare` | O que come: Tucunaré | Ele come outros peixes. |
| `come_tambaqui` | O que come: Tambaqui | Ele come frutas e sementes que caem das árvores. |
| `come_pirarucu` | O que come: Pirarucu | Ele come peixes. |
| `come_arraiafogo` | O que come: Arraia-de-fogo | Ela come caramujos, camarões e peixinhos. |
| `come_poraque` | O que come: Poraquê | Ele come peixes e camarões. |
| `come_pintado` | O que come: Pintado | Ele come peixes. |
| `come_dourada` | O que come: Dourada | Ela come peixes. |
| `come_jau` | O que come: Jaú | Ele come peixes. |
| `come_piraiba` | O que come: Piraíba | Ela come peixes. |
| `come_megapiranha` | O que come: Megapiranha | Ela comia peixes grandes. |
| `come_boiuna` | O que come: Boiúna | Ela come peixes e tudo o que cai no rio, segundo a lenda. |
| `final_loja` | Fim da fala quando já dá para comprar algo | E você já pode comprar coisa nova na loja! |
| `final_1` | Fim da fala (às vezes, sorteia 1 de 5) | Continua assim! |
| `final_2` | Fim da fala (às vezes, sorteia 1 de 5) | Você está ficando craque! |
| `final_3` | Fim da fala (às vezes, sorteia 1 de 5) | Que pescador esperto! |
| `final_4` | Fim da fala (às vezes, sorteia 1 de 5) | Bora pescar mais um? |
| `final_5` | Fim da fala (às vezes, sorteia 1 de 5) | Eu adoro pescar com você! |
| `nome_sardinha` | Botão Ouvir do álbum: começa pelo nome (Sardinha) | Sardinha! |
| `nome_tainha` | Botão Ouvir do álbum: começa pelo nome (Tainha) | Tainha! |
| `nome_baiacu` | Botão Ouvir do álbum: começa pelo nome (Baiacu) | Baiacu! |
| `nome_palhaco` | Botão Ouvir do álbum: começa pelo nome (Peixe-palhaço) | Peixe-palhaço! |
| `nome_cirurgiao` | Botão Ouvir do álbum: começa pelo nome (Peixe-cirurgião) | Peixe-cirurgião! |
| `nome_papagaio` | Botão Ouvir do álbum: começa pelo nome (Peixe-papagaio) | Peixe-papagaio! |
| `nome_garoupa` | Botão Ouvir do álbum: começa pelo nome (Garoupa) | Garoupa! |
| `nome_arraia` | Botão Ouvir do álbum: começa pelo nome (Arraia) | Arraia! |
| `nome_atum` | Botão Ouvir do álbum: começa pelo nome (Atum) | Atum! |
| `nome_dourado` | Botão Ouvir do álbum: começa pelo nome (Dourado-do-mar) | Dourado-do-mar! |
| `nome_martelo` | Botão Ouvir do álbum: começa pelo nome (Tubarão-martelo) | Tubarão-martelo! |
| `nome_espadarte` | Botão Ouvir do álbum: começa pelo nome (Espadarte) | Espadarte! |
| `nome_lanterna` | Botão Ouvir do álbum: começa pelo nome (Peixe-lanterna) | Peixe-lanterna! |
| `nome_vibora` | Botão Ouvir do álbum: começa pelo nome (Peixe-víbora) | Peixe-víbora! |
| `nome_diabo` | Botão Ouvir do álbum: começa pelo nome (Peixe-diabo-negro) | Peixe-diabo-negro! |
| `nome_celacanto` | Botão Ouvir do álbum: começa pelo nome (Celacanto) | Celacanto! |
| `nome_remo` | Botão Ouvir do álbum: começa pelo nome (Peixe-remo) | Peixe-remo! |
| `nome_duende` | Botão Ouvir do álbum: começa pelo nome (Tubarão-duende) | Tubarão-duende! |
| `nome_lula` | Botão Ouvir do álbum: começa pelo nome (Lula-colossal) | Lula-colossal! |
| `nome_groenlandia` | Botão Ouvir do álbum: começa pelo nome (Tubarão-da-Groenlândia) | Tubarão-da-Groenlândia! |
| `nome_tubaraobaleia` | Botão Ouvir do álbum: começa pelo nome (Tubarão-baleia) | Tubarão-baleia! |
| `nome_dunkleosteus` | Botão Ouvir do álbum: começa pelo nome (Dunkleosteus) | Dunkleosteus! |
| `nome_kraken` | Botão Ouvir do álbum: começa pelo nome (Kraken) | Kraken! |
| `nome_megalodon` | Botão Ouvir do álbum: começa pelo nome (Megalodon) | Megalodon! |
| `nome_lambari` | Botão Ouvir do álbum: começa pelo nome (Lambari) | Lambari! |
| `nome_piranha` | Botão Ouvir do álbum: começa pelo nome (Piranha) | Piranha! |
| `nome_pacu` | Botão Ouvir do álbum: começa pelo nome (Pacu) | Pacu! |
| `nome_aruana` | Botão Ouvir do álbum: começa pelo nome (Aruanã) | Aruanã! |
| `nome_jaraqui` | Botão Ouvir do álbum: começa pelo nome (Jaraqui) | Jaraqui! |
| `nome_tucunare` | Botão Ouvir do álbum: começa pelo nome (Tucunaré) | Tucunaré! |
| `nome_tambaqui` | Botão Ouvir do álbum: começa pelo nome (Tambaqui) | Tambaqui! |
| `nome_pirarucu` | Botão Ouvir do álbum: começa pelo nome (Pirarucu) | Pirarucu! |
| `nome_arraiafogo` | Botão Ouvir do álbum: começa pelo nome (Arraia-de-fogo) | Arraia-de-fogo! |
| `nome_poraque` | Botão Ouvir do álbum: começa pelo nome (Poraquê) | Poraquê! |
| `nome_pintado` | Botão Ouvir do álbum: começa pelo nome (Pintado) | Pintado! |
| `nome_dourada` | Botão Ouvir do álbum: começa pelo nome (Dourada) | Dourada! |
| `nome_jau` | Botão Ouvir do álbum: começa pelo nome (Jaú) | Jaú! |
| `nome_piraiba` | Botão Ouvir do álbum: começa pelo nome (Piraíba) | Piraíba! |
| `nome_megapiranha` | Botão Ouvir do álbum: começa pelo nome (Megapiranha) | Megapiranha! |
| `nome_boiuna` | Botão Ouvir do álbum: começa pelo nome (Boiúna) | Boiúna! |
## Megalodon

Momentos especiais do tubarão lendário.

| Arquivo | Quando toca | Fala |
| --- | --- | --- |
| `mega_chegando` | O Megalodon vem na direção do anzol | Nossa! Tem alguma coisa enorme chegando… Será que é ele?<br><small>*Suspense, voz mais baixa.*</small> |
| `mega_fisgou` | O Megalodon mordeu a isca | É o Megalodon! Segura firme! Eu sei que você consegue!<br><small>*Muita energia.*</small> |
| `mega_passou` | O Megalodon passou sem a Isca Lendária | Você viu aquilo? Era o Megalodon! Ele só morde a Isca Lendária. Um dia a gente pega ele! |
| `mega_pescou` | Pescou o Megalodon (antes de sabia_megalodon e come_megalodon) | Você conseguiu! Você pescou o Megalodon! Você é um pescador lendário!<br><small>*O momento mais feliz do jogo!*</small> |
| `mega_orgulho` | Fim da fala de qualquer lendário pescado | Eu tô muito orgulhosa de você! |
| `lenda_fisgou_tubaraobaleia` | Lendário mordeu a isca: Tubarão-baleia | É o Tubarão-baleia! Segura firme! Eu sei que você consegue!<br><small>*Muita energia.*</small> |
| `lenda_passou_tubaraobaleia` | Tubarão-baleia passou sem a Isca Lendária | Você viu aquilo? Era o Tubarão-baleia! Ele só morde a Isca Lendária. Um dia a gente pega! |
| `lenda_pescou_tubaraobaleia` | Pescou: Tubarão-baleia (antes de sabia_ e come_) | Você conseguiu! Você pescou o Tubarão-baleia! Você é um pescador lendário!<br><small>*O momento mais feliz do jogo!*</small> |
| `lenda_fisgou_dunkleosteus` | Lendário mordeu a isca: Dunkleosteus | É o Dunkleosteus! Segura firme! Eu sei que você consegue!<br><small>*Muita energia.*</small> |
| `lenda_passou_dunkleosteus` | Dunkleosteus passou sem a Isca Lendária | Você viu aquilo? Era o Dunkleosteus! Ele só morde a Isca Lendária. Um dia a gente pega! |
| `lenda_pescou_dunkleosteus` | Pescou: Dunkleosteus (antes de sabia_ e come_) | Você conseguiu! Você pescou o Dunkleosteus! Você é um pescador lendário!<br><small>*O momento mais feliz do jogo!*</small> |
| `lenda_fisgou_kraken` | Lendário mordeu a isca: Kraken | É o Kraken! Segura firme! Eu sei que você consegue!<br><small>*Muita energia.*</small> |
| `lenda_passou_kraken` | Kraken passou sem a Isca Lendária | Você viu aquilo? Era o Kraken! Ele só morde a Isca Lendária. Um dia a gente pega! |
| `lenda_pescou_kraken` | Pescou: Kraken (antes de sabia_ e come_) | Você conseguiu! Você pescou o Kraken! Você é um pescador lendário!<br><small>*O momento mais feliz do jogo!*</small> |
| `lenda_fisgou_megapiranha` | Lendário mordeu a isca: Megapiranha | É a Megapiranha! Segura firme! Eu sei que você consegue!<br><small>*Muita energia.*</small> |
| `lenda_passou_megapiranha` | Megapiranha passou sem a Isca Lendária | Você viu aquilo? Era a Megapiranha! Ela só morde a Isca Lendária. Um dia a gente pega! |
| `lenda_pescou_megapiranha` | Pescou: Megapiranha (antes de sabia_ e come_) | Você conseguiu! Você pescou a Megapiranha! Você é um pescador lendário!<br><small>*O momento mais feliz do jogo!*</small> |
| `lenda_fisgou_boiuna` | Lendário mordeu a isca: Boiúna | É a Boiúna! Segura firme! Eu sei que você consegue!<br><small>*Muita energia.*</small> |
| `lenda_passou_boiuna` | Boiúna passou sem a Isca Lendária | Você viu aquilo? Era a Boiúna! Ela só morde a Isca Lendária. Um dia a gente pega! |
| `lenda_pescou_boiuna` | Pescou: Boiúna (antes de sabia_ e come_) | Você conseguiu! Você pescou a Boiúna! Você é um pescador lendário!<br><small>*O momento mais feliz do jogo!*</small> |
| `lenda_passou_misterio` | Um lendário ainda desconhecido passou sem a Isca Lendária | Você viu aquilo? Era um peixe lendário! Ele só morde a Isca Lendária. Um dia a gente pega! |
## Mochila: escolher peixe e iscas

Falas da aba Escolher peixe, da troca de isca e das cores.

| Arquivo | Quando toca | Fala |
| --- | --- | --- |
| `alvo_sardinha` | Escolheu o alvo: Sardinha | Bora pescar a Sardinha! Ela mora nas Águas Rasas, entre 0 e 50 metros. |
| `alvo_tainha` | Escolheu o alvo: Tainha | Bora pescar a Tainha! Ela mora nas Águas Rasas, entre 0 e 50 metros. |
| `alvo_baiacu` | Escolheu o alvo: Baiacu | Bora pescar o Baiacu! Ele mora nas Águas Rasas, entre 0 e 50 metros. |
| `alvo_palhaco` | Escolheu o alvo: Peixe-palhaço | Bora pescar o Peixe-palhaço! Ele mora nas Águas Rasas, entre 0 e 50 metros. |
| `alvo_cirurgiao` | Escolheu o alvo: Peixe-cirurgião | Bora pescar o Peixe-cirurgião! Ele mora no Recife de Coral, entre 50 e 150 metros. |
| `alvo_papagaio` | Escolheu o alvo: Peixe-papagaio | Bora pescar o Peixe-papagaio! Ele mora no Recife de Coral, entre 50 e 150 metros. |
| `alvo_garoupa` | Escolheu o alvo: Garoupa | Bora pescar a Garoupa! Ela mora no Recife de Coral, entre 50 e 150 metros. |
| `alvo_arraia` | Escolheu o alvo: Arraia | Bora pescar a Arraia! Ela mora no Recife de Coral, entre 50 e 150 metros. |
| `alvo_atum` | Escolheu o alvo: Atum | Bora pescar o Atum! Ele mora no Mar Aberto, entre 150 e 300 metros. |
| `alvo_dourado` | Escolheu o alvo: Dourado-do-mar | Bora pescar o Dourado-do-mar! Ele mora no Mar Aberto, entre 150 e 300 metros. |
| `alvo_martelo` | Escolheu o alvo: Tubarão-martelo | Bora pescar o Tubarão-martelo! Ele mora no Mar Aberto, entre 150 e 300 metros. |
| `alvo_espadarte` | Escolheu o alvo: Espadarte | Bora pescar o Espadarte! Ele mora no Mar Aberto, entre 150 e 300 metros. |
| `alvo_lanterna` | Escolheu o alvo: Peixe-lanterna | Bora pescar o Peixe-lanterna! Ele mora nas Profundezas, entre 300 e 550 metros. |
| `alvo_vibora` | Escolheu o alvo: Peixe-víbora | Bora pescar o Peixe-víbora! Ele mora nas Profundezas, entre 300 e 550 metros. |
| `alvo_diabo` | Escolheu o alvo: Peixe-diabo-negro | Bora pescar o Peixe-diabo-negro! Ele mora nas Profundezas, entre 300 e 550 metros. |
| `alvo_celacanto` | Escolheu o alvo: Celacanto | Bora pescar o Celacanto! Ele mora nas Profundezas, entre 300 e 550 metros. |
| `alvo_remo` | Escolheu o alvo: Peixe-remo | Bora pescar o Peixe-remo! Ele mora no Abismo, entre 550 e 900 metros. |
| `alvo_duende` | Escolheu o alvo: Tubarão-duende | Bora pescar o Tubarão-duende! Ele mora no Abismo, entre 550 e 900 metros. |
| `alvo_lula` | Escolheu o alvo: Lula-colossal | Bora pescar a Lula-colossal! Ela mora no Abismo, entre 550 e 900 metros. |
| `alvo_groenlandia` | Escolheu o alvo: Tubarão-da-Groenlândia | Bora pescar o Tubarão-da-Groenlândia! Ele mora no Abismo, entre 550 e 900 metros. |
| `alvo_tubaraobaleia` | Escolheu o alvo: Tubarão-baleia | Bora pescar o Tubarão-baleia! Ele mora no Mar Aberto, entre 150 e 300 metros. |
| `alvo_dunkleosteus` | Escolheu o alvo: Dunkleosteus | Bora pescar o Dunkleosteus! Ele mora nas Profundezas, entre 300 e 550 metros. |
| `alvo_kraken` | Escolheu o alvo: Kraken | Bora pescar o Kraken! Ele mora no Abismo, entre 550 e 900 metros. |
| `alvo_megalodon` | Escolheu o alvo: Megalodon | Bora pescar o Megalodon! Ele mora no Abismo, entre 550 e 900 metros. |
| `alvo_lambari` | Escolheu o alvo: Lambari | Bora pescar o Lambari! Ele mora na Margem do Rio, entre 0 e 20 metros. |
| `alvo_piranha` | Escolheu o alvo: Piranha | Bora pescar a Piranha! Ela mora na Margem do Rio, entre 0 e 20 metros. |
| `alvo_pacu` | Escolheu o alvo: Pacu | Bora pescar o Pacu! Ele mora na Margem do Rio, entre 0 e 20 metros. |
| `alvo_aruana` | Escolheu o alvo: Aruanã | Bora pescar o Aruanã! Ele mora na Margem do Rio, entre 0 e 20 metros. |
| `alvo_jaraqui` | Escolheu o alvo: Jaraqui | Bora pescar o Jaraqui! Ele mora no Meio do Rio, entre 20 e 50 metros. |
| `alvo_tucunare` | Escolheu o alvo: Tucunaré | Bora pescar o Tucunaré! Ele mora no Meio do Rio, entre 20 e 50 metros. |
| `alvo_tambaqui` | Escolheu o alvo: Tambaqui | Bora pescar o Tambaqui! Ele mora no Meio do Rio, entre 20 e 50 metros. |
| `alvo_pirarucu` | Escolheu o alvo: Pirarucu | Bora pescar o Pirarucu! Ele mora no Canal Profundo, entre 50 e 90 metros. |
| `alvo_arraiafogo` | Escolheu o alvo: Arraia-de-fogo | Bora pescar a Arraia-de-fogo! Ela mora no Canal Profundo, entre 50 e 90 metros. |
| `alvo_poraque` | Escolheu o alvo: Poraquê | Bora pescar o Poraquê! Ele mora no Canal Profundo, entre 50 e 90 metros. |
| `alvo_pintado` | Escolheu o alvo: Pintado | Bora pescar o Pintado! Ele mora no Canal Profundo, entre 50 e 90 metros. |
| `alvo_dourada` | Escolheu o alvo: Dourada | Bora pescar a Dourada! Ela mora no Poço do Rio, entre 90 e 120 metros. |
| `alvo_jau` | Escolheu o alvo: Jaú | Bora pescar o Jaú! Ele mora no Poço do Rio, entre 90 e 120 metros. |
| `alvo_piraiba` | Escolheu o alvo: Piraíba | Bora pescar a Piraíba! Ela mora no Poço do Rio, entre 90 e 120 metros. |
| `alvo_megapiranha` | Escolheu o alvo: Megapiranha | Bora pescar a Megapiranha! Ela mora no Canal Profundo, entre 50 e 90 metros. |
| `alvo_boiuna` | Escolheu o alvo: Boiúna | Bora pescar a Boiúna! Ela mora no Poço do Rio, entre 90 e 120 metros. |
| `alvo_misterio_mar_0` | Escolheu um peixe ainda desconhecido de: Águas Rasas | Bora pescar esse peixe misterioso! Ele mora nas Águas Rasas, entre 0 e 50 metros. |
| `alvo_misterio_mar_1` | Escolheu um peixe ainda desconhecido de: Recife de Coral | Bora pescar esse peixe misterioso! Ele mora no Recife de Coral, entre 50 e 150 metros. |
| `alvo_misterio_mar_2` | Escolheu um peixe ainda desconhecido de: Mar Aberto | Bora pescar esse peixe misterioso! Ele mora no Mar Aberto, entre 150 e 300 metros. |
| `alvo_misterio_mar_3` | Escolheu um peixe ainda desconhecido de: Profundezas | Bora pescar esse peixe misterioso! Ele mora nas Profundezas, entre 300 e 550 metros. |
| `alvo_misterio_mar_4` | Escolheu um peixe ainda desconhecido de: Abismo | Bora pescar esse peixe misterioso! Ele mora no Abismo, entre 550 e 900 metros. |
| `alvo_misterio_rio_0` | Escolheu um peixe ainda desconhecido de: Margem do Rio | Bora pescar esse peixe misterioso! Ele mora na Margem do Rio, entre 0 e 20 metros. |
| `alvo_misterio_rio_1` | Escolheu um peixe ainda desconhecido de: Meio do Rio | Bora pescar esse peixe misterioso! Ele mora no Meio do Rio, entre 20 e 50 metros. |
| `alvo_misterio_rio_2` | Escolheu um peixe ainda desconhecido de: Canal Profundo | Bora pescar esse peixe misterioso! Ele mora no Canal Profundo, entre 50 e 90 metros. |
| `alvo_misterio_rio_3` | Escolheu um peixe ainda desconhecido de: Poço do Rio | Bora pescar esse peixe misterioso! Ele mora no Poço do Rio, entre 90 e 120 metros. |
| `alvo_isca_minhoca` | Depois de escolher o alvo, a isca colocada: Minhoca | Coloquei Minhoca no anzol! |
| `alvo_isca_grilo` | Depois de escolher o alvo, a isca colocada: Grilo | Coloquei Grilo no anzol! |
| `alvo_isca_camarao` | Depois de escolher o alvo, a isca colocada: Camarão | Coloquei Camarão no anzol! |
| `alvo_isca_fruta` | Depois de escolher o alvo, a isca colocada: Frutinha | Coloquei Frutinha no anzol! |
| `alvo_isca_peixinho` | Depois de escolher o alvo, a isca colocada: Peixinho | Coloquei Peixinho no anzol! |
| `alvo_isca_lula` | Depois de escolher o alvo, a isca colocada: Lula | Coloquei Lula no anzol! |
| `alvo_isca_lendaria` | Depois de escolher o alvo, a isca colocada: Isca Lendária | Coloquei Isca Lendária no anzol! |
| `alvo_linha_fraca` | Depois de escolher o alvo, se a linha for fraca | A linha é fraquinha pra ele, então solta bastante! |
| `alvo_nenhum` | Tirou o alvo | Tudo bem! Vamos pescar o que aparecer! |
| `isca_minhoca` | Trocou a isca para: Minhoca | Minhoca no anzol! |
| `isca_grilo` | Trocou a isca para: Grilo | Grilo no anzol! |
| `isca_camarao` | Trocou a isca para: Camarão | Camarão no anzol! |
| `isca_fruta` | Trocou a isca para: Frutinha | Frutinha no anzol! |
| `isca_peixinho` | Trocou a isca para: Peixinho | Peixinho no anzol! |
| `isca_lula` | Trocou a isca para: Lula | Lula no anzol! |
| `isca_lendaria` | Trocou a isca para: Isca Lendária | Isca Lendária no anzol! |
| `isca_acabou_grilo` | A isca de Grilo acabou | Acabou a isca de Grilo! Coloquei minhoca no anzol. Dá pra comprar mais na loja! |
| `isca_acabou_camarao` | A isca de Camarão acabou | Acabou a isca de Camarão! Coloquei minhoca no anzol. Dá pra comprar mais na loja! |
| `isca_acabou_fruta` | A isca de Frutinha acabou | Acabou a isca de Frutinha! Coloquei minhoca no anzol. Dá pra comprar mais na loja! |
| `isca_acabou_peixinho` | A isca de Peixinho acabou | Acabou a isca de Peixinho! Coloquei minhoca no anzol. Dá pra comprar mais na loja! |
| `isca_acabou_lula` | A isca de Lula acabou | Acabou a isca de Lula! Coloquei minhoca no anzol. Dá pra comprar mais na loja! |
| `isca_acabou_lendaria` | A isca de Isca Lendária acabou | Acabou a isca de Isca Lendária! Coloquei minhoca no anzol. Dá pra comprar mais na loja! |
| `recusou_palhaco` | Peixe-palhaço chegou perto e recusou a isca | O Peixe-palhaço chegou pertinho, mas não quis essa isca. Ele prefere Camarão!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_arraia` | Arraia chegou perto e recusou a isca | A Arraia chegou pertinho, mas não quis essa isca. Ela prefere Camarão!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_espadarte` | Espadarte chegou perto e recusou a isca | O Espadarte chegou pertinho, mas não quis essa isca. Ele prefere Lula!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_celacanto` | Celacanto chegou perto e recusou a isca | O Celacanto chegou pertinho, mas não quis essa isca. Ele prefere Lula!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_groenlandia` | Tubarão-da-Groenlândia chegou perto e recusou a isca | O Tubarão-da-Groenlândia chegou pertinho, mas não quis essa isca. Ele prefere Lula!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_pacu` | Pacu chegou perto e recusou a isca | O Pacu chegou pertinho, mas não quis essa isca. Ele prefere Frutinha!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_aruana` | Aruanã chegou perto e recusou a isca | O Aruanã chegou pertinho, mas não quis essa isca. Ele prefere Grilo!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_tambaqui` | Tambaqui chegou perto e recusou a isca | O Tambaqui chegou pertinho, mas não quis essa isca. Ele prefere Frutinha!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_piraiba` | Piraíba chegou perto e recusou a isca | A Piraíba chegou pertinho, mas não quis essa isca. Ela prefere Peixinho!<br><small>*No jogo atual ela também diz o nome da isca recusada; a versão gravada fala "essa isca".*</small> |
| `recusou_misterio_camarao` | Peixe desconhecido recusou a isca (ele gosta de Camarão) | Um peixe misterioso chegou perto, mas não quis essa isca. Acho que ele gosta de Camarão! |
| `recusou_misterio_lula` | Peixe desconhecido recusou a isca (ele gosta de Lula) | Um peixe misterioso chegou perto, mas não quis essa isca. Acho que ele gosta de Lula! |
| `recusou_misterio_fruta` | Peixe desconhecido recusou a isca (ele gosta de Frutinha) | Um peixe misterioso chegou perto, mas não quis essa isca. Acho que ele gosta de Frutinha! |
| `recusou_misterio_grilo` | Peixe desconhecido recusou a isca (ele gosta de Grilo) | Um peixe misterioso chegou perto, mas não quis essa isca. Acho que ele gosta de Grilo! |
| `recusou_misterio_peixinho` | Peixe desconhecido recusou a isca (ele gosta de Peixinho) | Um peixe misterioso chegou perto, mas não quis essa isca. Acho que ele gosta de Peixinho! |
| `cor_bloqueada_album10` | Tocou numa cor bloqueada (10 peixes no álbum) | Pra liberar essa cor: 10 peixes no álbum! |
| `cor_bloqueada_album20` | Tocou numa cor bloqueada (20 peixes no álbum) | Pra liberar essa cor: 20 peixes no álbum! |
| `cor_bloqueada_mega` | Tocou numa cor bloqueada (Pesque o Megalodon) | Pra liberar essa cor: Pesque o Megalodon! |
## Loja e viagem

Falas ao comprar e ao viajar entre o mar e o rio.

| Arquivo | Quando toca | Fala |
| --- | --- | --- |
| `compra_isca_grilo` | Comprou a isca: Grilo | Uhuul! Grilo no anzol! Os peixes que adoram grilo vão vir correndo! |
| `compra_isca_camarao` | Comprou a isca: Camarão | Uhuul! Camarão no anzol! Os peixes que adoram camarão vão vir correndo! |
| `compra_isca_fruta` | Comprou a isca: Frutinha | Uhuul! Frutinha no anzol! Os peixes que adoram frutinha vão vir correndo! |
| `compra_isca_peixinho` | Comprou a isca: Peixinho | Uhuul! Peixinho no anzol! Os peixes que adoram peixinho vão vir correndo! |
| `compra_isca_lula` | Comprou a isca: Lula | Uhuul! Lula no anzol! Os peixes que adoram lula vão vir correndo! |
| `compra_isca_lendaria` | Comprou a Isca Lendária | A Isca Lendária! Agora os peixes lendários vão querer morder!<br><small>*Empolgação máxima.*</small> |
| `compra_vara_1` | Comprou: Vara de Fibra | Uhuul! Com a Vara de Fibra dá pra descer até 100 metros! Vamos descobrir peixes novos! |
| `compra_vara_2` | Comprou: Vara de Carbono | Uhuul! Com a Vara de Carbono dá pra descer até 225 metros! Vamos descobrir peixes novos! |
| `compra_vara_3` | Comprou: Vara Profissional | Uhuul! Com a Vara Profissional dá pra descer até 425 metros! Vamos descobrir peixes novos! |
| `compra_vara_4` | Comprou: Vara Abissal | Uhuul! Com a Vara Abissal dá pra descer até 725 metros! Vamos descobrir peixes novos! |
| `compra_linha_1` | Comprou: Linha Forte | Que legal! Você comprou: Linha Forte!<br><small>*No jogo atual a frase é sorteada entre 3 jeitos; a versão gravada usa este.*</small> |
| `compra_linha_2` | Comprou: Linha de Aço | Que legal! Você comprou: Linha de Aço!<br><small>*No jogo atual a frase é sorteada entre 3 jeitos; a versão gravada usa este.*</small> |
| `compra_linha_3` | Comprou: Linha de Kevlar | Que legal! Você comprou: Linha de Kevlar!<br><small>*No jogo atual a frase é sorteada entre 3 jeitos; a versão gravada usa este.*</small> |
| `compra_linha_4` | Comprou: Linha Titânica | Que legal! Você comprou: Linha Titânica!<br><small>*No jogo atual a frase é sorteada entre 3 jeitos; a versão gravada usa este.*</small> |
| `compra_rio` | Comprou a viagem para o Rio Amazonas | Eba! Agora a gente pode viajar pro Rio Amazonas! Toca no botão do barquinho lá em cima! |
| `viagem_rio` | Chegou no Rio Amazonas | Chegamos no Rio Amazonas, o maior rio do mundo! Aqui tem piranha, tucunaré, tambaqui, pirarucu, poraquê e muito mais! |
| `viagem_mar` | Voltou para o mar | De volta ao mar! Bora pescar! |

## Falas que continuam com a voz do aparelho

- **Aviso livre do painel admin:** o texto é escrito na hora, então não dá para gravar antes.
- **Primeiro nome no login:** a versão gravada usa "pescador" no lugar do nome.

