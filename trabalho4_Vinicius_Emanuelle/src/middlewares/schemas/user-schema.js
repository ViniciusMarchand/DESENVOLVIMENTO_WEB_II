import yup from "yup";

const userSchema = yup.object({
    email: yup.string().email().required(),
    name: yup.string().min(6, "nome deve ser completo").required(),
    password: yup.string().min(6).required(),
});

export { userSchema };