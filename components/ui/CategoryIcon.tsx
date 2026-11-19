"use client"
import Image from "next/image"
import { Category } from "@/src/generated/prisma"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{category: string}>()

    return (
        <Link
            href={`/order/${category.slug}`}
            className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="relative size-16">
                <Image
                    src={`/icon_${category.slug}.svg`}
                    alt={`Imagen de la Categoría: ${category.name}`}
                    fill
                />
            </div>
            <p className="text-lg font-bold">{category.name}</p>
        </Link>
    )
}