import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "The ${path} field is required.",
    notType: "The ${path} must be a ${type} type.",
  },
  string: {
    min: "The ${path} must be at least ${min} characters.",
    email: "The ${path} must be a valid email address.",
    url: "The ${path} is invalid.",
  },
});
