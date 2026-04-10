/* Webflow footer: <script src="https://cdn.jsdelivr.net/gh/mattcretzman/pf@main/f.js"></script>
 * Replaces broken Wikimedia <img> URLs in Mapbox popups with Mapbox Static API satellite tiles.
 * IMPORTANT: Do not escape ! or !== (e.g. never use \! or \!==) — that breaks the script.
 */
(function () {
  var T =
    'pk.eyJ1IjoibWNyZXR6bWFuIiwiYSI6ImNtYnRjcWNpMjAy' +
    'NGUybnBuMjVkeDJvcnkifQ.l4wzjCJRyEhuIzaAUJXaMw';
  var U =
    'https://api.mapbox.com/styles/v1/mapbox/' +
    'satellite-streets-v12/static/';
  var C = {
    Irwin: [-116.6858, 35.2628, 12],
    Carson: [-104.7803, 38.7248, 12],
    Schofield: [-158.0586, 21.495, 13],
    Leavenworth: [-94.922, 39.3564, 13],
    Leonard: [-92.1371, 37.7247, 13],
    Sill: [-98.4031, 34.6495, 13],
    Hood: [-97.7736, 31.1388, 11],
    Cavazos: [-97.7736, 31.1388, 11],
  };
  setInterval(function () {
    document.querySelectorAll('.mapboxgl-popup img').forEach(function (img) {
      if (!img.src || img.src.indexOf('wikimedia') === -1) return;
      for (var k in C) {
        if (img.src.indexOf(k) !== -1) {
          var c = C[k];
          img.src =
            U +
            c[0] +
            ',' +
            c[1] +
            ',' +
            c[2] +
            ',0/640x360?access_token=' +
            T;
          return;
        }
      }
    });
  }, 300);
})();
