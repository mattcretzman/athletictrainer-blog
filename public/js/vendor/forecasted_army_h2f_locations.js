(function() {
  var MAPBOX_TOKEN = 'pk.eyJ1IjoibWNyZXR6bWFuIiwiYSI6ImNtYnRjcWNpMjAyNGUybnBuMjVkeDJvcnkifQ.l4wzjCJRyEhuIzaAUJXaMw';

  function satelliteImg(lon, lat, zoom) {
    zoom = zoom || 12;
    return 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/' +
      lon + ',' + lat + ',' + zoom + ',0/640x360?access_token=' + MAPBOX_TOKEN;
  }

  var newLocations = [
  {
    "name": "Fort Irwin",
    "optionLabel": "• Fort Irwin – Barstow, CA",
    "coordinates": [-116.6858, 35.2628],
    "description": "Fort Irwin is home to the National Training Center (NTC), the U.S. Army's premier combat training facility in the Mojave Desert near Barstow, California. Covering over 1,000 square miles, it trains brigade combat teams and joint forces in large-scale combat operations and serves as a key readiness hub for deploying forces.",
    "image": satelliteImg(-116.6858, 35.2628, 12)
  },
  {
    "name": "Fort Carson",
    "optionLabel": "• Fort Carson – Colorado Springs, CO",
    "coordinates": [-104.7803, 38.7248],
    "description": "Fort Carson is a U.S. Army installation near Colorado Springs, Colorado, home to the 4th Infantry Division. Nestled at the foot of the Rocky Mountains, it covers about 137,000 acres and supports armored, aviation, and special operations units, with Pinon Canyon Maneuver Site providing additional large-scale training terrain.",
    "image": satelliteImg(-104.7803, 38.7248, 12)
  },
  {
    "name": "Schofield Barracks",
    "optionLabel": "• Schofield Barracks – Wahiawa, HI",
    "coordinates": [-158.0586, 21.495],
    "description": "Schofield Barracks is a U.S. Army installation near Wahiawa, Oahu, Hawaii, home to the 25th Infantry Division (\"Tropic Lightning\"). Established in 1908, it covers approximately 14,000 acres in the Leilehua Plateau and is the largest Army installation in Hawaii, supporting rapid-deployment infantry and aviation operations in the Pacific.",
    "image": satelliteImg(-158.0586, 21.495, 13)
  },
  {
    "name": "Fort Leavenworth",
    "optionLabel": "• Fort Leavenworth – Fort Leavenworth, KS",
    "coordinates": [-94.922, 39.3564],
    "description": "Fort Leavenworth is the Army's oldest active west-of-the-Mississippi installation, located in Fort Leavenworth, Kansas. Home to the Combined Arms Center and the Command and General Staff College, it serves as the intellectual center of the Army, shaping doctrine, leader development, and military education across all branches.",
    "image": satelliteImg(-94.922, 39.3564, 13)
  },
  {
    "name": "Fort Leonard Wood",
    "optionLabel": "• Fort Leonard Wood – St. Robert, MO",
    "coordinates": [-92.1371, 37.7247],
    "description": "Fort Leonard Wood is a U.S. Army installation in Pulaski County, Missouri, near St. Robert. Known as \"Little Korea\" for its rugged terrain, it is home to the Maneuver Support Center of Excellence, training engineers, military police, and CBRN soldiers. It is one of the Army's primary One-Station Unit Training sites.",
    "image": satelliteImg(-92.1371, 37.7247, 13)
  },
  {
    "name": "Fort Sill",
    "optionLabel": "• Fort Sill – Lawton, OK",
    "coordinates": [-98.4031, 34.6495],
    "description": "Fort Sill is a U.S. Army installation near Lawton, Oklahoma, and the home of the Field Artillery and Air Defense Artillery. Established in 1869, it is a major training installation covering approximately 94,000 acres. Fort Sill houses the Fires Center of Excellence and supports One-Station Unit Training for field artillery.",
    "image": satelliteImg(-98.4031, 34.6495, 13)
  },
  {
    "name": "Fort Cavazos",
    "optionLabel": "• Fort Cavazos – Killeen, TX",
    "coordinates": [-97.7736, 31.1388],
    "description": "Fort Cavazos (formerly Fort Hood) is the largest U.S. Army installation in the world by area, located near Killeen, Texas. Home to the 1st Cavalry Division and III Armored Corps, it covers over 214,000 acres and houses more than 45,000 active-duty soldiers, making it a cornerstone of Army armored and aviation readiness.",
    "image": satelliteImg(-97.7736, 31.1388, 11)
  }
];

  // Add CSS for orange marker and legend dot
  var style = document.createElement('style');
  style.textContent = [
    '.marker-dot.orange { width: 14px; height: 14px; border-radius: 50%; background-color: #FF8C00; cursor: pointer; border: 2px solid rgba(255,255,255,0.7); }',
    '.legend-dot.orange { background-color: #FF8C00; }',
    '.program-label.forecasted-h2f { background-color: #FF8C00; color: #000; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 3px; margin-bottom: 6px; display: inline-block; }',
  ].join('\n');
  document.head.appendChild(style);

  newLocations.forEach(function(loc) {
    var index = locations.length;
    locations.push(loc);

    // Add option to select dropdown
    var select = document.getElementById('location-select');
    if (select) {
      var option = document.createElement('option');
      option.value = index;
      option.textContent = loc.optionLabel;
      select.appendChild(option);
    }

    // Create Mapbox marker
    var el = document.createElement('div');
    el.className = 'marker-dot orange';

    var popup = new mapboxgl.Popup({
      offset: 15,
      closeButton: false,
      closeOnClick: false
    }).setHTML(
      '<div class="popup-content">' +
        '<div class="program-label forecasted-h2f">Forecasted Army H2F</div>' +
        '<div class="popup-title">' + loc.name + '</div>' +
        '<p>' + loc.description + '</p>' +
        '<img src="' + loc.image + '" alt="' + loc.name + ' photo" />' +
      '</div>'
    );

    var marker = new mapboxgl.Marker(el)
      .setLngLat(loc.coordinates)
      .addTo(map);

    el.addEventListener('mouseenter', function() { popup.setLngLat(loc.coordinates).addTo(map); });
    el.addEventListener('mouseleave', function() { popup.remove(); });
  });

  // Add legend entries
  var legend = document.querySelector('.map-legend');
  if (legend) {
    var entry = document.createElement('div');
    entry.innerHTML = '<span class="legend-dot orange"></span>Forecasted Army H2F Locations';
    legend.appendChild(entry);
  }
  var legendMobile = document.querySelector('.map-legend-mobile');
  if (legendMobile) {
    var entryM = document.createElement('div');
    entryM.innerHTML = '<span class="legend-dot orange"></span>Forecasted Army H2F';
    legendMobile.appendChild(entryM);
  }
})();
