import { TokenType } from '../lexer/token-types.js';
import { Program, NumericLiteral, BinaryExpression } from './ast-nodes.js';
import { Precedence, getOperatorPrecedence } from './precedence.js';

export class Parser {
  constructor() {
    this.tokens = [];
    this.current = 0;
  }

  parse(tokens) {
    this.tokens = tokens;
    this.current = 0;
    
    const program = new Program();
    
    while (!this.isAtEnd()) {
      program.body.push(this.parseExpression());
    }
    
    return program;
  }

  parseExpression(precedence = Precedence.LOWEST) {
    let left = this.parsePrimary();

    while (
      !this.isAtEnd() &&
      precedence < this.getCurrentPrecedence()
    ) {
      const operator = this.peek().type;
      const operatorPrecedence = getOperatorPrecedence(operator);
      
      this.advance(); // consume the operator
      
      const right = this.parseExpression(operatorPrecedence);
      left = new BinaryExpression(this.getOperatorSymbol(operator), left, right);
    }

    return left;
  }

  parsePrimary() {
    const token = this.peek();

    switch (token.type) {
      case TokenType.NUMBER:
        this.advance();
        return new NumericLiteral(token.value);
      case TokenType.LEFT_PAREN:
        this.advance(); // consume '('
        const expr = this.parseExpression();
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
        return expr;
      default:
        throw new Error(`Unexpected token type: ${token.type}`);
    }
  }

  getOperatorSymbol(tokenType) {
    switch (tokenType) {
      case TokenType.PLUS: return '+';
      case TokenType.MINUS: return '-';
      case TokenType.MULTIPLY: return '*';
      case TokenType.DIVIDE: return '/';
      default: throw new Error(`Unknown operator: ${tokenType}`);
    }
  }

  getCurrentPrecedence() {
    if (this.isAtEnd()) return Precedence.LOWEST;
    return getOperatorPrecedence(this.peek().type);
  }

  consume(type, message) {
    if (this.check(type)) {
      return this.advance();
    }
    throw new Error(message);
  }

  peek() {
    return this.tokens[this.current];
  }

  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.tokens[this.current - 1];
  }
}