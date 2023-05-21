// Import necessary dependencies
import 'ol/ol.css'; // Import OpenLayers CSS
import proj4 from 'proj4'; // Import proj4 for coordinate projection
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff'; // Import GeoTIFF for working with raster data

// Initialize global variables
globalThis.pointDetails = []; // An array with all the details of the point on the map that the user clicked on

// Function that extracts the properties of the point into an array
globalThis.extractPointDetails = function(properties) {
   var array = Object.values(properties);
   for (var i = 1; i < 22; i++) {
      pointDetails[i-1] = array[i];
   }
}

// Method that calculates the height of the ground at a certain point
globalThis.set_height = async function(lon, lat) {
   // Fetch the raster data from the server
   const response = await fetch("raster.tif");
   const arrayBuffer = await response.arrayBuffer();

   // Open the raster data using GeoTIFF
   const tiff = await fromArrayBuffer(arrayBuffer);
   const imag = await tiff.getImage();

   // Get the bounding box, pixel width and height of the raster data
   const bbox = imag.getBoundingBox();
   const pixelWidth = imag.getWidth();
   const pixelHeight = imag.getHeight();
   const bboxWidth = bbox[2] - bbox[0];
   const bboxHeight = bbox[3] - bbox[1];

   // Calculate the pixel coordinates of the requested point
   const widthPct = (lon - bbox[0]) / bboxWidth;
   const heightPct = (lat - bbox[1]) / bboxHeight;
   const xPx = Math.floor(pixelWidth * widthPct);
   const yPx = Math.floor(pixelHeight * (1 - heightPct));
   const window = [xPx, yPx, xPx + 1, yPx + 1];

   // Read the raster data at the requested pixel coordinates
   const dataHeight = await imag.readRasters({window}); // A matrix with full details of the tile is returned

   // Return the height above ground at the requested point
   const heightAboveGround = dataHeight[0][0];
   return heightAboveGround;
}

// Function to convert a point in the original coordinate system to WGS84
globalThis.converting_to_wgs84 = function(coordinate) {
   var east = coordinate[0];
   var north = coordinate[1];

   // Define the original coordinate system (in this case, an Israeli projection)
   var firstProjection = "+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.2045169444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80+" +
      "towgs84=-24.0024,-17.1032,-17.8444,-0.33077,-1.85269,1.66969,5.4248 +units=m +no_defs"

   // Define the target coordinate system (WGS84)
   var secondProjection = proj4("WGS84");

   // Convert the point to WGS84
   var pointConvertArr = proj4(firstProjection, secondProjection, [east, north]);
   return pointConvertArr;
}
