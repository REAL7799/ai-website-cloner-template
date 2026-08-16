/**
 * Um prompt específico por item da carta do Café Fátima.
 *
 * As descrições são deliberadamente concretas quanto ao pão: numa sandes de
 * café português o pão é papo-seco, não pão de forma, e um modelo generalista
 * erra sempre isso se não lhe dissermos.
 */

/** Enquadramento comum: fundo liso, para o recorte automático funcionar. */
export const FRAME =
  "Isolated product photograph on a pure plain white seamless background, " +
  "nothing else in the frame, no table, no room, no props, no text, no logo, " +
  "no watermark. Even soft studio lighting, gentle contact shadow directly " +
  "under the food only, subject fully inside the frame with a clear margin " +
  "on every side, sharp focus throughout, appetising, photorealistic, " +
  "high detail, square image. ";

const PAPO =
  "in a traditional Portuguese papo-seco bread roll: a small crusty white " +
  "roll with a firm golden crust and a dry open crumb, split horizontally";

/** Descrição por nome do prato, tal como consta em src/content/menu.ts. */
export const DISHES = {
  "Café / Descafeinado":
    "a single Portuguese espresso in a small white porcelain demitasse cup on a saucer, thick hazelnut crema on top, one sugar packet on the saucer",
  "Café duplo":
    "a double Portuguese espresso in a slightly larger white cup on a saucer, thick crema",
  "Café c/ leite":
    "a Portuguese abatanado, a long black coffee in a medium white cup on a saucer",
  "Galão / Latte / Macchiato":
    "a Portuguese galão: coffee with hot milk served in a tall clear glass, pale caramel colour, thin milk foam on top",
  Cappuccino:
    "a cappuccino in a white cup on a saucer, thick milk foam dusted with cocoa powder",
  "Chá":
    "a cup of black tea in a white cup on a saucer with the tea bag tag hanging over the rim and a slice of lemon on the saucer",
  "Chá c/ leite":
    "a cup of tea with milk in a white cup on a saucer, pale amber colour",
  "Chocolate quente":
    "a mug of thick hot chocolate topped with a little milk foam",

  "Sandes de fiambre": `a simple Portuguese ham sandwich ${PAPO}, filled only with two folded slices of cooked ham, nothing else`,
  "Sandes de queijo": `a simple Portuguese cheese sandwich ${PAPO}, filled only with two slices of pale yellow semi-soft cheese, nothing else`,
  "Sandes mista": `a Portuguese mixed sandwich ${PAPO}, filled with cooked ham and pale yellow cheese`,
  "Sandes de presunto": `a Portuguese cured ham sandwich ${PAPO}, filled with thin slices of dark red presunto cured ham`,
  "Sandes de presunto especial": `a Portuguese special cured ham sandwich ${PAPO}, filled with presunto cured ham, cheese, lettuce and sliced tomato`,
  "Tosta mista":
    "a Portuguese tosta mista: a toasted ham and cheese sandwich made with thick slices of rustic homemade white bread, griddled golden with grill marks, cut in half diagonally, melted cheese just visible at the cut edge",
  "Bifana simples": `a Portuguese bifana ${PAPO}, filled with two thin pan-fried pork steaks in garlic and white wine sauce, sauce soaking into the crumb`,
  "Bifana especial": `a Portuguese special bifana ${PAPO}, filled with thin pan-fried pork steaks in sauce plus cheese, lettuce and sliced tomato`,
  "Panado no pão (frango / perú)": `a Portuguese breaded chicken cutlet sandwich ${PAPO}, filled with a golden crumbed fried chicken escalope`,
  "Prego no pão": `a Portuguese prego ${PAPO}, filled with a thin pan-fried beef steak with garlic`,
  "Cachorro especial":
    "a Portuguese cachorro: a hot dog in a long soft roll with a frankfurter, melted cheese and shredded lettuce, the roll pressed and toasted, cut across into segments",

  "Sandes de queijo c/ alface e tomate": `a Portuguese cheese salad sandwich ${PAPO}, filled with pale yellow cheese, green lettuce and sliced tomato`,
  "Sandes de atum": `a Portuguese tuna sandwich ${PAPO}, filled with flaked tuna mayonnaise, lettuce and sliced tomato`,
  "Omelete especial": `a Portuguese omelette sandwich ${PAPO}, filled with a folded yellow omelette, cheese, lettuce and tomato`,

  "Sopa de legumes":
    "a bowl of thick Portuguese vegetable soup, smooth pale green purée with a swirl of olive oil, in a plain white soup bowl",
  "Pastel de bacalhau":
    "two golden-brown Portuguese pastéis de bacalhau, oval fried codfish cakes with a craggy crisp surface, one broken open showing the flaky white cod and potato filling",

  "Hambúrguer simples":
    "a plain Portuguese café hamburger: a beef patty in a soft round sesame bun, nothing else",
  "Hambúrguer c/ queijo":
    "a Portuguese café cheeseburger: a beef patty with a slice of melted yellow cheese in a soft round sesame bun",
  "Hambúrguer c/ alface e tomate":
    "a Portuguese café hamburger with a beef patty, green lettuce and sliced tomato in a soft round sesame bun",
  "Hambúrguer especial":
    "a Portuguese special hamburger: a beef patty with melted cheese, a slice of ham, a fried egg, lettuce and tomato in a soft round sesame bun",

  "Bitoque de porco à portuguesa":
    "a Portuguese bitoque de porco on a plain white plate: one pan-fried pork steak topped with a sunny-side-up fried egg, a pile of golden hand-cut chips, a small mound of white rice and a little salad of lettuce, tomato and onion",
  "Bitoque de vaca à portuguesa":
    "a Portuguese bitoque de vaca on a plain white plate: one pan-fried beef steak topped with a sunny-side-up fried egg, a pile of golden hand-cut chips, a small mound of white rice and a little salad of lettuce, tomato and onion",
  "Escalope de porco no prato":
    "a Portuguese plate of pork escalope with golden chips and a sunny-side-up fried egg on a plain white plate",
  "Escalope de vaca no prato":
    "a Portuguese plate of beef escalope with golden chips and a sunny-side-up fried egg on a plain white plate",
  "Hambúrguer c/ ovo":
    "a Portuguese plate of a beef burger patty with a sunny-side-up fried egg on top and a pile of golden chips on a plain white plate",
  "Panados de frango no prato":
    "a Portuguese plate of two golden breaded chicken escalopes with a fresh salad of lettuce, tomato and lemon wedges on a plain white plate",

  "Omelete de queijo + fiambre":
    "a large folded yellow Portuguese omelette filled with ham and melted cheese, with a generous pile of golden chips beside it on a plain white plate",

  "Arroz de pato":
    "Portuguese arroz de pato in a round white oven dish: baked rice with shredded duck, a golden crisp top, slices of smoked chouriço on top and orange wedges around the rim",
  "Bacalhau à Brás":
    "Portuguese bacalhau à Brás on a plain white plate: shredded salt cod with fine straw-cut fried potatoes and egg, deep yellow, topped with black olives and chopped parsley",
  "Cachorro no prato":
    "a Portuguese plate with two frankfurter sausages, a pile of golden chips and a sunny-side-up fried egg on a plain white plate",
  "Esparguete à bolonhesa":
    "a plate of Portuguese-style spaghetti bolognese, spaghetti topped with a rich meat and tomato sauce and chopped parsley, on a plain white plate",

  "Salada mista":
    "a Portuguese mixed salad in a wide white bowl: shredded lettuce, tomato wedges, sliced onion and sweetcorn",
  "Salada de atum":
    "a Portuguese tuna salad on a round white plate: shredded lettuce and sweetcorn topped with flaked tuna, ringed by slices of tomato",
  "Salada de pota":
    "a Portuguese squid salad on a round white plate: shredded lettuce and sweetcorn topped with pieces of cooked squid, ringed by slices of tomato",

  "Batata frita":
    "a generous pile of golden Portuguese hand-cut fried potatoes on a plain white plate",
  "Ovo estrelado":
    "one sunny-side-up fried egg with a bright orange yolk and crisp white edges on a small white plate",

  "Tarte de maçã":
    "a single slice of apple tart with visible baked apple slices and a glazed top, on a small white plate",
  "Bolo brigadeiro":
    "a slice of dark chocolate cake with chocolate cream layers on a small white plate",
  "Cheesecake de frutos vermelhos":
    "a slice of cheesecake with a biscuit base and a glossy red berry topping, on a small white plate",
  "Bolo de bolacha":
    "a slice of Portuguese bolo de bolacha, layered Maria biscuits with coffee buttercream, showing the layers, on a small white plate",
  "Natas do céu":
    "a glass of Portuguese natas do céu: layered whipped cream, egg cream and crushed biscuit, topped with crumbs",
  "Pudim flan":
    "a single Portuguese crème caramel flan turned out on a small white plate with caramel sauce pooling around it",
  "Mousse de chocolate":
    "a glass cup of dark Portuguese chocolate mousse with a light swirl on top",
  "Fruta (melão, abacaxi)":
    "slices of fresh melon and pineapple arranged on a small white plate",
  "Salada de frutas":
    "a glass bowl of fresh fruit salad with pieces of melon, pineapple and orange",

  "Água s/ gás":
    "a plain 50 cl clear plastic bottle of Portuguese still mineral water with a plain blue cap, unbranded label",
  "Água c/ gás":
    "a plain 50 cl clear glass bottle of sparkling mineral water with rising bubbles, unbranded label",
  "Cerveja de garrafa":
    "a 33 cl brown glass beer bottle beside a small glass of pale lager with a white head, unbranded",
  "Cerveja a copo":
    "a tall glass of cold draught lager with a thick white foam head and condensation on the glass",
  Refrigerantes: "a tall glass of cola with ice cubes and a straw",
  "Cidra e energéticos":
    "a slim cold can beside a glass of pale sparkling cider with ice, unbranded can",
  "Sumos de fruta naturais":
    "a tall glass of freshly squeezed orange juice with a little foam on top and an orange half beside it",

  "Tinto / branco (Pias)":
    "a glass of Portuguese red wine beside an unlabelled dark wine bottle",
  "Tinto / branco (Valfor)":
    "a glass of Portuguese white wine beside an unlabelled green wine bottle",
  "Tinto do Douro":
    "a glass of deep Portuguese Douro red wine beside an unlabelled dark bottle",
  "Branco do Alentejo":
    "a glass of pale golden Portuguese Alentejo white wine beside an unlabelled green bottle",
  "Vinho verde (Casal Garcia)":
    "a glass of pale Portuguese vinho verde beside an unlabelled green bottle, condensation on the glass",
  "Rosé (Mateus Rosé)":
    "a glass of pink Portuguese rosé wine beside an unlabelled rounded bottle",
};

/** "Omelete simples" existe duas vezes na carta: sandes e prato. */
export const BY_SECTION = {
  "sandes-vegetarianas|Omelete simples": `a Portuguese omelette sandwich ${PAPO}, filled with a folded plain yellow omelette`,
  "omeletes|Omelete simples":
    "a large folded plain yellow Portuguese omelette with a generous pile of golden chips beside it on a plain white plate",
};

export function promptFor(sectionId, namePt, nameEn) {
  const subject =
    BY_SECTION[`${sectionId}|${namePt}`] ??
    DISHES[namePt] ??
    `${nameEn}, a traditional Portuguese cafe item`;
  return `${FRAME}Subject: ${subject}.`;
}
