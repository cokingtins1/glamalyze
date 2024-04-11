import CheckIcon from "@mui/icons-material/Check";

type Verified = {
	verified: boolean;
};
export default function Verified({ verified }: Verified) {
	return (
		<>
			{verified && (
				<div className="flex items-center gap-2">
					<CheckIcon
						sx={{
							fontSize: ".75rem",
							backgroundColor: "#CCFFDA",
							borderRadius: "50%",
                            padding: "0.125rem"
						}}
					/>
					<p className="text-xs text-slate-400">Verified Buyer</p>
				</div>
			)}
		</>
	);
}
