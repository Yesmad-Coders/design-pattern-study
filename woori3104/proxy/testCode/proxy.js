function GeoCoder() {

  this.getLatLng = function (address) {

    if (address === "Amsterdam") {
      return "52.3700° N, 4.8900° E";
    } else if (address === "London") {
      return "51.5171° N, 0.1062° W";
    } else if (address === "Paris") {
      return "48.8742° N, 2.3470° E";
    } else if (address === "Seoul") {
      return "59.3064° N, 1.4127° E";
    } else {
      return "";
    }
  };
}

function GeoProxy () {
  const geocoder = new GeoCoder();
  const geocache = {};

  return {
    getLatLng: function (address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      console.log(address + ": " + geocache[address]);
      return geocache[address];
    },
    getCount: function () {
      let count = 0;
      for (let code in geocache) { 
        console.log(code); 
        count++; 
      }
      return count;
    }
  };
};

const run = () => {

  const geo = new GeoProxy();
  console.log("\nCache size: " + geo.getCount());
  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("seoul");

  console.log("\nCache size: " + geo.getCount());
    
}

run();
