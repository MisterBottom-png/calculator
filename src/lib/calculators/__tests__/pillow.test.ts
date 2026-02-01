import { describe, expect, it } from "vitest";
import { calculatePillow } from "../pillow";

describe("calculatePillow", () => {
  it("matches standard allowance formula", () => {
    const result = calculatePillow({
      fillWeight: 600,
      pct1: 50,
      pct2: 30,
      pct3: 20
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "rows": [
          {
            "kg": 0.303,
            "label": "Fibre 1",
            "pct": 50,
          },
          {
            "kg": 0.18180000000000002,
            "label": "Fibre 2",
            "pct": 30,
          },
          {
            "kg": 0.1212,
            "label": "Fibre 3",
            "pct": 20,
          },
        ],
        "totalPct": 100,
        "warnings": [],
      }
    `);
  });
});
