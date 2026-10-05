import React, { useState, useMemo } from "react";

// --- Встроенные SVG иконки (без сторонних библиотек) ---
const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

const Trash2Icon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

const ZapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

// --- Каталог внутриигровых предметов ---
const INITIAL_ITEMS = [
  {
    id: 1,
    name: "AK-47 | Неоновый Революционер",
    game: "CS2",
    price: 3850,
    rarity: "Тайное",
    rarityColor: "#eb4b4b",
    float: "0.034 (Прямо с завода)",
    mainImg: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&auto=format&fit=crop&q=80",
    category: "Оружие"
  },
  {
    id: 2,
    name: "Драконий Лук Arcana",
    game: "Dota 2",
    price: 4200,
    rarity: "Arcana",
    rarityColor: "#ade55c",
    float: "Эксклюзивный эффект",
    mainImg: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    category: "Предметы"
  },
  {
    id: 3,
    name: "Нож Керамбит | Градиент",
    game: "CS2",
    price: 84500,
    rarity: "Необычайно редкое",
    rarityColor: "#ffd700",
    float: "0.011 (Fade 98%)",
    mainImg: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=600&auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    category: "Ножи"
  },
  {
    id: 4,
    name: "Вандал | Жнец (Reaper)",
    game: "Valorant",
    price: 2100,
    rarity: "Ультра",
    rarityColor: "#d32ce6",
    float: "Все анимации открыты",
    mainImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    category: "Оружие"
  },
  {
    id: 5,
    name: "Кукри | Кровавая Паутина",
    game: "CS2",
    price: 32000,
    rarity: "Необычайно редкое",
    rarityColor: "#ffd700",
    float: "0.082 (Немного поношенное)",
    mainImg: "https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?w=600&auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    category: "Ножи"
  },
  {
    id: 6,
    name: "Реликвия Рейф | Кунай",
    game: "Apex Legends",
    price: 12500,
    rarity: "Реликвия",
    rarityColor: "#ff4655",
    float: "Осмотр со свечением",
    mainImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
    sideImg: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
    category: "Предметы"
  }
];

export default function App() {
  const [items] = useState(INITIAL_ITEMS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Добавление в корзину
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    showNotification(`"${item.name}" добавлен в корзину`);
  };

  // Удаление из корзины
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Изменение количества
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Уведомление
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Общая стоимость
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Общее количество предметов
  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Фильтрация товаров
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesGame = selectedGame === "Все" || item.game === selectedGame;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesGame && matchesSearch;
    });
  }, [items, selectedGame, searchQuery]);

  return (
    <div style={styles.appContainer}>
      {/* Шапка сайта */}
      <header style={styles.header}>
        <div style={styles.logoGroup}>
          <div style={styles.logoIcon}><ZapIcon /></div>
          <div>
            <h1 style={styles.logoTitle}>CYBERVAULT</h1>
            <p style={styles.logoSubtitle}>Маркетплейс игровой атрибутики</p>
          </div>
        </div>

        {/* Поиск */}
        <div style={styles.searchBox}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Поиск скринов, ножей, предметов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Кнопка Корзины */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={styles.cartBtn}
        >
          <ShoppingCartIcon />
          <span>Корзина</span>
          {totalItemsCount > 0 && (
            <span style={styles.cartBadge}>{totalItemsCount}</span>
          )}
        </button>
      </header>

      {/* Плавающее уведомление */}
      {notification && (
        <div style={styles.notification}>
          <CheckCircleIcon />
          <span>{notification}</span>
        </div>
      )}

      {/* Основной контент */}
      <main style={styles.mainContent}>
        {/* Фильтры игр */}
        <div style={styles.filterBar}>
          {["Все", "CS2", "Dota 2", "Valorant", "Apex Legends"].map((game) => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              style={{
                ...styles.filterBtn,
                ...(selectedGame === game ? styles.filterBtnActive : {})
              }}
            >
              {game}
            </button>
          ))}
        </div>

        {/* Подсказка про наведение */}
        <div style={styles.hintBox}>
          <EyeIcon />
          <span> Наведите курсор на карточку предмета, чтобы увидеть <b>вид со стороны (Side View / Float)</b></span>
        </div>

        {/* Сетка товаров */}
        <div style={styles.grid}>
          {filteredItems.map((item) => {
            const isHovered = hoveredCardId === item.id;
            return (
              <div
                key={item.id}
                style={styles.card}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Метка игры и редкости */}
                <div style={styles.cardHeader}>
                  <span style={styles.gameTag}>{item.game}</span>
                  <span
                    style={{
                      ...styles.rarityTag,
                      borderColor: item.rarityColor,
                      color: item.rarityColor
                    }}
                  >
                    {item.rarity}
                  </span>
                </div>

                {/* Область Картинки с осмотром */}
                <div style={styles.imgContainer}>
                  <img
                    src={isHovered ? item.sideImg : item.mainImg}
                    alt={item.name}
                    style={styles.cardImg}
                  />
                  <div style={styles.viewBadge}>
                    <EyeIcon />
                    <span>{isHovered ? "Вид со стороны" : "Лицевая сторона"}</span>
                  </div>
                </div>

                {/* Инфо о предмете */}
                <div style={styles.cardBody}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <div style={styles.floatInfo}>
                    <span>Состояние/Эффект:</span>
                    <strong style={{ color: "#aaa" }}>{item.float}</strong>
                  </div>

                  <div style={styles.cardFooter}>
                    <div>
                      <div style={styles.priceLabel}>Цена:</div>
                      <div style={styles.priceVal}>
                        {item.price.toLocaleString("ru-RU")} ₽
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      style={styles.buyBtn}
                    >
                      <ShoppingCartIcon />
                      <span>В корзину</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Корзина (Выдвижная панель справа) */}
      {isCartOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsCartOpen(false)}>
          <div
            style={styles.drawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.drawerHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingCartIcon />
                <h2>Корзина покупателя</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={styles.closeBtn}
              >
                <XIcon />
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <ShoppingCartIcon />
                <p>Ваша корзина пуста</p>
                <span style={{ color: "#666", fontSize: "14px" }}>
                  Выберите нужные скины или предметы в каталоге
                </span>
              </div>
            ) : (
              <>
                {/* Список товаров в корзине */}
                <div style={styles.cartList}>
                  {cart.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <img
                        src={item.mainImg}
                        alt={item.name}
                        style={styles.cartImg}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={styles.cartItemTitle}>{item.name}</div>
                        <div style={styles.cartItemPrice}>
                          {item.price.toLocaleString("ru-RU")} ₽ / шт.
                        </div>

                        {/* Управление количеством */}
                        <div style={styles.qtyRow}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            style={styles.qtyBtn}
                          >
                            <MinusIcon />
                          </button>
                          <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            style={styles.qtyBtn}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                      </div>

                      {/* Удаление */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={styles.removeBtn}
                        title="Удалить из корзины"
                      >
                        <Trash2Icon />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Итоговый чек */}
                <div style={styles.drawerFooter}>
                  <div style={styles.totalRow}>
                    <span>Всего предметов:</span>
                    <span>{totalItemsCount} шт.</span>
                  </div>
                  <div style={styles.totalRow}>
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Общая стоимость:
                    </span>
                    <span style={styles.totalSum}>
                      {totalPrice.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert("Заказ оформлен! Менеджер свяжется с вами для передачи предметов.");
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    style={styles.checkoutBtn}
                  >
                    <ShieldCheckIcon />
                    <span>Перейти к оплате</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Стили (Inline JS Styles) ---
const styles = {
  appContainer: {
    backgroundColor: "#0d0f17",
    color: "#f0f2f5",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    backgroundColor: "#141824",
    borderBottom: "1px solid #22293a",
    gap: "20px",
    flexWrap: "wrap"
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  logoIcon: {
    backgroundColor: "#00f2fe",
    color: "#000",
    padding: "10px",
    borderRadius: "10px",
    display: "flex"
  },
  logoTitle: {
    margin: 0,
    fontSize: "22px",
    letterSpacing: "2px",
    color: "#fff",
    fontWeight: "900"
  },
  logoSubtitle: {
    margin: 0,
    fontSize: "12px",
    color: "#6c7a9c"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1c2234",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #2a344d",
    gap: "10px",
    width: "320px",
    color: "#6c7a9c"
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    width: "100%"
  },
  cartBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#00f2fe",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    position: "relative"
  },
  cartBadge: {
    backgroundColor: "#ff0055",
    color: "#fff",
    fontSize: "12px",
    borderRadius: "50%",
    padding: "2px 7px",
    marginLeft: "5px"
  },
  mainContent: {
    padding: "40px",
    maxWidth: "1300px",
    margin: "0 auto"
  },
  filterBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  filterBtn: {
    backgroundColor: "#141824",
    color: "#a0aec0",
    border: "1px solid #22293a",
    padding: "8px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  },
  filterBtnActive: {
    backgroundColor: "#00f2fe",
    color: "#000",
    borderColor: "#00f2fe",
    fontWeight: "bold"
  },
  hintBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#161d2e",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "30px",
    color: "#7e8eb3",
    fontSize: "14px",
    borderLeft: "4px solid #00f2fe"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px"
  },
  card: {
    backgroundColor: "#141824",
    borderRadius: "12px",
    border: "1px solid #22293a",
    overflow: "hidden",
    transition: "transform 0.2s ease, border-color 0.2s ease"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 16px",
    fontSize: "12px"
  },
  gameTag: {
    backgroundColor: "#1c2234",
    padding: "4px 8px",
    borderRadius: "4px",
    color: "#8899a6"
  },
  rarityTag: {
    border: "1px solid",
    padding: "3px 8px",
    borderRadius: "4px",
    fontWeight: "bold"
  },
  imgContainer: {
    position: "relative",
    height: "180px",
    backgroundColor: "#0a0c12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  viewBadge: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#00f2fe"
  },
  cardBody: {
    padding: "16px"
  },
  itemName: {
    margin: "0 0 10px 0",
    fontSize: "16px",
    fontWeight: "bold"
  },
  floatInfo: {
    fontSize: "12px",
    color: "#6c7a9c",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between"
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  priceLabel: {
    fontSize: "11px",
    color: "#6c7a9c"
  },
  priceVal: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#00f2fe"
  },
  buyBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#1c2234",
    color: "#fff",
    border: "1px solid #2a344d",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "flex-end"
  },
  drawer: {
    width: "400px",
    backgroundColor: "#141824",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    boxSizing: "border-box"
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #22293a",
    paddingBottom: "15px"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer"
  },
  emptyCart: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  cartList: {
    flex: 1,
    overflowY: "auto",
    margin: "20px 0"
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#1c2234",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  cartImg: {
    width: "50px",
    height: "50px",
    borderRadius: "6px",
    objectFit: "cover"
  },
  cartItemTitle: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  cartItemPrice: {
    fontSize: "12px",
    color: "#00f2fe"
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "5px"
  },
  qtyBtn: {
    backgroundColor: "#2a344d",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#ff4655",
    cursor: "pointer",
    padding: "5px"
  },
  drawerFooter: {
    borderTop: "1px solid #22293a",
    paddingTop: "15px"
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  totalSum: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#00f2fe"
  },
  checkoutBtn: {
    width: "100%",
    backgroundColor: "#00f2fe",
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "10px"
  },
  notification: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#00f2fe",
    color: "#000",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 12px rgba(0,242,254,0.3)",
    zIndex: 2000
  }
};