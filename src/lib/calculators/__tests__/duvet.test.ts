import { describe, expect, it } from "vitest";
import { calculateDuvet } from "../duvet";

describe("calculateDuvet", () => {
  it("matches standard sonic seam output", () => {
    const result = calculateDuvet({
      sizeMode: "preset",
      sizePreset: "SINGLE",
      width: 135,
      length: 200,
      productKey: "ss_with",
      tog: 10.5,
      fibreIndex: 0
    });

    expect({
      area: result.area,
      totalKg: result.totalKg,
      rollWidth: result.rollWidth,
      baseFabricLength: result.baseFabricLength,
      corovinLength: result.corovinLength,
      bindingLength: result.bindingLength,
      warnings: result.warnings,
      breakdown: result.breakdown
    }).toMatchInlineSnapshot(`
      {
        "area": 2.7,
        "baseFabricLength": 2.8784,
        "bindingLength": null,
        "breakdown": [
          {
            "code": "A6FIBRENO4YGRS",
            "g": 585,
            "kg": 0.585,
            "label": "Fibre 1",
            "pct": 65,
          },
          {
            "code": "A6FIBRENO2CGRS",
            "g": 315,
            "kg": 0.315,
            "label": "Fibre 2",
            "pct": 35,
          },
          {
            "code": "—",
            "g": 0,
            "kg": 0,
            "label": "Fibre 3",
            "pct": 0,
          },
        ],
        "corovinLength": 2.993536,
        "rollWidth": 220,
        "totalKg": 0.9,
        "warnings": [],
      }
    `);
  });

  it("matches bound emperor output", () => {
    const result = calculateDuvet({
      sizeMode: "preset",
      sizePreset: "EMPEROR",
      width: 290,
      length: 235,
      productKey: "bd_with",
      tog: 15,
      fibreIndex: 1
    });

    expect({
      area: result.area,
      totalKg: result.totalKg,
      rollWidth: result.rollWidth,
      baseFabricLength: result.baseFabricLength,
      corovinLength: result.corovinLength,
      bindingLength: result.bindingLength,
      warnings: result.warnings,
      breakdown: result.breakdown
    }).toMatchInlineSnapshot(`
      {
        "area": 6.815,
        "baseFabricLength": 6.18202,
        "bindingLength": 11.34,
        "breakdown": [
          {
            "code": "A6FIBRENO4YGRS",
            "g": 2509,
            "kg": 2.509,
            "label": "Fibre 1",
            "pct": 65,
          },
          {
            "code": "A6FIBRENO2CGRS",
            "g": 1158,
            "kg": 1.158,
            "label": "Fibre 2",
            "pct": 30,
          },
          {
            "code": "A6SILK9767",
            "g": 193,
            "kg": 0.193,
            "label": "Fibre 3",
            "pct": 5,
          },
        ],
        "corovinLength": 6.5529412,
        "rollWidth": 260,
        "totalKg": 3.86,
        "warnings": [],
      }
    `);
  });
});
