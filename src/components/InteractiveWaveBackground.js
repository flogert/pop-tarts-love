// ...removed unused imports...

// Simple 2D noise function for wave generation with seed support
function createNoise2D(seed = 0.5) {
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;
  const G22 = (3 - Math.sqrt(3)) / 3;
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    p[i] = i;
  }
  // Use seed to create deterministic random values
  const seededRandom = (index) => {
    const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  // Shuffle the permutation table using seeded random
  for (let i = 255; i > 0; i--) {
    const n = Math.floor((i + 1) * seededRandom(i));
    const q = p[i];
    p[i] = p[n];
    p[n] = q;
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  const grad2 = new Float64Array([
    1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1,
  ]);
  const fastFloor = (x) => Math.floor(x) | 0;
  return function noise2D(x, y) {
    const s = (x + y) * F2;
    const i = fastFloor(x + s);
    const j = fastFloor(y + s);
    const t = (i + j) * G2;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    let i1, j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + G22;
    const y2 = y0 - 1 + G22;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = permMod12[ii + perm[jj]];
    const gi1 = permMod12[ii + i1 + perm[jj + j1]];
    const gi2 = permMod12[ii + 1 + perm[jj + 1]];
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    let n0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * (grad2[gi0 * 2] * x0 + grad2[gi0 * 2 + 1] * y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    let n1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * (grad2[gi1 * 2] * x1 + grad2[gi1 * 2 + 1] * y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    let n2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * (grad2[gi2 * 2] * x2 + grad2[gi2 * 2 + 1] * y2);
    }
    return 70 * (n0 + n1 + n2);
  };
}

// InteractiveWaveBackground component removed
export default function InteractiveWaveBackground() {
  return null;
}
