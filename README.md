# Zeobent Cat's Premium - sitio para GitHub Pages

Sitio estático (HTML + CSS + JS), sin instalación ni servidor. Mismo formato que la versión anterior: se publica igual.

## Páginas
`index.html` (inicio) · `producto.html` · `tienda.html` · `articulo.html?id=…` (detalle) · `ofertas.html` · `comunidad.html` (historias con foto y opiniones) · `veterinarios.html` · `pedidos.html` · `carrito.html`.
El encabezado y el pie se generan desde `app.js`, así que el menú es el mismo en todas las páginas. Idiomas: ES / EN / PT.

## Publicar
1. Subí **todo el contenido de esta carpeta** a la raíz del repositorio de GitHub.
2. Settings → Pages → Source: *Deploy from a branch* → rama `main` / carpeta `/ (root)`.

## Editar precios y ofertas (forma fácil)
Abra `admin.html` (doble clic o en la web publicada): cambie precios, enlaces de Mercado Libre, ofertas, etiquetas, visibilidad y el descuento por cantidad. Descargue `products.js` y/o `config.js` y reemplace los del mismo nombre en la carpeta `data/` del repositorio (GitHub → carpeta data → Add file → Upload files). La barra superior, la tienda, las ofertas y el carrito se actualizan solos.

## Productos, precios y Mercado Libre → `data/products.js`
- `precio`: valor en pesos. En `null` se muestra "Consultar precio" y el producto no se agrega al carrito.
- `ml_url`: enlace de la publicación (o link de pago) de Mercado Libre. Con el enlace cargado aparece el botón "Comprar en Mercado Libre"; vacío, aparece "próximamente".
- `envio_gratis_local`: `true` muestra el envío gratis en Rosario y zona de influencia.
- Para sumar un producto, copiá un bloque y cambiá `id`, `nombre`, etc.
Precios cargados: Pack Lanzamiento 3 × 4 kg (12 kg) $ 12.000 · Bolsa de 3,6 kg / 4 kg $ 4.500 · Bolsa de 10 kg $ 9.500 (precio promocional). Caja de 18.5 lb y granel: consultar.
- `visible: false` oculta un producto de la web. La bolsa de 15 kg ($ 16.000) está cargada y oculta; para activarla, cambie `visible` a `true` (o borre la línea).
- `imgs`: lista de imágenes extra del producto (se muestran como miniaturas en el detalle).

## Descuento por cantidad
En `data/config.js` (o desde `admin.html`): `desc: { min: 10, pct: 10 }`: desde 10 unidades del mismo producto se descuenta el 10% de esa línea en el carrito. Cambie los números para modificar la regla. Para excluir un producto, agregue `"descuento": false` en su bloque de `data/products.js`.

## Cambiar las imágenes
Reemplazá el archivo en `assets/productos/` conservando el nombre (`pack-lanzamiento.webp`, `bolsa-4kg.webp`, `bolsa-10kg.webp`, `caja-18lb.webp`, `granel.webp`), o cambiá el campo `img` en `data/products.js`.
`admin.html` convierte y reduce una imagen a WebP para subirla. El pack de 3 bolsas y el granel usan imágenes provisorias: reemplazalas por las definitivas.
Logo grande del inicio: `assets/logo-zeobent-3d.webp`. Carteles y afiches: `assets/marketing/`.

## Historias, fotos y opiniones del público (con aprobación previa)
Cualquier persona puede enviar el formulario en `comunidad.html`. **Nada se muestra hasta que usted lo aprueba**:
1. Recibe el envío por correo (o en el servicio de formularios).
2. Revisa el contenido. Sube la foto a `assets/comunidad/`.
3. Con `admin.html` genera la línea y la pega en `data/gallery.js` (historias) o `data/opiniones.js` (opiniones).
Para recibir los formularios sin abrir el correo, completá `CFG.endpoint` en `app.js` (Formspree, Web3Forms, Getform). Las fotos adjuntas pueden requerir plan pago en el servicio elegido; sin endpoint, el formulario abre el correo `zeolitcatsusa@gmail.com` y la foto se adjunta a mano.

## Carrito y envío particular
El carrito se guarda en el navegador de cada visitante. El pedido con envío en Rosario y zona de influencia se envía por el mismo medio que los demás formularios. El pago en Mercado Libre se hace en esa plataforma, con el enlace de `ml_url`.

## Novedades para veterinarios → `data/vets.js`
Campos: fecha, titulo, texto, url. Se ordenan por fecha.

## Probar en tu computadora
Puede abrir `index.html` con doble clic: los datos están en `data/*.js`, no necesitan servidor. Al editarlos, conserve la estructura `window.ZC.nombre = [ ... ];`.
