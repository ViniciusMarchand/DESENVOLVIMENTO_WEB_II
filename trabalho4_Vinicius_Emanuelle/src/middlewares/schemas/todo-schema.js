import yup from "yup";

const todoSchema = yup.object({
    title: yup.string().required(),
    expectedCompletionDate: yup.date("Formato precisa estar em  ISO-8601 DateTime.").required(),
    description: yup.string().required(),
    categoryId: yup.number().required(),
});

export { todoSchema };