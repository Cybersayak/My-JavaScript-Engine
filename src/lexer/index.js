import { TokenType, KEYWORDS } from './token-types.js';

export class Lexer {
  constructor() {
    this.input = '';
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }

  tokenize(input) {
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.column = 1;
    const tokens = [];

    while (this.position < this.input.length) {
      const char = this.input[this.position];

      if (this.isWhitespace(char)) {
        this.advance();
        continue;
      }

      if (this.isDigit(char)) {
        tokens.push(this.tokenizeNumber());
        continue;
      }

      switch (char) {
        case '+':
          tokens.push(this.createToken(TokenType.PLUS));
          this.advance();
          break;
        case '-':
          tokens.push(this.createToken(TokenType.MINUS));
          this.advance();
          break;
        case '*':
          tokens.push(this.createToken(TokenType.MULTIPLY));
          this.advance();
          break;
        case '/':
          tokens.push(this.createToken(TokenType.DIVIDE));
          this.advance();
          break;
        case '(':
          tokens.push(this.createToken(TokenType.LEFT_PAREN));
          this.advance();
          break;
        case ')':
          tokens.push(this.createToken(TokenType.RIGHT_PAREN));
          this.advance();
          break;
        default:
          throw new Error(`Unexpected character: ${char} at line ${this.line}, column ${this.column}`);
      }
    }

    tokens.push(this.createToken(TokenType.EOF));
    return tokens;
  }

  tokenizeNumber() {
    let value = '';
    const startColumn = this.column;

    while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
      value += this.input[this.position];
      this.advance();
    }

    return {
      type: TokenType.NUMBER,
      value,
      line: this.line,
      column: startColumn
    };
  }

  isDigit(char) {
    return /[0-9]/.test(char);
  }

  isWhitespace(char) {
    return /\s/.test(char);
  }

  advance() {
    if (this.input[this.position] === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.position++;
  }

  createToken(type, value = null) {
    return {
      type,
      value,
      line: this.line,
      column: this.column
    };
  }
}