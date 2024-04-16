import { MetaData, Review } from "../../app/libs/types";

type dataProps = {
	metaData: MetaData;
	reviewsData: Review;
};

export async function insertIntoPrisma({ metaData, reviewsData }: dataProps) {
	console.log(metaData);
}
