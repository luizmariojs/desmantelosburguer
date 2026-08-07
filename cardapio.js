/* ═══════════════════════════════════════
   🍔  DESMANTELO'S BURGUER — DADOS DO CARDÁPIO
   Fonte única consumida por index.html, pdv/index.html
   e pelo script de sync com o Google Business Profile.
   Fonte de verdade dos valores: cardápio impresso
   (ver PRD-cardapio-google-sync.md §4.1), salvo indicação
   explícita de outra fonte.
   ═══════════════════════════════════════ */

const CARDAPIO_DATA = {
  // badges disponíveis: "novidade" | "vendido" | "favorito" | "recheado" | "recomendado" | ""
  burgers: [
    {
      id: 1,
      nome: "Xodozinho",
      badge: "",
      imagem: "img/hamburgueres/xodozinho.webp",
      preco: { burger: 16.99, combo: 22.0, completo: 28.0 },
      descricao:
        "Pão Brioche amanteigado, blend 100g assado na brasa, queijo cheddar e molho especial.",
    },
    {
      id: 2,
      nome: "Arretado",
      badge: "vendido",
      imagem: "img/hamburgueres/arretado.webp",
      preco: { burger: 18.99, combo: 24.0, completo: 30.0 },
      descricao:
        "Pão Brioche amanteigado, blend 130g assado na brasa, queijo cheddar, molho especial e salada.",
    },
    {
      id: 3,
      nome: "Lampião",
      badge: "favorito",
      imagem: "img/hamburgueres/lampiao.webp",
      preco: { burger: 21.99, combo: 27.0, completo: 33.0 },
      descricao:
        "Pão Brioche amanteigado, blend 130g assado na brasa, queijo cheddar, bacon, molho especial e salada.",
    },
    {
      id: 4,
      nome: "Matuto",
      badge: "",
      imagem: "img/hamburgueres/matuto.webp",
      preco: { burger: 22.99, combo: 28.0, completo: 34.0 },
      descricao:
        "Pão australiano, blend 160g assado na brasa, queijo cheddar (2 fatias), creme de cheddar artesanal e cebola caramelizada.",
    },
    {
      id: 5,
      nome: "Vixe Maria",
      badge: "novidade",
      imagem: "img/hamburgueres/vixe-maria.webp",
      preco: { burger: 23.99, combo: 29.0, completo: 35.0 },
      descricao:
        "Pão Brioche amanteigado, blend 160g assado na brasa, queijo coalho, doce de leite, bacon e molho especial.",
    },
    {
      id: 6,
      nome: "Maria Bonita",
      badge: "",
      imagem: "img/hamburgueres/maria-bonita.webp",
      preco: { burger: 25.99, combo: 31.0, completo: 37.0 },
      descricao:
        "Pão Brioche amanteigado, 2 blends 130g assados na brasa, queijo cheddar (2 fatias), molho especial e salada.",
    },
    {
      id: 7,
      nome: "Rei do Cangaço",
      badge: "",
      imagem: "img/hamburgueres/rei-cangaco.webp",
      preco: { burger: 28.99, combo: 34.0, completo: 40.0 },
      descricao:
        "Pão Brioche amanteigado, blend de 130g, queijo cheddar, costela desfiada, cream cheese, molho especial e salada.",
    },
    {
      id: 8,
      nome: "Desmantelado",
      badge: "recheado",
      imagem: "img/hamburgueres/desmantelado.webp",
      preco: { burger: 28.99, combo: 34.0, completo: 40.0 },
      descricao:
        "Pão Brioche amanteigado, 2 blends de 130g assados na brasa, queijo cheddar (2 fatias), bacon, molho especial.",
    },
    {
      id: 9,
      nome: "Mini Hambúrguer",
      badge: "novidade",
      imagem: "img/hamburgueres/mini-hamburguer.webp",
      preco: { burger: 7.0, combo: 12.0, completo: 19.0 },
      descricao:
        "Pão brioche, blend 40g assado na brasa, queijo e molho especial da casa.",
    },
  ],

  sanduiches: [
    {
      id: "s1",
      nome: "Baguete de Cupim Desfiado",
      badge: "",
      imagem: "img/sanduiches/baguete-cupim.webp",
      preco: { burger: 20.0, combo: 27.0, completo: 34.0 },
      // sanduíche pronto (cupim já desfiado) — sem escolha de ponto da carne,
      // diferente dos itens de "burgers", que têm por padrão (ver app.js/openCust)
      temPontoCarne: false,
      // troca a palavra "burger" pelos rótulos do tier ("SÓ O BAGUETE" etc.) — ver app.js/openCust
      substantivo: "baguete",
      descricao: "Pão baguete, cupim desfiado, queijo, molho da casa e salada.",
    },
  ],

  combos: [
    {
      id: "c1",
      nome: "Combo Lampião e Maria Bonita",
      preco: 59.99,
      emoji: "💑",
      descricao: "O casal mais famoso do sertão num combo só.",
      itens: ["2 Burgers Lampião", "1 Porção de Batata G", "1 Refrigerante 1L"],
    },
    {
      id: "c2",
      nome: "Combo Cangaceiros",
      preco: 96.99,
      emoji: "🤠",
      descricao: "Pra galera com fome de cangaceiro.",
      // "Batata Frita GG" é exclusiva desta composição — não é um tamanho
      // vendido avulso, por isso não existe em PETISCOS.tamanhos.
      itens: [
        "4 Burgers Arretado",
        "1 Porção de Batata Frita GG",
        "1 Refrigerante 2L",
      ],
    },
  ],

  petiscos: [
    {
      id: "bf",
      nome: "Batata Frita",
      desc: "Crocante e sequinha.",
      emoji: "🍟",
      tamanhos: [
        { label: "P", preco: 7.0 },
        { label: "G", preco: 10.0 },
      ],
    },
    {
      id: "bt",
      nome: "Batata Turbinada",
      desc: "Batata frita, creme de cheddar artesanal e farofa de bacon.",
      emoji: "🧀",
      tamanhos: [
        { label: "M", preco: 12.0 },
        { label: "G", preco: 20.0 },
      ],
    },
    {
      id: "aq",
      nome: "Almofada de Queijo",
      desc: "Queijo gouda empanado e frito, acompanha geleia de pimenta.",
      emoji: "🧀",
      imagem: "img/petiscos/almofada-queijo.webp",
      tamanhos: [
        { label: "P", preco: 12.0 },
        { label: "G", preco: 20.0 },
      ],
    },
  ],

  bebidas: [
    // comboRefri: true marca os sabores que entram como opção de refrigerante
    // no drawer de personalização de hambúrguer/sanduíche (ver app.js, REFRIS) —
    // ausência do campo já significa "não aparece lá".
    { id: "coca", nome: "Coca Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "coca-zero", nome: "Coca Zero Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "guarana", nome: "Guaraná Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "guarana-zero", nome: "Guaraná Zero Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "fanta", nome: "Fanta Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "sprite", nome: "Sprite Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "sprite-zero", nome: "Sprite Zero Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "h2o", nome: "H2O Lata", preco: 6.0, emoji: "🥤", comboRefri: true },
    { id: "b2", nome: "Refrigerante 250ml", preco: 4.0, emoji: "🥤" },
    { id: "b3", nome: "Antartica 1L", preco: 10.0, emoji: "🍾" },
    { id: "b4", nome: "Coca-Cola 1L", preco: 12.0, emoji: "🍾" },
    { id: "b5", nome: "Água", preco: 2.0, emoji: "💧" },
    { id: "b6", nome: "Água c/ gás", preco: 4.0, emoji: "💧" },
    { id: "b7", nome: "H²O Limoneto", preco: 6.0, emoji: "🍋" },
    { id: "b8", nome: "Schweppes", preco: 6.0, emoji: "🫧" },
  ],

  adicionais: [
    { id: "bacon", nome: "Bacon", preco: 4.0 },
    { id: "blend", nome: "Blend de carne 130g", preco: 7.0 },
    { id: "cheddar", nome: "Queijo cheddar", preco: 2.0 },
    { id: "cebola", nome: "Cebola caramelizada", preco: 3.0 },
    { id: "molched", nome: "Molho de cheddar artesanal", preco: 2.0 },
    { id: "molesp", nome: "Molho especial", preco: 3.0 },
    { id: "barbecue", nome: "Molho barbecue", preco: 2.0 },
    { id: "cream", nome: "Cream cheese", preco: 3.0 },
    { id: "geleia", nome: "Geleia de pimenta", preco: 3.0 },
  ],
};

// Node (script de sync com o Google) — browser ignora este bloco.
if (typeof module !== "undefined" && module.exports) {
  module.exports = CARDAPIO_DATA;
}
