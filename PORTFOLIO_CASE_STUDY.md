# Signal Lost — portfolio demo case study

## Problem and result

Build a small, coherent action-puzzle game with an energy-routing mechanic, responsive input, recoverable progress and automated evidence that the puzzles can be completed. A limited public demo demonstrates the work while the full game stays private for independent commercial development.

## Player workflow

The player starts in a maintenance dock, powers its exit, crosses a bridge using the same energy budget and restores the first signal. That completes the two-room demo. The private full version extends the same rules into combat, hazards and a final escape encounter.

## Systems and engineering

The pure TypeScript simulation owns movement, collision, enemy state, bullets, health, energy and progression. Phaser scenes draw that state and turn events into feedback. HTML dialogs handle settings and pause. This separation allows puzzle and combat rules to be tested without a browser or GPU.

Different enemy behaviours share the collision and damage systems. Energy allocations cannot exceed capacity. Relays latch permanently, while temporary systems reset at room boundaries. Checkpoint parsing validates version, room bounds, identifiers and numeric values before constructing a playable state. Unavailable browser storage produces a visible warning instead of crashing the game.

## Challenges addressed

Bridge support must include the edge of the traversable surface; shrinking it caused false falls. Fast key presses must be queued as events so they cannot disappear between animation frames. Escape must not both open and immediately cancel a native pause dialog. These issues were identified during implementation and test runs and corrected in the relevant systems.

The public/private distinction is a build boundary: the demo imports only the introductory rooms. A bundle check and browser test inspect the distributed code for private campaign identifiers. Browser JavaScript remains inspectable; this protects unreleased level content by excluding it, not by claiming client-side code can be kept secret.

## Testing approach

Vitest covers energy, collision, damage, death/restart, cells, checkpoint validation, storage failures and a six-room simulation playthrough. Playwright exercises normal keyboard interactions, state persistence, settings, responsive UI and touch buttons. Separate demo tests verify its completion screen, replay, distinct save key and restricted map. Exact execution results are recorded with the release, without treating emulated devices as physical hardware testing.

## Development process and lessons

Created with AI coding assistance, then iteratively run, inspected and debugged. The project illustrates the value of separating simulation from rendering, testing complete state transitions rather than screenshots alone, and treating build contents as part of release testing. This case study describes the implementation; it is not a claim that the owner wrote every line unaided or has already mastered each system.

## Future work

Independent human playtesting, input remapping and gamepad support; richer original art and sound; more substantial authored puzzles; desktop packaging; commercial/store preparation and wider hardware validation. The portfolio demo can remain stable while those changes continue privately.
