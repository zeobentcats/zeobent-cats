/* Zeo, el gatito asistente de Zeobent Cat’s.
   Este archivo es la "memoria" de Zeo: números, horarios, textos y preguntas frecuentes.
   Se edita sin tocar el código (zeo.js). Conserve la estructura window.ZC.zeo = { ... };
   Zeo NO inventa datos: lo que no está acá (o en data/products.js) lo deriva a una persona. */
window.ZC = window.ZC || {};
window.ZC.zeo = {

  /* ===== DATOS DE CONTACTO Y CANALES (EDITAR) ===== */
  // WhatsApp Business: código de país + característico + número, SOLO dígitos, sin "+" ni espacios.
  // Argentina celular = 549 + característico sin 0 + número sin 15. Zeo usa el de Argentina para clientes argentinos y el de EE.UU. para el resto.
  whatsapp: { ar: "5493415421376", us: "19496628138" },
  wa_texto: { ar: "+54 9 341 542-1376", us: "+1 949 662-8138" },
  email: "zeolitcatsusa@gmail.com",
  web: "https://www.americantopzeolit.com",
  // Contacto común (llamadas y mensajes comunes, NO es WhatsApp Business):
  telefonos: "+54 (0341) 627-2609",
  // Dirección pública de esta web (para los enlaces que manda el bot de WhatsApp). Ej.: "https://usuario.github.io/repositorio". Vacío = el bot no manda enlaces a la web.
  sitio: "",
  // Tienda de Amazon (o enlace general) para compradores fuera de Argentina. Cada producto puede tener su propio "amazon_url" en data/products.js.
  amazon_tienda: "",
  // Zeo se presenta con una burbuja flotante la primera vez que se entra a la web (true/false).
  burbuja: true,
  // Pausa "escribiendo…" en milisegundos (0 = respuesta inmediata).
  demora: 450,

  /* ===== HORARIO COMERCIAL (EDITAR) =====
     dias: 0 = domingo … 6 = sábado. desde/hasta en formato 24 h, en la zona horaria indicada.
     "texto" es lo que lee el cliente: si cambia los números, cambie también el texto. */
  horario: {
    tz: "America/Argentina/Buenos_Aires",
    dias: [1, 2, 3, 4, 5],
    desde: "09:00",
    hasta: "18:00",
    texto: {
      es: "de lunes a viernes de 9 a 18 h (hora de Argentina)",
      en: "Monday to Friday, 9 am to 6 pm (Argentina time, GMT-3)",
      pt: "de segunda a sexta, das 9 às 18 h (horário da Argentina)"
    }
  },

  /* ===== PALABRAS QUE ACTIVAN CADA ACCIÓN (sin tildes, minúsculas; ES + EN + PT) ===== */
  intents: [
    { go: "human", k: ["persona", "asesor", "humano", "agente", "operador", "vendedor", "ejecutivo", "representante", "whatsapp", "llamar", "hablar con", "atencion al cliente", "human", "person", "agent", "advisor", "representative", "call me", "speak to", "talk to", "atendente", "pessoa", "falar com", "humana"] },
    { go: "wholesale", k: ["mayorista", "mayoristas", "distribuidor", "distribuir", "distribuidora", "revender", "reventa", "minorista", "comercio", "pet shop", "veterinaria para vender", "granel", "pallet", "palet", "contenedor", "exportar", "exportacion", "importar", "importador", "cotizacion", "cotizar", "presupuesto", "por mayor", "wholesale", "wholesaler", "distributor", "retailer", "bulk", "container", "import", "export", "quote", "quotation", "reseller", "atacado", "atacadista", "distribuidor", "varejista", "cotacao", "revenda", "a granel"] },
    { go: "buy", k: ["compr", "compra", "quiero comprar", "como compro", "donde compro", "donde puedo comprar", "donde consigo", "conseguir", "pedir", "pedido", "mercado libre", "mercadolibre", "amazon", "adquirir", "buy", "purchase", "where to buy", "order", "comprar", "onde comprar", "mercado livre", "pedido", "adquirir"] },
    { go: "price", k: ["precio", "precios", "cuanto sale", "cuanto cuesta", "cuanto vale", "costo", "valor", "presentaciones", "tamanos", "tamano", "kilos", "kg", "lista de precios", "price", "prices", "cost", "how much", "sizes", "size", "preco", "precos", "quanto custa", "quanto", "tamanhos", "tamanho", "valor"] },
    { go: "hours", k: ["horario", "horarios", "hora de atencion", "atienden", "abierto", "abren", "cuando atienden", "business hours", "opening hours", "open", "hours", "horario de atendimento", "funcionamento", "abrem"] },
    { go: "product", k: ["caracteristicas", "caracteristica", "ventajas", "beneficios", "que tiene", "que ofrece", "contame del producto", "el producto", "sobre el producto", "features", "benefits", "about the product", "the product", "caracteristicas", "vantagens", "beneficios", "o produto", "sobre o produto"] },
    { go: "faq", k: ["preguntas frecuentes", "dudas", "faq", "ayuda", "frequently asked", "questions", "help", "perguntas frequentes", "duvidas", "ajuda"] }
  ],

  /* ===== PREGUNTAS FRECUENTES (solo con lo que dice la web) =====
     k = palabras clave. q = pregunta (botón). a = respuesta. link = botones a páginas de la web.
     En las respuestas: {min} {pct} = descuento por cantidad · {hours} {email} {phones} = datos de arriba. */
  faq: [
    { id: "que-es", menu: true,
      k: ["que es", "zeobent", "trio", "de que esta hecha", "que lleva", "ingredientes", "composicion", "formula", "zeolita", "clinoptilolita", "bentonita", "diatomita", "what is", "ingredients", "made of", "composition", "zeolite", "bentonite", "o que e", "composicao", "ingredientes", "zeolita"],
      q: { es: "¿Qué es y qué lleva?", en: "What is it and what’s inside?", pt: "O que é e o que leva?" },
      a: {
        es: "**Zeobent Cat’s Premium Trio** es una piedra sanitaria hiperaglutinante, libre de polvo e hipoalergénica, con **clinoptilolita (zeolita) y bentonita** en una fórmula exclusiva.\n• La zeolita tiene microcristales que atrapan humedad y amoníaco (capacidad de intercambio catiónico, un proceso mineral natural).\n• La bentonita hiperaglutinante forma bloques firmes.\n• Es una combinación propia de minerales argentinos, desarrollada y procesada en nuestra planta.",
        en: "**Zeobent Cat’s Premium Trio** is a hyper-clumping, dust-free, hypoallergenic cat litter with **clinoptilolite (zeolite) and bentonite** in an exclusive formula.\n• Zeolite has microscopic crystals that trap moisture and ammonia (Cation Exchange Capacity, a natural mineral process).\n• Hyper-clumping bentonite forms firm clumps.\n• It’s our own blend of Argentine minerals, developed and processed at our plant.",
        pt: "A **Zeobent Cat’s Premium Trio** é uma pedra sanitária hiperaglomerante, sem poeira e hipoalergênica, com **clinoptilolita (zeólita) e bentonita** em uma fórmula exclusiva.\n• A zeólita tem microcristais que prendem umidade e amônia (Capacidade de Troca Catiônica, um processo mineral natural).\n• A bentonita hiperaglomerante forma blocos firmes.\n• É uma combinação própria de minerais argentinos, desenvolvida e processada em nossa planta."
      },
      link: [{ h: "producto.html", l: "l_product" }] },

    { id: "olor", menu: true,
      k: ["olor", "olores", "huele", "mal olor", "amoniaco", "apesta", "oler", "smell", "odor", "odour", "ammonia", "stink", "cheiro", "amonia", "fede"],
      q: { es: "¿Cómo elimina el olor?", en: "How does it eliminate odor?", pt: "Como elimina o odor?" },
      a: {
        es: "No lo tapa: **lo elimina**. Funciona en tres pasos: absorbe (la humedad queda retenida en el gránulo), captura (los cristales de zeolita atrapan el amoníaco y su olor) y aglutina (el residuo forma un bloque firme, fácil de retirar).",
        en: "It doesn’t mask it: **it eliminates it**. Three steps: it absorbs (moisture stays inside the granule), captures (zeolite crystals trap ammonia and its odor) and clumps (waste forms a firm clump that’s easy to remove).",
        pt: "Não disfarça: **elimina**. Em três passos: absorve (a umidade fica retida no grânulo), captura (os cristais de zeólita prendem a amônia e seu odor) e aglomera (o resíduo forma um bloco firme, fácil de retirar)."
      } },

    { id: "aglutina",
      k: ["aglutin", "bloque", "bloques", "pala", "terrones", "grumos", "se pega", "clump", "clumping", "scoop", "aglomer", "bloco", "blocos", "pa"],
      q: { es: "¿Aglutina bien?", en: "Does it clump well?", pt: "Aglomera bem?" },
      a: {
        es: "Sí: es **hiperaglutinante**, de máximo poder. Forma bloques firmes y compactos que se retiran fácilmente con la pala y mantienen la bandeja limpia.",
        en: "Yes: it’s **hyper-clumping**, maximum strength. It forms firm, compact clumps that scoop out easily and keep the litter box clean.",
        pt: "Sim: é **hiperaglomerante**, de máximo poder. Forma blocos firmes e compactos que saem fácil com a pá e mantêm a bandeja limpa."
      } },

    { id: "polvo",
      k: ["polvo", "polvillo", "dust", "dusty", "poeira", "limpio", "ambiente limpio", "clean"],
      q: { es: "¿Tiene polvo?", en: "Is it dusty?", pt: "Tem poeira?" },
      a: {
        es: "Es **libre de polvo**: un ambiente más limpio para [[tu|su]] gato y para [[tu|su]] hogar.",
        en: "It’s **dust-free**: a cleaner environment for your cat and your home.",
        pt: "É **sem poeira**: um ambiente mais limpo para seu gato e seu lar."
      } },

    { id: "hipoalergenica", menu: true,
      k: ["alerg", "hipoalerg", "familia", "ninos", "bebes", "allerg", "hypoallergenic", "family", "kids", "children", "alergia", "crianca", "criancas", "familia"],
      q: { es: "¿Es hipoalergénica?", en: "Is it hypoallergenic?", pt: "É hipoalergênica?" },
      a: {
        es: "Sí, es **hipoalergénica**: está pensada para toda la familia. Si alguien en casa tiene una alergia o condición de salud particular, lo mejor es consultar a [[tu|su]] médico o veterinario.",
        en: "Yes, it’s **hypoallergenic**: made for the whole family. If someone at home has a particular allergy or health condition, it’s best to ask your doctor or vet.",
        pt: "Sim, é **hipoalergênica**: pensada para toda a família. Se alguém em casa tem alguma alergia ou condição de saúde específica, o melhor é consultar seu médico ou veterinário."
      },
      link: [{ h: "veterinarios.html", l: "l_vets" }] },

    { id: "natural",
      k: ["natural", "quimico", "quimicos", "aditivo", "aditivos", "perfume", "mineral", "minerales", "chemical", "chemicals", "additives", "quimica", "aditivos", "origem"],
      q: { es: "¿Es natural? ¿Tiene químicos?", en: "Is it natural? Any chemicals?", pt: "É natural? Tem químicos?" },
      a: {
        es: "Es **natural, sin aditivos químicos**: minerales argentinos de máxima calidad (bentonitas, clinoptilolita —zeolitas— y diatomita pura), conforme a los estándares del mercado de Estados Unidos.",
        en: "It’s **natural, with no chemical additives**: top-quality Argentine minerals (bentonites, clinoptilolite —zeolites— and pure diatomite), meeting American market standards.",
        pt: "É **natural, sem aditivos químicos**: minerais argentinos de máxima qualidade (bentonitas, clinoptilolita —zeólitas— e diatomita pura), conforme as normas do mercado americano."
      } },

    { id: "uso", menu: true,
      k: ["como se usa", "como uso", "modo de uso", "instrucciones", "como lo uso", "cuanta", "cuanto pongo", "capa", "centimetros", "how to use", "directions", "instructions", "how much litter", "layer", "como usar", "modo de uso", "camada", "quanto coloco"],
      q: { es: "¿Cómo se usa?", en: "How do I use it?", pt: "Como usar?" },
      a: {
        es: "Tres pasos:\n1. [[Colocá|Coloque]] una capa de **5 cm** en la bandeja.\n2. [[Retirá|Retire]] con la pala el material usado.\n3. [[Reponé|Reponga]] la cantidad que [[retiraste|retiró]].",
        en: "Three steps:\n1. Place a **5 cm** layer in the litter box.\n2. Scoop out the used material.\n3. Replace the amount you removed.",
        pt: "Três passos:\n1. Coloque uma camada de **5 cm** na bandeja.\n2. Retire com a pá o material usado.\n3. Reponha a quantidade retirada."
      } },

    { id: "duracion", menu: true,
      k: ["cada cuanto", "cuanto dura", "duracion", "rinde", "rendimiento", "cambiar", "cambio", "reponer", "recambio", "semanas", "how often", "last", "lasts", "replace", "weeks", "yield", "quanto tempo", "rende", "trocar", "semanas", "reposicao"],
      q: { es: "¿Cada cuánto se cambia?", en: "How often do I replace it?", pt: "De quanto em quanto tempo troco?" },
      a: {
        es: "Es una piedra que **rinde**: [[reponé|reponga]] la litera completa **cada 4 semanas**, y mientras tanto [[retirá|retire]] los bloques y [[reponé|reponga]] lo que [[saques|saque]].",
        en: "It’s long-lasting: replace the litter **every 4 weeks**, and in between scoop out the clumps and top up what you remove.",
        pt: "É uma pedra que **rende**: reponha a pedra **a cada 4 semanas** e, nesse meio tempo, retire os blocos e reponha o que tirar."
      } },

    { id: "reuso",
      k: ["huerta", "huertas", "jardin", "reutilizar", "reuso", "segunda vida", "plantas", "tierra", "compost", "compostaje", "abono", "suelo", "garden", "reuse", "reused", "second life", "orchard", "soil", "composting", "horta", "reutilizar", "segunda vida", "jardim", "compostagem", "solo", "terra"],
      q: { es: "¿Tiene una segunda vida?", en: "Does it have a second life?", pt: "Tem uma segunda vida?" },
      a: {
        es: "Sí, pero con condiciones. Según las instrucciones de la caja, la piedra usada **solo de gatos sanos** (sin ninguna patología), **seca y lavada con agua**, se puede sumar al **compostaje** como reestructurador del suelo y para acelerar el proceso.\n• **No** se aplica sobre plantas en crecimiento.\n• Esa tierra, una vez tratada en el compost, es la que se usa después en huertas y jardines.\nSi el gato tiene alguna patología, no corresponde este uso: [[consultá a tu|consulte a su]] veterinario.",
        en: "Yes, with conditions. According to the instructions on the box, used litter **from healthy cats only** (no health condition), **dried and washed with water**, can be added to **compost** as a soil restructurer and to speed up the process.\n• It is **not** applied to growing plants.\n• Once treated in the compost, that soil is what is later used in orchards and gardens.\nIf the cat has any health condition, this use does not apply: ask your vet.",
        pt: "Sim, mas com condições. Segundo as instruções da caixa, a pedra usada **somente de gatos saudáveis** (sem nenhuma patologia), **seca e lavada com água**, pode entrar na **compostagem** como reestruturador do solo e para acelerar o processo.\n• **Não** é aplicada em plantas em crescimento.\n• Depois de tratada na compostagem, essa terra é a que se usa em hortas e jardins.\nSe o gato tiver alguma patologia, esse uso não se aplica: consulte seu veterinário."
      } },

    { id: "envio", menu: true,
      k: ["envio", "envios", "entrega", "entregan", "domicilio", "flete", "delivery", "shipping", "ship", "frete", "envian", "rosario", "zona de influencia", "gratis", "free"],
      q: { es: "¿Hacen envíos?", en: "Do you ship?", pt: "Vocês enviam?" },
      a: {
        es: "• **Toda la Argentina:** compra por Mercado Libre, válido en todo el país.\n• **Rosario y zona de influencia:** envío particular **gratuito** en el eje urbano (promoción de lanzamiento, Pack Lanzamiento). [[Agregá|Agregue]] el pack al carrito y [[completá tu|complete su]] dirección.\n• **Mayoristas y exterior:** costos y forma de pago se acuerdan según el destino.",
        en: "• **All of Argentina:** buy through Mercado Libre, valid nationwide.\n• **Rosario and surrounding area:** **free** private delivery in the urban area (launch promotion, Launch Pack). Add the pack to your cart and enter your address.\n• **Wholesale and abroad:** costs and payment terms are agreed according to destination.",
        pt: "• **Toda a Argentina:** compra pelo Mercado Livre, válido em todo o país.\n• **Rosario e arredores:** entrega particular **gratuita** na área urbana (promoção de lançamento, Pack Lançamento). Adicione o pack ao carrinho e preencha seu endereço.\n• **Atacado e exterior:** custos e forma de pagamento são combinados conforme o destino."
      },
      link: [{ h: "carrito.html", l: "l_cart" }] },

    { id: "descuento", menu: true,
      k: ["descuento", "descuentos", "oferta", "ofertas", "promo", "promocion", "rebaja", "discount", "discounts", "offer", "offers", "sale", "desconto", "descontos", "oferta", "promocao"],
      q: { es: "¿Hay descuentos u ofertas?", en: "Any discounts or offers?", pt: "Há descontos ou ofertas?" },
      a: {
        es: "Sí: hay una **oferta de lanzamiento** (Pack Lanzamiento 3 × 4 kg) y, desde **{min} unidades** del mismo producto, **{pct}% de descuento** en el carrito. Los precios finales y la disponibilidad se ven en la tienda.",
        en: "Yes: there’s a **launch offer** (Launch Pack 3 × 4 kg) and, from **{min} units** of the same product, **{pct}% off** in the cart. Final prices and availability are shown in the shop.",
        pt: "Sim: há uma **oferta de lançamento** (Pack Lançamento 3 × 4 kg) e, a partir de **{min} unidades** do mesmo produto, **{pct}% de desconto** no carrinho. Preços finais e disponibilidade aparecem na loja."
      },
      link: [{ h: "ofertas.html", l: "l_offers" }] },

    { id: "origen", menu: true,
      k: ["origen", "trazabilidad", "planta", "calidad", "estados unidos", "eeuu", "usa", "normas", "aprobacion", "mercosur", "materia prima", "argentina", "traceab", "origin", "plant", "quality", "united states", "standards", "approved", "rastreab", "rastreabilidade", "qualidade", "estados unidos", "normas"],
      q: { es: "¿Qué respaldo y trazabilidad tiene?", en: "What backing and traceability does it have?", pt: "Que respaldo e rastreabilidade tem?" },
      a: {
        es: "• **Materias primas propias** en la fórmula.\n• **Planta estratégicamente ubicada**, para desarrollar y procesar con la máxima calidad.\n• Producida conforme a **normas del mercado de Estados Unidos**.\n• **Misma calidad en Mercosur y Estados Unidos** (lanzamiento simultáneo).\n• Con **trazabilidad**.",
        en: "• **Our own raw materials** in the formula.\n• **Strategically located plant**, to develop and process at the highest quality.\n• Produced to **United States market standards**.\n• **Same quality in Mercosur and the United States** (simultaneous launch).\n• **Traceable**.",
        pt: "• **Matérias-primas próprias** na fórmula.\n• **Planta estrategicamente localizada**, para desenvolver e processar com a máxima qualidade.\n• Produzida conforme as **normas do mercado dos Estados Unidos**.\n• **Mesma qualidade no Mercosul e nos Estados Unidos** (lançamento simultâneo).\n• Com **rastreabilidade**."
      },
      link: [{ h: "producto.html", l: "l_product" }] },

    { id: "ecosistema",
      k: ["comedero", "comedor", "feeder", "wifi", "wi-fi", "camara", "remera", "remeras", "camiseta", "muneco", "munecos", "merch", "merchandising", "lista de espera", "cama veterinaria", "absorbente", "absorbentes", "industrial", "t-shirt", "doll", "dolls", "waitlist", "bedding", "absorbent", "alimentador", "boneco", "bonecos", "lista de espera", "camas"],
      q: { es: "¿Qué más van a lanzar?", en: "What else is coming?", pt: "O que mais vai chegar?" },
      a: {
        es: "Zeobent Cat’s es más que una piedra sanitaria:\n• **Comedero Wi-Fi** con cámara y sensores (próximamente).\n• **Remeras** con el logo y **muñecos coleccionables** de nuestro gatito (próximamente).\n• **Camas veterinarias y agrícolas**, desarrolladas y procesadas en nuestra planta.\n• **Absorbentes industriales**, de reconocimiento internacional, comercializados en Estados Unidos.\n[[Podés anotarte|Puede anotarse]] en la lista de espera desde el formulario de pedidos.",
        en: "Zeobent Cat’s is more than cat litter:\n• **Wi-Fi feeder** with camera and sensors (coming soon).\n• **T-shirts** with the logo and **collectible dolls** of our kitten (coming soon).\n• **Veterinary and agricultural bedding**, developed and processed at our plant.\n• **Industrial absorbents**, internationally recognized, sold in the United States.\nYou can join the waitlist from the orders form.",
        pt: "A Zeobent Cat’s é mais que pedra sanitária:\n• **Alimentador Wi-Fi** com câmera e sensores (em breve).\n• **Camisetas** com o logo e **bonecos colecionáveis** do nosso gatinho (em breve).\n• **Camas veterinárias e agrícolas**, desenvolvidas e processadas em nossa planta.\n• **Absorventes industriais**, de reconhecimento internacional, comercializados nos Estados Unidos.\nVocê pode entrar na lista de espera pelo formulário de pedidos."
      },
      link: [{ h: "pedidos.html?producto=espera", l: "l_waitlist" }] },

    { id: "veterinarios",
      k: ["veterinario", "veterinaria", "veterinarios", "clinica", "vet", "vets", "veterinarian", "clinic", "veterinaria", "clinicas", "veterinario"],
      q: { es: "Soy veterinaria/o o clínica", en: "I’m a vet or clinic", pt: "Sou veterinário(a) ou clínica" },
      a: {
        es: "Tenemos una sección para veterinarias y clínicas, con novedades que actualizamos cada semana y enlaces útiles para el cuidado de gatos y otras mascotas. Si [[querés|quiere]] ofrecer o revender el producto, puedo [[pasarte|pasarle]] con una persona para cotizar.",
        en: "We have a section for vets and clinics, with weekly news and useful links for the care of cats and other pets. If you’d like to offer or resell the product, I can connect you with a person for a quote.",
        pt: "Temos uma seção para veterinárias e clínicas, com novidades semanais e links úteis para o cuidado de gatos e outros pets. Se quiser oferecer ou revender o produto, posso passá-lo a uma pessoa para cotar."
      },
      link: [{ h: "veterinarios.html", l: "l_vets" }] },

    { id: "comunidad",
      k: ["comunidad", "foto", "fotos", "historia", "historias", "opinion", "opiniones", "resena", "reseñas", "mi gato", "mascota", "community", "story", "stories", "review", "reviews", "pet", "my cat", "comunidade", "historia", "opiniao", "opinioes", "meu gato"],
      q: { es: "Quiero compartir la foto de mi gato", en: "I want to share my cat’s photo", pt: "Quero compartilhar a foto do meu gato" },
      a: {
        es: "¡Me encantaría conocerlo! 🐾 En la **Comunidad Zeobent** [[podés|puede]] enviar la foto de [[tu|su]] mascota, [[tu|su]] historia y [[tu|su]] opinión. Cada publicación se revisa y se aprueba antes de mostrarse.",
        en: "I’d love to meet them! 🐾 In the **Zeobent community** you can send your pet’s photo, story and review. Every post is reviewed and approved before it’s shown.",
        pt: "Adoraria conhecê-lo! 🐾 Na **Comunidade Zeobent** você pode enviar a foto do seu pet, sua história e sua opinião. Cada publicação é revisada e aprovada antes de ser exibida."
      },
      link: [{ h: "comunidad.html", l: "l_comm" }] },

    { id: "contacto",
      k: ["contacto", "telefono", "mail", "email", "correo", "direccion", "donde estan", "ubicacion", "numero", "whatsapp", "contact", "phone", "address", "where are you", "location", "number", "contato", "telefone", "endereco", "onde ficam"],
      q: { es: "Datos de contacto", en: "Contact details", pt: "Dados de contato" },
      a: {
        es: "• WhatsApp Business Argentina: {wa_ar}\n• WhatsApp Business Estados Unidos: {wa_us}\n• Teléfono y mensajes comunes: {phones}\n• Email: {email}\n• Web: {web}\nAtención del equipo: {hours}.",
        en: "• WhatsApp Business Argentina: {wa_ar}\n• WhatsApp Business United States: {wa_us}\n• Phone and regular messages: {phones}\n• Email: {email}\n• Web: {web}\nTeam hours: {hours}.",
        pt: "• WhatsApp Business Argentina: {wa_ar}\n• WhatsApp Business Estados Unidos: {wa_us}\n• Telefone e mensagens comuns: {phones}\n• E-mail: {email}\n• Site: {web}\nAtendimento da equipe: {hours}."
      } },

    { id: "salud",
      k: ["enfermo", "enferma", "salud", "diarrea", "vomita", "cachorro", "gatito bebe", "bebe gato", "embarazada", "castrado", "cirugia", "sick", "ill", "health", "kitten", "pregnant", "surgery", "doente", "saude", "filhote", "gestante", "cirurgia"],
      q: { es: "Mi gato tiene un problema de salud", en: "My cat has a health problem", pt: "Meu gato tem um problema de saúde" },
      a: {
        es: "Sobre la salud de [[tu|su]] gato (cachorros, cirugías, enfermedades, etc.) no puedo [[darte|darle]] indicaciones: lo más seguro es consultar a [[tu|su]] veterinario. Si es veterinario/a, en la sección de veterinarios hay información para clínicas.",
        en: "I can’t give advice about your cat’s health (kittens, surgery, illness, etc.): the safest thing is to ask your vet. If you’re a vet, the vets section has information for clinics.",
        pt: "Sobre a saúde do seu gato (filhotes, cirurgias, doenças etc.) não posso dar orientações: o mais seguro é consultar seu veterinário. Se você é veterinário(a), a seção de veterinários tem informações para clínicas."
      },
      link: [{ h: "veterinarios.html", l: "l_vets" }] }
  ],

  /* ===== TEXTOS DE LA INTERFAZ Y DE LOS FLUJOS ===== */
  ui: {
    es: {
      title: "Zeo · gatito asistente",
      age_ask: "Antes de empezar, una consulta rápida: ¿en qué rango de edad se encuentra? Así adapto la charla y cuido a los menores de edad.",
      b_age_minor: "Menos de 18 años", b_age_adult: "18 a 50 años", b_age_senior: "Más de 50 años",
      minor_msg: "¡Gracias por avisar! 🐾 Para comprar, dejar datos o hablar con el equipo tiene que hacerlo una persona mayor de 18 años: pedile a un adulto que se comunique con nosotros. Mientras tanto, podés conocer el producto y ver las preguntas frecuentes.",
      minor_block: "Eso lo tiene que hacer una persona mayor de 18 años. 🐾 Pedile a un adulto que se comunique con nosotros.",
      safe_note: "🔒 [[Tus datos se usan|Sus datos se usan]] solo para [[atenderte|atenderlo]] y, si [[lo autorizás|lo autoriza]], para enviar novedades. [[Podés|Puede]] pedir que los borremos [[cuando quieras|cuando quiera]] escribiendo *borrar mis datos*. Zeo nunca [[te|le]] pide claves, tarjetas ni documentos: [[no los compartas|no los comparta]] por este chat.",
      privacy_deleted: "Listo: borré [[tus|sus]] datos de este chat y de la lista de contactos. Si [[querés|quiere]] volver a empezar, [[escribí|escriba]] *hola*.",
      handoff_note: "Ya [[te|lo]] pasé con el equipo. 🐾 Mientras tanto, [[podés|puede]] escribir *menu* para volver al asistente.",
      media_unsupported: "Por ahora solo leo mensajes de texto. [[Elegí|Elija]] una opción:",
      paso: "Paso {i} de {n}",
      c_p_ar: "Argentina", c_p_us: "Estados Unidos", c_p_br: "Brasil",
      c_vol1: "Menos de 1 pallet", c_vol2: "1 a 5 pallets", c_vol3: "1 contenedor", c_vol4: "Más de 1 contenedor",
      r_prod: "El producto", r_price: "Precios y tamaños", r_buy: "Quiero comprar", r_whole: "Soy mayorista", r_faq: "Preguntas frecuentes", r_human: "Hablar con una persona",
      b_opts: "Ver opciones", b_prices: "Precios", b_buy: "Quiero comprar", b_faq: "Preguntas", b_menu: "Menú", b_human: "Hablar con alguien", b_lead: "Dejar mis datos",
      b_ros: "Rosario y zona", b_ar: "Resto de Argentina", b_us: "Estados Unidos", b_other: "Otro país",
      b_skip: "Omitir", b_none: "Ninguna", b_other_name: "Otro nombre", b_noemail: "Prefiero no dar", b_consent_all: "Sí, con novedades", b_consent_reply: "Solo para responder", b_consent_no: "No, gracias",
      q_email: "¿[[Querés|Quiere]] dejar un email? Es opcional: [[ya tengo tu|ya tengo su]] número de WhatsApp.",
      q_pick_name: "¿[[Te|Lo]] llamo {n}? [[Tocá|Toque]] el botón o [[escribí tu|escriba su]] nombre.",
      pick_prod: "[[Elegí|Elija]] una presentación:", pick_btn: "Ver presentaciones", pick_role_btn: "Ver perfiles", pick_vol_btn: "Ver cantidades",
      lang_ask: "🐾 Choose your language · Elegí tu idioma · Escolha o idioma",
      link_line: "{label}: {url}",
      zone_note_ar: "",
 sub: "Zeobent Cat’s Premium", online: "En línea 🐾",
      bubble: "¡Hola! Soy Zeo 🐾 ¿[[Te ayudo|Le ayudo]] con la piedra sanitaria?",
      aria_open: "Abrir el chat con Zeo, el gatito asistente", aria_close: "Cerrar el chat", aria_log: "Conversación con Zeo",
      placeholder: "[[Escribí tu|Escriba su]] consulta…", send: "Enviar", wa: "WhatsApp", wa_title: "Hablar por WhatsApp Business",
      disclaimer: "Zeo responde con la información de esta web. Precios, stock y envío finales se confirman en Mercado Libre, Amazon o con el equipo.",
      wa_generic: "Hola, quiero información sobre Zeobent Cat’s Premium.",
      hello: "¡Miau! 🐾 Soy **Zeo**, el gatito de Zeobent Cat’s. [[Te cuento|Le cuento]] las características de nuestra piedra sanitaria, resuelvo [[tus|sus]] dudas y [[te guío|lo guío]] para comprar.",
      hello_back: "¡Hola de nuevo, {n}! 🐾 Qué bueno [[verte|verlo]] por acá.",
      ask_menu: "¿Qué [[te|le]] interesa?",
      m_prod: "🐾 El producto", m_price: "💰 Precios y presentaciones", m_buy: "🛒 Quiero comprar", m_whole: "📦 Soy mayorista / distribuidor", m_faq: "❓ Preguntas frecuentes", m_human: "💬 Hablar con una persona", m_menu: "🏠 Menú principal",
      prod_intro: "**Zeobent Cat’s Premium Trio** es una piedra sanitaria **hiperaglutinante, libre de polvo e hipoalergénica**, con clinoptilolita (zeolita) y bentonita en una fórmula exclusiva.\n• **Aglutina:** bloques firmes que se retiran fácil con la pala.\n• **Captura el olor:** atrapa el amoníaco, no lo tapa.\n• **Natural,** sin aditivos químicos.\n• **Regula la humedad.**\n• **Rinde:** [[reponé|reponga]] la litera cada 4 semanas.\n• **Segunda vida:** la piedra usada de gatos sanos, seca y lavada, sirve en el compostaje como reestructurador del suelo.",
      prod_next: "¿Qué más [[querés|quiere]] saber?",
      faq_intro: "Estas son las dudas más comunes. [[Tocá una o escribime la tuya|Toque una o escríbame la suya]]:",
      price_intro: "Estas son nuestras presentaciones y precios (en pesos argentinos, para compras en Argentina):",
      price_ask: "Consultar precio", price_free: "envío gratis en Rosario y zona", price_promo: "precio promocional", price_offer: "oferta de lanzamiento",
      price_disc: "Desde {min} unidades del mismo producto: {pct}% de descuento.",
      price_abroad: "Para otros países los precios y formatos se acuerdan según el destino (en Estados Unidos, por ejemplo, la presentación es la caja de 18.5 lb).",
      buy_ask: "Para [[guiarte|guiarlo]] bien, ¿desde dónde [[comprás|compra]]?", c_ros: "Rosario y zona", c_ar: "Resto de Argentina", c_us: "Estados Unidos", c_other: "Otro país",
      buy_ros: "¡Genial! En Rosario y zona de influencia [[tenés|tiene]] **envío particular gratuito** con el Pack Lanzamiento: [[agregalo|agréguelo]] al carrito y [[completá tu|complete su]] dirección. En el resto de las presentaciones, [[comprá|compre]] por Mercado Libre o [[coordiná|coordine]] el envío.",
      buy_ar: "Perfecto: en toda la Argentina compra por **Mercado Libre**. [[Elegí tu|Elija su]] presentación:",
      buy_us: "Para Estados Unidos la compra es por **Amazon**. La presentación para [[tu|su]] mercado es la **caja de 18.5 lb**:",
      buy_other: "Fuera de Argentina la compra es por **Amazon** (la disponibilidad puede variar según el país). Estas son las presentaciones:",
      buy_none: "Por ahora no hay productos con compra online habilitada. Puedo dejar [[tus|sus]] datos para [[avisarte|avisarle]] apenas esté, o [[pasarte|pasarlo]] con una persona.",
      btn_ml: "Comprar en Mercado Libre", btn_ml_soon: "Mercado Libre: próximamente", btn_amz: "Comprar en Amazon", btn_amz_soon: "Amazon: próximamente",
      btn_add: "Agregar al carrito", btn_cart: "Ir al carrito", btn_quote: "Pedir cotización", btn_wa: "Continuar por WhatsApp", btn_mail: "Enviar por correo", btn_form: "Formulario de pedidos",
      added: "Agregado al carrito ✅", lk_price_abroad: "Precio en Amazon",
      buy_after: "¿[[Querés|Quiere]] que anote [[tus|sus]] datos para [[avisarte|avisarle]] de novedades, ofertas y stock?", c_yes_lead: "Sí, anótenme", c_no_lead: "Ahora no",
      c_cancel: "✖ Cancelar",
      q_name: "¿Cómo [[te llamás|se llama]]?", q_company: "¿Cuál es [[tu|su]] empresa o comercio? ([[podés|puede]] omitirlo)", q_country: "¿Desde qué país [[nos escribís|nos escribe]]? [[Elegí uno o escribilo|Elija uno o escríbalo]].", q_role: "¿Cuál es [[tu|su]] perfil?",
      c_role_retail: "Minorista (comercio)", c_role_whole: "Mayorista / distribuidor", c_role_imp: "Importador (exterior)", c_role_vet: "Veterinaria / clínica", c_skip: "Omitir",
      q_interest: "¿Qué presentación [[te|le]] interesa?", c_unsure: "Todavía no sé",
      q_doubts: "¿[[Tenés|Tiene]] alguna duda o algo que [[quieras|quiera]] saber antes de comprar? [[Escribila|Escríbala]] o [[tocá|toque]] el botón.", c_nodoubts: "Ninguna por ahora",
      q_product: "¿Qué presentación [[te|le]] interesa cotizar?", q_volume: "¿Qué cantidad [[necesitás|necesita]] por mes? [[Elegí una opción o escribila|Elija una opción o escríbala]].",
      q_contact: "¿Por qué medio [[te|lo]] contactamos? [[Escribí tu|Escriba su]] email o [[tu|su]] número con WhatsApp.", c_nocontact: "Prefiero no dejarlo",
      q_contact_req: "Para [[enviarte|enviarle]] la cotización necesito un email o un número de teléfono con WhatsApp.",
      q_query: "[[Contame|Cuénteme]] brevemente qué [[necesitás|necesita]] y se lo paso al equipo.",
      q_consent: "¿[[Autorizás|Autoriza]] al equipo de Zeobent Cat’s a [[contactarte|contactarlo]] con estos datos?", c_consent_all: "Sí, y recibir novedades y ofertas", c_consent_reply: "Sí, solo para responderme", c_consent_no: "No, gracias",
      err_name: "[[Disculpá|Disculpe]], necesito un nombre para dirigirme a [[vos|usted]]. ¿Cómo [[te llamás|se llama]]?",
      err_contact: "No logro reconocer ese dato. [[Escribí|Escriba]] un email (nombre@dominio.com) o un número de teléfono con código de país.",
      summary_title: "Este es el resumen que pasaré al equipo:",
      sent_ok: "Listo ✅ Ya pasé [[tus|sus]] datos al equipo.",
      sent_wa: "Para que [[tu|su]] consulta llegue al equipo, [[enviala|envíela]] por WhatsApp con el botón de abajo (se abre con el mensaje ya redactado) o por correo.",
      sent_nowa: "Para que [[tu|su]] consulta llegue al equipo, [[enviala|envíela]] por correo con el botón de abajo.",
      done_retail: "¡Gracias, {n}! 🐾 Quedó registrado [[tu|su]] interés.",
      done_whole: "¡Gracias, {n}! [[Te derivo|Lo derivo]] a un asesor comercial que [[te|lo]] contactará **lo antes posible dentro del horario comercial** ({hours}).",
      done_human: "¡Gracias, {n}! Un asesor [[te|lo]] atenderá **lo antes posible dentro del horario comercial** ({hours}).",
      open_now: "Ahora estamos dentro del horario de atención, así que por WhatsApp [[podés|puede]] tener respuesta enseguida.",
      closed_now: "Ahora estamos fuera del horario de atención: [[te|le]] respondemos apenas abramos.",
      fidel: "Mientras tanto, [[mirá|mire]] las ofertas y [[compartí|comparta]] la foto de [[tu|su]] gato en la comunidad: me encanta conocer a las mascotas. 🐾",
      nomatch: "Eso no lo tengo confirmado y prefiero no inventar. 🐾 ¿[[Querés que te lo|Quiere que se lo]] consulte a una persona del equipo?",
      thanks: "¡De nada! 🐾 Acá estoy para lo que [[necesites|necesite]].",
      greet: "¡Miau! 🐾 ¿En qué [[te|lo]] puedo ayudar?",
      hours_line: "Nuestro equipo atiende {hours}.",
      cancelled: "Listo, lo dejamos acá. Cuando [[quieras|quiera]] retomamos. 🐾",
      human_intro: "Con gusto [[te|lo]] conecto con una persona del equipo.",
      whole_intro: "¡Excelente! Para mayoristas, distribuidores y comercios armamos una cotización a medida (costos y forma de pago se acuerdan según el destino). [[Te hago|Le hago]] unas preguntas rápidas.",
      lead_intro: "¡Perfecto! [[Te hago|Le hago]] unas preguntas rápidas.",
      l_product: "Ver todas las características", l_offers: "Ver ofertas", l_shop: "Ir a la tienda", l_comm: "Comunidad Zeobent", l_vets: "Sección veterinarios", l_cart: "Ir al carrito", l_waitlist: "Lista de espera", l_orders: "Formulario de pedidos",
      wm_hello: "Hola, soy {n}. Les escribo desde la web de Zeobent Cat’s (chat con Zeo).",
      wm_type: "Perfil", wm_company: "Empresa", wm_country: "País/ciudad", wm_prod: "Producto", wm_vol: "Cantidad/frecuencia", wm_query: "Consulta", wm_contact: "Contacto", wm_lang: "Idioma del cliente", wm_news: "Acepta novedades y ofertas", wm_yes: "Sí", wm_no: "No", wm_ask: "Pedido"
    },
    en: {
      title: "Zeo · kitten assistant",
      age_ask: "Before we start, a quick question: which age group are you in? It helps me adapt the chat and look after minors.",
      b_age_minor: "Under 18", b_age_adult: "18 to 50", b_age_senior: "Over 50",
      minor_msg: "Thanks for letting me know! 🐾 To buy, share your details or talk to the team, an adult over 18 has to do it: please ask an adult to contact us. Meanwhile you can learn about the product and read the FAQ.",
      minor_block: "That has to be done by an adult over 18. 🐾 Please ask an adult to contact us.",
      safe_note: "🔒 Your details are used only to assist you and, if you allow it, to send news. You can ask us to delete them any time by writing *delete my data*. Zeo never asks for passwords, cards or ID documents: don’t share them in this chat.",
      privacy_deleted: "Done: I deleted your data from this chat and from the contact list. To start over, write *hello*.",
      handoff_note: "I’ve passed you to the team. 🐾 Meanwhile, you can write *menu* to go back to the assistant.",
      media_unsupported: "For now I only read text messages. Pick an option:",
      paso: "Step {i} of {n}",
      c_p_ar: "Argentina", c_p_us: "United States", c_p_br: "Brazil",
      c_vol1: "Less than 1 pallet", c_vol2: "1 to 5 pallets", c_vol3: "1 container", c_vol4: "More than 1 container",
      r_prod: "The product", r_price: "Prices and sizes", r_buy: "I want to buy", r_whole: "I’m a wholesaler", r_faq: "FAQ", r_human: "Talk to a person",
      b_opts: "See options", b_prices: "Prices", b_buy: "I want to buy", b_faq: "FAQ", b_menu: "Menu", b_human: "Talk to someone", b_lead: "Leave my details",
      b_ros: "Rosario and area", b_ar: "Rest of Argentina", b_us: "United States", b_other: "Other country",
      b_skip: "Skip", b_none: "None", b_other_name: "Another name", b_noemail: "Rather not say", b_consent_all: "Yes, with news", b_consent_reply: "Only to reply", b_consent_no: "No, thanks",
      q_email: "Want to leave an email? It’s optional: I already have your WhatsApp number.",
      q_pick_name: "Shall I call you {n}? Tap the button or type your name.",
      pick_prod: "Pick a size:", pick_btn: "See sizes", pick_role_btn: "See profiles", pick_vol_btn: "See quantities",
      lang_ask: "🐾 Choose your language · Elegí tu idioma · Escolha o idioma",
      link_line: "{label}: {url}", zone_note_ar: "",
 sub: "Zeobent Cat’s Premium", online: "Online 🐾",
      bubble: "Hi! I’m Zeo 🐾 Can I help you with cat litter?",
      aria_open: "Open the chat with Zeo, the kitten assistant", aria_close: "Close the chat", aria_log: "Conversation with Zeo",
      placeholder: "Type your question…", send: "Send", wa: "WhatsApp", wa_title: "Talk on WhatsApp Business",
      disclaimer: "Zeo answers with the information on this website. Final prices, stock and shipping are confirmed on Mercado Libre, Amazon or with the team.",
      wa_generic: "Hello, I’d like information about Zeobent Cat’s Premium.",
      hello: "Meow! 🐾 I’m **Zeo**, the Zeobent Cat’s kitten. I’ll tell you about our cat litter, answer your questions and guide you to buy.",
      hello_back: "Welcome back, {n}! 🐾 Great to see you here.",
      ask_menu: "What are you interested in?",
      m_prod: "🐾 The product", m_price: "💰 Prices and sizes", m_buy: "🛒 I want to buy", m_whole: "📦 I’m a wholesaler / distributor", m_faq: "❓ FAQ", m_human: "💬 Talk to a person", m_menu: "🏠 Main menu",
      prod_intro: "**Zeobent Cat’s Premium Trio** is a **hyper-clumping, dust-free, hypoallergenic** cat litter, with clinoptilolite (zeolite) and bentonite in an exclusive formula.\n• **Clumps:** firm clumps that scoop out easily.\n• **Captures odor:** traps ammonia, doesn’t mask it.\n• **Natural,** no chemical additives.\n• **Regulates moisture.**\n• **Long-lasting:** replace the litter every 4 weeks.\n• **Second life:** used litter from healthy cats, dried and washed, works in compost as a soil restructurer.",
      prod_next: "What else would you like to know?",
      faq_intro: "Here are the most common questions. Tap one or type yours:",
      price_intro: "Here are our sizes and prices (in Argentine pesos, for purchases in Argentina):",
      price_ask: "Ask for price", price_free: "free delivery in Rosario and area", price_promo: "promotional price", price_offer: "launch offer",
      price_disc: "From {min} units of the same product: {pct}% off.",
      price_abroad: "For other countries prices and formats are agreed according to destination (in the United States, for example, the format is the 18.5 lb box).",
      buy_ask: "To guide you properly, where are you buying from?", c_ros: "Rosario and area", c_ar: "Rest of Argentina", c_us: "United States", c_other: "Other country",
      buy_ros: "Great! In Rosario and surrounding area you get **free private delivery** with the Launch Pack: add it to the cart and enter your address. For the other sizes, buy on Mercado Libre or arrange delivery.",
      buy_ar: "Perfect: across Argentina you buy through **Mercado Libre**. Pick your size:",
      buy_us: "For the United States you buy through **Amazon**. The format for your market is the **18.5 lb box**:",
      buy_other: "Outside Argentina you buy through **Amazon** (availability may vary by country). Here are the sizes:",
      buy_none: "Right now no products have online purchase enabled. I can take your details to let you know as soon as it’s ready, or connect you with a person.",
      btn_ml: "Buy on Mercado Libre", btn_ml_soon: "Mercado Libre: coming soon", btn_amz: "Buy on Amazon", btn_amz_soon: "Amazon: coming soon",
      btn_add: "Add to cart", btn_cart: "Go to cart", btn_quote: "Request a quote", btn_wa: "Continue on WhatsApp", btn_mail: "Send by email", btn_form: "Orders form",
      added: "Added to cart ✅", lk_price_abroad: "Price on Amazon",
      buy_after: "Would you like me to take your details so we can tell you about news, offers and stock?", c_yes_lead: "Yes, please", c_no_lead: "Not now",
      c_cancel: "✖ Cancel",
      q_name: "What’s your name?", q_company: "What’s your company or shop? (you can skip this)", q_country: "Which country and city are you writing from?", q_role: "What best describes you?",
      c_role_retail: "Retailer (shop)", c_role_whole: "Wholesaler / distributor", c_role_imp: "Importer (abroad)", c_role_vet: "Vet / clinic", c_skip: "Skip",
      q_interest: "Which size are you interested in?", c_unsure: "I don’t know yet",
      q_doubts: "Any question or doubt before buying?", c_nodoubts: "None for now",
      q_product: "Which size would you like a quote for?", q_volume: "What quantity do you need and how often? (for example: pallets or tonnes per month)",
      q_contact: "How can we reach you? Type your email or your WhatsApp number.", c_nocontact: "I’d rather not say",
      q_contact_req: "To send you the quote I need an email or a phone number with WhatsApp.",
      q_query: "Briefly tell me what you need and I’ll pass it to the team.",
      q_consent: "Do you authorize the Zeobent Cat’s team to contact you with these details?", c_consent_all: "Yes, and receive news and offers", c_consent_reply: "Yes, only to reply to me", c_consent_no: "No, thanks",
      err_name: "Sorry, I need a name to address you. What’s your name?",
      err_contact: "I can’t recognize that. Please type an email (name@domain.com) or a phone number with country code.",
      summary_title: "This is the summary I’ll pass to the team:",
      sent_ok: "Done ✅ I’ve passed your details to the team.",
      sent_wa: "To get your request to the team, send it on WhatsApp with the button below (it opens with the message already written) or by email.",
      sent_nowa: "To get your request to the team, send it by email with the button below.",
      done_retail: "Thank you, {n}! 🐾 Your interest has been noted.",
      done_whole: "Thank you, {n}! I’m handing you over to a sales advisor who will contact you **as soon as possible within business hours** ({hours}).",
      done_human: "Thank you, {n}! An advisor will assist you **as soon as possible within business hours** ({hours}).",
      open_now: "We’re within business hours right now, so on WhatsApp you can get an answer quickly.",
      closed_now: "We’re outside business hours right now: we’ll reply as soon as we open.",
      fidel: "Meanwhile, check the offers and share your cat’s photo in the community: I love meeting pets. 🐾",
      nomatch: "I don’t have that confirmed and I’d rather not make it up. 🐾 Shall I ask someone on the team?",
      thanks: "You’re welcome! 🐾 I’m here whenever you need me.",
      greet: "Meow! 🐾 How can I help?",
      hours_line: "Our team is available {hours}.",
      cancelled: "Alright, let’s leave it here. We can pick it up whenever you like. 🐾",
      human_intro: "Happy to connect you with someone on the team.",
      whole_intro: "Excellent! For wholesalers, distributors and shops we prepare a tailored quote (costs and payment terms are agreed according to destination). A few quick questions.",
      lead_intro: "Perfect! A few quick questions.",
      l_product: "See all features", l_offers: "See offers", l_shop: "Go to the shop", l_comm: "Zeobent community", l_vets: "Vets section", l_cart: "Go to cart", l_waitlist: "Waitlist", l_orders: "Orders form",
      wm_hello: "Hello, I’m {n}. I’m writing from the Zeobent Cat’s website (chat with Zeo).",
      wm_type: "Profile", wm_company: "Company", wm_country: "Country/city", wm_prod: "Product", wm_vol: "Quantity/frequency", wm_query: "Request", wm_contact: "Contact", wm_lang: "Customer language", wm_news: "Accepts news and offers", wm_yes: "Yes", wm_no: "No", wm_ask: "Request"
    },
    pt: {
      title: "Zeo · gatinho assistente",
      age_ask: "Antes de começar, uma pergunta rápida: em qual faixa de idade você está? Assim adapto a conversa e cuido dos menores de idade.",
      b_age_minor: "Menos de 18", b_age_adult: "18 a 50 anos", b_age_senior: "Mais de 50 anos",
      minor_msg: "Obrigado por avisar! 🐾 Para comprar, deixar dados ou falar com a equipe, é preciso que uma pessoa maior de 18 anos faça isso: peça a um adulto que entre em contato conosco. Enquanto isso, você pode conhecer o produto e ver as perguntas frequentes.",
      minor_block: "Isso precisa ser feito por uma pessoa maior de 18 anos. 🐾 Peça a um adulto que entre em contato conosco.",
      safe_note: "🔒 Seus dados são usados somente para atender você e, se autorizar, para enviar novidades. Você pode pedir que os apaguemos quando quiser escrevendo *apagar meus dados*. O Zeo nunca pede senhas, cartões nem documentos: não os compartilhe neste chat.",
      privacy_deleted: "Pronto: apaguei seus dados deste chat e da lista de contatos. Para recomeçar, escreva *olá*.",
      handoff_note: "Já passei você para a equipe. 🐾 Enquanto isso, você pode escrever *menu* para voltar ao assistente.",
      media_unsupported: "Por enquanto só leio mensagens de texto. Escolha uma opção:",
      paso: "Passo {i} de {n}",
      c_p_ar: "Argentina", c_p_us: "Estados Unidos", c_p_br: "Brasil",
      c_vol1: "Menos de 1 pallet", c_vol2: "1 a 5 pallets", c_vol3: "1 contêiner", c_vol4: "Mais de 1 contêiner",
      r_prod: "O produto", r_price: "Preços e tamanhos", r_buy: "Quero comprar", r_whole: "Sou atacadista", r_faq: "Perguntas frequentes", r_human: "Falar com uma pessoa",
      b_opts: "Ver opções", b_prices: "Preços", b_buy: "Quero comprar", b_faq: "Perguntas", b_menu: "Menu", b_human: "Falar com alguém", b_lead: "Deixar meus dados",
      b_ros: "Rosario e arredores", b_ar: "Resto da Argentina", b_us: "Estados Unidos", b_other: "Outro país",
      b_skip: "Pular", b_none: "Nenhuma", b_other_name: "Outro nome", b_noemail: "Prefiro não dar", b_consent_all: "Sim, com novidades", b_consent_reply: "Só para responder", b_consent_no: "Não, obrigado",
      q_email: "Quer deixar um e-mail? É opcional: já tenho seu número de WhatsApp.",
      q_pick_name: "Posso chamar você de {n}? Toque no botão ou escreva seu nome.",
      pick_prod: "Escolha um tamanho:", pick_btn: "Ver tamanhos", pick_role_btn: "Ver perfis", pick_vol_btn: "Ver quantidades",
      lang_ask: "🐾 Choose your language · Elegí tu idioma · Escolha o idioma",
      link_line: "{label}: {url}", zone_note_ar: "",
 sub: "Zeobent Cat’s Premium", online: "Online 🐾",
      bubble: "Oi! Sou o Zeo 🐾 Posso ajudar com a pedra sanitária?",
      aria_open: "Abrir o chat com o Zeo, o gatinho assistente", aria_close: "Fechar o chat", aria_log: "Conversa com o Zeo",
      placeholder: "Escreva sua dúvida…", send: "Enviar", wa: "WhatsApp", wa_title: "Falar pelo WhatsApp Business",
      disclaimer: "O Zeo responde com as informações deste site. Preços, estoque e frete finais são confirmados no Mercado Livre, na Amazon ou com a equipe.",
      wa_generic: "Olá, quero informações sobre a Zeobent Cat’s Premium.",
      hello: "Miau! 🐾 Sou o **Zeo**, o gatinho da Zeobent Cat’s. Conto as características da nossa pedra sanitária, tiro suas dúvidas e guio você na compra.",
      hello_back: "Olá de novo, {n}! 🐾 Que bom ver você por aqui.",
      ask_menu: "O que você procura?",
      m_prod: "🐾 O produto", m_price: "💰 Preços e tamanhos", m_buy: "🛒 Quero comprar", m_whole: "📦 Sou atacadista / distribuidor", m_faq: "❓ Perguntas frequentes", m_human: "💬 Falar com uma pessoa", m_menu: "🏠 Menu principal",
      prod_intro: "A **Zeobent Cat’s Premium Trio** é uma pedra sanitária **hiperaglomerante, sem poeira e hipoalergênica**, com clinoptilolita (zeólita) e bentonita em uma fórmula exclusiva.\n• **Aglomera:** blocos firmes que saem fácil com a pá.\n• **Prende o odor:** captura a amônia, não a disfarça.\n• **Natural,** sem aditivos químicos.\n• **Regula a umidade.**\n• **Rende:** reponha a pedra a cada 4 semanas.\n• **Segunda vida:** a pedra usada de gatos saudáveis, seca e lavada, serve na compostagem como reestruturador do solo.",
      prod_next: "O que mais você quer saber?",
      faq_intro: "Estas são as dúvidas mais comuns. Toque em uma ou escreva a sua:",
      price_intro: "Estes são nossos tamanhos e preços (em pesos argentinos, para compras na Argentina):",
      price_ask: "Consultar preço", price_free: "entrega grátis em Rosario e arredores", price_promo: "preço promocional", price_offer: "oferta de lançamento",
      price_disc: "A partir de {min} unidades do mesmo produto: {pct}% de desconto.",
      price_abroad: "Para outros países, preços e formatos são combinados conforme o destino (nos Estados Unidos, por exemplo, o formato é a caixa de 18.5 lb).",
      buy_ask: "Para orientar você direito, de onde está comprando?", c_ros: "Rosario e arredores", c_ar: "Resto da Argentina", c_us: "Estados Unidos", c_other: "Outro país",
      buy_ros: "Ótimo! Em Rosario e arredores você tem **entrega particular gratuita** com o Pack Lançamento: adicione ao carrinho e preencha seu endereço. Nos outros tamanhos, compre pelo Mercado Livre ou combine a entrega.",
      buy_ar: "Perfeito: em toda a Argentina a compra é pelo **Mercado Livre**. Escolha o tamanho:",
      buy_us: "Para os Estados Unidos a compra é pela **Amazon**. O formato para o seu mercado é a **caixa de 18.5 lb**:",
      buy_other: "Fora da Argentina a compra é pela **Amazon** (a disponibilidade pode variar conforme o país). Estes são os tamanhos:",
      buy_none: "Por enquanto nenhum produto tem compra online habilitada. Posso anotar seus dados para avisar assim que estiver disponível, ou passá-lo a uma pessoa.",
      btn_ml: "Comprar no Mercado Livre", btn_ml_soon: "Mercado Livre: em breve", btn_amz: "Comprar na Amazon", btn_amz_soon: "Amazon: em breve",
      btn_add: "Adicionar ao carrinho", btn_cart: "Ir ao carrinho", btn_quote: "Pedir cotação", btn_wa: "Continuar pelo WhatsApp", btn_mail: "Enviar por e-mail", btn_form: "Formulário de pedidos",
      added: "Adicionado ao carrinho ✅", lk_price_abroad: "Preço na Amazon",
      buy_after: "Quer que eu anote seus dados para avisar sobre novidades, ofertas e estoque?", c_yes_lead: "Sim, pode anotar", c_no_lead: "Agora não",
      c_cancel: "✖ Cancelar",
      q_name: "Qual é o seu nome?", q_company: "Qual é a sua empresa ou loja? (pode pular)", q_country: "De que país e cidade você escreve?", q_role: "Qual é o seu perfil?",
      c_role_retail: "Varejista (loja)", c_role_whole: "Atacadista / distribuidor", c_role_imp: "Importador (exterior)", c_role_vet: "Veterinária / clínica", c_skip: "Pular",
      q_interest: "Que tamanho interessa a você?", c_unsure: "Ainda não sei",
      q_doubts: "Tem alguma dúvida antes de comprar?", c_nodoubts: "Nenhuma por enquanto",
      q_product: "Para qual tamanho quer a cotação?", q_volume: "Que quantidade precisa e com que frequência? (por exemplo: pallets ou toneladas por mês)",
      q_contact: "Como podemos falar com você? Escreva seu e-mail ou número de WhatsApp.", c_nocontact: "Prefiro não deixar",
      q_contact_req: "Para enviar a cotação preciso de um e-mail ou de um número de telefone com WhatsApp.",
      q_query: "Conte brevemente o que precisa e eu passo para a equipe.",
      q_consent: "Você autoriza a equipe da Zeobent Cat’s a entrar em contato com esses dados?", c_consent_all: "Sim, e receber novidades e ofertas", c_consent_reply: "Sim, só para me responder", c_consent_no: "Não, obrigado",
      err_name: "Desculpe, preciso de um nome para me dirigir a você. Qual é o seu nome?",
      err_contact: "Não consegui reconhecer esse dado. Escreva um e-mail (nome@dominio.com) ou um telefone com código do país.",
      summary_title: "Este é o resumo que passarei à equipe:",
      sent_ok: "Pronto ✅ Já passei seus dados à equipe.",
      sent_wa: "Para que sua consulta chegue à equipe, envie pelo WhatsApp com o botão abaixo (abre com a mensagem já escrita) ou por e-mail.",
      sent_nowa: "Para que sua consulta chegue à equipe, envie por e-mail com o botão abaixo.",
      done_retail: "Obrigado, {n}! 🐾 Seu interesse ficou registrado.",
      done_whole: "Obrigado, {n}! Vou encaminhá-lo a um assessor comercial que entrará em contato **o mais rápido possível dentro do horário comercial** ({hours}).",
      done_human: "Obrigado, {n}! Um assessor atenderá você **o mais rápido possível dentro do horário comercial** ({hours}).",
      open_now: "Agora estamos dentro do horário de atendimento, então pelo WhatsApp você pode ter resposta logo.",
      closed_now: "Agora estamos fora do horário de atendimento: respondemos assim que abrirmos.",
      fidel: "Enquanto isso, veja as ofertas e compartilhe a foto do seu gato na comunidade: adoro conhecer os pets. 🐾",
      nomatch: "Isso eu não tenho confirmado e prefiro não inventar. 🐾 Quer que eu pergunte a alguém da equipe?",
      thanks: "De nada! 🐾 Estou aqui para o que precisar.",
      greet: "Miau! 🐾 Em que posso ajudar?",
      hours_line: "Nossa equipe atende {hours}.",
      cancelled: "Certo, ficamos por aqui. Quando quiser, retomamos. 🐾",
      human_intro: "Com prazer, conecto você a uma pessoa da equipe.",
      whole_intro: "Excelente! Para atacadistas, distribuidores e lojas preparamos uma cotação sob medida (custos e forma de pagamento são combinados conforme o destino). Umas perguntas rápidas.",
      lead_intro: "Perfeito! Umas perguntas rápidas.",
      l_product: "Ver todas as características", l_offers: "Ver ofertas", l_shop: "Ir à loja", l_comm: "Comunidade Zeobent", l_vets: "Seção veterinários", l_cart: "Ir ao carrinho", l_waitlist: "Lista de espera", l_orders: "Formulário de pedidos",
      wm_hello: "Olá, sou {n}. Escrevo pelo site da Zeobent Cat’s (chat com o Zeo).",
      wm_type: "Perfil", wm_company: "Empresa", wm_country: "País/cidade", wm_prod: "Produto", wm_vol: "Quantidade/frequência", wm_query: "Consulta", wm_contact: "Contato", wm_lang: "Idioma do cliente", wm_news: "Aceita novidades e ofertas", wm_yes: "Sim", wm_no: "Não", wm_ask: "Pedido"
    }
  }
};
