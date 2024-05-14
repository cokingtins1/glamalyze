import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Props = {
	pageLink: string | null;
};

export default function GoToPage({ pageLink }: Props) {
	const retailerLink = pageLink === "Ulta" ? "ulta.com" : "sephora.com";
	return (
		<Link
			target="_blank"
			href={pageLink || `https://www.${retailerLink}`}
			className="flex items-center gap-2 mb-2 "
			rel="noopener noreferrer"
		>
			<p className="text-xs">Go to page</p>
			<OpenInNewIcon sx={{ fontSize: "0.8rem" }} />
		</Link>
	);
}
