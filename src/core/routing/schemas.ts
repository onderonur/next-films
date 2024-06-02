import { z } from 'zod';

export const searchParamParser = {
  toSingle: <Output, Def extends z.ZodTypeDef, Input>(
    valueSchema: z.ZodType<Output, Def, Input>,
  ) => {
    const finalSchema = valueSchema.or(
      z.array(valueSchema).transform((val) => val[0]),
    );

    return finalSchema;
  },
  toArray: <Output, Def extends z.ZodTypeDef, Input>(
    valueSchema: z.ZodType<Output, Def, Input>,
  ) => {
    const finalSchema = valueSchema
      .transform((val) => [val])
      .or(z.array(valueSchema));

    return finalSchema;
  },
};
