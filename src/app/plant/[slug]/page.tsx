import prisma from '@/lib/prisma'
import React from 'react'

export default async function PlantDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plant = await prisma.plant.findUnique({
    where: { slug: slug },
  })
  return (
    <div>
      <h1>{plant?.name}</h1>
      <p>{plant?.description}</p>
    </div>
  )
}
