import React, { useState } from "react";

interface CampusListing {
  id: string;
  badge: string;
  title: string;
  category: "Course Literature" | "Electronics" | "Student Gear";
  price: number;
  sellerFaculty: string;
  meetupSpot: string;
  condition: string;
  reserved: boolean;
}

const INITIAL_LISTINGS: CampusListing[] = [
  {
    id: "m1",
    badge: "B.Sc",
    title: "Principles of Business Management & Strategy (6th Ed.)",
    category: "Course Literature",
    price: 3800,
    sellerFaculty: "Faculty of Management Sciences",
    meetupSpot: "Management Sciences Quadrangle",
    condition: "Clean copy • Gently used",
    reserved: false,
  },
  {
    id: "m2",
    badge: "B.Sc",
    title: "Casio fx-991EX Scientific & Financial Calculator",
    category: "Electronics",
    price: 9500,
    sellerFaculty: "Department of Accountancy",
    meetupSpot: "COOU University Library Entrance",
    condition: "Dual power • Verified working",
    reserved: false,
  },
  {
    id: "m3",
    badge: "400L",
    title: "Rechargeable USB-C LED Desk Study Lamp",
    category: "Student Gear",
    price: 5200,
    sellerFaculty: "Department of Business Admin",
    meetupSpot: "Igbariam Student Center",
    condition: "8-hour battery backup",
    reserved: false,
  },
  {
    id: "m4",
    badge: "300L",
    title: "Quantitative Analysis & Operations Research Manual",
    category: "Course Literature",
    price: 3000,
    sellerFaculty: "Faculty of Management Sciences",
    meetupSpot: "Faculty Lecture Hall B",
    condition: "Includes past tutorial solutions",
    reserved: false,
  },
];

export const MarketplaceDemo: React.FC = () => {
  const [listings, setListings] = useState<CampusListing[]>(INITIAL_LISTINGS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<CampusListing>(INITIAL_LISTINGS[0]);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: "you" | "seller"; text: string }[]>([
    {
      sender: "seller",
      text: "Hello fellow COOU scholar! This item is available for inspection on campus today.",
    },
  ]);

  const categories = ["All", "Course Literature", "Electronics", "Student Gear"];

  const filtered = listings.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.sellerFaculty.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleReserve = (id: string) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, reserved: !item.reserved } : item))
    );
    if (selectedItem.id === id) {
      setSelectedItem((prev) => ({ ...prev, reserved: !prev.reserved }));
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const text = chatMessage.trim();
    setMessages((prev) => [
      ...prev,
      { sender: "you", text },
      {
        sender: "seller",
        text: `Awesome! We can meet at ${selectedItem.meetupSpot} right after lectures.`,
      },
    ]);
    setChatMessage("");
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-space-md lg:p-space-xl shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[22px]">storefront</span>
          </div>
          <div>
            <div className="font-mono text-[11px] font-bold text-tertiary uppercase">
              P2P EXCHANGE • INTERACTIVE PROTOTYPE
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              COOU Peer Marketplace
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-tertiary-container text-on-tertiary shadow-sm"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="material-symbols-outlined text-[18px] text-outline absolute left-4 top-1/2 -translate-y-1/2">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search course literature, calculators, study lamps, or faculty..."
          aria-label="Search COOU peer marketplace"
          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline pl-11 pr-4 py-3 rounded-xl font-body-sm text-body-sm shadow-sm outline-none focus:ring-2 focus:ring-tertiary-container"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left: Listings */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-xl bg-surface-container-lowest transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-tertiary-container shadow-md"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary font-mono text-xs font-bold shrink-0">
                      {item.badge}
                    </div>
                    <div>
                      <h4 className="font-body-md text-body-md font-bold text-on-surface">
                        {item.title}
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {item.sellerFaculty} • {item.condition}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-tertiary shrink-0 tabular-nums">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-outline-variant/30">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-semibold">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      Verified COOU Student
                    </span>
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[15px]">location_on</span>
                      {item.meetupSpot}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                      item.reserved
                        ? "bg-primary-fixed text-primary"
                        : "bg-tertiary-fixed text-tertiary"
                    }`}
                  >
                    {item.reserved ? "Reserved" : "Available"}
                  </span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-surface-container-lowest rounded-xl p-8 text-center text-on-surface-variant font-body-sm shadow-sm">
              No campus listings match &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Right: Inspection & Peer Messaging */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-2 pb-4 border-b border-outline-variant/30">
            <div>
              <span className="font-mono text-[11px] font-bold text-tertiary uppercase">
                Listing Details
              </span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                {selectedItem.title}
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                Handover Point: {selectedItem.meetupSpot}
              </p>
            </div>
            <span className="font-mono text-base font-bold text-tertiary tabular-nums">
              ₦{selectedItem.price.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleReserve(selectedItem.id)}
            className={`w-full py-3 px-4 rounded-lg font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedItem.reserved
                ? "bg-surface-container text-on-surface"
                : "bg-tertiary-container hover:bg-tertiary text-on-tertiary shadow-sm"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {selectedItem.reserved ? "check_circle" : "verified_user"}
            </span>
            <span>
              {selectedItem.reserved
                ? "Reserved for Campus Pickup (Click to Cancel)"
                : `Reserve for Campus Inspection • ₦${selectedItem.price.toLocaleString()}`}
            </span>
          </button>

          <div className="space-y-3">
            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
              Direct Peer Chat
            </span>
            <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2.5 max-h-44 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg font-body-sm text-xs leading-relaxed ${
                    msg.sender === "you"
                      ? "bg-primary-container text-on-primary ml-6"
                      : "bg-surface-container-lowest text-on-surface shadow-sm mr-6"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Coordinate campus meetup..."
                aria-label="Message student seller"
                className="flex-1 bg-surface-container-low text-on-surface placeholder:text-outline px-3 py-2 rounded-lg font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-tertiary-container"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
