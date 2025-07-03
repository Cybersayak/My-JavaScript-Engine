import { NodeType } from '../parser/ast-nodes.js';

export class Interpreter {
  evaluate(node) {
    switch (node.type) {
      case NodeType.Program:
        return this.evaluateProgram(node);
      case NodeType.NumericLiteral:
        return this.evaluateNumericLiteral(node);
      case NodeType.BinaryExpression:
        return this.evaluateBinaryExpression(node);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  evaluateProgram(node) {
    let result = null;
    for (const statement of node.body) {
      result = this.evaluate(statement);
    }
    return result;
  }

  evaluateNumericLiteral(node) {
    return node.value;
  }

  evaluateBinaryExpression(node) {
    const left = this.evaluate(node.left);
    const right = this.evaluate(node.right);

    switch (node.operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        if (right === 0) throw new Error('Division by zero');
        return left / right;
      default:
        throw new Error(`Unknown operator: ${node.operator}`);
    }
  }
}