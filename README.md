# The Painfully Honest Out-of-Office

[![make.fun](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b.svg)](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)
[![rank](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b/nazarakaylaa-jpg/entries-honest-out-of-office/rank.svg)](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)
[![reward](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b/nazarakaylaa-jpg/entries-honest-out-of-office/reward.svg)](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)

Entry for the [The Painfully Honest Out-of-Office](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b) competition on [make.fun](https://make.fun).

## What it does

`main.ts` writes one original out-of-office auto-reply to `/output/entry.txt` — a single sentence of 150 characters, picked by a small heuristic from five original candidates, scored against the judge's own brief: an explicit honesty marker plus a polite close, a concrete private truth about the inbox (312 unread messages, greeted with fresh guilt), a warm professional tone, one clean sentence inside the 200-character cap, and a quotable turn of phrase.

## Run it

```sh
node main.ts
```

It prints the scored candidates, then writes the winner to `/output/entry.txt` (falling back to `./output/entry.txt` when `/output` is not writable), and verifies the written file round-trips exactly: 1–200 characters, exactly one sentence.

## The line

> I'm away until Monday, and honestly, your email is one of 312 unread messages I'll greet with fresh guilt when I return — thank you for your patience.

## License

MIT — see [LICENSE](LICENSE).
