const range = (s, e, step = s > e ? -1 : 1) => {
  if (s === e || step === 0) return [s];
  if ((s - e) * step > 0) return []; // (s > e && step > 0)과 (s < e && step < 0) 조건 합침

  const tmps = s;
  e = e ?? (s > 0 ? ((s = 1), tmps) : s === 0 ? 0 : -1);

  const rets = [];

  for (let i = s; s > e ? i >= e : i <= e; i += step) {
    rets.push(i);
  }

  return rets;
};

export { range };
