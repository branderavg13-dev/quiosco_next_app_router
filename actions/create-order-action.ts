"use server"

import { prisma } from "@/lib/prisma"
import { OrderSchema } from "@/src/schema"


export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data)

   if(!result.success){
    console.log(result.error.issues)
    return {
        errors: result.error.issues
    }
}

   try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
        
        // ¡IMPORTANTE! Retornar un éxito explícito
        return { success: true }
        
    } catch (error) {
        console.log("Error en Prisma:", error)
        // Devolver un error para que el frontend no muestre "Pedido Realizado" si falló
        return { errors: [{ message: "Hubo un error al guardar el pedido." }] }
    }
}