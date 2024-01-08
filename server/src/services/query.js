const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 50;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER; // Str to number
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; // Str to number
  const skip = (page - 1) * limit;
  return { skip, limit };
}

module.exports = { getPagination };
