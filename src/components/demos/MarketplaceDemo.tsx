import React, { useState } from "react";

interface CampusListing {
  id: string;
  initials: string;
  title: string;
  category: "Textbooks" | "Electronics" | "Hostel Essentials";
  price: number;
  sellerFaculty: string;
  meetupSpot: string;
  condition: string;
  reserved: boolean;
}

const INITIAL_LISTINGS: CampusListing[] = [
  {
    id: "m1",
    initials: "CO",
    title: "Data Structures & Alg. in C++ (4th Edition)",
    category: "Textbooks",
    price: 3500,
    sellerFaculty: "Faculty of Physical Sciences",
    meetupSpot: "COOU University Library Entrance",
    condition: "Clean pages · Zero highlights",
    reserved: false,
  },
  {
    id: "m2",
    initials: "NE",
    title: "Casio fx-991EX ClassWiz Scientific Calculator",
    category: "Electronics",
    price: 9500,
    sellerFaculty: "Faculty of Engineering",
    meetupSpot: "Physical Sciences Quadrangle",
    condition: "Solar + Battery · Tested",
    reserved: false,
  },
  {
    id: "m3",
    initials: "AO",
    title: "Rechargeable LED Study Desk Lamp (USB-C)",
    category: "Hostel Essentials",
    price: 5200,
    sellerFaculty: "Department of Computer Science",
    meetupSpot: "Igbariam Student Center",
    condition: "8-hour backup battery",
    reserved: false,
  },
  {
    id: "m4",
    initials: "UC",
    title: "Discrete Mathematics & Its Applications (Rosen)",
    category: "Textbooks",
    price: 4200,
    sellerFaculty: "Department of Mathematics",
    meetupSpot: "Science Lecture Theatre Hall B",
    condition: "Hardcover · Mint",
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
      text: "Hi fellow COOUite! This item is still available for campus inspection today.",
    },
  ]);

  const categories = ["All", "Textbooks", "Electronics", "Hostel Essentials"];

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
        text: `Sounds great! Let's meet at ${selectedItem.meetupSpot} between lectures.`,
      },
    ]);
    setChatMessage("");
  };

  return (
    <div className="bg-surface-container-low rounded-3xl p-6 lg:p-8 shadow-xl border border-outline-variant/20 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          </span>
          <div>
            <div className="font-label-sm text-label-sm text-secondary uppercase">
              Peer Commerce P2P · Interactive Prototype
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              COOU Igbariam Verified Campus Exchange
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
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
          placeholder="Search textbooks, calculators, study lamps, or faculty..."
          aria-label="Search campus marketplace listings"
          className="w-full bg-surface-container text-on-surface placeholder:text-outline pl-11 pr-4 py-3 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Listings Grid */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? "bg-surface-container-high ring-1 ring-secondary/60 shadow-lg"
                    : "bg-surface-container hover:bg-surface-container-high"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full bg-secondary-container/30 flex items-center justify-center font-code-inline text-xs text-secondary font-bold shrink-0">
                      {item.initials}
                    </span>
                    <div>
                      <h4 className="font-body-md text-body-md font-semibold text-on-surface">
                        {item.title}
                      </h4>
                      <p className="font-label-sm text-label-sm text-outline">
                        Seller: {item.sellerFaculty} · {item.condition}
                      </p>
                    </div>
                  </div>
                  <span className="font-code-inline text-sm font-bold text-secondary shrink-0 tabular-nums">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-outline-variant/15">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                    <span className="inline-flex items-center gap-1 text-primary font-label-sm">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Verified Student
                    </span>
                    <span className="inline-flex items-center gap-1 font-label-sm">
                      <span className="material-symbols-outlined text-[14px]">near_me</span>
                      {item.meetupSpot}
                    </span>
                  </div>
                  <span
                    className={`font-label-sm text-label-sm ${
                      item.reserved ? "text-tertiary" : "text-secondary"
                    }`}
                  >
                    {item.reserved ? "Escrow Reserved" : "Available"}
                  </span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-surface-container rounded-2xl p-8 text-center text-on-surface-variant font-body-sm">
              No campus listings match &ldquo;{query}&rdquo;. Try clearing your search filter.
            </div>
          )}
        </div>

        {/* Right: Escrow & Instant Campus Chat */}
        <div className="lg:col-span-5 bg-surface-container rounded-2xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-2 pb-4 border-b border-outline-variant/20">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase">
                Selected Listing
              </span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                {selectedItem.title}
              </h4>
              <p className="font-label-sm text-label-sm text-outline mt-1">
                Safe Meetup: {selectedItem.meetupSpot}
              </p>
            </div>
            <span className="font-code-inline text-base font-bold text-secondary tabular-nums">
              ₦{selectedItem.price.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleReserve(selectedItem.id)}
            className={`w-full py-3 px-4 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedItem.reserved
                ? "bg-surface-container-highest text-tertiary"
                : "bg-primary-container hover:bg-inverse-primary text-on-primary-container shadow-[0_0_20px_rgba(37,99,235,0.35)]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {selectedItem.reserved ? "lock" : "shield_lock"}
            </span>
            <span>
              {selectedItem.reserved
                ? "Reserved in Student Escrow (Click to Release)"
                : "Hold in Campus Escrow · ₦" + selectedItem.price.toLocaleString()}
            </span>
          </button>

          {/* Chat Thread */}
          <div className="space-y-3">
            <span className="font-label-sm text-label-sm text-outline uppercase">
              Instant Student Chat
            </span>
            <div className="bg-surface-container-lowest rounded-xl p-3.5 space-y-2.5 max-h-44 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg font-body-sm text-xs leading-relaxed ${
                    msg.sender === "you"
                      ? "bg-primary-container/25 text-on-surface ml-6"
                      : "bg-surface-container text-on-surface-variant mr-6"
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
                placeholder="Ask seller about meetup time..."
                aria-label="Message seller"
                className="flex-1 bg-surface-container-lowest text-on-surface placeholder:text-outline px-3 py-2 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container transition-colors cursor-pointer"
                aria-label="Send chat message"
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
