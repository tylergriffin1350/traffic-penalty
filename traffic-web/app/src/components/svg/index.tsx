import React from 'react';


export const TruckIcon = () => (
  <img src="/images/truckIcon.svg" alt="Truck Icon" width={22} height={22} />
);

export const VehicleIcon = () => (
  <img src="/images/vehicles.svg" alt="vehicles Icon" width={35} height={35} />
);

export const VehicleSettingIcon = () => (
  <img src="/images/vehicleSetting.svg" alt="vehicleSetting Icon" width={30} height={30} />
);

export const VehicleTypeIcon = () => (
  <img src="/images/vehicleType.svg" alt="vehicleType Icon" width={30} height={30} />
);

export const SeatLayoutIcon = () => (
  <img src="/images/seatLayout.svg" alt="seatLayout Icon" width={30} height={30} />
);

export const SteeringWheelIcon = () => (
  <img src="/images/steeringWheel.svg" alt="steeringWheel Icon" width={35} height={35} />
);

export const SeatIcons = ({
  text,
  size = 32,
  textSize = 32,
  textColor = "black",
  fillColor = "#FFF", // Fill inside the seat
  strokeColor = "#000000", // Keep outline black
}: {
  text: string;
  textSize: number;
  size?: number;
  textColor?: string;
  fillColor?: string; // Color inside the seat
  strokeColor?: string; // Outline color
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 385 417"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,417.000000) scale(0.100000,-0.100000)"
        stroke={strokeColor} // Keep outline color
        strokeWidth="50" // Ensure the outline is visible
      >
        <path 
          d="M1320 3839 c-40 -16 -87 -56 -110 -94 -25 -41 -80 -316 -80 -401 0
          -120 95 -214 215 -214 l45 0 0 -59 0 -59 -107 -4 c-121 -4 -172 -21 -237 -79
          -85 -74 -106 -135 -141 -409 -27 -206 -33 -248 -90 -670 -20 -146 -47 -347
          -60 -448 -14 -100 -25 -189 -25 -197 0 -8 -23 -27 -52 -41 -150 -76 -248 -236
          -248 -404 0 -121 39 -219 123 -308 61 -63 115 -97 198 -123 58 -18 111 -19
          1149 -19 1038 0 1091 1 1149 19 33 10 80 30 103 44 54 31 139 120 166 173 72
          141 68 312 -11 446 -34 58 -122 140 -185 172 -29 15 -52 33 -52 41 0 13 -27
          215 -96 725 -41 302 -52 385 -79 590 -35 274 -56 335 -141 409 -65 58 -116 75
          -236 79 l-108 4 0 59 0 59 45 0 c120 0 215 94 215 214 0 30 -13 125 -29 211
          -33 176 -52 215 -123 262 l-42 28 -565 2 c-358 1 -575 -2 -591 -8z"
          fill={fillColor} // Fill inside the seat
        />
      </g>

      {/* Text Overlay */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Arial"
        fontSize={textSize} // Scale font size dynamically
        fill={textColor} // Use dynamic text color
      >
        {text}
      </text>
    </svg>
  );
};
