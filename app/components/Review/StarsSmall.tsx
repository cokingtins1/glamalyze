import StarIcon from "@mui/icons-material/Star";

type Props = {
	index: number;
};

export default function StarsSmall({ index }: Props) {
	return (
		<div className="flex items-center gap-px lg:hidden">
			<p className='w-[11px]'>{index}</p>
			<StarIcon sx={{ fontSize: "0.75rem" }} />
		</div>
	);
}
