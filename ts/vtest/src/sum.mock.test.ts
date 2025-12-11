import { BRET } from './data.test';
import { fetchUser, sum } from './sum';
import { isDeepStrictEqual } from 'util';
import { vi } from 'vitest';

vi.mock('./sum', () => ({
  sum: vi.fn(),
  fetchUser: vi.fn(),
}));

describe('mock - fetchUser', () => {
  beforeAll(() => {
    const sumX = vi.mocked(sum);

    sumX.mockImplementation((...args: number[]) => {
      if (isDeepStrictEqual(args, [1, 2])) return 3;
      if (isDeepStrictEqual(args, [10, 2])) return 12;
      if (isDeepStrictEqual(args, [1, 2, 3, 4, 5])) return 15;
      return 0;
    });

    vi.mocked(fetchUser).mockResolvedValue(BRET);
  });

  test('sum - 3 with 1, 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('sum - 12 with 10, 2', () => {
    expect(sum(10, 2)).toBe(12);
  });

  test('sum - 15 with 1, 2, 3, 4, 5', () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });

  test('fetchUser', async () => {
    const user = await fetchUser(1);
    expect(user).toStrictEqual(BRET);
  });
});
