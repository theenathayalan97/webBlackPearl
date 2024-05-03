// import React, { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { useEffect } from "react";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import "../pages/Map.scss";
// import { useNavigate } from "react-router-dom";
// import CameraIcon from "../images/camera.png";
// // Fix Leaflet's icon issue
// delete L.Icon.Default.prototype._getIconUrl;

// // Define the custom icon
// let redIcon = L.icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = redIcon;
// let cameraIcon = L.icon({
//   iconUrl: CameraIcon,
//   iconSize: [30, 30],
//   iconAnchor: [12, 41],
// });

// function Map() {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destination, setDestination] = useState([]);
//   const [routeGeometry, setRouteGeometry] = useState([]);
//   console.log(routeGeometry);
//   const [tripPath, setTripPath] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [source, setSource] = useState("");
//   const [destinationAddress, setDestinationAddress] = useState("");

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   useEffect(() => {
//     // Sample trip path coordinates
//     const sampleTripPath = [
//       [12.939673, 80.138267],
//       [12.942674, 80.137987],
//       [12.944303, 80.137964],
//       [12.946538, 80.137643],
//       [12.951138, 80.139683],
//     ];
//     setTripPath(sampleTripPath);

//     setCurrentLocation({
//       latitude: 12.922915,
//       longitude: 80.127457,
//     });
//     setDestination([12.9517, 80.1402]);

//     const interval = setInterval(() => {
//       setTripPath((prevTripPath) => {
//         const updatedTripPath = [...prevTripPath.slice(1), prevTripPath[0]];
//         setCurrentLocation({
//           latitude: updatedTripPath[0][0],
//           longitude: updatedTripPath[0][1],
//         });
//         return updatedTripPath;
//       });
//     }, 7000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (currentLocation && destination) {
//       axios
//         .get(
//           `http://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
//         )
//         .then((response) => {
//           const route = response.data.routes[0];
//           const routeGeometry = route.geometry.coordinates;
//           const reversedRouteGeometry = routeGeometry.map((coord) => [
//             coord[1],
//             coord[0],
//           ]);

//           setRouteGeometry(reversedRouteGeometry);
//         })
//         .catch((error) => {
//           console.error("Error fetching route geometry:", error);
//         });
//     }
//   }, [currentLocation, destination]);

//   useEffect(() => {
//     if (currentLocation && tripPath.length > 0) {
//       tripPath.forEach((coords, index) => {
//         if (
//           Math.abs(coords[0] - currentLocation.latitude) < 0.0001 &&
//           Math.abs(coords[1] - currentLocation.longitude) < 0.0001
//         ) {
//           alert(`Signal is nearby at Marker ${index + 1}`);
//         }
//       });
//     }
//   }, [currentLocation, tripPath]);

//   const handleSubmit = () => {
//     // Handle form submission logic here

//     setVehicleNumber("");
//     setSource("");
//     setDestinationAddress("");

//     if (vehicleNumber && source && destinationAddress) setDrawerOpen(false);
//   };

//   return (
//     <>
//       {currentLocation && (
//         <Box sx={{ width: "100%", height: "100vh" }}>
//           <MapContainer
//             center={[currentLocation.latitude, currentLocation.longitude]}
//             zoom={15}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <Stack direction="row" justifyContent="flex-end">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   position: "relative",
//                   top: "20px",
//                   right: "20px",
//                   zIndex: 1200,
//                   marginLeft: "70px",
//                 }}
//                 onClick={() => setDrawerOpen(true)}
//               >
//                 Find Signal
//               </Button>
//             </Stack>

//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {/* Render the trip path polyline */}
//             <Polyline positions={routeGeometry} color="blue" />

//             {tripPath.map((coords, index) => (
//               <Marker key={index} position={coords} icon={cameraIcon}>
//                 <Popup>{`Marker ${index + 1}`}</Popup>
//               </Marker>
//             ))}

//             <Marker
//               position={[currentLocation.latitude, currentLocation.longitude]}
//             >
//               <Popup>Source</Popup>
//             </Marker>
//             <Marker position={destination}>
//               <Popup>Destination</Popup>
//             </Marker>
//           </MapContainer>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             className="drawer"
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 p: 2,
//               }}
//             >
//               <TextField
//                 label="Vehicle Number"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 value={vehicleNumber}
//                 onChange={(e) => setVehicleNumber(e.target.value)}
//                 sx={{ mb: 2 }} // Set width of text field
//               />
//               <TextField
//                 label="Source"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 value={source}
//                 onChange={(e) => setSource(e.target.value)}
//                 sx={{ mb: 2 }} // Set width of text field
//               />
//               <TextField
//                 label="Destination"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 value={destinationAddress}
//                 onChange={(e) => setDestinationAddress(e.target.value)}
//                 sx={{ mb: 2 }} // Set width of text field
//               />
//               <Box display={"flex"} gap={"20px"}>
//                 <Button
//                   className="submit-button"
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </Button>
//                 <Button
//                   className="logout-button"
//                   variant="contained"
//                   color="primary"
//                   onClick={handleLogout}
//                 >
//                   Log Out
//                 </Button>
//               </Box>
//             </Box>
//           </Drawer>
//         </Box>
//       )}
//     </>
//   );
// }

// export default Map;

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import "../pages/Map.scss";
import { useNavigate } from "react-router-dom";
import CameraIcon from "../images/cctv.png";
import Snackbar from "@mui/material/Snackbar";

// Fix Leaflet's icon issue
delete L.Icon.Default.prototype._getIconUrl;

// Define the custom icon
let redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = redIcon;
let cameraIcon = L.icon({
  iconUrl: CameraIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
});

function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState([]);
  const [routeGeometry, setRouteGeometry] = useState([]);
  console.log(routeGeometry);
  const [tripPath, setTripPath] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [source, setSource] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarAnchor, setSnackbarAnchor] = useState({
    vertical: "bottom",
    horizontal: "right",
  });

  const [travel, setTravel] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    // Sample trip path coordinates
    const sampleTripPath = [
      [12.939673, 80.138267],
      [12.942674, 80.137987],
      [12.944303, 80.137964],
      [12.946538, 80.137643],
      [12.951138, 80.139683],
    ];
    setTripPath(sampleTripPath);

    setCurrentLocation({
      latitude: 12.922915,
      longitude: 80.127457,
    });
    setDestination([12.9517, 80.1402]);

    const interval = setInterval(() => {
      setTripPath((prevTripPath) => {
        const updatedTripPath = [...prevTripPath.slice(1), prevTripPath[0]];
        setCurrentLocation({
          latitude: updatedTripPath[0][0],
          longitude: updatedTripPath[0][1],
        });
        return updatedTripPath;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentLocation && destination) {
      axios
        .get(
          `http://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
        )
        .then((response) => {
          const route = response.data.routes[0];
          const routeGeometry = route.geometry.coordinates;
          const reversedRouteGeometry = routeGeometry.map((coord) => [
            coord[1],
            coord[0],
          ]);

          setRouteGeometry(reversedRouteGeometry);
        })
        .catch((error) => {
          console.error("Error fetching route geometry:", error);
        });
    }
  }, [currentLocation, destination]);

  useEffect(() => {
    if (currentLocation && tripPath.length > 0) {
      tripPath.forEach((coords, index) => {
        if (
          Math.abs(coords[0] - currentLocation.latitude) < 0.0001 &&
          Math.abs(coords[1] - currentLocation.longitude) < 0.0001
        ) {
          setSnackbarMessage(`Signal is nearby`);
          setSnackbarOpen(true);
        }
      });
    }
  }, [currentLocation, tripPath]);

  const handleSubmit = () => {
    // Handle form submission logic here

    setVehicleNumber(vehicleNumber);
    setSource(source);
    setDestinationAddress(destinationAddress);

    if (vehicleNumber && source && destinationAddress) setDrawerOpen(false);
  };

  return (
    <>
      {currentLocation && (
        <Box sx={{ width: "100%", height: "100vh" }}>
          <MapContainer
            center={[currentLocation.latitude, currentLocation.longitude]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  position: "relative",
                  top: "20px",
                  right: "20px",
                  zIndex: 1200,
                  marginLeft: "70px",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                Find Signal
              </Button>
            </Stack>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Render the trip path polyline */}
            <Polyline positions={routeGeometry} color="blue" />

            {tripPath.map((coords, index) => (
              <Marker key={index} position={coords} icon={cameraIcon}>
                <Popup>{`Marker ${index + 1}`}</Popup>
              </Marker>
            ))}

            <Marker
              position={[currentLocation.latitude, currentLocation.longitude]}
            >
              <Popup>Source</Popup>
            </Marker>
            <Marker position={destination}>
              <Popup>Destination</Popup>
            </Marker>
          </MapContainer>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            className="drawer"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
            >
              <TextField
                label="Vehicle Number"
                variant="outlined"
                margin="normal"
                fullWidth
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                sx={{ mb: 2 }} // Set width of text field
              />
              <TextField
                label="Source"
                variant="outlined"
                margin="normal"
                fullWidth
                value={source}
                onChange={(e) => setSource(e.target.value)}
                sx={{ mb: 2 }} // Set width of text field
              />
              <TextField
                label="Destination"
                variant="outlined"
                margin="normal"
                fullWidth
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                sx={{ mb: 2 }} // Set width of text field
              />
              <Box display={"flex"} gap={"20px"}>
                <Button
                  className="submit-button"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  className="logout-button"
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Box>
      )}
      <Snackbar
        anchorOrigin={snackbarAnchor}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{ backgroundColor: "blue" }}
      />
    </>
  );
}

export default Map;
