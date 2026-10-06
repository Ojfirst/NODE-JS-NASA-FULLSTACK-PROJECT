const DEAULT_PAGE_NUMBER = 1;
const DEAULT_PAGE_LIMIT = 10;

const getPagination = (query) => {
	const pageNumber = Math.abs(query.page) || DEAULT_PAGE_NUMBER;
	const pageLimit = Math.abs(query.limit) || DEAULT_PAGE_LIMIT;
	const skip = (pageNumber - 1) * pageLimit;

	return { skip, pageLimit };
};

export default getPagination;
