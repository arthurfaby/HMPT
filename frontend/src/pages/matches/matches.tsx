import { FullHeightContainer } from "@/components/utils/full-height-container";
import { UserDto } from "@/dtos/user_dto";
import { MatchCard } from "@/pages/matches/components/match-card";
import { MatchSwiper } from "@/pages/matches/components/match-swiper";
import { MatchProfile } from "@/pages/matches/components/match-profile";
export function Matches() {
  const users = [
    {
      first_name: "Jean",
      age: 21,
      pictures: [
        "https://s7g3.scene7.com/is/image/soloinvest/n00577A-2?$big_image_web$",
        "https://s7g3.scene7.com/is/image/soloinvest/n00577A?$big_image_web$",
        "https://img01.ztat.net/article/spp-media-p1/87c1c75372214de0aa099c05da32c8fa/75030aa365cf4db3afea8cefb44c7c4b.jpg?imwidth=1800",
      ],
      biography: "Salut les loulou je suis gentil",
      last_name: "Valjean",
      geolocation: {
        latitude: 15,
        longitude: 12.23,
      },
      accept_location: true,
      email: "a@a.a",
      gender: "male",
      fame_rating: 5,
      interests: [
        "Seigneur des anneaux",
        "Le hobbit",
        "Tous les trucs nuls comme ça",
      ],
      online: true,
      last_online_date: "05-05-2024",
      password: "asdasd",
      username: "afaby",
      verified: true,
    } as UserDto,
    {
      first_name: "Jordan",
      age: 26,
      pictures: [
        "https://img01.ztat.net/article/spp-media-p1/87c1c75372214de0aa099c05da32c8fa/75030aa365cf4db3afea8cefb44c7c4b.jpg?imwidth=1800",
        "https://s7g3.scene7.com/is/image/soloinvest/n00577A?$big_image_web$",
        "https://s7g3.scene7.com/is/image/soloinvest/n00577A-2?$big_image_web$",
      ],
      biography: "Yo les femmes, ca vous dit un rencard un de ces quater ? ;-)",
      last_name: "Sauvain",
      geolocation: {
        latitude: 15,
        longitude: 12.23,
      },
      accept_location: false,
      email: "a@a.a",
      gender: "female",
      fame_rating: 3.6,
      interests: ["Poker", "Chess", "Armance <3"],
      online: false,
      last_online_date: "05-05-2024",
      password: "asdasd",
      username: "afaby",
      verified: false,
    } as UserDto,
  ];

  return (
    <FullHeightContainer className="flex-center flex-col">
      <MatchSwiper users={users} />
    </FullHeightContainer>
  );
}
