/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (QueryInterface) => {
    await QueryInterface.bulkInsert('users', [
      {
        id: 1,
        user_name: 'Admin User',
        role: 'administrator',
        email: 'admin@deliveryapp.com',
        password: '0192023a7bbd73250516f069df18b500',
        // decrypted md5 password: admin123
      },
      {
        id: 2,
        user_name: 'Seller User',
        role: 'seller',
        email: 'seller@deliveryapp.com',
        password: '1e4970ada8c054474cda889490de3421',
        // decrypted md5 password: seller123
      },
      {
        id: 3,
        user_name: 'Client User',
        role: 'client',
        email: 'client@email.com',
        password: '3677b23baa08f74c28aba07f0cb6554e',
        // decrypted md5 password: client123
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
