import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { Product, ProductType } from "../products/product.entity";

import { Cart } from "../cart/cart.entity";
import { CartItem } from "../cart/cart-item.entity";

import { Order } from "../orders/order.entity";
import { OrderItem } from "../orders/order-item.entity";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST || "localhost",

  port: Number(process.env.DB_PORT) || 5432,

  username: process.env.DB_USERNAME || "postgres",

  password: process.env.DB_PASSWORD || "postgres",

  database: process.env.DB_DATABASE || "ecommerce_db",

  entities: [Product, Cart, CartItem, Order, OrderItem],

  synchronize: true,
});

const produtos: Partial<Product>[] = [
  {
    name: "Fone de Ouvido Bluetooth",
    description: "Fone sem fio com cancelamento de ruído e 30h de bateria.",
    price: "299.90",
    stock: 50,
    imageUrl:
      "https://images.pexels.com/photos/16703782/pexels-photo-16703782.jpeg",
    type: ProductType.STANDARD,
  },

  {
    name: "Teclado Mecânico RGB",
    description:
      "Teclado mecânico switch blue com iluminação RGB customizável.",
    price: "459.00",
    stock: 30,
    imageUrl:
      "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=900",
    type: ProductType.STANDARD,
  },

  {
    name: "Mouse Gamer 16000 DPI",
    description: "Mouse ergonômico de alta precisão para jogos competitivos.",
    price: "189.90",
    stock: 40,
    imageUrl:
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=900",
    type: ProductType.STANDARD,
  },

  {
    name: 'Monitor 27" 144Hz',
    description:
      "Monitor Full HD com taxa de atualização de 144Hz, ideal para jogos.",
    price: "1299.00",
    stock: 15,
    imageUrl:
      "https://images.pexels.com/photos/7858742/pexels-photo-7858742.jpeg",
    type: ProductType.STANDARD,
  },

  {
    name: "Cadeira Gamer Ergonômica",
    description: "Cadeira com apoio lombar ajustável e reclinação de até 180°.",
    price: "899.90",
    stock: 10,
    imageUrl:
      "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=900",
    type: ProductType.STANDARD,
  },
  {
    name: "Camera Profissional",
    description: `Vídeos com Qualidade Profissional: Sensor APS-C de 24.2MP e vídeo 4K detalhado, ideal para criadores de conteúdo que buscam excelência.
Áudio e Foco Sem Esforço: Microfone direcional com para-vento e modos inteligentes como "Product Showcase" e "Desfoque de Fundo" garantem clareza e destaque.
Estabilidade e Conectividade Avançada: Grave cenas de ação com o Active Steadyshot e compartilhe instantaneamente via Wi-Fi/Bluetooth, facilitando sua rotina de vlogging.`,
    price: "250.45",
    stock: 5,
    imageUrl:
      "https://images.pexels.com/photos/15307345/pexels-photo-15307345.jpeg",
    type: ProductType.STANDARD,
  },
];

async function run() {
  await dataSource.initialize();

  const repo = dataSource.getRepository(Product);

  const existedProduct = await repo.count();

  if (existedProduct > 0) {
    console.log(
      `Já existem ${existedProduct} produtos cadastrados. Seed ignorado.`,
    );

    await dataSource.destroy();

    return;
  }

  const products = repo.create(produtos);

  await repo.save(products);

  console.log(`${produtos.length} produtos inseridos com sucesso.`);

  await dataSource.destroy();
}

run().catch((err) => {
  console.error("Erro ao rodar seed:", err);

  process.exit(1);
});
