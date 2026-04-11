import * as z from 'zod';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export const registerFieldSchema = {
    fullName: z
        .string()
        .trim()
        .min(1, 'Full name is required')
        .min(3, 'Name too short')
        .max(30, 'Name too long'),
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirm_password: z
        .string()
        .min(1, 'Please confirm your password'),
};

export const loginFieldSchema = {
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
};

export const registerSchema = z
    .object(registerFieldSchema)
    .superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Passwords do not match',
                path: ['confirm_password'],
            });
        }
    });

export const loginSchema = z.object(loginFieldSchema);

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerInitialValues: RegisterSchemaType = {
    fullName: '',
    email: '',
    password: '',
    confirm_password: '',
};

export const loginInitialValues: LoginSchemaType = {
    email: '',
    password: '',
};

const getFirstMessage = <T>(result: z.ZodSafeParseResult<T>) => {
    if (result.success) {
        return undefined;
    }

    return result.error.issues[0]?.message;
};

const mapSchemaErrors = <T extends Record<string, string>>(
    result: z.ZodSafeParseResult<T>
) => {
    if (result.success) {
        return {} as FormErrors<T>;
    }

    const errors = {} as FormErrors<T>;
    const fieldErrors = result.error.flatten().fieldErrors;

    Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages?.[0]) {
            errors[field as keyof T] = messages[0];
        }
    });

    return errors;
};

export const validateLoginFieldValue = (
    field: keyof LoginSchemaType,
    value: string
) => getFirstMessage(loginFieldSchema[field].safeParse(value)) ?? true;

export const validateRegisterFieldValue = (
    field: 'fullName' | 'email' | 'password',
    value: string
) => getFirstMessage(registerFieldSchema[field].safeParse(value)) ?? true;

export const validateConfirmPasswordValue = (
    confirmPassword: string,
    password: string
) => {
    const fieldMessage = getFirstMessage(
        registerFieldSchema.confirm_password.safeParse(confirmPassword)
    );

    if (fieldMessage) {
        return fieldMessage;
    }

    return password === confirmPassword ? true : 'Passwords do not match';
};

export const validateRegisterForm = (values: RegisterSchemaType) =>
    mapSchemaErrors(registerSchema.safeParse(values));

export const validateLoginForm = (values: LoginSchemaType) =>
    mapSchemaErrors(loginSchema.safeParse(values));
