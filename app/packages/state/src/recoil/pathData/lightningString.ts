import { selectorFamily } from "recoil";
import { lightningQuery } from "../lightning";

export const lightningStringResults = selectorFamily<
  string[],
  { path: string; search?: string; exclude?: string[] }
>({
  key: "lightningStringResults",
  get:
    (params) =>
    ({ get }) => {
      const [data] = get(lightningQuery([params]));

      if (data.__typename !== "StringLightningResult") {
        throw new Error(
          `unexpected result ${data.__typename} for path ${params.path}`
        );
      }

      if (!data.values) {
        return null;
      }

      return [...data.values];
    },
});
