/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        product_name: 'Skol Lata 250ml',
        price: 2.20,
        url_image: 'http://localhost:3071/images/skol_lata_350ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'http://localhost:3071/images/heineken_600ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'http://localhost:3071/images/antarctica_pilsen_300ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Brahma 600ml',
        price: 7.50,
        url_image: 'http://localhost:3071/images/brahma_600ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Skol 269ml',
        price: 2.19,
        url_image: 'http://localhost:3071/images/skol_269ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Skol Beats Senses 313ml',
        price: 4.49,
        url_image: 'http://localhost:3071/images/skol_beats_senses_313ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Becks 330ml',
        price: 4.99,
        url_image: 'http://localhost:3071/images/becks_330ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Brahma Duplo Malte 350ml',
        price: 2.79,
        url_image: 'http://localhost:3071/images/brahma_duplo_malte_350ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Becks 600ml',
        price: 8.89,
        url_image: 'http://localhost:3071/images/becks_600ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Skol Beats Senses 269ml',
        price: 3.57,
        url_image: 'http://localhost:3071/images/skol_beats_senses_269ml.jpg',
        stock: 10,
      },
      {
        product_name: 'Stella Artois 275ml',
        price: 3.49,
        url_image: 'http://localhost:3071/images/stella_artois_275ml.jpg',
        stock: 10,
      },
    ], {
      timestamps: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
