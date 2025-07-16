import prisma from '@/lib/prisma'

async function main() {
  const plants = [
    {
      name: 'Snake Plant',
      type: 'Succulent',
      slug: 'snake-plant',
      description: 'A hardy succulent that thrives on neglect.',
      category: 'Indoor',
      price: 14.99,
    },
    {
      name: 'Monstera Deliciosa',
      type: 'Tropical',
      slug: 'monstera-deliciosa',
      description: 'Famous for its split leaves, great for indoor decor.',
      category: 'Tropical',
      price: 29.99,
    },
    {
      name: 'Peace Lily',
      type: 'Flowering',
      slug: 'peace-lily',
      description: 'Air-purifying plant with elegant white blooms.',
      category: 'Flowering',
      price: 19.99,
    },
    {
      name: 'Spider Plant',
      type: 'Air-Purifying',
      slug: 'spider-plant',
      description: 'Easy to care for, great for beginners.',
      category: 'Hanging',
      price: 11.99,
    },
    {
      name: 'Fiddle Leaf Fig',
      type: 'Ficus',
      slug: 'fiddle-leaf-fig',
      description: 'A statement plant with large glossy leaves.',
      category: 'Indoor',
      price: 34.99,
    },
  ]

  await prisma.plant.createMany({ data: plants })

  console.log('✅ Seeded 5 plants')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
