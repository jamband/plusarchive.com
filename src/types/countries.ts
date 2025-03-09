type Base = {
  id: number;
  name: string;
};

export type CountryAdmin = Pick<Base, "id" | "name">;
