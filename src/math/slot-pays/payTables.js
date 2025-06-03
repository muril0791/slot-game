// src/math/slot-pays/payTables.js

/**
 * Estrutura esperada:
 *   paytable["nomeDoSimbolo"][quantidadeDeSímbolos] = multiplicador
 *
 * As chaves devem corresponder exatamente aos nomes de symbolMap.js
 */

const paytable = {
  cabecaJaguarDourada: {
    3: 20,
    4: 50,
    5: 100,
  },
  chamaMistica: {
    3: 15,
    4: 40,
    5: 80,
  },
  cocarCerimonial: {
    3: 10,
    4: 25,
    5: 60,
  },
  cristalTurquesa: {
    3: 8,
    4: 20,
    5: 50,
  },
  escaravelhoEsmeraldas: {
    3: 5,
    4: 15,
    5: 40,
  },
  espiritoSerpenteEsmeralda: {
    3: 5,
    4: 15,
    5: 40,
  },
  florDeLotusDourada: {
    3: 4,
    4: 12,
    5: 30,
  },
  gemaRubiEncantada: {
    3: 4,
    4: 12,
    5: 30,
  },
  idoloDeOuroRubi: {
    3: 3,
    4: 10,
    5: 25,
  },
  lancaCerimonialDourada: {
    3: 3,
    4: 10,
    5: 25,
  },
  mapaAntigoDaSelva: {
    3: 2,
    4: 8,
    5: 20,
  },
  mascaraJadeAncestral: {
    3: 2,
    4: 8,
    5: 20,
  },
  moedaMaiaAntiga: {
    3: 1,
    4: 5,
    5: 15,
  },
  totemDePedraGravado: {
    3: 1,
    4: 5,
    5: 15,
  },
};

export default paytable;
