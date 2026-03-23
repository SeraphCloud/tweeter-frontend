interface LogoProps {
	className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
	return (
		<svg
			width="100"
			height="100"
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M37.5 35L62.5 35L60.5 40H52.5V45.5H57.5L47.5 65V40H40L37.5 35Z"
				fill="currentColor"
			/>
		</svg>
	);
}
