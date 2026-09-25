import { CartDrawer } from "@/components/cart-drawer";
import { FeaturedProduct } from "@/components/featured-product";
import { Header, UtilityBar } from "@/components/header";
import { HeroSlider } from "@/components/hero-slider";
import { MenuDrawer } from "@/components/menu-drawer";
import { ProductGrid } from "@/components/product-card";
import {
  CategoryBento, Footer, Journal, PromoBanners, QualityChecks, RibbonSingle, Ribbons, SectionHead, ShopTheFeed, WhatsAppButton,
} from "@/components/sections";
import { PRODUCTS } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="mocknote">Zasco Home homepage mockup · stock photos and sample products stand in for real ones</div>
      <UtilityBar />
      <Header />
      <MenuDrawer />
      <CartDrawer />

      <main id="main">
        <div className="wrap">
          <HeroSlider />

          <section className="sec" aria-labelledby="h-best">
            <SectionHead eyebrow="Bestsellers" title="Most-Loved Pieces" id="h-best">
              The sheets and towels our customers reorder most.
            </SectionHead>
            <ProductGrid products={PRODUCTS.slice(0, 6)} />
            <div className="more"><a href="#" className="btn btn-line">Shop All</a></div>
          </section>

          <PromoBanners />

          <section className="sec" aria-labelledby="h-trend">
            <SectionHead eyebrow="Trending" title="Top Wishes" id="h-trend">
              What people are saving to their wishlists this week.
            </SectionHead>
            <ProductGrid products={PRODUCTS.slice(6)} />
            <div className="more"><a href="#" className="btn btn-line">Shop All</a></div>
          </section>

          <CategoryBento />
        </div>

        <Ribbons />

        <div className="wrap">
          <FeaturedProduct />
        </div>

        <RibbonSingle />

        <div className="wrap">
          <QualityChecks />
        </div>

        <ShopTheFeed />

        <div className="wrap">
          <Journal />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
