import yup from "yup";

const categorySchema = yup.object({
    name: yup.string().required(),
    userId: yup.number()
});

export { categorySchema };