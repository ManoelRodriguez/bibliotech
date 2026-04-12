import { getWishlistItems } from "@/actions/wishlist";
import { WishlistClient } from "@/components/wishlist/wishlist-client";

export const metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const items = await getWishlistItems();

  return (
    <div className="space-y-6">
      <WishlistClient items={items} />
    </div>
  );
}
