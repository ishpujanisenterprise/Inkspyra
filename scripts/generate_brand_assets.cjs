const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function writePNG(width, height, rgbaBuffer) {
  const bpp = 4;
  const stride = 1 + width * bpp;
  const filtered = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    filtered[y * stride] = 0; // Filter 0 (None)
    rgbaBuffer.copy(filtered, y * stride + 1, y * width * bpp, (y + 1) * width * bpp);
  }
  const idat = zlib.deflateSync(filtered, { level: 9 });
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function makeChunk(type, data) {
    const chunk = Buffer.alloc(12 + data.length);
    chunk.writeUInt32BE(data.length, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const toCrc = chunk.subarray(4, 8 + data.length);
    chunk.writeUInt32BE(crc32(toCrc), 8 + data.length);
    return chunk;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8, width, height;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4;
  const stride = 1 + width * bpp;
  const pixels = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(width * bpp);
  for (let y = 0; y < height; y++) {
    const filter = decompressed[y * stride];
    const row = decompressed.subarray(y * stride + 1, (y + 1) * stride);
    const unfiltered = Buffer.alloc(width * bpp);
    for (let i = 0; i < width * bpp; i++) {
      const x = row[i];
      const a = i >= bpp ? unfiltered[i - bpp] : 0;
      const b = prevRow[i];
      const c = i >= bpp ? prevRow[i - bpp] : 0;
      let val = 0;
      if (filter === 0) val = x;
      else if (filter === 1) val = (x + a) & 0xff;
      else if (filter === 2) val = (x + b) & 0xff;
      else if (filter === 3) val = (x + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (x + pr) & 0xff;
      }
      unfiltered[i] = val;
    }
    unfiltered.copy(pixels, y * width * 4);
    prevRow = unfiltered;
  }
  return { width, height, pixels };
}

function resampleAreaAverage(srcWidth, srcHeight, srcPixels, dstWidth, dstHeight) {
  const dst = Buffer.alloc(dstWidth * dstHeight * 4);
  const xRatio = srcWidth / dstWidth;
  const yRatio = srcHeight / dstHeight;

  for (let dy = 0; dy < dstHeight; dy++) {
    const syStart = dy * yRatio;
    const syEnd = (dy + 1) * yRatio;
    const syMin = Math.floor(syStart);
    const syMax = Math.min(Math.ceil(syEnd), srcHeight);

    for (let dx = 0; dx < dstWidth; dx++) {
      const sxStart = dx * xRatio;
      const sxEnd = (dx + 1) * xRatio;
      const sxMin = Math.floor(sxStart);
      const sxMax = Math.min(Math.ceil(sxEnd), srcWidth);

      let totalWeight = 0;
      let rSum = 0, gSum = 0, bSum = 0, aSum = 0;

      for (let sy = syMin; sy < syMax; sy++) {
        const yWeight = Math.min(sy + 1, syEnd) - Math.max(sy, syStart);
        if (yWeight <= 0) continue;

        for (let sx = sxMin; sx < sxMax; sx++) {
          const xWeight = Math.min(sx + 1, sxEnd) - Math.max(sx, sxStart);
          if (xWeight <= 0) continue;

          const weight = xWeight * yWeight;
          const idx = (sy * srcWidth + sx) * 4;
          const a = srcPixels[idx + 3] / 255;
          // Premultiply alpha for accurate color blending
          rSum += srcPixels[idx] * a * weight;
          gSum += srcPixels[idx + 1] * a * weight;
          bSum += srcPixels[idx + 2] * a * weight;
          aSum += srcPixels[idx + 3] * weight;
          totalWeight += weight;
        }
      }

      const dstIdx = (dy * dstWidth + dx) * 4;
      if (totalWeight > 0) {
        const finalA = aSum / totalWeight;
        if (finalA > 0.5) {
          const normA = finalA / 255;
          dst[dstIdx] = Math.round(Math.min(255, Math.max(0, (rSum / totalWeight) / normA)));
          dst[dstIdx + 1] = Math.round(Math.min(255, Math.max(0, (gSum / totalWeight) / normA)));
          dst[dstIdx + 2] = Math.round(Math.min(255, Math.max(0, (bSum / totalWeight) / normA)));
          dst[dstIdx + 3] = Math.round(Math.min(255, Math.max(0, finalA)));
        } else {
          dst[dstIdx] = 0;
          dst[dstIdx + 1] = 0;
          dst[dstIdx + 2] = 0;
          dst[dstIdx + 3] = 0;
        }
      }
    }
  }
  return dst;
}

function buildICO(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4);

  let currentOffset = 6 + count * 16;
  const dirEntries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry[0] = img.width >= 256 ? 0 : img.width;
    entry[1] = img.height >= 256 ? 0 : img.height;
    entry[2] = 0; // color count
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

function main() {
  console.log('Reading source logo...');
  const { width, height, pixels } = decodePNG('public/images/inkspyra-logo.png');

  // Exact symbol crop with 8px padding
  const symMinX = 340, symMaxX = 688;
  const symMinY = 42, symMaxY = 452;
  const pad = 8;

  const cropW = (symMaxX - symMinX + 1) + pad * 2;
  const cropH = (symMaxY - symMinY + 1) + pad * 2;
  const cropPixels = Buffer.alloc(cropW * cropH * 4);
  const whitePixels = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    const srcY = symMinY - pad + y;
    for (let x = 0; x < cropW; x++) {
      const srcX = symMinX - pad + x;
      const dstIdx = (y * cropW + x) * 4;
      if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
        const srcIdx = (srcY * width + srcX) * 4;
        const r = pixels[srcIdx];
        const g = pixels[srcIdx + 1];
        const b = pixels[srcIdx + 2];
        const a = pixels[srcIdx + 3];

        cropPixels[dstIdx] = r;
        cropPixels[dstIdx + 1] = g;
        cropPixels[dstIdx + 2] = b;
        cropPixels[dstIdx + 3] = a;

        // White version
        whitePixels[dstIdx] = 255;
        whitePixels[dstIdx + 1] = 255;
        whitePixels[dstIdx + 2] = 255;
        whitePixels[dstIdx + 3] = a;
      }
    }
  }

  // Write symbol images
  const symPNG = writePNG(cropW, cropH, cropPixels);
  fs.writeFileSync('public/images/inkspyra-symbol.png', symPNG);
  console.log('Saved public/images/inkspyra-symbol.png (' + cropW + 'x' + cropH + ')');

  const symWhitePNG = writePNG(cropW, cropH, whitePixels);
  fs.writeFileSync('public/images/inkspyra-symbol-white.png', symWhitePNG);
  console.log('Saved public/images/inkspyra-symbol-white.png (' + cropW + 'x' + cropH + ')');

  // Create square 512x512 canvas for favicons
  const squareSize = 512;
  const squarePixels = Buffer.alloc(squareSize * squareSize * 4);
  // Center the symbol in squareSize
  const offsetX = Math.round((squareSize - cropW) / 2);
  const offsetY = Math.round((squareSize - cropH) / 2);

  for (let y = 0; y < cropH; y++) {
    const dstY = offsetY + y;
    if (dstY < 0 || dstY >= squareSize) continue;
    for (let x = 0; x < cropW; x++) {
      const dstX = offsetX + x;
      if (dstX < 0 || dstX >= squareSize) continue;
      const srcIdx = (y * cropW + x) * 4;
      const dstIdx = (dstY * squareSize + dstX) * 4;
      squarePixels[dstIdx] = cropPixels[srcIdx];
      squarePixels[dstIdx + 1] = cropPixels[srcIdx + 1];
      squarePixels[dstIdx + 2] = cropPixels[srcIdx + 2];
      squarePixels[dstIdx + 3] = cropPixels[srcIdx + 3];
    }
  }

  // Downsample to favicons
  console.log('Downsampling favicons...');
  const icon180Pixels = resampleAreaAverage(squareSize, squareSize, squarePixels, 180, 180);
  const icon180PNG = writePNG(180, 180, icon180Pixels);
  fs.writeFileSync('public/apple-touch-icon.png', icon180PNG);
  console.log('Saved public/apple-touch-icon.png (180x180)');

  const icon48Pixels = resampleAreaAverage(squareSize, squareSize, squarePixels, 48, 48);
  const icon48PNG = writePNG(48, 48, icon48Pixels);

  const icon32Pixels = resampleAreaAverage(squareSize, squareSize, squarePixels, 32, 32);
  const icon32PNG = writePNG(32, 32, icon32Pixels);
  fs.writeFileSync('public/favicon-32x32.png', icon32PNG);
  console.log('Saved public/favicon-32x32.png (32x32)');

  const icon16Pixels = resampleAreaAverage(squareSize, squareSize, squarePixels, 16, 16);
  const icon16PNG = writePNG(16, 16, icon16Pixels);
  fs.writeFileSync('public/favicon-16x16.png', icon16PNG);
  console.log('Saved public/favicon-16x16.png (16x16)');

  // Build ICO with 16, 32, 48
  const icoBuf = buildICO([
    { width: 16, height: 16, buffer: icon16PNG },
    { width: 32, height: 32, buffer: icon32PNG },
    { width: 48, height: 48, buffer: icon48PNG }
  ]);
  fs.writeFileSync('public/favicon.ico', icoBuf);
  console.log('Saved public/favicon.ico');

  // Build high-res SVG favicon with the crisp symbol
  // We embed the high-res 512x512 PNG data URI so the SVG displays the identical authentic mark perfectly at any zoom level
  const base64Symbol = writePNG(squareSize, squareSize, squarePixels).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Symbol}" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent, 'utf8');
  console.log('Saved public/favicon.svg');

  console.log('ALL BRAND ASSETS GENERATED SUCCESSFULLY!');
}

main();
