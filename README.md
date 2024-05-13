# Gooddy the Warehouse Robot

Meet Gooddy - a robot that manages goods in the warehouse which has a grid aligned along North-South and East-West axes.

Goddy is able to move within the Warehouse by executing a series of commands:

- `N`: move 1 cell to North
- `S`: move 1 cell to South
- `E`: move 1 cell to East
- `W`: move 1 cell to West

## Project structure

Logically the project is split into few units:

- `Core`: components that perform all the business logic;
- `Apps`: ways to execute the project and consume the core;
- `Config`: unit that consolidates all parameters that control project execution such as environment variables;
- `Tests`: tests that cover all the units above.

## Potential improvements

- Error literals could be returned by functions and reused in tests. This way if error text changes, there is no need to change all the places it is used in.
- Custom error types could be introduced so they can be separated from unexpected errors and better handled by an app.
- CLI app is basic but potentially can accept warehouse dimensions and robot starting position to override default ones or provided by env vars.
- There could be also HTTP server implementation that could control the Robot remotely.
- Robot's position could be represented as a grid made from ASCII characters. Something like this:

```
O O O O O
O O O * O
O O O O O
O O O O O
```

## Setup

Prerequisites:

- Node >= 20
- pnpm >= 9

Install all the dependencies:

```bash
pnpm install
```

Optionally create `.env` file from `.env.sample` to override default values which are:

- Warehouse dimensions: 10 x 10
- Robot start position: [0, 0]

> Position coordinates are counted from North West to South East and have a format of `[X, Y]` where
>
> - `X` is West to East direction
> - `Y` is North to South direction

## Launch

The project can be executed as a `Console App` or `CLI`.

### Console App

`Console App` is an interactive shell where you can enter commands into a prompt.

```bash
pnpm run console
```

### CLI

`CLI` accepts command sequence as a parameter:

```bash
pnpm run cli <commands>
```

For example:

```bash
pnpm run cli S E E S N W
```

### Dev mode

You can also execute project in development mode which reloads it after each change that is made.
By default it is launched as `Console App` but you can specify another execution type as a parameter.

```bash
pnpm run dev [<exec_type>] [<params>]
```

## Tests

Execute all tests by:

```bash
pnpm run test
```
