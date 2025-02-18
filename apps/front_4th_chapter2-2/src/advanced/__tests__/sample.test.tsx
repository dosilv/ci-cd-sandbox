import { describe, test, expect } from "vitest";

describe("my lovely new test", () => {
  test("fancy", () => {
    expect(true).toBe(true);
  });

  test("test", () => {
    expect(true).toBe(true);
  });
});

describe("테스트가 작동해야 한다", () => {
  test("테스트가 깜찍하게 작동해야 한다", () => {
    expect(true).toBe(true);
  });

  test(" 테스트가 어쩌구 해야 한다", () => {
    expect(true).toBe(true);
  });

  test(" 뿅!", () => {
    expect(true).toBe(true);
  });
});


describe('랄랄라~~', () => {
  test('나나나', () => { expect(true).toBe(true); });
  test('나나', () => { expect(true).toBe(true); });
})