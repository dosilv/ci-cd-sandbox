import { renderHook, act } from "@testing-library/react";
import { useMockApiState, API } from "./useMockApiState";
import { apiUtil } from "../utils";

// apiUtil mock 설정
jest.mock("../utils", () => ({
  apiUtil: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe("useMockApiState", () => {
  // 각 테스트 전에 mock 초기화
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기값으로 상태가 설정되어야 한다", () => {
    const initialValue = { id: 1, name: "Test Product" };
    const { result } = renderHook(() =>
      useMockApiState(API.PRODUCT, initialValue),
    );

    const [state] = result.current;
    expect(state).toEqual(initialValue);
  });

  it("마운트 시 API에서 데이터를 가져와야 한다", async () => {
    const mockData = { id: 1, name: "Fetched Product" };
    (apiUtil.get as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useMockApiState(API.PRODUCT, null));

    // API 호출 대기
    await act(async () => {
      await Promise.resolve();
    });

    const [state] = result.current;
    expect(apiUtil.get).toHaveBeenCalledWith(API.PRODUCT);
    expect(state).toEqual(mockData);
  });

  it("updateState 함수가 상태를 올바르게 업데이트해야 한다", async () => {
    const initialValue = { id: 1, name: "Initial Product" };
    const updatedValue = { id: 1, name: "Updated Product" };

    (apiUtil.put as jest.Mock).mockResolvedValueOnce(updatedValue);

    const { result } = renderHook(() =>
      useMockApiState(API.PRODUCT, initialValue),
    );

    await act(async () => {
      const [, updateState] = result.current;
      await updateState((prev) => ({ ...prev, name: "Updated Product" }));
    });

    const [state] = result.current;
    expect(apiUtil.put).toHaveBeenCalledWith(API.PRODUCT, updatedValue);
    expect(state).toEqual(updatedValue);
  });

  it("API 오류 발생 시 에러를 처리해야 한다", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (apiUtil.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    renderHook(() => useMockApiState(API.PRODUCT, null));

    await act(async () => {
      await Promise.resolve();
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it("여러 번의 상태 업데이트를 순차적으로 처리해야 한다", async () => {
    const initialValue = { count: 0 };
    const firstUpdate = { count: 1 };
    const secondUpdate = { count: 2 };

    (apiUtil.put as jest.Mock)
      .mockResolvedValueOnce(firstUpdate)
      .mockResolvedValueOnce(secondUpdate);

    const { result } = renderHook(() =>
      useMockApiState(API.PRODUCT, initialValue),
    );

    await act(async () => {
      const [, updateState] = result.current;
      await updateState((prev) => ({ count: prev.count + 1 }));
      await updateState((prev) => ({ count: prev.count + 1 }));
    });

    const [state] = result.current;
    expect(state).toEqual(secondUpdate);
    expect(apiUtil.put).toHaveBeenCalledTimes(2);
  });
});
