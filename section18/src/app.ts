import L from "leaflet";

// webpack bundles leaflet.js but not its marker images, so the default
// icon path lookup fails; point it at the same CDN as the CSS in index.html.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const mapDiv = document.getElementById("map")!;

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

let map: L.Map | undefined;
let marker: L.Marker | undefined;

function showMap(lat: number, lng: number) {
  if (!map) {
    mapDiv.innerHTML = "";
    map = L.map(mapDiv).setView([lat, lng], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    marker = L.marker([lat, lng]).addTo(map);
  } else {
    map.setView([lat, lng], 16);
    marker!.setLatLng([lat, lng]);
  }
}

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      enteredAddress
    )}&limit=1`
  );
  const results = (await response.json()) as NominatimResult[];

  if (!results.length) {
    alert("Could not find that address, please try again!");
    return;
  }

  const { lat, lon } = results[0];
  showMap(+lat, +lon);
}

form.addEventListener("submit", searchAddressHandler);
