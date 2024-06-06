import { Gender } from "@/types/gender_type";

export function getGenderTaxo(gender: Gender) {
  if (gender === "male") return "Homme";
  if (gender === "female") return "Femme";
  return "Autre";
}
