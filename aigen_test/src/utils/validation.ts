export type TValidation = {
  validate: (value: string) => boolean;
  text: string;
};

export const validateId: TValidation = {
  validate: (id: string) => !!(!isNaN(Number(id)) && id) || id === "",
  text: "ID должен быть числом",
};
