export default function DesignIcon({
  color = null,
  className = "",
  height,
  width,
}: ImageIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      strokeMiterlimit={10}
      style={{
        fillRule: "nonzero",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      viewBox="0 0 657.36 657.36"
      aria-label="Navigate to about page"
      height={height ? height : undefined}
      width={width ? width : undefined}
      className={className}
    >
      <path
        className={color ? "" : "fill-primary"}
        fill={color || undefined}
        d="M208.344 143.149c-16.687 0-33.347 6.383-46.084 19.119-25.472 25.472-25.472 66.728 0 92.2 14.062 14.063 50.016 21.957 79.466 26.217v96.005c-29.428 4.259-65.404 12.154-79.466 26.216-25.472 25.473-25.472 66.729 0 92.201 25.473 25.473 66.729 25.473 92.201 0 14.062-14.062 21.957-50.016 26.217-79.466h96.004c4.26 29.428 12.155 65.404 26.217 79.466 25.472 25.473 66.728 25.473 92.201 0s25.472-66.728 0-92.201c-14.062-14.062-50.016-21.957-79.466-26.216v-96.005c29.428-4.26 65.404-12.154 79.466-26.217 25.472-25.472 25.472-66.728 0-92.2-25.451-25.473-66.729-25.473-92.201 0-14.062 14.062-21.957 50.016-26.217 79.466h-96.004c-4.26-29.429-12.155-65.404-26.217-79.466-12.736-12.736-29.431-19.119-46.117-19.119m240.876 43.468c5.458.057 10.917 2.145 15.112 6.35 8.303 8.303 8.474 21.739.476 30.259-6.086 4.238-22.777 8.867-43.163 12.497 3.651-20.387 8.29-37.211 12.463-43.231 4.206-3.956 9.654-5.932 15.112-5.875m-241.114.034c5.461-.052 10.917 1.93 15.112 5.875 4.238 6.086 8.868 22.788 12.497 43.197-20.386-3.673-37.21-8.325-43.23-12.497-7.999-8.499-7.827-21.922.475-30.225 4.216-4.216 9.685-6.298 15.146-6.35m77.089 98.551h86.936v86.937h-86.936zm-49.48 136.416c-3.673 20.387-8.324 37.211-12.497 43.231-8.433 7.955-21.856 7.892-30.224-.475-8.303-8.303-8.474-21.739-.476-30.259 6.086-4.238 22.789-8.867 43.197-12.497m185.896 0c20.365 3.673 37.21 8.324 43.23 12.497 7.999 8.498 7.828 21.922-.475 30.225-8.368 8.367-21.825 8.43-30.258.475-4.238-6.086-8.868-22.788-12.497-43.197"
      />
      <path
        fill="none"
        className={color ? "" : "stroke-primary"}
        stroke={color || undefined}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeWidth={25}
        d="M17.392 142.896c0-69.314 56.19-125.504 125.504-125.504h371.568c69.314 0 125.504 56.19 125.504 125.504v371.568c0 69.314-56.19 125.504-125.504 125.504H142.896c-69.314 0-125.504-56.19-125.504-125.504z"
      />
    </svg>
  );
}