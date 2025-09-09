class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const pessoa2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const ordem = ordemAnimais.split(',').map(a => a.trim());

    const listaFinal = [];
    const adotadosPessoa1 = [];
    const adotadosPessoa2 = [];

    for (let i = 0; i < ordem.length; i++) {
      const nome = ordem[i];
      if (!this.animais[nome]) {
        return { erro: 'Animal inválido' };
      }
      for (let j = i + 1; j < ordem.length; j++) {
        if (ordem[j] === nome) {
          return { erro: 'Animal inválido' };
        }
      }
    }

    const brinquedosValidos = [];
    for (let nome in this.animais) {
      const brinquedos = this.animais[nome].brinquedos;
      for (let i = 0; i < brinquedos.length; i++) {
        if (brinquedosValidos.indexOf(brinquedos[i]) === -1) {
          brinquedosValidos.push(brinquedos[i]);
        }
      }
    }

    function existeBrinquedo(lista, brinquedosValidos) {
      for (let i = 0; i < lista.length; i++) {
        const b = lista[i];
        if (brinquedosValidos.indexOf(b) === -1) return false;
        for (let j = i + 1; j < lista.length; j++) {
          if (lista[j] === b) return false;
        }
      }
      return true;
    }
    if (!existeBrinquedo(pessoa1, brinquedosValidos) || !existeBrinquedo(pessoa2, brinquedosValidos)) {
      return { erro: 'Brinquedo inválido' };
    }

    function atende(pessoa, brinquedosAnimal) {
      let posicao = -1;
      for (let i = 0; i < brinquedosAnimal.length; i++) {
        const b = brinquedosAnimal[i];
        posicao = pessoa.indexOf(b, posicao + 1);
        if (posicao === -1) return false;
      }
      return true;
    }

    for (let i = 0; i < ordem.length; i++) {
      const nome = ordem[i];
      const animal = this.animais[nome];
      let dono;

      const p1 = atende(pessoa1, animal.brinquedos);
      const p2 = atende(pessoa2, animal.brinquedos);

      if (animal.tipo === 'gato') {
        if (p1 && !p2 && adotadosPessoa1.length < 3) {
          dono = 'pessoa 1';
          adotadosPessoa1.push(nome);
        } else if (p2 && !p1 && adotadosPessoa2.length < 3) {
          dono = 'pessoa 2';
          adotadosPessoa2.push(nome);
        }
      } else if (nome === 'Loco') {
        if ((p1 || p2) && (adotadosPessoa1.length > 0 || adotadosPessoa2.length > 0)) {
          if (p1 && adotadosPessoa1.length < 3) {
            dono = 'pessoa 1';
            adotadosPessoa1.push(nome);
          } else if (p2 && adotadosPessoa2.length < 3) {
            dono = 'pessoa 2';
            adotadosPessoa2.push(nome);
          }
        }
      } else {
        if (p1 && !p2 && adotadosPessoa1.length < 3) {
          dono = 'pessoa 1';
          adotadosPessoa1.push(nome);
        } else if (p2 && !p1 && adotadosPessoa2.length < 3) {
          dono = 'pessoa 2';
          adotadosPessoa2.push(nome);
        }
      }

      if (dono) {
        listaFinal.push(nome + ' - ' + dono);
      } else {
        listaFinal.push(nome + ' - abrigo');
      }
    }

    listaFinal.sort();

    return { lista: listaFinal};
  }
}

export { AbrigoAnimais as AbrigoAnimais };
