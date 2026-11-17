// ===== CONFIGURACIÓN =====
// endpoint: URL de Formspree / Web3Forms / Getform para recibir formularios sin abrir el correo.
// Los enlaces de Mercado Libre de cada producto se cargan en data/products.json (campo "ml_url").
// desc: descuento por cantidad. Desde `min` unidades del mismo producto se aplica `pct`% sobre esa línea.
// api: dirección del servidor de pedidos y cobros (Worker de Cloudflare, carpeta whatsapp-bot). Se carga en data/config.js (campo "api") o desde admin.html.
const CFG = { email: 'zeolitcatsusa@gmail.com', endpoint: '', desc: { min: 10, pct: 10 }, api: '', metodos: null, wa: '5493415421376', pagos: {} };
// El descuento por cantidad se edita desde admin.html (genera data/config.js).
if (window.ZC && window.ZC.config && window.ZC.config.desc) Object.assign(CFG.desc, window.ZC.config.desc);
if (window.ZC && window.ZC.config && window.ZC.config.wa) CFG.wa = String(window.ZC.config.wa).replace(/\D/g, '');
if (window.ZC && window.ZC.config && window.ZC.config.pagos) CFG.pagos = window.ZC.config.pagos;
if (window.ZC && window.ZC.config && /^https:\/\//.test(window.ZC.config.api || '')) CFG.api = String(window.ZC.config.api).replace(/\/+$/, '');

const T = {
es: {
 pg_wa2:'Enviar mi pedido por WhatsApp', pg_sendwa:'Falta un paso: toque el botón para enviarnos el pedido por WhatsApp y lo confirmamos.', pg_proof2:'Envíenos el pedido por WhatsApp: le pasamos los datos de pago, usted paga y nos manda el comprobante; confirmamos el pago y le enviamos el remito.', pg_h:'Pagar ahora', pg_p:'Complete sus datos, elija cómo pagar y recibirá las instrucciones al instante y también por WhatsApp.', pg_m:'Forma de pago', pg_card:'Tarjeta de crédito o débito (link de pago)', pg_qr:'QR de Mercado Pago', pg_tr:'Transferencia a alias / CBU', pg_18:'Soy mayor de 18 años y acepto que mis datos se usen para gestionar este pedido.', pg_send:'Confirmar pedido', pg_wa:'Recibir los datos por WhatsApp', pg_pay:'Pagar con tarjeta', pg_copy:'Copiar', pg_done:'¡Pedido registrado!', pg_order:'Pedido', pg_cardtxt:'Toque el botón para pagar con tarjeta de forma segura en Mercado Pago. Al terminar, el pago se confirma solo.', pg_nolink:'Le enviaremos el link de pago por WhatsApp en breve.', pg_qrtxt:'Escanee el QR desde la app de Mercado Pago (o transfiera al alias) por el total del pedido.', pg_trtxt:'Transfiera el total a estos datos e indique el número de pedido como referencia:', pg_amount:'Importe', pg_ref:'Referencia', pg_proof:'Cuando pague, envíenos el comprobante por WhatsApp y le confirmamos el pago y el remito.', pg_ok:'✅ ¡Pago confirmado! Gracias por su compra.', pg_proofok:'🧾 Recibimos su comprobante: lo estamos verificando.', pg_wait:'Enviando…', pg_err:'No pudimos registrar el pedido. Intente de nuevo o escríbanos por WhatsApp.', pg_pending:'Estado del pedido: pendiente de pago.',
 offer:'Oferta de lanzamiento', free:'Envío gratis en Rosario y zona de influencia',
 freefull:'Envío particular gratuito en el eje urbano de Rosario y zona de influencia.',
 mlvalid:'Válida en toda la República Argentina a través de Mercado Libre.',
 perkg:'por kg', consult:'Consultar precio', add:'Agregar al carrito', buynow:'Comprar ahora',
 mlbtn:'Comprar en Mercado Libre', mlsoon:'Mercado Libre: próximamente', quote:'Solicitar cotización', det:'Ver detalle',
 qty:'Cantidad', sortr:'Ordenar: más relevantes', sorta:'Menor precio', sortd:'Mayor precio', found:'productos', none:'No se encontraron productos.',
 added:'Producto agregado al carrito.', ecart:'Su carrito está vacío.', gotoshop:'Ir a la tienda', sub:'Subtotal', ship:'Envío', shipfree:'Gratis (Rosario y zona de influencia)',
 shipTBD:'A coordinar', tot:'Total', rm:'Quitar', mlnone:'Enlace de Mercado Libre próximamente', mlgo:'Ir a Mercado Libre', nf:'Producto no encontrado.',
 spec:'Detalles', ok:'¡Gracias! Recibimos su mensaje. Las publicaciones se revisan antes de mostrarse.', mail:'Se abrió su correo: envíe el mensaje (adjunte la foto si corresponde).',
 empty:'Pronto se mostrarán aquí las mascotas de nuestra comunidad.', emptyo:'Aún no hay opiniones publicadas.', avg:'Puntaje promedio', of:'opiniones',
 purr:'Ronroneando… 🐾', tap:'Toque al gatito', pur2:'El gatito está ronroneando.', promo:'Precio promocional', discnote:'Desde {n} unidades del mismo producto: {p}% de descuento.', disc:'Descuento por cantidad', dtag:'{p}% de descuento aplicado', hn:'Nuestros productos', hl:'Ver toda la tienda', ct_t:'¿Hoy le compró la arena sanitaria a su gato?', ct_p:'Elija calidad premium: Zeobent Cat’s Premium.', pic:'Imagen'
},
en: {
 u2:'See offer', sr:'Search products', sb:'Search', cart:'Cart',
 n0:'Home',n1:'Product',n6:'Shop',n7:'Offers',n3:'Community',n4:'Vets',n5:'Orders',
 fn:'Navigation', fc:'Ways to buy', fc1:'Mercado Libre: anywhere in Argentina', fc2:'Free private delivery in the urban area of Rosario and surrounding area (launch promotion)', fc3:'Wholesale and international orders: contact us',
 h1:"Your cat deserves the best. So does your family.", hp:'Zeobent Cat’s Premium Trio is a clumping zeolite litter: it eliminates odor instead of masking it.',
 cta:'See offers', cta2:'Learn about the product', band:'🐾 Tap the kitten to hear it purr 🐾',
 so_t:'Launch offer', so_p:'Available throughout Argentina through Mercado Libre, and with private delivery in Rosario and surrounding area.',
 t1:'Why Zeobent Cat’s',
 c1:'<b>Clumps</b>Forms firm clumps that scoop out easily.', c2:'<b>Traps odor</b>Its crystals capture ammonia: they don’t cover it, they eliminate it.',
 c3:'<b>Natural</b>Mineral with no chemical additives.', c4:'<b>Hypoallergenic</b>Made for the whole family.', c5:'<b>Long-lasting</b>Replace the litter every 4 weeks.',
 c6:'<b>Second life</b>Used litter from healthy cats, dried and washed with water, can be added to compost as a soil restructurer and to speed up composting. It is not applied to growing plants: the soil is used in the garden once treated. Follow the instructions on the box.',
 ch_t:'Ways to buy', ch1:'<b>Mercado Libre</b>Pay and buy on the platform, valid throughout Argentina.', ch2:'<b>Private delivery</b>Delivery in the urban area of Rosario and surrounding area, free in the launch promotion.',
 ch3:'<b>Wholesale and abroad</b>Customers, retailers and wholesalers, in Argentina or abroad. Costs and payment terms are agreed according to destination.',
 cm_t:'Zeobent community', cm_p:'Stories and pet photos shared by our customers.', cm_l:'See all stories',
 ph:'Product', pht:'Directions and sizes', t2:'Directions in three steps', s1:'Place a 5 cm layer in the litter box.', s2:'Scoop out the used material.', s3:'Replace the amount you removed.',
 t3:'Sizes', pb:'<b>Bulk</b> for distributors and in-store repackaging. Ask us.', pb2:'Bulk', seeshop:'See in the shop',
 th:'Shop', tp:'Zeobent Cat’s Premium Trio cat litter', t7:'Zeobent shop: coming soon', m1:'<b>T-shirts</b> with the brand logo.', m2:'<b>Collectible dolls</b> of our kitten.', m3:'<b>Wi-Fi feeder</b> with camera and sensors.', wl:'Join the waitlist',
 oh:'Offers', op:'Special offers for the general public, valid in Argentina through Mercado Libre.', oc_t:'How to buy the offer',
 oc1:'<b>1. Mercado Libre</b>Pay and buy through Mercado Libre from anywhere in Argentina.', oc2:'<b>2. Private delivery</b>In the urban area of Rosario and surrounding area, with free delivery: add the pack to the cart and enter your delivery details.',
 ob:'This section lists the current offers.',
 cmh:'Zeobent community', tb1:'Pet stories', tb2:'Reviews', i4:'Share a photo of your pet and your experience. Every post is reviewed and approved before it is shown.',
 f_name:'Your name', f_pet:'Your pet’s name', f_city:'City', f_mail:'Email (not published)', f_story:'Your story', f_photo:'Your pet’s photo',
 f_ok:'I agree to my photo and story being published. I’m not sending photos of minors.', f_send:'Send', pubnote:'Name, city, pet, photo and story are published after approval; your email is not.',
 op_t:'Customer reviews', f_rate:'Rating', f_op:'Your review', f_ok2:'I agree to my name and review being published.',
 t5:'Vets and clinics', i5:'News we update every week, plus public links for the care of cats and other pets.', l5:'Useful links',
 t6:'Request product', i6:'Customers, retailers and wholesalers, in Argentina or abroad. Costs and payment terms are agreed according to destination.',
 f_type:'I am', o1:'Final customer', o2:'Retailer', o3:'Wholesaler / distributor', f_country:'Country and city', f_prod:'Product', f_qty:'Quantity', f_msg:'Message', pw:'Waitlist: merch and feeder',
 kh:'Shopping cart', pg_wa2:'Send my order on WhatsApp', pg_sendwa:'One last step: tap the button to send us the order on WhatsApp and we will confirm it.', pg_proof2:'Send us the order on WhatsApp: we share the payment details, you pay and send the receipt; we confirm the payment and send the delivery note.', pg_h:'Pay now', pg_p:'Fill in your details, choose how to pay and you will get the instructions instantly and by WhatsApp.', pg_m:'Payment method', pg_card:'Credit or debit card (payment link)', pg_qr:'Mercado Pago QR', pg_tr:'Bank transfer to alias / CBU', pg_18:'I am over 18 and agree that my data is used to process this order.', pg_send:'Confirm order', pg_wa:'Get the details on WhatsApp', pg_pay:'Pay by card', pg_copy:'Copy', pg_done:'Order registered!', pg_order:'Order', pg_cardtxt:'Tap the button to pay by card securely on Mercado Pago. The payment is confirmed automatically.', pg_nolink:'We will send you the payment link on WhatsApp shortly.', pg_qrtxt:'Scan the QR from the Mercado Pago app (or transfer to the alias) for the order total.', pg_trtxt:'Transfer the total to these details and use the order number as reference:', pg_amount:'Amount', pg_ref:'Reference', pg_proof:'Once paid, send us the receipt on WhatsApp and we will confirm the payment and send the delivery note.', pg_ok:'✅ Payment confirmed! Thank you for your purchase.', pg_proofok:'🧾 We received your receipt: we are checking it.', pg_wait:'Sending…', pg_err:'We could not register the order. Please try again or write to us on WhatsApp.', pg_pending:'Order status: awaiting payment.', k1:'Buy through Mercado Libre', k2:'Private delivery in Rosario and surrounding area', k_ok:'I confirm that the delivery address is in Rosario or its surrounding area.', f_phone:'Phone', f_addr:'Address', f_loc:'Locality', f_notes:'Notes', k_send:'Send order',
 pk_p:"Zeobent Cat’s Premium Trio is a hyper-clumping, dust-free, hypoallergenic cat litter, with clinoptilolite and bentonite in an exclusive formula.", pd_t:"What sets us apart", pd_p:"Features that set Zeobent Cat’s apart from ordinary cat litter.", d1:"<b>Hyper-clumping</b>Maximum-strength clumping: it forms firm, compact clumps that scoop out easily.", d2:"<b>Dust-free</b>A cleaner environment for your cat and your home.", d3:"<b>Hypoallergenic</b>Made for the whole family.", d4:"<b>Captures odor</b>It traps ammonia: it doesn’t mask it, it eliminates it.", d5:"<b>Natural, no chemicals</b>Top-quality minerals with no chemical additives.", d6:"<b>Regulates moisture</b>It absorbs moisture and captures ammonia gases from urine and feces.", d7:"<b>Long-lasting</b>Replace the litter every 4 weeks.", d8:"<b>Second life</b>Used litter from healthy cats, dried and washed with water, can be added to compost as a soil restructurer and to speed up composting. It is not applied to growing plants: the soil is used in the garden once treated. Follow the instructions on the box.", cp_t:"Inside the granule", cp_p:"Tap each component to see what it adds.", cp1:"Clinoptilolite (zeolite)", cp2:"Hyper-clumping bentonite", cp3:"Exclusive formula", cp1d:"<b>Real ammonia capture.</b> Each granule contains microscopic crystals that trap moisture and ammonia molecules through Cation Exchange Capacity, a natural mineral process.", cp2d:"<b>Maximum-strength clumping.</b> It binds waste into firm clumps that scoop out easily and keep the litter box clean.", cp3d:"<b>Zeobent Cat’s own blend.</b> It brings together Argentine minerals in an exclusive formula, developed and processed at our plant.", cp_n:"Made with Argentine minerals: bentonites, clinoptilolite (zeolites) and pure diatomite of the highest quality, meeting American market standards.", hw_t:"How it eliminates odor", hw1:"<b>Absorbs</b>Moisture is held inside the granule.", hw2:"<b>Captures</b>The crystals trap ammonia and its odor.", hw3:"<b>Clumps</b>Waste forms a firm clump that is easy to remove.", pr_t:"Top quality at an accessible price", pr_p:"It is a premium product and, even so, we designed it to be accessible to everyone: healthy for the family and for the environment.", pf_t:"Backing and traceability", pf1:"<b>Our own raw materials</b>The raw materials in the formula are our own.", pf2:"<b>Strategically located plant</b>It lets us develop and process the product to the highest quality.", pf3:"<b>American market standards</b>Produced in compliance with United States market standards.", pf4:"<b>Same quality in Mercosur and the United States</b>Simultaneous launch, keeping the highest quality.", pf_a:"It has the approval of the most demanding United States quality standards in performance, health care and environmental care.", ec_t:"More than cat litter", ec_p:"An ecosystem of products that supports your pet’s care.", ec1:"<b>Premium Trio cat litter</b>The core product, in bags, box and bulk.", ec2:"<b>Wi-Fi feeder</b>With camera and sensors, to see whether your pet is eating while you are away. Coming soon.", ec3:"<b>Veterinary and agricultural bedding</b>Developed and processed at our plant.", ec4:"<b>Industrial absorbents</b>Internationally recognized, sold in the United States.", hc1:"Hyper-clumping", hc2:"Dust-free", hc3:"Hypoallergenic", hc4:"Traceable", hl2:"See all features",
 pk_h1:"Your cat deserves the best. So does your family.", ft_in:'Zeobent Cat’s Premium Trio · cat litter',
 offer:'Launch offer', free:'Free delivery in Rosario and surrounding area', freefull:'Free private delivery in the urban area of Rosario and surrounding area.', mlvalid:'Valid throughout Argentina through Mercado Libre.',
 perkg:'per kg', consult:'Ask for price', add:'Add to cart', buynow:'Buy now', mlbtn:'Buy on Mercado Libre', mlsoon:'Mercado Libre: coming soon', quote:'Request a quote', det:'View details',
 qty:'Quantity', sortr:'Sort: most relevant', sorta:'Lowest price', sortd:'Highest price', found:'products', none:'No products found.',
 added:'Product added to cart.', ecart:'Your cart is empty.', gotoshop:'Go to the shop', sub:'Subtotal', ship:'Delivery', shipfree:'Free (Rosario and surrounding area)', shipTBD:'To be arranged', tot:'Total', rm:'Remove',
 mlnone:'Mercado Libre link coming soon', mlgo:'Go to Mercado Libre', nf:'Product not found.', spec:'Details',
 ok:'Thank you! We got your message. Posts are reviewed before being shown.', mail:'Your email app opened: send the message (attach the photo if needed).',
 empty:'Our community’s pets will be shown here soon.', emptyo:'No reviews published yet.', avg:'Average rating', of:'reviews',
 purr:'Purring… 🐾', tap:'Tap the kitten', pur2:'The kitten is purring.', promo:'Promotional price', discnote:'From {n} units of the same product: {p}% off.', disc:'Quantity discount', dtag:'{p}% discount applied', hn:'Our products', hl:'See the whole shop', ct_t:'Did you buy your cat’s litter today?', ct_p:'Choose premium quality: Zeobent Cat’s Premium.', pic:'Image'
},
pt: {
 u2:'Ver oferta', sr:'Buscar produtos', sb:'Buscar', cart:'Carrinho',
 n0:'Início',n1:'Produto',n6:'Loja',n7:'Ofertas',n3:'Comunidade',n4:'Veterinários',n5:'Pedidos',
 fn:'Navegação', fc:'Formas de compra', fc1:'Mercado Livre: em toda a Argentina', fc2:'Entrega particular gratuita na área urbana de Rosario e arredores (promoção de lançamento)', fc3:'Pedidos no atacado e do exterior: consulte',
 h1:"Seu gato merece o melhor. Sua família também.", hp:'Zeobent Cat’s Premium Trio é uma pedra sanitária aglomerante com zeólita: elimina o odor em vez de disfarçá-lo.',
 cta:'Ver ofertas', cta2:'Conhecer o produto', band:'🐾 Toque no gatinho para ouvi-lo ronronar 🐾',
 so_t:'Oferta de lançamento', so_p:'Disponível em toda a Argentina pelo Mercado Livre e com entrega particular em Rosario e arredores.',
 t1:'Por que Zeobent Cat’s',
 c1:'<b>Aglomera</b>Forma blocos firmes que saem fácil com a pá.', c2:'<b>Prende odores</b>Seus cristais capturam a amônia: não a disfarçam, eliminam.',
 c3:'<b>Natural</b>Mineral sem aditivos químicos.', c4:'<b>Hipoalergênica</b>Pensada para toda a família.', c5:'<b>Rende</b>Reponha a pedra a cada 4 semanas.',
 c6:'<b>Segunda vida</b>A pedra usada de gatos saudáveis, seca e lavada com água, entra na compostagem como reestruturador do solo e acelera o processo. Não é aplicada em plantas em crescimento: a terra é usada na horta depois de tratada. Siga as instruções da caixa.',
 ch_t:'Formas de compra', ch1:'<b>Mercado Livre</b>Pague e compre na plataforma, válido em toda a Argentina.', ch2:'<b>Entrega particular</b>Entrega na área urbana de Rosario e arredores, gratuita na promoção de lançamento.',
 ch3:'<b>Atacado e exterior</b>Consumidores, varejistas e atacadistas, da Argentina ou do exterior. Custos e forma de pagamento são combinados conforme o destino.',
 cm_t:'Comunidade Zeobent', cm_p:'Histórias e fotos de pets compartilhadas por nossos clientes.', cm_l:'Ver todas as histórias',
 ph:'Produto', pht:'Modo de uso e tamanhos', t2:'Modo de uso em três passos', s1:'Coloque uma camada de 5 cm na bandeja.', s2:'Retire com a pá o material usado.', s3:'Reponha a quantidade retirada.',
 t3:'Tamanhos', pb:'<b>A granel</b> para distribuidores e fracionamento no varejo. Consulte.', pb2:'A granel', seeshop:'Ver na loja',
 th:'Loja', tp:'Pedra sanitária Zeobent Cat’s Premium Trio', t7:'Loja Zeobent: em breve', m1:'<b>Camisetas</b> com o logo da marca.', m2:'<b>Bonecos colecionáveis</b> do nosso gatinho.', m3:'<b>Alimentador Wi-Fi</b> com câmera e sensores.', wl:'Entrar na lista',
 oh:'Ofertas', op:'Ofertas especiais para o público em geral, válidas na Argentina pelo Mercado Livre.', oc_t:'Como comprar a oferta',
 oc1:'<b>1. Mercado Livre</b>Pague e compre pelo Mercado Livre de qualquer ponto da Argentina.', oc2:'<b>2. Entrega particular</b>Na área urbana de Rosario e arredores, com entrega gratuita: adicione o pack ao carrinho e preencha seus dados de entrega.',
 ob:'Esta seção reúne as ofertas vigentes.',
 cmh:'Comunidade Zeobent', tb1:'Histórias de pets', tb2:'Opiniões', i4:'Compartilhe uma foto do seu pet e sua experiência. Cada publicação é revisada e aprovada antes de ser exibida.',
 f_name:'Seu nome', f_pet:'Nome do seu pet', f_city:'Cidade', f_mail:'E-mail (não é publicado)', f_story:'Sua história', f_photo:'Foto do seu pet',
 f_ok:'Aceito que publiquem minha foto e meu relato. Não envio fotos de menores.', f_send:'Enviar', pubnote:'Nome, cidade, pet, foto e história são publicados após aprovação; seu e-mail não.',
 op_t:'Opiniões sobre o produto', f_rate:'Nota', f_op:'Sua opinião', f_ok2:'Aceito que publiquem meu nome e minha opinião.',
 t5:'Veterinárias e clínicas', i5:'Novidades atualizadas toda semana e links públicos sobre cuidados com gatos e outros pets.', l5:'Links úteis',
 t6:'Solicitar produto', i6:'Consumidores, varejistas e atacadistas, da Argentina ou do exterior. Custos e forma de pagamento são combinados conforme o destino.',
 f_type:'Eu sou', o1:'Consumidor final', o2:'Varejista', o3:'Atacadista / distribuidor', f_country:'País e cidade', f_prod:'Produto', f_qty:'Quantidade', f_msg:'Mensagem', pw:'Lista de espera: merch e alimentador',
 kh:'Carrinho de compras', pg_wa2:'Enviar meu pedido pelo WhatsApp', pg_sendwa:'Falta um passo: toque no botão para nos enviar o pedido pelo WhatsApp e confirmamos.', pg_proof2:'Envie o pedido pelo WhatsApp: passamos os dados de pagamento, você paga e manda o comprovante; confirmamos o pagamento e enviamos o romaneio.', pg_h:'Pagar agora', pg_p:'Preencha seus dados, escolha como pagar e você recebe as instruções na hora e também pelo WhatsApp.', pg_m:'Forma de pagamento', pg_card:'Cartão de crédito ou débito (link de pagamento)', pg_qr:'QR do Mercado Pago', pg_tr:'Transferência para alias / CBU', pg_18:'Sou maior de 18 anos e aceito que meus dados sejam usados para gerenciar este pedido.', pg_send:'Confirmar pedido', pg_wa:'Receber os dados pelo WhatsApp', pg_pay:'Pagar com cartão', pg_copy:'Copiar', pg_done:'Pedido registrado!', pg_order:'Pedido', pg_cardtxt:'Toque no botão para pagar com cartão com segurança no Mercado Pago. O pagamento é confirmado automaticamente.', pg_nolink:'Enviaremos o link de pagamento pelo WhatsApp em breve.', pg_qrtxt:'Escaneie o QR no app do Mercado Pago (ou transfira para o alias) pelo total do pedido.', pg_trtxt:'Transfira o total para estes dados e use o número do pedido como referência:', pg_amount:'Valor', pg_ref:'Referência', pg_proof:'Depois de pagar, envie o comprovante pelo WhatsApp e confirmamos o pagamento e o romaneio.', pg_ok:'✅ Pagamento confirmado! Obrigado pela compra.', pg_proofok:'🧾 Recebemos seu comprovante: estamos verificando.', pg_wait:'Enviando…', pg_err:'Não conseguimos registrar o pedido. Tente de novo ou escreva pelo WhatsApp.', pg_pending:'Status do pedido: aguardando pagamento.', k1:'Comprar pelo Mercado Livre', k2:'Entrega particular em Rosario e arredores', k_ok:'Confirmo que o endereço de entrega fica em Rosario ou arredores.', f_phone:'Telefone', f_addr:'Endereço', f_loc:'Localidade', f_notes:'Observações', k_send:'Enviar pedido',
 pk_p:"Zeobent Cat’s Premium Trio é uma pedra sanitária hiperaglomerante, sem poeira e hipoalergênica, com clinoptilolita e bentonita em uma fórmula exclusiva.", pd_t:"O que nos diferencia", pd_p:"Características que distinguem a Zeobent Cat’s da pedra sanitária comum.", d1:"<b>Hiperaglomerante</b>Aglomerante de máximo poder: forma blocos firmes e compactos que saem fácil com a pá.", d2:"<b>Sem poeira</b>Um ambiente mais limpo para seu gato e seu lar.", d3:"<b>Hipoalergênica</b>Pensada para toda a família.", d4:"<b>Captura o odor</b>Retém a amônia: não a disfarça, elimina.", d5:"<b>Natural, sem químicos</b>Minerais de máxima qualidade, sem aditivos químicos.", d6:"<b>Regula a umidade</b>Absorve a umidade e captura os gases da amônia da urina e das fezes.", d7:"<b>Rende</b>Reponha a pedra a cada 4 semanas.", d8:"<b>Segunda vida</b>A pedra usada de gatos saudáveis, seca e lavada com água, entra na compostagem como reestruturador do solo e acelera o processo. Não é aplicada em plantas em crescimento: a terra é usada na horta depois de tratada. Siga as instruções da caixa.", cp_t:"O grânulo por dentro", cp_p:"Toque em cada componente para ver o que ele traz.", cp1:"Clinoptilolita (zeólita)", cp2:"Bentonita hiperaglomerante", cp3:"Fórmula exclusiva", cp1d:"<b>Captura real da amônia.</b> Cada grânulo contém cristais microscópicos que prendem as moléculas de umidade e de amônia por meio da Capacidade de Troca Catiônica, um processo mineral natural.", cp2d:"<b>Aglomerante de máximo poder.</b> Forma blocos firmes com os resíduos, que saem fácil com a pá e mantêm a bandeja limpa.", cp3d:"<b>Combinação própria da Zeobent Cat’s.</b> Reúne minerais argentinos em uma fórmula exclusiva, desenvolvida e processada em nossa planta.", cp_n:"Produzido com minerais argentinos: bentonitas, clinoptilolita (zeólitas) e diatomitas puras de máxima qualidade, cumprindo as normas do mercado americano.", hw_t:"Como elimina o odor", hw1:"<b>Absorve</b>A umidade fica retida no grânulo.", hw2:"<b>Captura</b>Os cristais prendem a amônia e seu odor.", hw3:"<b>Aglomera</b>Os resíduos formam um bloco firme, fácil de retirar.", pr_t:"Máxima qualidade, a um preço acessível", pr_p:"É um produto premium e, mesmo assim, o pensamos acessível para todos: saudável para a família e para o meio ambiente.", pf_t:"Respaldo e rastreabilidade", pf1:"<b>Matérias-primas próprias</b>As matérias-primas que compõem a fórmula são próprias.", pf2:"<b>Planta estrategicamente localizada</b>Permite desenvolver e processar o produto com a máxima qualidade.", pf3:"<b>Normas do mercado americano</b>Produzido em conformidade com as normas do mercado dos Estados Unidos.", pf4:"<b>Mesma qualidade no Mercosul e nos Estados Unidos</b>Lançamento simultâneo, mantendo a máxima qualidade.", pf_a:"Conta com a aprovação dos mais exigentes padrões de qualidade dos Estados Unidos em desempenho, cuidado com a saúde e com o meio ambiente.", ec_t:"Mais que uma pedra sanitária", ec_p:"Um ecossistema de produtos que acompanha o cuidado do seu pet.", ec1:"<b>Pedra sanitária Premium Trio</b>O produto central, em sacos, caixa e a granel.", ec2:"<b>Alimentador Wi-Fi</b>Com câmera e sensores, para ver se seu pet está comendo enquanto você está fora. Em breve.", ec3:"<b>Camas veterinárias e agrícolas</b>Desenvolvidas e processadas em nossa planta.", ec4:"<b>Absorventes industriais</b>De reconhecimento internacional, comercializados nos Estados Unidos.", hc1:"Hiperaglomerante", hc2:"Sem poeira", hc3:"Hipoalergênica", hc4:"Com rastreabilidade", hl2:"Ver todas as características",
 pk_h1:"Seu gato merece o melhor. Sua família também.", ft_in:'Zeobent Cat’s Premium Trio · pedra sanitária',
 offer:'Oferta de lançamento', free:'Entrega grátis em Rosario e arredores', freefull:'Entrega particular gratuita na área urbana de Rosario e arredores.', mlvalid:'Válida em toda a Argentina pelo Mercado Livre.',
 perkg:'por kg', consult:'Consultar preço', add:'Adicionar ao carrinho', buynow:'Comprar agora', mlbtn:'Comprar no Mercado Livre', mlsoon:'Mercado Livre: em breve', quote:'Solicitar cotação', det:'Ver detalhes',
 qty:'Quantidade', sortr:'Ordenar: mais relevantes', sorta:'Menor preço', sortd:'Maior preço', found:'produtos', none:'Nenhum produto encontrado.',
 added:'Produto adicionado ao carrinho.', ecart:'Seu carrinho está vazio.', gotoshop:'Ir para a loja', sub:'Subtotal', ship:'Entrega', shipfree:'Grátis (Rosario e arredores)', shipTBD:'A combinar', tot:'Total', rm:'Remover',
 mlnone:'Link do Mercado Livre em breve', mlgo:'Ir ao Mercado Livre', nf:'Produto não encontrado.', spec:'Detalhes',
 ok:'Obrigado! Recebemos sua mensagem. As publicações são revisadas antes de serem exibidas.', mail:'Seu e-mail foi aberto: envie a mensagem (anexe a foto se for o caso).',
 empty:'Em breve você verá aqui os pets da nossa comunidade.', emptyo:'Ainda não há opiniões publicadas.', avg:'Nota média', of:'opiniões',
 purr:'Ronronando… 🐾', tap:'Toque no gatinho', pur2:'O gatinho está ronronando.', promo:'Preço promocional', discnote:'A partir de {n} unidades do mesmo produto: {p}% de desconto.', disc:'Desconto por quantidade', dtag:'{p}% de desconto aplicado', hn:'Nossos produtos', hl:'Ver toda a loja', ct_t:'Hoje você comprou a areia sanitária do seu gato?', ct_p:'Escolha qualidade premium: Zeobent Cat’s Premium.', pic:'Imagem'
}};
let L = 'es';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const tr = k => (T[L] || {})[k] || T.es[k] || '';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => '$ ' + Number(n).toLocaleString('es-AR');
// Los datos se cargan desde data/*.js (window.ZC), así el sitio funciona también abriendo los archivos sin servidor.
const getJSON = u => Promise.resolve(((window.ZC || {})[u.split('/').pop().replace(/\.(json|js)$/, '')] || []).slice());
const hooks = [];
let PRODS = [], CART = [];
// El carrito se guarda en varios lugares a la vez (localStorage, sessionStorage, window.name y cookie) y se lee el más reciente:
// así no se pierde al cambiar de página aunque el navegador bloquee alguno (archivo abierto desde la PC, navegador de Instagram/WhatsApp, modo privado).
function cartRead() {
  const cands = [];
  const add = raw => { try { if (!raw) return; const j = JSON.parse(raw); if (Array.isArray(j)) cands.push({ t: 0, i: j }); else if (j && Array.isArray(j.i)) cands.push({ t: +j.t || 0, i: j.i }); } catch (_) {} };
  try { add(localStorage.getItem('zc')); } catch (_) {}
  try { add(sessionStorage.getItem('zc')); } catch (_) {}
  try { if (/^ZC1:/.test(window.name)) add(decodeURIComponent(window.name.slice(4))); } catch (_) {}
  try { const m = /(?:^|;\s*)zc=([^;]*)/.exec(document.cookie); if (m) add(decodeURIComponent(m[1])); } catch (_) {}
  cands.sort((a, b) => b.t - a.t);
  return ((cands[0] && cands[0].i) || []).filter(x => x && typeof x.id === 'string' && +x.q > 0).map(x => ({ id: x.id, q: Math.min(999, Math.floor(+x.q)) }));
}
function cartWrite() {
  const raw = JSON.stringify({ t: Date.now(), i: CART });
  try { localStorage.setItem('zc', raw); } catch (_) {}
  try { sessionStorage.setItem('zc', raw); } catch (_) {}
  try { if (!window.name || /^ZC1:/.test(window.name)) window.name = 'ZC1:' + encodeURIComponent(raw); } catch (_) {}
  try { document.cookie = 'zc=' + encodeURIComponent(raw) + ';path=/;max-age=2592000;SameSite=Lax'; } catch (_) {}
}
CART = cartRead();
const saveCart = () => { cartWrite(); badge(); };
const badge = () => { const c = $('#cc'); if (c) c.textContent = CART.reduce((a, i) => a + i.q, 0); };
const prod = id => PRODS.find(p => p.id === id);

// ===== Estructura común (encabezado y pie) =====
const PAGE = location.pathname.split('/').pop() || 'index.html';
const NAV = [['index.html', 'n0', 'Inicio'], ['producto.html', 'n1', 'Producto'], ['tienda.html', 'n6', 'Tienda'], ['ofertas.html', 'n7', 'Ofertas'], ['comunidad.html', 'n3', 'Comunidad'], ['veterinarios.html', 'n4', 'Veterinarios'], ['pedidos.html', 'n5', 'Pedidos']];
function shell() {
  const cur = PAGE === 'articulo.html' ? 'tienda.html' : PAGE;
  $('#top').innerHTML = `<div class="util"><span id="utxt"></span><a href="ofertas.html" data-i="u2">Ver oferta</a></div>
<header class="top"><div class="r1">
<a class="brand" href="index.html"><img src="assets/logo-usa.webp" alt="Logo Zeobent Cat’s"><span>Zeobent Cat’s</span></a>
<form class="search" action="tienda.html" role="search"><input type="search" name="q" data-ph="sr" placeholder="Buscar productos" aria-label="Buscar"><button data-i="sb">Buscar</button></form>
<div class="tools"><div class="lang" role="group" aria-label="Idioma"><button data-l="es">ES</button><button data-l="en">EN</button><button data-l="pt">PT</button></div>
<a class="cartlnk" href="carrito.html"><span data-i="cart">Carrito</span><b id="cc">0</b></a></div></div>
<nav aria-label="Principal">${NAV.map(n => `<a href="${n[0]}" data-i="${n[1]}"${n[0] === cur ? ' class="on" aria-current="page"' : ''}>${n[2]}</a>`).join('')}</nav></header>`;
  $('#foot').innerHTML = `<footer><div class="fg">
<div><strong>Zeobent Cat’s Premium Trio</strong><br><span data-i="ft_in">Piedra sanitaria para gatos</span><br><br>American Top Zeolit Inc. · <a style="display:inline" href="https://www.americantopzeolit.com">americantopzeolit.com</a><br><a href="mailto:zeolitcatsusa@gmail.com">zeolitcatsusa@gmail.com</a>+1 (949) 213-9168 · +54 (0341) 627-2609<br>WhatsApp Business: +54 9 341 542-1376 (Argentina) · +1 949 662-8138 (USA)</div>
<div><h4 data-i="fn">Navegación</h4>${NAV.map(n => `<a href="${n[0]}" data-i="${n[1]}">${n[2]}</a>`).join('')}<a href="carrito.html" data-i="cart">Carrito</a></div>
<div><h4 data-i="fc">Formas de compra</h4><p data-i="fc1">Mercado Libre: todo el territorio de la República Argentina</p><p data-i="fc2">Envío particular gratuito en el eje urbano de Rosario y zona de influencia (promoción de lanzamiento)</p><p data-i="fc3">Pedidos mayoristas y del exterior: consulte</p></div>
</div><div class="fine">© Zeobent Cat’s Premium Trio</div></footer>`;
  $$('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  badge();
}

function setLang(l) {
  L = l; document.documentElement.lang = l;
  try { localStorage.setItem('zl', l); } catch (_) {}
  $$('[data-i]').forEach(e => {
    if (!e.dataset.es) e.dataset.es = e.innerHTML;
    e.innerHTML = l === 'es' ? e.dataset.es : (T[l][e.dataset.i] || e.dataset.es);
  });
  $$('[data-ph]').forEach(e => { if (!e.dataset.es) e.dataset.es = e.placeholder; e.placeholder = l === 'es' ? e.dataset.es : (T[l][e.dataset.ph] || e.dataset.es); });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.l === l));
  hooks.forEach(f => f());
}
function toast(m) { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = m; document.body.append(t); setTimeout(() => t.remove(), 2400); }

// ===== Tienda =====
const priceHTML = p => p.precio != null
  ? `<div class="price">${money(p.precio)}${p.kg ? ` <small>· ${money(Math.round(p.precio / p.kg))} ${tr('perkg')}</small>` : ''}</div>`
  : `<div class="price"><small>${tr('consult')}</small></div>`;
const badges = p => `<div class="badges">${p.promo ? `<span class="badge">${tr('promo')}</span>` : ''}${p.oferta ? `<span class="badge">${esc(p.etiqueta) || tr('offer')}</span>` : ''}${p.envio_gratis_local ? `<span class="badge g">${tr('free')}</span>` : ''}</div>`;
function buyBtns(p, full) {
  if (p.precio == null) return `<a class="btn alt" href="pedidos.html?producto=${encodeURIComponent(p.id)}">${tr('quote')}</a>`;
  let h = `<button class="btn" data-add="${esc(p.id)}">${tr('add')}</button>`;
  if (p.ml_url) h += `<a class="btn ml" href="${esc(p.ml_url)}" target="_blank" rel="noopener">${tr('mlbtn')}</a>`;
  else if (full) h += `<button class="btn ml off" disabled>${tr('mlsoon')}</button>`;
  return h;
}
const discOK = p => p.precio != null && p.descuento !== false;
const discNote = p => discOK(p) ? `<div class="disc">${tr('discnote').replace('{n}', CFG.desc.min).replace('{p}', CFG.desc.pct)}</div>` : '';
const prow = p => `<article class="prow"><a class="im" href="articulo.html?id=${encodeURIComponent(p.id)}"><img src="${esc(p.img)}" alt="${esc(p.nombre)}" loading="lazy"></a><div class="pi">${badges(p)}<h3><a href="articulo.html?id=${encodeURIComponent(p.id)}">${esc(p.nombre)}</a></h3><p>${esc(p.descripcion)}</p><ul>${(p.detalles || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul>${discNote(p)}</div><div class="pb">${priceHTML(p)}<div class="buy">${buyBtns(p, true)}</div><a class="link" href="articulo.html?id=${encodeURIComponent(p.id)}">${tr('det')}</a></div></article>`;
const pcard = p => `<article class="pcard"><a class="im" href="articulo.html?id=${encodeURIComponent(p.id)}"><img src="${esc(p.img)}" alt="${esc(p.nombre)}" loading="lazy"></a><div class="in">${badges(p)}<h3><a href="articulo.html?id=${encodeURIComponent(p.id)}">${esc(p.nombre)}</a></h3>${priceHTML(p)}${discNote(p)}<div class="buy">${buyBtns(p)}</div></div></article>`;
const offerBox = p => `<div class="offer"><div class="im"><img src="${esc(p.img)}" alt="${esc(p.nombre)}"></div><div><span class="badge">${esc(p.etiqueta) || tr('offer')}</span><h3>${esc(p.nombre)}</h3><p>${esc(p.descripcion)}</p>${priceHTML(p)}${discNote(p)}<div class="badges"><span class="badge g">${tr('free')}</span><span class="badge v">${tr('mlvalid')}</span></div><div class="buy">${buyBtns(p, true)}<a class="btn line" href="articulo.html?id=${encodeURIComponent(p.id)}">${tr('det')}</a></div></div></div>`;

function initShop() {
  const box = $('#plist'); if (!box) return;
  const qs = new URLSearchParams(location.search), qi = $('#q'), so = $('#sort'); qi.value = qs.get('q') || '';
  const draw = () => {
    const q = qi.value.trim().toLowerCase(), s = so.value;
    let r = PRODS.filter(p => (p.nombre + ' ' + p.descripcion + ' ' + p.categoria).toLowerCase().includes(q));
    if (s) r.sort((a, b) => (s === 'a' ? 1 : -1) * ((a.precio ?? (s === 'a' ? 1e12 : -1)) - (b.precio ?? (s === 'a' ? 1e12 : -1))));
    $('#count').textContent = r.length + ' ' + tr('found');
    box.innerHTML = r.length ? r.map(prow).join('') : `<p class="empty">${tr('none')}</p>`;
  };
  so.options[0].textContent = tr('sortr'); so.options[1].textContent = tr('sorta'); so.options[2].textContent = tr('sortd');
  qi.oninput = so.onchange = draw; hooks.push(() => { so.options[0].textContent = tr('sortr'); so.options[1].textContent = tr('sorta'); so.options[2].textContent = tr('sortd'); draw(); }); draw();
}
function initArticle() {
  const box = $('#art'); if (!box) return;
  const draw = () => {
    const p = prod(new URLSearchParams(location.search).get('id'));
    if (!p) { box.innerHTML = `<p>${tr('nf')} <a href="tienda.html">${tr('gotoshop')}</a></p>`; return; }
    document.title = p.nombre + ' · Zeobent Cat’s'; $('#crumb').textContent = p.corto;
    const free = p.envio_gratis_local;
    const imgs = [p.img, ...(p.imgs || [])];
    box.innerHTML = `<div class="det"><div><div class="im"><img id="mainimg" src="${esc(p.img)}" alt="${esc(p.nombre)}"></div>${imgs.length > 1 ? `<div class="thumbs">${imgs.map((u, i) => `<button type="button" data-img="${esc(u)}" aria-label="${tr('pic')} ${i + 1}"${i ? '' : ' aria-current="true"'}><img src="${esc(u)}" alt=""></button>`).join('')}</div>` : ''}</div>
<div>${badges(p)}<h2>${esc(p.nombre)}</h2><p>${esc(p.descripcion)}</p><h3>${tr('spec')}</h3><ul>${(p.detalles || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul></div>
<aside class="buybox">${priceHTML(p)}${discNote(p)}${p.precio != null ? `<label>${tr('qty')}<input id="aq" type="number" min="1" max="999" value="1"></label>` : ''}
${p.precio != null ? `<button class="btn" id="addq">${tr('add')}</button><button class="btn alt" id="nowq">${tr('buynow')}</button>` : ''}${p.precio != null && p.ml_url ? `<a class="btn ml" href="${esc(p.ml_url)}" target="_blank" rel="noopener">${tr('mlbtn')}</a>` : p.precio != null ? `<button class="btn ml off" disabled>${tr('mlsoon')}</button>` : `<a class="btn alt" href="pedidos.html?producto=${encodeURIComponent(p.id)}">${tr('quote')}</a>`}
${free ? `<div class="ship">${tr('freefull')}<br>${tr('mlvalid')}</div>` : ''}</aside></div>`;
    $$('.thumbs button', box).forEach(b => b.onclick = () => { $('#mainimg').src = b.dataset.img; $$('.thumbs button', box).forEach(x => x.removeAttribute('aria-current')); b.setAttribute('aria-current', 'true'); });
    const qv = () => Math.max(1, Math.min(999, parseInt($('#aq').value) || 1));
    if ($('#addq')) { $('#addq').onclick = () => addCart(p.id, qv()); $('#nowq').onclick = () => { addCart(p.id, qv(), true); location.href = 'carrito.html'; }; }
  };
  hooks.push(draw); draw();
}

// ===== Buscador del encabezado: sugiere solo productos propios =====
function initSearch() {
  const f = $('.search'); if (!f) return; const i = $('input', f), box = document.createElement('div'); box.className = 'sugg'; box.hidden = true; f.append(box);
  const show = () => {
    const q = i.value.trim().toLowerCase(), r = PRODS.filter(p => !q || (p.nombre + ' ' + p.corto + ' ' + p.descripcion).toLowerCase().includes(q));
    box.innerHTML = r.length ? r.map(p => `<a href="articulo.html?id=${encodeURIComponent(p.id)}"><img src="${esc(p.img)}" alt=""><span>${esc(p.corto)}</span><b>${p.precio != null ? money(p.precio) : tr('consult')}</b></a>`).join('') : `<p>${tr('none')}</p>`; box.hidden = false;
  };
  i.addEventListener('input', show); i.addEventListener('focus', show); i.addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });
  document.addEventListener('click', e => { if (!f.contains(e.target)) box.hidden = true; });
}

// ===== Carrito =====
function addCart(id, q = 1, silent) {
  const i = CART.find(x => x.id === id); i ? i.q = Math.min(999, i.q + q) : CART.push({ id, q }); saveCart(); if (!silent) toast(tr('added'));
}
document.addEventListener('click', e => { const b = e.target.closest('[data-add]'); if (b) addCart(b.dataset.add); });
const cartLines = () => CART.map(i => ({ p: prod(i.id), q: i.q })).filter(x => x.p && x.p.precio != null);
const lineSub = x => x.p.precio * x.q;
const lineDisc = x => discOK(x.p) && x.q >= CFG.desc.min ? Math.round(lineSub(x) * CFG.desc.pct / 100) : 0;
const lineTot = x => lineSub(x) - lineDisc(x);
const cartSub = () => cartLines().reduce((a, x) => a + lineSub(x), 0);
const cartDisc = () => cartLines().reduce((a, x) => a + lineDisc(x), 0);
const cartTotal = () => cartSub() - cartDisc();
const cartFree = () => { const l = cartLines(); return l.length > 0 && l.every(x => x.p.envio_gratis_local); };
function cartText() {
  return cartLines().map(x => x.q + ' × ' + x.p.nombre + ' — ' + money(lineTot(x)) + (lineDisc(x) ? ' (descuento por cantidad ' + CFG.desc.pct + '%: -' + money(lineDisc(x)) + ')' : '')).join('\n') + '\nTotal: ' + money(cartTotal()) + '\nEnvío: ' + (cartFree() ? 'gratis (Rosario y zona de influencia)' : 'a coordinar');
}
function renderCart() {
  const box = $('#cartbox'); if (!box) return;
  const ls = cartLines();
  if (!ls.length) { box.innerHTML = `<p>${tr('ecart')}</p><p><a class="btn" href="tienda.html">${tr('gotoshop')}</a></p>`; $('#checkout').hidden = true; return; }
  $('#checkout').hidden = false;
  if (!$('#sum')) box.innerHTML = '<div class="cart"><div id="cartlines"></div><div id="sum" class="sum"></div></div>';
  $('#cartlines').innerHTML = ls.map(x => `<div class="line"><a href="articulo.html?id=${encodeURIComponent(x.p.id)}"><img src="${esc(x.p.img)}" alt=""></a><div><b>${esc(x.p.corto)}</b><br>${money(x.p.precio)}${lineDisc(x) ? `<br><span class="dtag">${tr('dtag').replace('{p}', CFG.desc.pct)}: ${money(lineTot(x))}</span>` : ''}<br><button class="link" data-rm="${esc(x.p.id)}">${tr('rm')}</button></div><div class="qty"><button data-m="${esc(x.p.id)}" aria-label="-">−</button><input type="number" min="1" max="999" value="${x.q}" data-q="${esc(x.p.id)}" aria-label="${tr('qty')}"><button data-p="${esc(x.p.id)}" aria-label="+">+</button></div></div>`).join('');
  $('#sum').innerHTML = `<div class="row"><span>${tr('sub')}</span><span>${money(cartSub())}</span></div>${cartDisc() ? `<div class="row save"><span>${tr('disc')}</span><span>− ${money(cartDisc())}</span></div>` : ''}<div class="row"><span>${tr('ship')}</span><span>${cartFree() ? tr('shipfree') : tr('shipTBD')}</span></div><div class="row tot"><span>${tr('tot')}</span><span>${money(cartTotal())}</span></div>`;
  $('#mllist').innerHTML = ls.map(x => `<p>${x.q} × ${esc(x.p.corto)} ${x.p.ml_url ? `<a class="btn ml" href="${esc(x.p.ml_url)}" target="_blank" rel="noopener">${tr('mlgo')}</a>` : `<em>${tr('mlnone')}</em>`}</p>`).join('');
}
function initCart() {
  if (!$('#cartbox')) return;
  $('#cartbox').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const id = b.dataset.rm || b.dataset.m || b.dataset.p; if (!id) return; const i = CART.find(x => x.id === id); if (!i) return;
    if (b.dataset.rm) CART = CART.filter(x => x !== i); else i.q = Math.max(0, Math.min(999, i.q + (b.dataset.p ? 1 : -1)));
    CART = CART.filter(x => x.q > 0); saveCart(); renderCart();
  });
  $('#cartbox').addEventListener('change', e => {
    const n = e.target.closest('input[data-q]'); if (!n) return; const i = CART.find(x => x.id === n.dataset.q); if (!i) return;
    i.q = Math.max(0, Math.min(999, parseInt(n.value) || 1)); CART = CART.filter(x => x.q > 0); saveCart(); renderCart();
  });
  hooks.push(renderCart); renderCart();
}

// ===== Comunidad: historias y opiniones aprobadas (data/gallery.json y data/opiniones.json) =====
async function loadGallery() {
  const g = $('#gal'); if (!g) return; g.innerHTML = '';
  let items = await getJSON('data/gallery.json'); const lim = +g.dataset.max; if (lim) items = items.slice(0, lim);
  if (!items.length) { g.innerHTML = `<p class="empty">${tr('empty')}</p>`; return; }
  g.innerHTML = items.map(o => `<figure><img src="${esc(o.foto)}" alt="${esc(o.mascota)}" loading="lazy"><figcaption><b>${esc(o.mascota)}</b>${esc(o.texto)}${o.autor ? `<br><small>${esc(o.autor)}${o.ciudad ? ' · ' + esc(o.ciudad) : ''}</small>` : ''}</figcaption></figure>`).join('');
}
async function loadOps() {
  const b = $('#ops'); if (!b) return;
  const items = await getJSON('data/opiniones.json'), st = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  if (!items.length) { b.innerHTML = `<p class="empty">${tr('emptyo')}</p>`; return; }
  const avg = items.reduce((a, o) => a + (+o.puntaje || 0), 0) / items.length;
  b.innerHTML = `<p><span class="stars">${st(Math.round(avg))}</span> <b>${avg.toFixed(1)}</b> · ${tr('avg')} (${items.length} ${tr('of')})</p>` +
    items.map(o => `<div class="op"><span class="stars">${st(Math.max(0, Math.min(5, +o.puntaje || 0)))}</span><p>${esc(o.texto)}</p><small>${esc(o.autor)}${o.ciudad ? ' · ' + esc(o.ciudad) : ''}${o.fecha ? ' · ' + esc(o.fecha) : ''}</small></div>`).join('');
}
async function loadVets() {
  const box = $('#vetlist'); if (!box) return;
  (await getJSON('data/vets.json')).sort((a, b) => b.fecha.localeCompare(a.fecha)).forEach(v => {
    const d = document.createElement('div'); d.className = 'vet';
    const s = document.createElement('small'), h = document.createElement('h3'), p = document.createElement('p');
    s.textContent = v.fecha; h.textContent = v.titulo; p.textContent = v.texto; d.append(s, h, p);
    if (v.url) { const a = document.createElement('a'); a.href = v.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = v.url; d.append(a); }
    box.append(d);
  });
}


// ===== Cobros: pedido + forma de pago (servidor de pedidos) =====
async function loadRemote() {
  if (!CFG.api) return;
  try {
    const c = new AbortController(), t = setTimeout(() => c.abort(), 4500);
    const r = await fetch(CFG.api + '/api/config', { signal: c.signal }); clearTimeout(t);
    if (!r.ok) return; const j = await r.json();
    PRODS.forEach(p => { if (j.ml && j.ml[p.id]) p.ml_url = j.ml[p.id]; if (j.amazon && j.amazon[p.id]) p.amazon_url = j.amazon[p.id]; });
    CFG.metodos = j.metodos || null;
  } catch (_) {}
}
const httpsOnly = u => /^(https:\/\/|assets\/)/.test(u || '') ? u : '';
function initPay() {
  const pp = $('#paypanel'); if (!pp) return;
  const M = CFG.metodos, server = !!(CFG.api && M && (M.tarjeta || M.mp_qr || M.transferencia)), old = $('#oldform'), ml = $('#mlpanel');
  pp.hidden = false; if (old) old.hidden = true; if (ml && M && M.mercadolibre === false) ml.hidden = true;
  const q = new URLSearchParams(location.search).get('pedido');
  if (CFG.api && /^ZB-[A-Z0-9]{8}$/.test(q || '')) { showReturn(q); return; }
  const avail = server ? M : { tarjeta: true, mp_qr: true, transferencia: true };        // sin servidor: las 3 formas de pago, y el pedido sale por WhatsApp
  $('#paym').innerHTML = [['tarjeta', 'pg_card'], ['mp_qr', 'pg_qr'], ['transferencia', 'pg_tr']].filter(([k]) => avail[k]).map(([k, t], i) => `<label class="radio"><input type="radio" name="metodo" value="${k}"${i ? '' : ' checked'}><span data-i="${t}">${tr(t)}</span></label>`).join('');
  const f = $('#payform');
  f.onsubmit = async e => {
    e.preventDefault(); const st = $('.st', f), d = new FormData(f), btn = $('button.btn', f); if (d.get('_gotcha')) return;
    const lines = cartLines(); if (!lines.length) { st.textContent = tr('ecart'); return; }
    if (!server) { staticOrder(d, lines); return; }
    st.textContent = tr('pg_wait'); btn.disabled = true;
    try {
      const r = await fetch(CFG.api + '/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: lines.map(x => ({ id: x.p.id, q: x.q })), cliente: { nombre: d.get('nombre'), telefono: d.get('telefono'), email: d.get('email'), localidad: d.get('localidad'), domicilio: d.get('domicilio'), observaciones: d.get('observaciones') }, metodo: d.get('metodo'), mayor: !!d.get('mayor'), idioma: document.documentElement.lang || 'es', _gotcha: d.get('_gotcha') || '' }) });
      const j = await r.json();
      if (!r.ok || !j.ok) { st.textContent = j.error || tr('pg_err'); btn.disabled = false; return; }
      CART = []; saveCart(); renderCart(); showResult(j);
    } catch (_) { st.textContent = tr('pg_err'); btn.disabled = false; }
  };
}
// Pedido sin servidor: se arma el resumen, se muestran los datos de pago cargados en data/config.js y el pedido se envía por WhatsApp.
function staticOrder(d, lines) {
  const ch = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', rnd = () => { const a = new Uint8Array(6); (window.crypto || { getRandomValues: x => x.forEach((_, i) => (x[i] = Math.random() * 256)) }).getRandomValues(a); return [...a].map(x => ch[x % ch.length]).join(''); };
  const code = 'WEB-' + rnd(), P = CFG.pagos || {}, m = d.get('metodo'), MN = { tarjeta: 'Tarjeta (link de pago)', mp_qr: 'QR de Mercado Pago', transferencia: 'Transferencia / alias' }[m] || m;
  const msg = ['Hola, quiero pagar mi pedido ' + code, ...lines.map(x => '• ' + x.q + ' × ' + x.p.corto + ' — ' + money(lineTot(x))), 'Total: ' + money(cartTotal()) + ' (envío: ' + (cartFree() ? 'gratis en Rosario y zona' : 'a coordinar') + ')', 'Forma de pago: ' + MN,
    'Nombre: ' + d.get('nombre') + ' · WhatsApp: ' + d.get('telefono') + ' · Email: ' + d.get('email'), 'Entrega: ' + d.get('domicilio') + ', ' + d.get('localidad') + (d.get('observaciones') ? ' · ' + d.get('observaciones') : '')].join('\n');
  const pago = m === 'tarjeta' ? { tipo: 'tarjeta', link: (P.tarjeta || {}).link } : m === 'mp_qr' ? { tipo: 'mp_qr', qr: (P.mp_qr || {}).qr, alias: (P.mp_qr || {}).alias } : Object.assign({ tipo: 'transferencia' }, P.transferencia || {});
  showResult({ id: code, total: cartTotal(), pago, wa: 'https://wa.me/' + CFG.wa + '?text=' + encodeURIComponent(msg), local: true });
}
function showResult(j) {
  const pr = $('#payres'), p = j.pago || {}, cp = v => v ? `<button type="button" class="link" data-copy="${esc(v)}">${tr('pg_copy')}</button>` : '', li = (k, v) => v ? `<li>${k}: <b>${esc(v)}</b> ${cp(v)}</li>` : '';
  $('#cartbox').hidden = true; $('#checkout').hidden = true; pr.hidden = false;
  let h = `<div class="panel paybox"><h2>${tr('pg_done')}</h2><p>${tr('pg_order')}: <b>${esc(j.id)}</b> · ${tr('tot')}: <b>${money(j.total)}</b></p>`;
  if (p.tipo === 'tarjeta') h += httpsOnly(p.link) ? `<p>${tr('pg_cardtxt')}</p><p><a class="btn" href="${esc(p.link)}" target="_blank" rel="noopener">${tr('pg_pay')}</a></p>` : `<p>${tr('pg_nolink')}</p>`;
  if (p.tipo === 'mp_qr') h += `<p>${tr('pg_qrtxt')}</p>${httpsOnly(p.qr) ? `<img class="qrimg" src="${esc(p.qr)}" alt="QR Mercado Pago">` : ''}<ul class="payd">${li('Alias', p.alias)}<li>${tr('pg_amount')}: <b>${money(j.total)}</b></li></ul>`;
  if (p.tipo === 'transferencia') h += `<p>${tr('pg_trtxt')}</p><ul class="payd">${li('Alias', p.alias)}${li('CBU/CVU', p.cbu)}${li('Titular', p.titular)}${li('Banco', p.banco)}${li('CUIT/CUIL', p.cuit)}<li>${tr('pg_amount')}: <b>${money(j.total)}</b></li><li>${tr('pg_ref')}: <b>${esc(j.id)}</b> ${cp(j.id)}</li></ul>`;
  h += `<p>${tr(j.local ? 'pg_proof2' : 'pg_proof')}</p>${httpsOnly(j.wa) ? `<p><a class="btn ml" href="${esc(j.wa)}" target="_blank" rel="noopener">${tr(j.local ? 'pg_wa2' : 'pg_wa')}</a></p>` : ''}<p class="st" id="paystat" role="status">${tr('pg_pending')}</p></div>`;
  pr.innerHTML = h; pr.onclick = e => { const b = e.target.closest('[data-copy]'); if (b && navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).catch(() => {}); };
  if (j.local) { const w = $('a.ml', pr); if (w) w.onclick = () => { CART = []; saveCart(); renderCart(); }; $('#paystat').textContent = tr('pg_sendwa'); } else trackOrder(j.id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showReturn(id) {
  $('#cartbox').hidden = true; $('#checkout').hidden = true; const pr = $('#payres'); pr.hidden = false;
  pr.innerHTML = `<div class="panel paybox"><h2>${tr('pg_order')} <b>${esc(id)}</b></h2><p class="st" id="paystat" role="status">${tr('pg_pending')}</p></div>`; trackOrder(id);
}
function trackOrder(id) {
  let n = 0; const tick = async () => {
    if (++n > 90 || !$('#paystat')) return;
    try {
      const r = await fetch(CFG.api + '/api/orders/' + id + '/status'), j = await r.json();
      if (j.estado === 'pagado' || j.estado === 'entregado') { $('#paystat').textContent = tr('pg_ok'); return; }
      if (j.estado === 'comprobante_recibido') $('#paystat').textContent = tr('pg_proofok');
    } catch (_) {}
    setTimeout(tick, 8000);
  };
  setTimeout(tick, 3000);
}

// ===== Formularios =====
// Con endpoint configurado se envían allí; si no, se abre el correo. Las fotos se reducen antes de enviarse.
function shrink(file) {
  return new Promise((res, rej) => {
    const u = URL.createObjectURL(file), i = new Image();
    i.onload = () => { const k = Math.min(1, 1000 / Math.max(i.width, i.height)), c = document.createElement('canvas'); c.width = Math.round(i.width * k); c.height = Math.round(i.height * k); c.getContext('2d').drawImage(i, 0, 0, c.width, c.height); URL.revokeObjectURL(u); c.toBlob(b => b ? res(b) : rej(), 'image/jpeg', .8); };
    i.onerror = rej; i.src = u;
  });
}
function initForms() {
  $$('form[data-s]').forEach(f => f.onsubmit = async e => {
    e.preventDefault();
    const st = $('.st', f), d = new FormData(f);
    if (d.get('_gotcha')) return;
    d.delete('_gotcha'); d.append('_subject', f.dataset.s);
    if (f.dataset.cart) d.append('pedido', cartText());
    const fi = $('input[type=file]', f);
    if (fi && fi.files[0]) { try { d.set(fi.name, await shrink(fi.files[0]), 'foto.jpg'); } catch (_) {} }
    if (CFG.endpoint) {
      try {
        const r = await fetch(CFG.endpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } });
        if (r.ok) { f.reset(); if (f.dataset.cart) { CART = []; saveCart(); renderCart(); } st.textContent = tr('ok'); return; }
      } catch (_) {}
    }
    const body = [...d].filter(([k, v]) => typeof v === 'string' && k[0] !== '_').map(([k, v]) => k + ': ' + v).join('\n');
    location.href = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent(f.dataset.s) + '&body=' + encodeURIComponent(body);
    st.textContent = tr('mail');
  });
  const pre = new URLSearchParams(location.search).get('producto'), sel = $('select[name=producto]');
  if (pre && sel) { const o = [...sel.options].find(o => o.dataset.id === pre); if (o) o.selected = true; }
}

// ===== Gatito: ronroneo =====
let AC, purring = 0;
function purrSound() {
  const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
  AC = AC || new C(); if (AC.state === 'suspended') AC.resume();
  const sr = AC.sampleRate, dur = 2.8, buf = AC.createBuffer(1, Math.floor(sr * dur), sr), d = buf.getChannelData(0);
  let last = 0, mx = 0;
  for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last; mx = Math.max(mx, Math.abs(last)); }
  for (let i = 0; i < d.length; i++) d[i] /= mx;                       // normaliza el ruido marrón
  const src = AC.createBufferSource(); src.buffer = buf;
  const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; lp.Q.value = 1.2;
  const hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 60;
  const am = AC.createGain(); am.gain.value = 0.5;                       // modulación ~25 Hz = ronroneo
  const lfo = AC.createOscillator(), lg = AC.createGain(); lfo.frequency.value = 25; lg.gain.value = 0.5; lfo.connect(lg); lg.connect(am.gain);
  const out = AC.createGain(), t = AC.currentTime;
  out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(0.9, t + 0.3); out.gain.setValueAtTime(0.9, t + dur - 0.9); out.gain.linearRampToValueAtTime(0, t + dur);
  src.connect(lp); lp.connect(hp); hp.connect(am); am.connect(out); out.connect(AC.destination);
  src.start(t); lfo.start(t); src.stop(t + dur); lfo.stop(t + dur);
}
function initMascot() {
  const m = $('#mascot'); if (!m) return;
  const hint = $('.hint'), box = m.parentNode;
  m.onclick = () => {
    try { purrSound(); } catch (_) {}
    try { navigator.vibrate && navigator.vibrate([70, 40, 70, 40, 70, 40, 70, 40, 70]); } catch (_) {}
    m.classList.add('purr'); hint.textContent = tr('purr'); hint.dataset.on = 1;
    clearTimeout(purring); purring = setTimeout(() => { m.classList.remove('purr'); hint.textContent = tr('tap'); delete hint.dataset.on; }, 2800);
    $('#purrst').textContent = tr('pur2');
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('span'), a = Math.random() * 6.28, dd = 120 + Math.random() * 160;
      s.textContent = '🐾'; s.style.cssText = 'position:absolute;left:50%;top:50%;pointer-events:none;font-size:' + (20 + Math.random() * 26) + 'px';
      box.append(s);
      s.animate([{ transform: 'translate(-50%,-50%)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * dd}px),calc(-50% + ${Math.sin(a) * dd}px)) rotate(${a * 60}deg)`, opacity: 0 }], { duration: 950, easing: 'ease-out' }).onfinish = () => s.remove();
    }
  };
  hooks.push(() => { if (!hint.dataset.on) hint.textContent = tr('tap'); });
}

// ===== Gránulo interactivo (página Producto) =====
function initGranule() {
  const s = $('#gsvg'); if (!s) return;
  const set = k => { s.dataset.on = k; $$('.gtab').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k)); $$('.gpan').forEach(p => p.hidden = p.dataset.k !== k); };
  $$('.gtab').forEach(b => b.onclick = () => set(b.dataset.k));
  [['bent', '#g-bent'], ['zeo', '#g-zeo'], ['form', '#g-form']].forEach(([k, id]) => { const g = $(id); g.style.cursor = 'pointer'; g.onclick = () => set(k); });
  set('zeo');
}

// ===== Inicio =====
(async () => {
  shell();
  PRODS = (await getJSON('data/products.json')).filter(p => p.visible !== false); badge(); await loadRemote();
  hooks.push(() => { const o = PRODS.find(p => p.oferta && p.precio != null), u = $('.util'); if (!o) { u.hidden = true; return; } u.hidden = false; $('#utxt').textContent = (o.etiqueta || tr('offer')) + ': ' + o.corto + ' · ' + money(o.precio) + (o.envio_gratis_local ? ' · ' + tr('free') : ''); });
  const oh = $('#offer-home'); if (oh) hooks.push(() => { oh.innerHTML = PRODS.filter(p => p.oferta).map(offerBox).join(''); });
  const hp = $('#home-products'); if (hp) hooks.push(() => { hp.innerHTML = PRODS.map(pcard).join(''); });
  const pc = $('#price-cards'); if (pc) hooks.push(() => { pc.innerHTML = PRODS.filter(p => p.precio != null).map(pcard).join(''); });
  const os = $('#offers'); if (os) hooks.push(() => { os.innerHTML = PRODS.filter(p => p.oferta).map(offerBox).join(''); });
  initSearch(); initGranule(); initShop(); initArticle(); initCart(); initPay(); initForms(); initMascot();
  hooks.push(() => { loadGallery(); loadOps(); });
  loadVets();
  let saved = 'es'; try { saved = localStorage.getItem('zl') || (navigator.language || 'es').slice(0, 2); } catch (_) {}
  setLang(['es', 'en', 'pt'].includes(saved) ? saved : 'es');
})();
