import chatgpt from "@/public/chatgpt-icon.svg";
import Image from "next/image";

export default function ChatGPTIcon() {
	return (
		<div className="relative size-[35px]">
			<Image
				src={chatgpt}
				fill
				style={{ objectFit: "contain" }}
				sizes="(max-width: 430px), 300px "
				alt="ChatGPT Icon"
			/>
		</div>
	);
}
