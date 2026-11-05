# Pescaria Lendária 🎣🦈

Jogo de pescaria educativo para crianças, feito em um único arquivo HTML (canvas + JavaScript, sem dependências).

**Jogue em:** https://pescarialendaria.housemedia.app

## Como jogar

- Toque em **LANÇAR** para jogar o anzol na água e em **PARAR** na profundidade que quiser. Os peixes só mordem com o anzol parado.
- Quando um peixe morder, **segure o botão para puxar** e **solte quando a linha ficar vermelha**.
- Venda os peixes e compre na **Loja** varas (descem mais fundo), linhas (aguentam peixes mais fortes) e iscas (atraem peixes raros).
- Complete o **Álbum** com os 25 peixes e pesque o **Megalodon** no Abismo.

## O que tem no jogo

- **Mar:** Águas Rasas, Recife de Coral, Mar Aberto, Profundezas e Abismo (até 900 m).
- **Rio Amazonas:** Piranha, Tucunaré, Pirarucu e Piraíba, desbloqueado na Loja.
- **Iara**, a ajudante: fala com voz feminina em português (Web Speech API), conta curiosidades reais sobre cada peixe e incentiva o jogador.
- Progresso salvo no navegador (`localStorage`).

A voz usa as vozes instaladas no aparelho. No Microsoft Edge, as vozes "Natural" (Thalita, Francisca) soam mais naturais.

## Desenvolvimento

O jogo inteiro está em `index.html`. Para testar localmente, abra o arquivo no navegador.
O deploy é feito automaticamente pela Vercel a cada push na branch `main`.
