"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { createPortal } from "react-dom";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { ParticleField } from "./atmosphere";
import { SectionHeading } from "./ui";

type Category = "All" | "Starters" | "Mains" | "Seafood" | "Steaks" | "Desserts" | "Cocktails";
type DishCategory = Exclude<Category, "All">;
type Dish = {
  name: string;
  description: string;
  details: string;
  ingredients: readonly string[];
  technique: string;
  price: string;
  image: string;
  category: DishCategory;
};

const categories: Category[] = ["All", "Starters", "Mains", "Seafood", "Steaks", "Desserts", "Cocktails"];
const dishes: readonly Dish[] = [
  { name: "Wagyu A5 Striploin", description: "Smoked bone marrow, black garlic, seasonal greens, jus.", details: "Japanese A5 Wagyu is seared directly over oak embers, rested slowly and finished with a glossy roasting jus for a deep, mineral richness.", ingredients: ["A5 Wagyu", "Bone marrow", "Black garlic", "Garden greens"], technique: "Oak ember sear · 20 minute rest", price: "£48", image: "/images/dish-wagyu.jpg", category: "Steaks" },
  { name: "Grilled Octopus", description: "Chorizo, paprika oil, fennel, lemon.", details: "Tender octopus is gently braised before meeting the open flame, creating crisp edges while keeping the centre delicate and buttery.", ingredients: ["Atlantic octopus", "Iberico chorizo", "Fennel", "Preserved lemon"], technique: "Slow braise · Charcoal finish", price: "£26", image: "/images/dish-octopus.jpg", category: "Seafood" },
  { name: "Lobster Linguine", description: "Handmade pasta, bisque, cherry tomatoes.", details: "Silky hand-cut linguine is folded through an intense shellfish bisque and crowned with sweet butter-poached lobster.", ingredients: ["Native lobster", "Fresh linguine", "Shellfish bisque", "Datterini tomatoes"], technique: "Hand-rolled pasta · Butter poach", price: "£32", image: "/images/dish-lobster.jpg", category: "Seafood" },
  { name: "Black Truffle Risotto", description: "Arborio rice, parmesan, truffle essence.", details: "Acquerello rice is cooked gradually in roasted vegetable stock, then finished with aged parmesan and shaved seasonal truffle.", ingredients: ["Acquerello rice", "Black truffle", "36-month parmesan", "Roasted stock"], technique: "Slow stirred · Mantecato finish", price: "£24", image: "/images/dish-risotto.jpg", category: "Starters" },
  { name: "Chocolate Soufflé", description: "Valrhona chocolate, salted caramel.", details: "A feather-light Valrhona chocolate soufflé baked to order, with a molten heart and warm sea-salt caramel poured tableside.", ingredients: ["Valrhona chocolate", "Free-range eggs", "Salted caramel", "Crème fraîche"], technique: "Baked to order · 14 minutes", price: "£14", image: "/images/dish-souffle.jpg", category: "Desserts" },
  { name: "Duck Confit", description: "Slow-cooked duck leg, cherry gastrique, star anise, wilted kale.", details: "Corn-fed duck is cured overnight, confited in its own fat and crisped over flame before serving with a sharp cherry gastrique.", ingredients: ["Corn-fed duck", "Sour cherry", "Star anise", "Wilted kale"], technique: "Overnight cure · Slow confit", price: "£32", image: "/images/menu-duck-confit.jpg", category: "Mains" },
  { name: "Bone Marrow", description: "Roasted marrow, toasted sourdough, parsley salad, smoked sea salt.", details: "Beef marrow bones are roasted at fierce heat until caramelised, balanced with herbs, capers and ember-toasted sourdough.", ingredients: ["Beef marrow", "Sourdough", "Flat-leaf parsley", "Smoked sea salt"], technique: "High-heat roast · Ember toast", price: "£22", image: "/images/menu-bone-marrow.jpg", category: "Starters" },
  { name: "Heirloom Tomato", description: "Heritage tomatoes, buffalo burrata, basil oil, balsamic pearls.", details: "A changing selection of heritage tomatoes is lightly dressed at the pass and paired with hand-torn buffalo burrata.", ingredients: ["Heritage tomatoes", "Buffalo burrata", "Basil oil", "Aged balsamic"], technique: "Raw preparation · Seasonal selection", price: "£16", image: "/images/menu-heirloom-tomato.jpg", category: "Starters" },
  { name: "Wagyu Tartare", description: "Hand-cut A5 Wagyu, cured egg yolk, caper berries, gold leaf.", details: "A5 Wagyu is cut by hand to preserve its texture, seasoned with smoked mustard and finished with a rich cured yolk.", ingredients: ["A5 Wagyu", "Cured egg yolk", "Caper berries", "Smoked mustard"], technique: "Hand-cut · Prepared à la minute", price: "£34", image: "/images/menu-wagyu-tartare.jpg", category: "Steaks" },
  { name: "Pan-Seared Foie Gras", description: "Rougié foie gras, brioche, fig jam, balsamic reduction.", details: "Foie gras is caramelised in a cast-iron pan and served with warm brioche and a bright house-made fig preserve.", ingredients: ["Rougié foie gras", "Milk brioche", "Fig preserve", "Balsamic"], technique: "Cast-iron sear · Quick rest", price: "£30", image: "/images/menu-foie-gras.jpg", category: "Starters" },
  { name: "Grilled Asparagus", description: "British asparagus, smoked hollandaise, poached quail egg.", details: "British asparagus is blistered over charcoal and dressed with a light hollandaise scented by beechwood smoke.", ingredients: ["British asparagus", "Quail egg", "Smoked butter", "Lemon"], technique: "Charcoal grill · Gentle poach", price: "£14", image: "/images/menu-asparagus.jpg", category: "Starters" },
  { name: "Miso-Glazed Cod", description: "Atlantic cod, white miso, charred bok choy, ginger emulsion.", details: "Atlantic cod is marinated for 24 hours in white miso, then roasted until its lacquered surface begins to caramelise.", ingredients: ["Atlantic cod", "White miso", "Bok choy", "Fresh ginger"], technique: "24-hour marinade · Flame roast", price: "£38", image: "/images/menu-miso-cod.jpg", category: "Seafood" },
  { name: "Braised Lamb Shank", description: "12-hour braised lamb, red wine reduction, rosemary, herb mash.", details: "Lamb shank is cooked through the night with red wine and aromatics until yielding, then glazed in its reduced braising liquor.", ingredients: ["British lamb", "Red wine", "Rosemary", "Herb potato"], technique: "12-hour braise · Jus glaze", price: "£35", image: "/images/menu-lamb-shank.jpg", category: "Mains" },
];

const INITIAL_DISHES = 8;
const LOAD_STEP = 4;

function DishDetailsModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="dish-modal-backdrop" onMouseDown={onClose}>
      <section
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        aria-describedby="dish-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="dish-modal-close" type="button" onClick={onClose} aria-label="Close dish details">
          <X aria-hidden="true" />
        </button>
        <p className="eyebrow">{dish.category}</p>
        <h2 id="dish-modal-title">{dish.name}</h2>
        <p id="dish-modal-description" className="dish-modal-description">{dish.details}</p>
        <div className="dish-modal-meta">
          <div>
            <span>Composition</span>
            <ul>{dish.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
          </div>
          <div>
            <span>From the fire</span>
            <p>{dish.technique}</p>
          </div>
        </div>
        <div className="dish-modal-footer">
          <p>À la carte</p>
          <strong>{dish.price}</strong>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export function MenuSection() {
  const [category, setCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISHES);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const filtered = category === "All" ? dishes : dishes.filter((dish) => dish.category === category);
  const visible = filtered.slice(0, visibleCount);

  const selectCategory = (value: Category) => {
    setCategory(value);
    setVisibleCount(INITIAL_DISHES);
  };

  return (
    <section className="menu-section section" id="menu">
      <div className="menu-atmosphere" aria-hidden="true"><span /><span /><span /></div>
      <ParticleField count={5} variant="bokeh" />
      <div className="container">
        <div className="menu-heading-row" data-reveal="up">
          <SectionHeading eyebrow="Our signature" title="Dishes" />
          <p className="menu-count" aria-live="polite"><strong>{visible.length}</strong> of {filtered.length} dishes loaded</p>
        </div>
        <div className="category-tabs" role="group" aria-label="Filter dishes" data-reveal="up">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => selectCategory(item)}>{item}</button>
          ))}
        </div>
        {visible.length ? (
          <div className="dish-grid" data-stagger>
            {visible.map((dish, index) => (
              <article
                className="dish-card"
                key={`${category}-${dish.name}`}
                data-reveal="up"
                style={{ "--reveal-delay": `${(index % INITIAL_DISHES) * 80}ms` } as CSSProperties}
              >
                <div className="dish-image"><Image src={dish.image} alt={dish.name} fill sizes="(max-width: 768px) 82vw, (max-width: 1200px) 33vw, 20vw" /></div>
                <div className="dish-body">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className="dish-footer"><strong>{dish.price}</strong><button type="button" aria-label={`View details for ${dish.name}`} onClick={() => setSelectedDish(dish)}><Plus /></button></div>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="empty-menu">Our {category.toLowerCase()} selection changes with the season.</p>}
        {visible.length < filtered.length && (
          <button
            className="button button--outline load-more"
            type="button"
            onClick={() => setVisibleCount((current) => Math.min(current + LOAD_STEP, filtered.length))}
          >
            Load more <span aria-hidden="true">+{Math.min(LOAD_STEP, filtered.length - visible.length)}</span>
          </button>
        )}
      </div>
      {selectedDish ? <DishDetailsModal dish={selectedDish} onClose={() => setSelectedDish(null)} /> : null}
    </section>
  );
}
