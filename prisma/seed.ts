import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed genres
  const genres = [
    {
      name: "Apologética",
      slug: "apologetica",
      description: "Defesa racional da fé cristã",
    },
    {
      name: "Teologia Sistemática",
      slug: "teologia-sistematica",
      description: "Estudo organizado das doutrinas cristãs",
    },
    {
      name: "Comentário Bíblico",
      slug: "comentario-biblico",
      description: "Análise e interpretação dos textos bíblicos",
    },
    {
      name: "História da Igreja",
      slug: "historia-da-igreja",
      description: "Trajetória histórica do cristianismo",
    },
    {
      name: "Hermenêutica",
      slug: "hermeneutica",
      description: "Teoria e prática da interpretação bíblica",
    },
    {
      name: "Escatologia",
      slug: "escatologia",
      description: "Estudo das últimas coisas e profecias",
    },
    {
      name: "Vida Cristã",
      slug: "vida-crista",
      description: "Espiritualidade, devoção e prática cristã",
    },
    {
      name: "Outros",
      slug: "outros",
      description: "Demais obras do acervo",
    },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: {},
      create: genre,
    });
  }

  console.log("✓ Gêneros criados");

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@bibliotech.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administrador",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✓ Usuário admin criado");

  // Seed example books
  const teologiaSistematica = await prisma.genre.findUnique({
    where: { slug: "teologia-sistematica" },
  });
  const apologetica = await prisma.genre.findUnique({
    where: { slug: "apologetica" },
  });
  const vidaCrista = await prisma.genre.findUnique({
    where: { slug: "vida-crista" },
  });

  if (teologiaSistematica && apologetica && vidaCrista) {
    const exampleBooks = [
      {
        title: "Teologia Sistemática",
        slug: "teologia-sistematica-grudem",
        author: "Wayne Grudem",
        description:
          "Uma introdução abrangente à doutrina bíblica, cobrindo todos os tópicos centrais da teologia cristã.",
        pages: 1344,
        publisher: "Vida Nova",
        year: 2010,
        isPublished: true,
        genreId: teologiaSistematica.id,
      },
      {
        title: "Mero Cristianismo",
        slug: "mero-cristianismo",
        author: "C.S. Lewis",
        description:
          "Uma defesa racional e acessível da fé cristã, baseada em transmissões de rádio da BBC durante a Segunda Guerra Mundial.",
        pages: 240,
        publisher: "WMF Martins Fontes",
        year: 1952,
        isPublished: true,
        genreId: apologetica.id,
      },
      {
        title: "O Peregrino",
        slug: "o-peregrino",
        author: "John Bunyan",
        description:
          "Alegoria clássica da jornada espiritual do cristão desde a Cidade da Destruição até a Cidade Celestial.",
        pages: 384,
        publisher: "Fiel",
        year: 1678,
        isPublished: true,
        genreId: vidaCrista.id,
      },
    ];

    for (const book of exampleBooks) {
      await prisma.book.upsert({
        where: { slug: book.slug },
        update: {},
        create: book,
      });
    }

    console.log("✓ Livros de exemplo criados");
  }

  // Seed wishlist example
  await prisma.wishlistItem.upsert({
    where: { id: "seed-wishlist-1" },
    update: {},
    create: {
      id: "seed-wishlist-1",
      title: "Institutos da Religião Cristã",
      author: "João Calvino",
      genre: "Teologia Sistemática",
      notes: "Obra fundamental da teologia reformada. Edição completa.",
      priority: "HIGH",
      purchased: false,
    },
  });

  console.log("✓ Item de wishlist criado");
  console.log("\n✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
