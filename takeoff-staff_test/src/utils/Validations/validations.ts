import {Rule} from "rc-field-form/lib/interface";

export const requiredRule = {
  required: true,
  message: "Поле обязательное для заполнения",
}

export const emailRule = {
  type: "email",
  message: "Поле не соответствует типу 'email'"
}

export function minNumSymbolRule(number: number) {
  return { min: number, message: `Поле не должено быть менее ${number} символов` }
}

export function repeatPasswordRule (fieldName: string) {
  return ({ getFieldValue }: any) => ({
    validator(rule: Rule, value: string) {
      if (!value || getFieldValue(fieldName) === value) {
        return Promise.resolve();
      }

      return Promise.reject("Пароли не совпадают!");
    },
  })
}
