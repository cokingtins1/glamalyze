import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";

export default function CompareTabs() {
	const [selected, setSelected] = useState("shared");

	const sharedText =
		"Compare products that are carried by both Ulta and Sephora";
	const indText = "Compare any two products from Ulta or Sephora";

	const renderText = () => {
		if (selected === "shared") {
			return sharedText;
		} else if (selected === "individual") {
			return indText;
		}
	};

	return (
		<div className="flex w-full flex-row-reverse items-center justify-between">
			<Tabs
				className="w-1/4"
				color={"primary"}
				aria-label="Options"
				selectedKey={selected}
				//@ts-ignore
				onSelectionChange={setSelected}
			>
				<Tab className="w-full" key="shared" title="Shared"></Tab>
				<Tab className="w-full" key="individual" title="Individual" />
			</Tabs>
			<p className="text-sm pl-8">{renderText()}</p>
		</div>
	);
}
