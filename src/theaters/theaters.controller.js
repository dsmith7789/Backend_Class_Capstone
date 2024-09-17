const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  const { movieId } = request.params;
  const data = await service.list(movieId);
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
