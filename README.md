# Array-to-object performance in JavaScript

This repository contains benchmarks for different implementations of function, that turns an array of objects into an object with ids as keys and the objects as values. Like this:

```
[object1, object2] -> { [object1.id]: object1, [object2.id]: object2 }
```

The benchmark is implemented in [main.js](./main.js) file.

There are 3 implementation variants:
1. Reduce + spread (`getItemsById1`)
2. Reduce + mutation (`getItemsById2`)
3. `for-of` + mutation (`getItemsById3`)

For benchmarks, a package called [mitata](https://github.com/evanwashere/mitata) is used, that Bun [recommends](https://bun.sh/docs/project/benchmarking#benchmarking-tools).

## Results

### Browser

Google Chrome 137.0.7151.120 (64-bit)

```
clk: ~5.17 GHz
cpu: null
runtime: browser (null)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
reduce + spread (10000)         7.09 s/iter    7.16 s  █                   
                          (6.99 s … 7.19 s)    7.18 s ██▁▁██▁▁▁▁▁█▁██▁▁▁███
reduce + mutation (10000)    356.97 µs/iter 400.00 µs    █   ▄             
                      (200.00 µs … 2.10 ms) 800.00 µs ▃▁▁█▁▁▁█▁▁▂▁▁▁▁▁▁▁▁▁▁
for-of + mutation (10000)    342.85 µs/iter 400.00 µs    █                 
                      (200.00 µs … 2.60 ms) 800.00 µs ▃▁▁█▁▁▁█▁▁▂▁▁▁▁▁▁▁▁▁▁
```

Highest/lowest ratio: 20,679.6

#### How to check

Run the following command in console:

```bash
npm run dev
```

Follow the link to localhost and check the console in the browser.

### Node.js

Version: 24.2.0

```
clk: ~5.45 GHz
cpu: 13th Gen Intel(R) Core(TM) i9-13900KF
runtime: node 24.2.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
reduce + spread (10000)         9.10 s/iter    9.11 s   █       █
                          (9.01 s … 9.23 s)    9.20 s ▅▅█     ▅▅█▅       ▅▅
                    ( 24.58 mb …  29.76 mb)  26.20 mb ███▁▁▁▁▁████▁▁▁▁▁▁▁██

reduce + mutation (10000)    440.91 µs/iter 431.00 µs   █▆
                      (369.30 µs … 3.44 ms) 788.40 µs ▇ ██
                    (768.81 kb … 840.13 kb) 830.67 kb █▇██▃▃▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁

for-of + mutation (10000)    416.35 µs/iter 413.60 µs  █▂
                      (344.80 µs … 3.35 ms) 783.20 µs  ██▂
                    (768.76 kb …   1.35 mb) 934.26 kb █████▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
```

Highest/lowest ratio: 21,856.6

#### How to check

Run the following command in console:

```bash
node main.js
```

### Bun

Version: 1.2.17

```
clk: ~3.66 GHz
cpu: 13th Gen Intel(R) Core(TM) i9-13900KF
runtime: bun 1.2.17 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
reduce + spread (10000)         1.67 s/iter    1.68 s    █         █       
                          (1.64 s … 1.73 s)    1.69 s ▅  █ ▅   ▅  ▅█▅▅    ▅
                    (  0.00  b …  15.98 mb)   2.28 mb █▁▁█▁█▁▁▁█▁▁████▁▁▁▁█

reduce + mutation (10000)    459.78 µs/iter 424.40 µs █
                      (380.00 µs … 3.33 ms)   2.40 ms █
                    (  0.00  b …   4.74 mb)   3.36 kb █▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

for-of + mutation (10000)    441.00 µs/iter 405.80 µs █
                      (362.60 µs … 3.44 ms)   3.00 ms █
                    (  0.00  b …  12.00 kb)  20.70  b █▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
```

Highest/lowest ratio: 3,786.8

#### How to check

Run the following command in console:

```bash
bun main.js
```
