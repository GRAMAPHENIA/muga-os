---
title: 'Día 01 — Material Procedural: grano realista con Noise (Blender 4.5)'
area: Studio
category: ['Tutoriales', 'Blender']
status: Publicado
date: '2025-12-19'
tags: ['materiales procedurales', 'noise', 'blender 4.5']
image: '/images/sfsdf-featured.png'
---

<p class="text-neutral-400 text-sm mb-8">
  <a href="/blog" class="hover:text-white">Blog</a>
  <span aria-hidden="true" class="mx-2">/</span>
  <a href="/blog/materiales-procedurales" class="hover:text-white">Materiales procedurales</a>
</p>

<!-- <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight uppercase tracking-wide">Día 01 — Material Procedural: grano realista con Noise (Blender 4.5)</h1> -->

<figure class="my-12">
  <img src="/images/sfsdf-featured.png" alt="Vista previa del material procedural del Día 01 en Blender: superficie con grano fino y variación sutil." class="w-full border border-neutral-700" />
  <figcaption class="text-neutral-400 text-sm mt-4 italic">Resultado objetivo: grano fino, controlado, sin "ruido gigante" que delate lo digital.</figcaption>
</figure>

<section aria-label="Metadatos del artículo" class="my-12">
  <h2 class="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Información del Tutorial</h2>
  <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-700 p-6">
      <dt class="font-semibold text-white uppercase text-sm tracking-wide mb-2">Serie</dt>
      <dd class="text-neutral-300">Desafío diario — Biblioteca de materiales</dd>
    </div>
    <div class="bg-neutral-700 p-6">
      <dt class="font-semibold text-white uppercase text-sm tracking-wide mb-2">Versión</dt>
      <dd class="text-neutral-300">Blender 4.5</dd>
    </div>
    <div class="bg-neutral-700 p-6">
      <dt class="font-semibold text-white uppercase text-sm tracking-wide mb-2">Enfoque</dt>
      <dd class="text-neutral-300">100% procedural (sin texturas externas)</dd>
    </div>
    <div class="bg-neutral-700 p-6">
      <dt class="font-semibold text-white uppercase text-sm tracking-wide mb-2">Dificultad</dt>
      <dd class="text-neutral-300">Inicial / Base</dd>
    </div>
    <div class="bg-neutral-700 p-6">
      <dt class="font-semibold text-white uppercase text-sm tracking-wide mb-2">Tiempo estimado</dt>
      <dd class="text-neutral-300">20–40 min</dd>
    </div>
  </dl>
</section>

<nav aria-label="Tabla de contenidos" class="my-12">
  <h2 class="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Contenido</h2>
  <ol class="list-decimal list-inside space-y-3 text-lg">
    <li><a href="#objetivo" class="text-neutral-400 hover:text-white underline">Objetivo del día</a></li>
    <li><a href="#criterios-muga" class="text-neutral-400 hover:text-white underline">Criterios MUGA</a></li>
    <li><a href="#idea-base" class="text-neutral-400 hover:text-white underline">Idea base del material</a></li>
    <li><a href="#pasos" class="text-neutral-400 hover:text-white underline">Paso a paso (nodos)</a></li>
    <li><a href="#ajuste-grano" class="text-neutral-400 hover:text-white underline">Ajuste fino: achicar el grano (Noise Scale)</a></li>
    <li><a href="#validacion" class="text-neutral-400 hover:text-white underline">Validación rápida</a></li>
    <li><a href="#errores" class="text-neutral-400 hover:text-white underline">Errores comunes</a></li>
    <li><a href="#variaciones" class="text-neutral-400 hover:text-white underline">Variaciones para iterar</a></li>
    <li><a href="#export" class="text-neutral-400 hover:text-white underline">Checklist para publicar como asset</a></li>
  </ol>
</nav>

<section id="objetivo" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Objetivo del día</h2>
  <p class="text-lg text-neutral-300 mb-6 leading-relaxed">
    Crear un material procedural base que tenga <strong class="text-white">variación sutil y realista</strong>, y corregir un problema típico:
    el <strong class="text-white">grano demasiado grande</strong>. La decisión clave del Día 01 fue simple y efectiva:
    <strong class="text-white">subir la escala del Noise para achicar el grano</strong>.
  </p>
</section>

<section id="criterios-muga" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Criterios MUGA</h2>
  <ul class="list-disc list-inside space-y-4 text-lg text-neutral-300 mb-8">
    <li><strong class="text-white">Procedural real:</strong> todo generado con nodos, sin imágenes externas.</li>
    <li><strong class="text-white">Control por parámetros:</strong> que el material se pueda reusar cambiando pocos valores.</li>
    <li><strong class="text-white">Realismo funcional:</strong> lo "real" no es detalle infinito; es <em class="text-neutral-200">escala correcta</em> + <em class="text-neutral-200">contraste controlado</em>.</li>
    <li><strong class="text-white">Iteración controlada:</strong> un cambio por vez, medible, reversible.</li>
  </ul>

  <aside aria-label="Proceso mental aplicado" class="bg-neutral-800 p-6 my-8 border-l-4 border-neutral-600">
    <h3 class="text-lg font-semibold text-neutral-200 mb-4">Proceso mental aplicado</h3>
    <ul class="list-disc list-inside space-y-2 text-neutral-300">
      <li><strong class="text-white">Identificación de posibilidades:</strong> si el grano se ve falso, casi siempre es escala/contraste.</li>
      <li><strong class="text-white">Evaluación de riesgos y beneficios:</strong> subir escala del Noise cambia tamaño del detalle sin romper la estructura.</li>
      <li><strong class="text-white">Proyección de escenarios:</strong> si subo mucho la escala, el grano se vuelve fino y creíble; si me paso, se "plancha".</li>
      <li><strong class="text-white">Iteración controlada:</strong> ajustar un parámetro (Scale) y comparar antes/después.</li>
      <li><strong class="text-white">Memoria contextual:</strong> este ajuste queda como regla base para próximos materiales con microdetalle.</li>
    </ul>
  </aside>
</section>

<section id="idea-base" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Idea base del material</h2>
  <p class="text-lg text-neutral-300 mb-6 leading-relaxed">
    Este primer material se apoya en una estructura clásica:
    <strong class="text-white">base color</strong> + <strong class="text-white">microvariación</strong> + <strong class="text-white">relieve sutil</strong>.
    No buscamos "textura protagonista", buscamos un material utilizable como <em class="text-neutral-200">bloque</em> para la biblioteca.
  </p>

  <figure class="my-8">
    <img src="/images/sfsdf-featured.png" alt="Esquema general del shader: Principled BSDF con Noise para variación y Bump para relieve sutil." class="w-full border border-neutral-700" />
    <figcaption class="text-neutral-400 text-sm mt-4 italic">Esquema conceptual: Noise alimenta variación (color/roughness) y bump (altura).</figcaption>
  </figure>
</section>

<section id="pasos" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Paso a paso (nodos)</h2>

  <section aria-label="Paso 1" class="mb-8">
    <h3 class="text-lg font-semibold text-neutral-200 mt-10 mb-4">Paso 1 — Preparación</h3>
    <ol class="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
      <li>Crear un material nuevo en el objeto.</li>
      <li>En <strong class="text-white">Shader Editor</strong>, dejar un <strong class="text-white">Principled BSDF</strong> conectado a <strong class="text-white">Material Output</strong>.</li>
      <li>Trabajar con una escena simple: un plano o cubo con buena luz para leer el microdetalle.</li>
    </ol>
  </section>

  <section aria-label="Paso 2" class="mb-8">
    <h3 class="text-lg font-semibold text-neutral-200 mt-10 mb-4">Paso 2 — Microvariación con Noise</h3>
    <ol class="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
      <li>Agregar un nodo <strong class="text-white">Noise Texture</strong>.</li>
      <li>Agregar un nodo <strong class="text-white">ColorRamp</strong>.</li>
      <li>Conectar <strong class="text-white">Noise (Fac)</strong> → <strong class="text-white">ColorRamp (Fac)</strong>.</li>
      <li>Usar la salida del <strong class="text-white">ColorRamp</strong> para modular sutilmente:
        <ul class="list-disc list-inside space-y-1 ml-6">
          <li><strong class="text-white">Base Color</strong> (mezcla leve o variación en valor)</li>
          <li><strong class="text-white">Roughness</strong> (pequeñas diferencias de brillo)</li>
        </ul>
      </li>
    </ol>

    <aside class="bg-neutral-800 p-4 my-6 border-l-4 border-neutral-600">
      <h4 class="font-semibold text-neutral-200 mb-2">Nota de control</h4>
      <p class="text-neutral-300">
        Acá el error típico es dejar el Noise con un tamaño de detalle que no corresponde a la escala del objeto.
        Por eso el Día 01 es sobre la escala del grano.
      </p>
    </aside>
  </section>

  <section aria-label="Paso 3" class="mb-8">
    <h3 class="text-lg font-semibold text-neutral-200 mt-10 mb-4">Paso 3 — Relieve sutil (Bump)</h3>
    <ol class="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
      <li>Agregar nodo <strong class="text-white">Bump</strong>.</li>
      <li>Conectar <strong class="text-white">Noise (Fac)</strong> o <strong class="text-white">ColorRamp</strong> (según el control que quieras) → <strong class="text-white">Bump (Height)</strong>.</li>
      <li>Conectar <strong class="text-white">Bump (Normal)</strong> → <strong class="text-white">Principled (Normal)</strong>.</li>
      <li>Empezar con <strong class="text-white">Strength</strong> muy bajo y subir de a poco.</li>
    </ol>
  </section>
</section>

<section id="ajuste-grano" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Ajuste fino: achicar el grano (Noise Scale)</h2>
  <p class="text-lg text-neutral-300 mb-6 leading-relaxed">
    Tu ajuste clave del Día 01 fue este: <strong class="text-white">subiste la escala del Noise para achicar el grano</strong>.
    Eso es correcto porque la <strong class="text-white">Scale</strong> controla el tamaño del patrón: a mayor escala, <em class="text-neutral-200">más detalle por unidad</em>,
    por lo tanto <strong class="text-white">grano más pequeño</strong>.
  </p>

  <section aria-label="Cómo hacerlo" class="mb-8">
    <h3 class="text-lg font-semibold text-neutral-200 mt-10 mb-4">Cómo hacerlo</h3>
    <ol class="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
      <li>Seleccionar el nodo <strong class="text-white">Noise Texture</strong>.</li>
      <li>Subir <strong class="text-white">Scale</strong> gradualmente (por ejemplo, x2, x4, x8).</li>
      <li>Después de cada cambio, mirar:
        <ul class="list-disc list-inside space-y-1 ml-6">
          <li>si el grano dejó de verse "gigante"</li>
          <li>si todavía se percibe la variación (que no quede plano)</li>
        </ul>
      </li>
      <li>Si se aplana:
        <ul class="list-disc list-inside space-y-1 ml-6">
          <li>subir apenas el contraste con <strong class="text-white">ColorRamp</strong> (moviendo sliders con cuidado)</li>
          <li>o subir levemente <strong class="text-white">Detail</strong> (sin exagerar)</li>
        </ul>
      </li>
    </ol>
  </section>

  <aside aria-label="Regla práctica" class="bg-neutral-800 p-6 my-8 border-l-4 border-neutral-600">
    <h3 class="text-lg font-semibold text-neutral-200 mb-4">Regla práctica</h3>
    <p class="text-neutral-300">
      Si el material "grita procedural", casi siempre es por <strong class="text-white">escala incorrecta</strong> o <strong class="text-white">contraste excesivo</strong>.
      Primero corregís escala. Después ajustás contraste.
    </p>
  </aside>
</section>

<section id="validacion" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Validación rápida</h2>
  <ol class="list-decimal list-inside space-y-2 text-neutral-300 mb-6">
    <li><strong class="text-white">Cambiar escala del objeto:</strong> el grano se tiene que comportar de forma coherente.</li>
    <li><strong class="text-white">Rotar la luz:</strong> el brillo (roughness) tiene que variar sin "parches" duros.</li>
    <li><strong class="text-white">Acercarte y alejarte:</strong> de lejos no debe ser ruido; de cerca debe haber microdetalle.</li>
  </ol>
</section>

<section id="errores" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Errores comunes</h2>
  <ul class="list-disc list-inside space-y-4 text-neutral-300 mb-6">
    <li><strong class="text-white">Grano enorme:</strong> Scale baja en Noise → subir Scale.</li>
    <li><strong class="text-white">Material "sucio":</strong> contraste alto en ColorRamp → suavizar.</li>
    <li><strong class="text-white">Relieve plástico:</strong> Bump demasiado fuerte → bajar Strength.</li>
    <li><strong class="text-white">Patrón repetitivo:</strong> variar parámetros del Noise (Detail/Roughness/Distortion) con moderación.</li>
  </ul>
</section>

<section id="variaciones" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Variaciones para iterar</h2>
  <ul class="list-disc list-inside space-y-4 text-neutral-300 mb-8">
    <li><strong class="text-white">Dos capas de Noise:</strong> una para macrovariación (Scale baja), otra para micrograno (Scale alta).</li>
    <li><strong class="text-white">Micrograno solo en roughness:</strong> para que el color no se ensucie.</li>
    <li><strong class="text-white">Distortion leve:</strong> para romper "uniformidad digital" sin deformar el material.</li>
  </ul>

  <aside aria-label="Siguiente paso sugerido" class="bg-neutral-800 p-6 my-8 border-l-4 border-neutral-600">
    <h3 class="text-lg font-semibold text-neutral-200 mb-4">Siguiente paso sugerido</h3>
    <p class="text-neutral-300">
      En el Día 02 podemos formalizar el material como "asset de biblioteca" con parámetros claros:
      <strong class="text-white">escala macro</strong>, <strong class="text-white">escala micro</strong>, <strong class="text-white">contraste</strong>, <strong class="text-white">roughness base</strong>, <strong class="text-white">bump</strong>.
    </p>
  </aside>
</section>

<section id="export" class="mb-12">
  <h2 class="text-2xl font-bold text-white mt-16 mb-8 uppercase tracking-wide">Checklist para publicar como asset (MUGA.studio)</h2>
  <ul class="list-disc list-inside space-y-4 text-neutral-300 mb-6">
    <li><strong class="text-white">Nombres claros:</strong> nodos y grupos con prefijos (por ejemplo, <code class="bg-neutral-700 px-2 py-1 text-neutral-200">MUGA_</code>).</li>
    <li><strong class="text-white">Parámetros expuestos:</strong> que el usuario controle lo importante sin entrar al caos.</li>
    <li><strong class="text-white">Escena demo:</strong> una esfera + un plano + luz simple para ver el material.</li>
    <li><strong class="text-white">Capturas:</strong> close-up + plano medio + vista en contexto.</li>
    <li><strong class="text-white">Notas:</strong> qué controla cada parámetro y qué no conviene tocar.</li>
  </ul>
</section>

<footer class="mt-16 pt-8 border-t border-neutral-700">
  <section aria-label="Créditos y licencia" class="mb-8">
    <h2 class="text-xl font-bold text-white mb-4 uppercase tracking-wide">Créditos y licencia</h2>
    <p class="text-neutral-300 mb-4">
      Material y tutorial: MUGA.studio. Publicación orientada a assets gratuitos.
    </p>
    <p class="text-neutral-300">
      Licencia sugerida: indicar claramente en la publicación del asset (por ejemplo, uso libre con atribución o similar).
    </p>
  </section>

  <section aria-label="Sugerencias de lectura" class="mb-8">
    <h2 class="text-xl font-bold text-white mb-4 uppercase tracking-wide">Próximo post</h2>
    <ul class="list-disc list-inside space-y-2 text-neutral-300">
      <li><a href="/blog/dia-02-parametros-biblioteca" class="text-neutral-400 hover:text-white underline">Día 02 — Convertir el material en un asset paramétrico (grupo de nodos)</a></li>
    </ul>
  </section>

  <p class="text-neutral-500 text-sm">
    <small>Actualizado: 19 de diciembre de 2025</small>
  </p>
</footer>