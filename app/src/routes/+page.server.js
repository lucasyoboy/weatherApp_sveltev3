import { serializeNonPOJOs } from "$lib/utils";
import { DateTime } from "luxon";

const currentDate = DateTime.now().toFormat('yyyy-MM-dd');


export const load = async ({ locals, params }) => {
    const item = serializeNonPOJOs(await locals.pb.collection('station_data_realtime').getOne("123456789012345"));
	// fetch a paginated records list
	// fetch a paginated records list
	const items = await locals.pb.collection('station_data').getFullList(undefined, {
		filter: 'created ~ "'+currentDate+'"', sort: '-created', fields: "windspeed, temperature"
	});

	return {
		item,
		items,
	};
};