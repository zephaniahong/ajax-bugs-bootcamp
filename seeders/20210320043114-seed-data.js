const jsSHA = require('jssha');

const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
shaObj.update('password');
const hashedPassword = shaObj.getHash('HEX');
module.exports = {
  up: async (queryInterface) => {
    const user = [
      {
        email: 'jim@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', user);

    const featuresList = [
      {
        name: 'push notifications',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Search Options',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Security',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Messaging',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('features', featuresList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('features', null, {});
  },
};
