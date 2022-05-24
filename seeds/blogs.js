const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('blogs').del()
  await knex('posts').del();
  await knex('comments').del();

  await knex('users').insert([
    {name: faker.name.findName()},
    {name: faker.name.findName()},
    {name: faker.name.findName()},
    {name: faker.name.findName()},
    {name: faker.name.findName()},
  ]);

  const users = await knex.select('id').from('users');
  // Deletes ALL existing entries
  await knex('blogs').insert(
    users.map((user) => {
      return {author_id: user.id, description: faker.lorem.sentence(), title: faker.animal.bird(), category: faker.music.genre()}
    })
  );

  const blogs = await knex.select('id').from('blogs');


  const postObjects = [];
  blogs.forEach(blog => {
    [...Array(2).keys()].forEach(x => postObjects.push(buildRandomPost(blog.id)));
  });
  await knex('posts').insert(
      postObjects
  );

  const posts = await knex.select('id').from('posts');
  const parentCommentsToInsert = [];
  posts.forEach(post => {
    parentCommentsToInsert.push(buildRandomComment(post.id, users[0].id, {}));
    parentCommentsToInsert.push(buildRandomComment(post.id, users[1].id, {}));
  });

  await knex('comments').insert(parentCommentsToInsert);
  const parentComments = await knex.select('id', 'post_id').from('comments');
  const repliesToInsert = [];
  parentComments.forEach(parent => {
    repliesToInsert.push(buildRandomComment(parent.post_id, users[2].id, {parents: [parent.id], body: `Reply to comment id ${parent.id}`}));
    repliesToInsert.push(buildRandomComment(parent.post_id, users[3].id, {parents: [parent.id], body: `Reply to comment id ${parent.id}`}));
  });
  await knex('comments').insert(repliesToInsert);

};


const buildRandomPost = (blog_id) => {
  return {
    title: faker.animal.cetacean(),
    body: faker.lorem.paragraphs(3),
    published_at: faker.date.recent(),
    img_src: faker.image.animals(),
    blog_id: blog_id
  }
}

const buildRandomComment = (post_id, user_id, {parents, body}) => {
  return {
    body: body ?? faker.lorem.sentences(3),
    parents: parents ? parents.join('.') : null,
    post_id,
    user_id
  }
}