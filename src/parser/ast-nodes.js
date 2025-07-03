export const NodeType = {
  Program: 'Program',
  NumericLiteral: 'NumericLiteral',
  BinaryExpression: 'BinaryExpression',
  UnaryExpression: 'UnaryExpression',
  Identifier: 'Identifier',
  VariableDeclaration: 'VariableDeclaration'
};

export class ASTNode {
  constructor(type) {
    this.type = type;
  }
}

export class Program extends ASTNode {
  constructor(body = []) {
    super(NodeType.Program);
    this.body = body;
  }
}

export class NumericLiteral extends ASTNode {
  constructor(value) {
    super(NodeType.NumericLiteral);
    this.value = Number(value);
  }
}

export class BinaryExpression extends ASTNode {
  constructor(operator, left, right) {
    super(NodeType.BinaryExpression);
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

export class UnaryExpression extends ASTNode {
  constructor(operator, argument) {
    super(NodeType.UnaryExpression);
    this.operator = operator;
    this.argument = argument;
  }
}