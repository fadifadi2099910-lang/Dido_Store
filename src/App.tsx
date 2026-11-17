/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CartItem, RestockAlert, SERVICES, StoreService } from './data/services';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogFilter, CatalogSection } from './components/CatalogSection';
import { OrderTrackingSection } from './components/OrderTrackingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';

const CART_STORAGE_KEY = 'dido_store_cart_v1';
const FAVORITES_STORAGE_KEY = 'dido_store_favorites_v1';
const RESTOCK_ALERTS_KEY = 'dido_store_restock_alerts_v1';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CatalogFilter>('all');
  const [selectedService, setSelectedService] = useState<StoreService | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [trackedOrderNumber, setTrackedOrderNumber] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [restockAlerts, setRestockAlerts] = useState<RestockAlert[]>(() => {
    try {
      const saved = localStorage.getItem(RESTOCK_ALERTS_KEY);
      return saved ? (JSON.parse(saved) as RestockAlert[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage unavailable
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Storage unavailable
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem(RESTOCK_ALERTS_KEY, JSON.stringify(restockAlerts));
    } catch {
      // Storage unavailable
    }
  }, [restockAlerts]);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  const handleToggleFavorite = (serviceId: string) => {
    const service = SERVICES.find((s) => s.id === serviceId);
    setFavoriteIds((prev) => {
      const exists = prev.includes(serviceId);
      const next = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      if (service) {
        showToast(
          exists
            ? `تمت إزالة "${service.title}" من المفضلة`
            : `تم حفظ "${service.title}" في المفضلة`
        );
      }
      return next;
    });
  };

  const handleSaveRestockAlert = (newAlert: RestockAlert) => {
    setRestockAlerts((prev) => [
      newAlert,
      ...prev.filter((a) => a.serviceId !== newAlert.serviceId),
    ]);
    showToast(`تم تفعيل تنبيه التوفر لخدمة "${newAlert.serviceTitle}"`);
  };

  const handleRemoveRestockAlert = (serviceId: string) => {
    setRestockAlerts((prev) => prev.filter((a) => a.serviceId !== serviceId));
    showToast('تم إلغاء التنبيه بنجاح');
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.serviceId === newItem.serviceId &&
          it.packageLabel === newItem.packageLabel &&
          it.targetAccount === newItem.targetAccount &&
          it.paymentMethod === newItem.paymentMethod
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        };
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`تمت إضافة "${newItem.serviceTitle}" إلى سلة الطلبات`);
  };

  const handleUpdateQty = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) =>
          it.cartId === cartId ? { ...it, quantity: it.quantity + delta } : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleTrackOrder = (orderNumber: string) => {
    setTrackedOrderNumber(orderNumber);
    const el = document.getElementById('track');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07111E] text-[#F1F5F9]">
      <Header
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      <main className="flex-1">
        <Hero />
        <CatalogSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectService={setSelectedService}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          restockAlerts={restockAlerts}
        />
        <OrderTrackingSection externalOrderNumber={trackedOrderNumber} />
        <ContactSection />
      </main>

      <Footer />

      <ProductModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedService ? favoriteIds.includes(selectedService.id) : false}
        onToggleFavorite={handleToggleFavorite}
        existingAlert={
          selectedService
            ? restockAlerts.find((a) => a.serviceId === selectedService.id)
            : undefined
        }
        onSaveAlert={handleSaveRestockAlert}
        onRemoveAlert={handleRemoveRestockAlert}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onTrackOrder={handleTrackOrder}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/35 bg-[#0D1B2E] px-4 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
