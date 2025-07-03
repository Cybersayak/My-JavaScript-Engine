import { Lexer } from '../src/lexer/index.js';
import { TokenType } from '../src/lexer/token-types.js';

describe('Lexer', () => {
  let lexer;

  beforeEach(() => {
    lexer = new Lexer();
  });

  test('should tokenize numbers', () => {
    const input = '42';
    const tokens = lexer.tokenize(input);
    expect(tokens).toHaveLength(2); // Including EOF token
    expect(tokens[0]).toEqual({
      type: TokenType.NUMBER,
      value: '42',
      line: 1,
      column: 1
    });
  });

  test('should tokenize basic arithmetic operators', () => {
    const input = '+ - * /';
    const tokens = lexer.tokenize(input);
    expect(tokens).toHaveLength(5); // Including EOF token
    expect(tokens[0].type).toBe(TokenType.PLUS);
    expect(tokens[1].type).toBe(TokenType.MINUS);
    expect(tokens[2].type).toBe(TokenType.MULTIPLY);
    expect(tokens[3].type).toBe(TokenType.DIVIDE);
  });

  test('should tokenize simple expressions', () => {
    const input = '1 + 2 * 3';
    const tokens = lexer.tokenize(input);
    expect(tokens).toHaveLength(6); // Including EOF token
    expect(tokens.map(t => t.type)).toEqual([
      TokenType.NUMBER,
      TokenType.PLUS,
      TokenType.NUMBER,
      TokenType.MULTIPLY,
      TokenType.NUMBER,
      TokenType.EOF
    ]);
  });
});