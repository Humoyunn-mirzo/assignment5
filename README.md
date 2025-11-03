#1 Primitive Obsession, lines - 2, 5, 7, 18, 27–66, 70–74, 97–101; 
Replace Primitive with Enum: enum Mark { X='X', O='O', Empty=' ' }
Introduce Value Object: class Position { constructor(public x: number, public y: number) { /* bounds check */ }}
Eliminates magic values and clarifies intent (no more accidental ' ' vs '').
Centralizes the concept of “empty” → reduces future change blast-radius (shotgun surgery).

#2 Long Method & Duplicated Code, lines - 27–66;
Extract Method & data-driven checks: Board.anyLineFor(mark) enumerates all 8 lines (3 rows, 3 cols, 2 diagonals) and checks each via a single line(mark, cells) helper.
Less repetition, easier maintenance, and trivial to extend/verify.
Dramatically reduces cognitive load.

#3 Feature Envy / Message Chain, lines - 18, 29–36, 41–49, 54–62;
Move Method / Tell-Don’t-Ask: Introduced Board.isEmpty, Board.place, Board.at, Board.anyLineFor.
Game now asks high-level questions instead of recombining internals.
Encapsulation: Board owns board logic; Game orchestrates turns.
Lower coupling → safer changes.

#4 Dead code, line - 99;
Remove Dead Code.
Less noise; avoids confusion during future maintenance and reviews.

#5 Data Class / Leaky Encapsulation, lines - 70–74, 93–95;
Replace the plays list and Tile exposure with a private grid: Mark[][].
Public API exposes behavior (isEmpty, place, at, anyLineFor) instead of the data structure.
Minimizes law-of-Demeter violations, hardens invariants, and prevents external code from “becoming board logic.”
