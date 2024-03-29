import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  rated: String,
  cast: [String],
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  countries: [String],
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    production: String,
    lastUpdated: Date,
  },
  num_mflix_comments: Number,
});

export const Movie = mongoose.model('Movie', movieSchema);
