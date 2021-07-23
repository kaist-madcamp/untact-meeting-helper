export const random_rgba = (): string => {
  const o = Math.round,
    r = Math.random,
    s = 50;
  return (
    'rgba(' +
    o(r() * s) +
    ',' +
    o(r() * s) +
    ',' +
    o(r() * s) +
    ',' +
    r().toFixed(1) +
    ')'
  );
};
