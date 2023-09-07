import applyFilters from "../../controllers/applyFilters.mjs";

const applyFiltersHandler = async (req, res, next) => {
  const body = req.body;
  const response = applyFilters(body);
  res.send(response);
}

export default applyFiltersHandler;