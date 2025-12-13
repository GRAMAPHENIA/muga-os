import { writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    console.log('API called: create-post');
    const formData = await request.formData();

    const titulo = formData.get('titulo') as string;
    const area = formData.get('area') as string;
    const categoria = formData.get('categoria') as string;
    const estado = formData.get('estado') as string;
    const fecha = formData.get('fecha') as string;
    const tags = formData.get('tags') as string;
    const introduccion = formData.get('introduccion') as string;
    const contenido = formData.get('contenido') as string;
    const conclusion = formData.get('conclusion') as string;
    const imagenFile = formData.get('imagen_destacada') as File;

    if (!titulo || !estado || !fecha) {
      return new Response(JSON.stringify({ error: 'Campos obligatorios faltantes' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate slug
    const slug = titulo.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    let imagenDestacada = '';
    if (imagenFile && imagenFile.size > 0) {
      console.log('Processing image upload...');
      console.log('Image file name:', imagenFile.name);
      console.log('Image file size:', imagenFile.size);

      // Create images directory if it doesn't exist
      const imagesDir = join(process.cwd(), 'public', 'images');
      mkdirSync(imagesDir, { recursive: true });

      // Generate unique filename
      const ext = extname(imagenFile.name) || '.jpg';
      const imageFilename = `${slug}-featured${ext}`;
      const imagePath = join(imagesDir, imageFilename);

      console.log('Saving image to:', imagePath);

      // Save the file
      const arrayBuffer = await imagenFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      writeFileSync(imagePath, buffer);

      imagenDestacada = `/images/${imageFilename}`;
      console.log('Image saved successfully:', imagenDestacada);
    } else {
      console.log('No image file provided or file is empty');
    }

    // Build frontmatter
    const frontmatter = {
      title: titulo,
      ...(area && { area }),
      ...(categoria && { category: [categoria] }),
      status: estado,
      date: fecha,
      ...(tags && { tags: tags.split(',').map(t => t.trim()).filter(t => t) }),
    };

    // Generate structured HTML content
    let htmlContent = '';

    if (imagenDestacada) {
      htmlContent += `<img src="${imagenDestacada}" alt="Imagen destacada" class="w-full h-64 object-cover mb-8 border border-neutral-700">\n\n`;
    }

    if (introduccion) {
      htmlContent += `<h2 class="text-2xl font-bold text-white mb-4 mt-8 uppercase tracking-wide">Introducción</h2>\n\n`;
      htmlContent += `<p class="text-neutral-300 mb-4 leading-relaxed">${introduccion.replace(/\n/g, '</p>\n\n<p class="text-neutral-300 mb-4 leading-relaxed">')}</p>\n\n`;
      htmlContent += `<hr class="border-neutral-700 my-8">\n\n`;
    }

    if (contenido) {
      // Split content into paragraphs and format them as subsections
      const paragraphs = contenido.split('\n\n').map(p => p.trim()).filter(p => p);
      if (paragraphs.length > 0) {
        htmlContent += `<h2 class="text-2xl font-bold text-white mb-6 mt-8 uppercase tracking-wide">Desarrollo</h2>\n\n`;
        paragraphs.forEach((paragraph, index) => {
          // Create subsection titles based on content
          const subsectionTitles = [
            'Primera reflexión',
            'Segunda perspectiva',
            'Tercera idea',
            'Consideraciones adicionales',
            'Pensamientos finales'
          ];
          const title = subsectionTitles[index] || `Sección ${index + 1}`;

          htmlContent += `<h3 class="text-lg font-semibold text-neutral-200 mb-3 mt-6 italic" style="background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${title}</h3>\n\n`;
          htmlContent += `<p class="text-neutral-300 mb-4 leading-relaxed">${paragraph.replace(/\n/g, '</p>\n\n<p class="text-neutral-300 mb-4 leading-relaxed">')}</p>\n\n`;
        });
        htmlContent += `<hr class="border-neutral-700 my-8">\n\n`;
      }
    }

    if (conclusion) {
      htmlContent += `<h2 class="text-2xl font-bold text-white mb-4 mt-8 uppercase tracking-wide">Conclusión</h2>\n\n`;
      htmlContent += `<p class="text-neutral-300 mb-4 leading-relaxed">${conclusion.replace(/\n/g, '</p>\n\n<p class="text-neutral-300 mb-4 leading-relaxed">')}</p>\n\n`;
    }

    if (!htmlContent.trim()) {
      htmlContent = `<h1 class="text-3xl font-bold text-white mb-6">${titulo}</h1>\n\n<p class="text-neutral-300 mb-4 leading-relaxed">Escribe aquí el contenido del post...</p>`;
    }

    const mdx = `---
${Object.entries(frontmatter)
  .filter(([_, value]) => value !== undefined && value !== null && value !== '')
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---

${htmlContent}
`;

    // Write file
    const filePath = join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
    console.log('Writing file to:', filePath);
    writeFileSync(filePath, mdx, 'utf-8');
    console.log('File written successfully');

    // Redirect to the blog list with success message
    console.log('Redirecting to blog list');
    return redirect(`/blog?created=${slug}`, 302);

  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}