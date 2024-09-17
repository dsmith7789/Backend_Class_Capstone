const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritics = reduceProperties("review_id", {
  critic_id: ["critics", null, "critic_id"],
  preferred_name: ["critics", null, "preferred_name"],
  surname: ["critics", null, "surname"],
  organization_name: ["critics", null, "organization_name"]
});

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName)
    .where({ review_id: reviewId })
    .del();  
}

async function list(movie_id) {
  // TODO: Write your code here
  const data = await db("reviews")
    .join(
      "critics",
      "reviews.critic_id",
      "critics.critic_id"
    )
    .where(
      { "reviews.movie_id": movie_id }
    )
    .select(
      "reviews.*", 
      "critics.*"
    );
  
  // Map the data to the desired structure
  const result = data.map((review) => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    critic_id: review.critic_id,
    movie_id: review.movie_id,
    critic: {
      critic_id: review.critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name
    },
  }));

  return result;
}

async function read(reviewId) {
  // TODO: Write your code here
  return db(tableName)
    .select("*")
    .where({ review_id: reviewId})
    .first();  
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
