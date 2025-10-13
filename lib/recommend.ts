import { prisma } from "./prisma";
import { explainRecommendation, Product } from "./gemini";
import { ProductProps } from "@/components/ProductCard";

export async function getRecommendations(sessionId?: string, limit = 5) {
  // Recent events
  const recent = await prisma.event.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { product: true },
  });

  let category: string | null = null;
  if (recent.length > 0) category = recent[0].product.category ?? null;

  // Query products
  let rawProducts = [];
  if (category) {
    rawProducts = await prisma.product.findMany({
      where: { category },
      orderBy: { popularity: "desc" },
      take: limit,
    });
  }
  if (!rawProducts.length) {
    rawProducts = await prisma.product.findMany({
      orderBy: { popularity: "desc" },
      take: limit,
    });
  }

  // Normalize to ProductProps
  const products: ProductProps[] = rawProducts.map((p: Product) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  category: p.category,
  price: Number(p.price),
  imageUrl: p.imageUrl,
}));

  const behaviorSummary = category
    ? `User recently viewed ${category} items.`
    : "Showing popular items.";

  // Ask Gemini for explanation
  return await Promise.all(
    products.map(async (p) => ({
      product: p,
      why: await explainRecommendation(p, behaviorSummary),
    }))
  );
}
