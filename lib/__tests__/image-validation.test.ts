import { describe, expect, it } from "vitest";
import {
  validateImageBuffer,
  MAX_IMAGE_BYTES,
  MIN_WIDTH,
  MIN_HEIGHT,
  MAX_WIDTH,
  MAX_HEIGHT,
} from "../image-validation";

/**
 * Builds a minimal-but-structurally-valid PNG buffer with a real IHDR
 * chunk (so image-size reports accurate width/height), without needing a
 * real image-encoding library. Good enough for exercising the validation
 * logic under test — this file is never actually decoded as pixels.
 */
function makePngBuffer(width: number, height: number): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: truecolor
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const length = Buffer.alloc(4);
  length.writeUInt32BE(13, 0);
  const type = Buffer.from("IHDR");
  const crc = Buffer.alloc(4);
  return Buffer.concat([signature, length, type, ihdrData, crc]);
}

function makeJpegBuffer(width: number, height: number): Buffer {
  // SOI + an empty APP0 segment (so the JPG parser's marker scan has
  // something to skip past) + a minimal SOF0 segment carrying real
  // dimensions. Not a decodable photo, just enough structure for the
  // dimension scanner in image-size to find real width/height.
  const soiAndApp0Marker = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
  const app0Length = Buffer.from([0x00, 0x02]); // length field only, no payload
  const sof0Marker = Buffer.from([0xff, 0xc0]);
  const sof0Length = Buffer.alloc(2);
  sof0Length.writeUInt16BE(11, 0);
  const precision = Buffer.from([0x08]);
  const heightBytes = Buffer.alloc(2);
  heightBytes.writeUInt16BE(height, 0);
  const widthBytes = Buffer.alloc(2);
  widthBytes.writeUInt16BE(width, 0);
  return Buffer.concat([
    soiAndApp0Marker,
    app0Length,
    sof0Marker,
    sof0Length,
    precision,
    heightBytes,
    widthBytes,
  ]);
}

describe("validateImageBuffer", () => {
  it("accepts a JPG within size and dimension bounds", () => {
    const buffer = makeJpegBuffer(1200, 800);
    const result = validateImageBuffer(buffer);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.format).toBe("jpeg");
      expect(result.extension).toBe("jpg");
      expect(result.width).toBe(1200);
      expect(result.height).toBe(800);
    }
  });

  it("accepts a PNG within size and dimension bounds", () => {
    const buffer = makePngBuffer(1000, 700);
    const result = validateImageBuffer(buffer);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.format).toBe("png");
      expect(result.extension).toBe("png");
    }
  });

  it("rejects formats other than JPG/PNG (e.g. GIF)", () => {
    const gif = Buffer.from("GIF89a", "ascii");
    const result = validateImageBuffer(gif);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/JPG and PNG/i);
    }
  });

  it("rejects an empty file", () => {
    const result = validateImageBuffer(Buffer.alloc(0));
    expect(result.valid).toBe(false);
  });

  it("rejects files over the size limit", () => {
    const huge = Buffer.concat([
      makePngBuffer(1000, 700),
      Buffer.alloc(MAX_IMAGE_BYTES),
    ]);
    const result = validateImageBuffer(huge);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/exceeds/i);
    }
  });

  it("rejects images smaller than the minimum dimensions", () => {
    const buffer = makePngBuffer(MIN_WIDTH - 1, MIN_HEIGHT - 1);
    const result = validateImageBuffer(buffer);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/Minimum allowed/i);
    }
  });

  it("rejects images larger than the maximum dimensions", () => {
    const buffer = makePngBuffer(MAX_WIDTH + 1, MAX_HEIGHT + 1);
    const result = validateImageBuffer(buffer);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/exceeds/i);
    }
  });
});
