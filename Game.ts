export enum Mark { X = 'X', O = 'O', Empty = ' ' }

export class Position {
  constructor(public readonly x: number, public readonly y: number) {
    if (x < 0 || x > 2 || y < 0 || y > 2) throw new Error('Out of bounds');
  }
}

class Board {
  private grid: Mark[][] = [
    [Mark.Empty, Mark.Empty, Mark.Empty],
    [Mark.Empty, Mark.Empty, Mark.Empty],
    [Mark.Empty, Mark.Empty, Mark.Empty],
  ];

  isEmpty(p: Position): boolean {
    return this.grid[p.x][p.y] === Mark.Empty;
  }

  place(mark: Mark, p: Position): void {
    if (!this.isEmpty(p)) throw new Error('Invalid position');
    this.grid[p.x][p.y] = mark;
  }

  at(p: Position): Mark {
    return this.grid[p.x][p.y];
  }

  private line(mark: Mark, cells: Position[]): boolean {
    return cells.every((p) => this.at(p) === mark);
  }

  anyLineFor(mark: Mark): boolean {
    const lines = [
      [new Position(0, 0), new Position(0, 1), new Position(0, 2)],
      [new Position(1, 0), new Position(1, 1), new Position(1, 2)],
      [new Position(2, 0), new Position(2, 1), new Position(2, 2)],
      [new Position(0, 0), new Position(1, 0), new Position(2, 0)],
      [new Position(0, 1), new Position(1, 1), new Position(2, 1)],
      [new Position(0, 2), new Position(1, 2), new Position(2, 2)],
      [new Position(0, 0), new Position(1, 1), new Position(2, 2)],
      [new Position(0, 2), new Position(1, 1), new Position(2, 0)],
    ];
    return lines.some((cells) => this.line(mark, cells));
  }

  full(): boolean {
    return this.grid.flat().every((m) => m !== Mark.Empty);
  }
}

export class Game {
  private _last: Mark | null = null;
  private _board = new Board();

  public Play(symbol: 'X' | 'O', x: number, y: number): void {
    const mark: Mark = symbol === 'X' ? Mark.X : Mark.O;
    this.play(mark, new Position(x, y));
  }

  private play(mark: Mark, pos: Position): void {
    if (this._last === null) {
      if (mark === Mark.O) throw new Error('Invalid first player');
    } else if (mark === this._last) {
      throw new Error('Invalid next player');
    }

    this._board.place(mark, pos);
    this._last = mark;
  }

  public Winner(): string {
    if (this._board.anyLineFor(Mark.X)) return 'X';
    if (this._board.anyLineFor(Mark.O)) return 'O';
    return ' ';
  }
}
