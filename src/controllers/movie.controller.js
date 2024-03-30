import { Movie } from '../models/movie.model.js';
import {
  Paginator,
  ApiResponse,
  ApiError,
  asyncHandler,
} from '../utils/index.js';

const getMovies = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 1;
  const paginator = new Paginator(page, pageSize);

  const movies = await paginator.paginate(Movie, {});

  if (!movies) {
    throw new ApiError(500, 'something went wrong while fetching movies');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, movies, 'movies fetched successfully'));
});

export { getMovies };
