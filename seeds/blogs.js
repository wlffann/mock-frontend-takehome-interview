const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {name: faker.name.findName()},
    {name: faker.name.findName()},
    {name: faker.name.findName()},
    {name: faker.name.findName()},
    {name: faker.name.findName()},
  ]);

  const users = await knex.select('id').from('users');
  // Deletes ALL existing entries
  await knex('blogs').del()
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

  await knex('posts').del();
  await knex('posts').insert(
      postObjects
  );
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