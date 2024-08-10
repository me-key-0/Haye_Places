const places = [
  {
    id: "1",
    name: "Cafe Latte",
    description: "A cozy cafe with the best coffee in town.",
    rating: 4.5,
    reviews: ["Great atmosphere!", "Best coffee ever."],
    isTrending: true,
    isTopRated: false,
    isNearby: true,
    menu: ["Coffee", "Pastries"],
    houseSpecials: ["Vanilla Latte"],
    offers: ["Buy one get one free coffee"],
    bestDeals: [
      { deal: "Buy one get one free coffee", percentageOff: null }
    ]
  },
  {
    id: "2",
    name: "The Gourmet Bistro",
    description: "Fine dining with a gourmet twist.",
    rating: 4.8,
    reviews: ["Exquisite dining experience.", "Highly recommend the steak."],
    isTrending: false,
    isTopRated: true,
    isNearby: false,
    menu: ["Steak", "Salmon", "Desserts"],
    houseSpecials: ["Filet Mignon"],
    offers: ["20% off on first visit"],
    bestDeals: [
      { deal: "20% off on first visit", percentageOff: 20 }
    ]
  },
  {
    id: "3",
    name: "The Hangout Lounge",
    description: "A relaxing lounge with live music.",
    rating: 4.2,
    reviews: ["Nice place to unwind.", "Great live music on weekends."],
    isTrending: false,
    isTopRated: false,
    isNearby: true,
    menu: ["Cocktails", "Appetizers"],
    houseSpecials: ["Signature Cocktails"],
    offers: ["Happy hour discounts"],
    bestDeals: [
      { deal: "Happy hour discounts", percentageOff: null }
    ]
  }
];

export default places;
