import {
  ActionFunctionRegistry,
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ReversibleAction,
  IrreversibleAction,
  StateNode,
  Action,
  isReversibleAction,
} from '@visualstorytelling/provenance-core';

class CalculatorApp {
  public result = 0;
  public async add(offset: number) {
    this.result += offset;
  }
  public async subtract(offset: number) {
    this.result -= offset;
  }
  public async multiply(offset: number) {
    this.result *= offset;
  }
  public async divide(offset: number) {
    this.result /= offset;
  }
}

export class Calculator {
  private graph: ProvenanceGraph;
  private registry: ActionFunctionRegistry;
  private tracker: ProvenanceTracker;
  private traverser: ProvenanceGraphTraverser;
  private readonly app: CalculatorApp;

  constructor(
    graph: ProvenanceGraph,
    registry: ActionFunctionRegistry,
    tracker: ProvenanceTracker,
    traverser: ProvenanceGraphTraverser,
  ) {
    this.graph = graph;
    this.registry = registry;
    this.tracker = tracker;
    this.traverser = traverser;

    this.app = new CalculatorApp();
    this.registry.register('add', this.app.add, this.app);      // Registering Actions
    this.registry.register('subtract', this.app.subtract, this.app);
    this.registry.register('multiply', this.app.multiply, this.app);
    this.registry.register('divide', this.app.divide, this.app);
  }

  public async makeActionAndApply(
    reversible: boolean,
    label: string,
    doAction: string,
    doArguments: any[],
    undoAction?: string,
    undoArguments?: any[],
  ): Promise<StateNode> {
    let result: Action;
    const intermediate: Action = {
      do: doAction,
      doArguments,
      metadata: {
        createdBy: 'me',
        createdOn: 'now',
        tags: [],
        userIntent: doAction,
      },
    };
    if (reversible) {
      result = {
        ...intermediate,
        undo: undoAction,
        undoArguments,
      } as ReversibleAction;
    } else {
      result = {
        ...intermediate,
      } as IrreversibleAction;
    }

    const node = await this.tracker.applyAction(result);
    node.label = label;
    return node;
  }

  public currentState(): number {
    return this.app.result;
  }

  public async setupBasicGraph() {
    // const intermediateNode = await this.makeActionAndApply(
    //   true,
    //   'add 13',
    //   'add',
    //   [13],
    //   'subtract',
    //   [13],
    // );
  //   await this.makeActionAndApply(true, 'sub 2', 'subtract', [2], 'add', [2]);
  //   await this.traverser.toStateNode(intermediateNode.id);

  //   await this.makeActionAndApply(true, 'sub 2', 'subtract', [2], 'add', [2]);
  //   await this.makeActionAndApply(true, 'sub 20', 'subtract', [20], 'add', [
  //     20,
  //   ]);
  //   await this.makeActionAndApply(true, 'add 5', 'add', [5], 'subtract', [5]);
  //   await this.makeActionAndApply(true, 'mul 2', 'multiply', [2], 'divide', [
  //     2,
  //   ]);
  //   await this.makeActionAndApply(true, 'sub 2', 'subtract', [2], 'add', [2]);
  //   await this.traverser.toStateNode(intermediateNode.id);
  //   await this.makeActionAndApply(true, 'mul 4', 'multiply', [4], 'divide', [
  //     4,
  //   ]);
  }
}
