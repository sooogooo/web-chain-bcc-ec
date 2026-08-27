/* 本地二维码生成 —— 替代境外 api.qrserver.com
   依赖: /js/qrcode.min.js (qrcode-generator 1.4.4)
   用法: bccSetQR(imgElement, text, color)  color 缺省 #0d2c54 */
(function () {
  function bccSetQR(img, text, color) {
    try {
      var qr = window.qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      var n = qr.getModuleCount();
      var cell = Math.max(4, Math.floor(300 / n));
      var margin = 2;
      var size = (n + margin * 2) * cell;
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = color || '#0d2c54';
      for (var r = 0; r < n; r++) {
        for (var c = 0; c < n; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect((c + margin) * cell, (r + margin) * cell, cell, cell);
          }
        }
      }
      img.src = canvas.toDataURL('image/png');
    } catch (e) {
      img.alt = text;
    }
  }
  window.bccSetQR = bccSetQR;
})();
