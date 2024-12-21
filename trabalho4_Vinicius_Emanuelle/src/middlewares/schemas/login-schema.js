import yup from "yup";

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

export { loginSchema };