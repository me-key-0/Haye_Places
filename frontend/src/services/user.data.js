const user = [
    {
      id: "1",
      displayName: "John Doe",
      email: "john.doe@example.com",
      favorites: ["1", "3"],
      isSignedIn: true,
      password: "",
      reviews: [
        {
          placeId: "1",
          rating: 5,
          comment: "Love this place! The coffee is amazing."
        }
      ]
    },
    {
      id: "2",
      displayName: "Jane Smith",
      email: "jane.smith@example.com",
      favorites: ["2"],
      isSignedIn: false,
      password: "",
      reviews: [
        {
          placeId: "2",
          rating: 4,
          comment: "The steak was great, but a bit pricey."
        }
      ]
    }
  ];

  export default user;
  