class RailFence {
  private rail: number;

  /**
   * Inicia a classe
   * @param rail Quantidade de trilhas do vetor de cifragem
   */
  constructor(rail: number) {
    this.rail = rail;
  }

  /**
   *
   * @param length Quantidade de colunas da matriz
   * @returns Uma matriz de `this.rail` linhas por `length` colunas
   * preenchido com string vazia
   */
  private initMatrix = (length: number): string[][] => {
    const matrix: string[][] = [];

    for (let i: number = 0; i < this.rail; i++) {
      matrix[i] = [];

      for (var j: number = 0; j < length; j++) {
        matrix[i][j] = "";
      }
    }

    return matrix;
  };

  /**
   * Cria uma matriz de cifragem a partir de um texto. A matriz
   * inicialmente sera preenchida usando o metodo `initMatrix`.
   * @param text Texto que sera incluido na matriz
   * @returns A matriz preenchida com os caracteres de `text`
   */
  private createMatrixFromText = (text: string): string[][] => {
    const matrix: string[][] = this.initMatrix(text.length);
    let increment: number = 1;
    let row: number = 0;
    let col: number = 0;

    while (col < text.length) {
      matrix[row][col] = text[col];

      row += increment;
      col++;

      increment *= row === 0 || row === matrix.length - 1 ? -1 : 1;
    }

    return matrix;
  };

  /**
   * Converte os dados presentes na matriz de cifragem em texto.
   * @param matrix Matriz a partir da qual sera extraido o texto
   * @returns O texto encontrado a partir da matriz de cifragem
   */
  private createTextFromMatrix = (matrix: string[][]): string => {
    let increment: number = 1;
    let text: string = "";
    let row: number = 0;
    let col: number = 0;

    while (col < matrix[row].length) {
      text = text.concat(matrix[row][col]);

      row += increment;
      col++;

      increment *= row === 0 || row === matrix.length - 1 ? -1 : 1;
    }

    return text;
  };

  /**
   * Cifra um texto claro utilizando o algoritimo de Rail Fence.
   * @param plainText Texto a ser cifrado pelo algoritimo
   * @param show Se `true` exibe detalhes sobre o processo de cifragem
   * @returns O texto cifrado
   */
  public cipher = (plainText: string, show: boolean = false): string => {
    const matrix: string[][] = this.createMatrixFromText(plainText);
    let ciphedText: string = "";
    let row: number = 0;
    let col: number = 0;

    for (row = 0; row < matrix.length; row++) {
      for (col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] !== "") {
          ciphedText = ciphedText.concat(matrix[row][col]);
        }
      }
    }

    if (show) {
      console.table(matrix);
      console.log("Plain", plainText);
      console.log("Ciphed", ciphedText);
    }

    return ciphedText;
  };

  /**
   * Decifra um texto utilizando o algoritimo de Rail Fence.
   * @param ciphedText O texto a ser decifrado
   * @param show Se `true` exibe detalhes sobre o processo de decifragem
   * @returns O texto decifrado
   */
  public decipher = (ciphedText: string, show: boolean = false): string => {
    const matrix: string[][] = this.createMatrixFromText(ciphedText);
    let index: number = 0;

    for (let row: number = 0; row < matrix.length; row++) {
      for (let col: number = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] !== "") {
          matrix[row][col] = ciphedText[index++];
        }
      }
    }

    if (show) {
      console.table(matrix);
      console.log("Ciphed", ciphedText);
      console.log("Plain", this.createTextFromMatrix(matrix));
    }

    return this.createTextFromMatrix(matrix);
  };
}

const RAIL: number = 2;
const TEXT: string = "VINICIUS";

const railFence = new RailFence(RAIL);
const ciphedText = railFence.cipher(TEXT, true);
const deciphedText = railFence.decipher(ciphedText, true);
