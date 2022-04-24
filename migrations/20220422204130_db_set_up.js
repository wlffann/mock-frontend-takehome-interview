/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments();
            table.string('name');
        }),
        knex.schema.createTable('blogs', (table) => {
            table.increments();
            table.string('author_id');
            table.string('description');
            table.string('category');
        }),
        knex.schema.createTable('posts', (table) => {
            table.increments();
            table.string('title');
            table.string('body');
            table.date('published_at');
            table.string('img_src');
            table.integer('blog_id');
        }),
        knex.schema.createTable('comments', (table) => {
            table.increments();
            table.string('body');
            table.string('parents');
            table.integer('post_id');
            table.integer('user_id');
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('comments'),
        knex.schema.dropTableIfExists('posts'),
        knex.schema.dropTableIfExists('blogs'),
        knex.schema.dropTableIfExists('users')
    ]);
};
