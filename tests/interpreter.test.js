import { Interpreter } from '../src/interpreter/index.js';
import { Parser } from '../src/parser/index.js';
import { Lexer } from '../src/lexer/index.js';

describe('Interpreter', () => {
  let interpreter;
  let parser;
  let lexer;

  beforeEach(() => {
    lexer = new Lexer();
    parser = new Parser();
    interpreter = new Interpreter();
  });

  test('should evaluate numeric literals', () => {
    const input = '42';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    const result = interpreter.evaluate(ast);
    
    expect(result).toBe(42);
  });

  test('should evaluate basic arithmetic expressions', () => {
    const input = '1 + 2';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    const result = interpreter.evaluate(ast);
    
    expect(result).toBe(3);
  });

  test('should respect operator precedence', () => {
    const input = '1 + 2 * 3';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    const result = interpreter.evaluate(ast);
    
    expect(result).toBe(7); // 1 + (2 * 3) = 7, not (1 + 2) * 3 = 9
  });

  test('should handle multiple operations', () => {
    const input = '10 - 2 * 3 + 5';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    const result = interpreter.evaluate(ast);
    
    expect(result).toBe(9); // 10 - (2 * 3) + 5 = 10 - 6 + 5 = 9
  });
});