/**
 *
 * @param obj 유효성 검사할 객체
 * @param keysToPassValidation 검증을 생략할 속성 key
 * @returns 유효하지 않은 키 배열 반환
 * - 타입별로 아래 조건을 만족하면 유효한 값으로 봅니다 ✨
 * - number: 0보다 큰 수
 * - string: empty가 아닌 문자열
 * - array: 비어 있지 않은 경우
 * - 그 외: null이 아닌 값
 */
export const getInvalidKeys = <T extends Record<string, any>>(
  obj: T,
  keysToPassValidation: (keyof T | never)[] = [],
): (keyof T | never)[] => {
  const invalidKeys = Object.keys(obj).filter((key) => {
    if (keysToPassValidation.includes(key)) {
      return false;
    }

    const value = obj[key];

    if (typeof value === "number") {
      return value <= 0;
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return !value;
  });

  return invalidKeys;
};

export const validateData = <T extends Object>(
  obj: T,
  keysToPassValidation: (never | keyof T)[] = [],
): boolean => {
  const invalidKey = getInvalidKeys(obj, keysToPassValidation);

  if (invalidKey.length) {
    alert(`유효한 값을 입력해주세요. (${invalidKey.join(", ")})`);
    return false;
  }

  return true;
};
