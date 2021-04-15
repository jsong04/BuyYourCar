import client from "./client";

const getFilteredListings = (name) => client.get("/filteredListings", {name: name});

export default { getFilteredListings };
