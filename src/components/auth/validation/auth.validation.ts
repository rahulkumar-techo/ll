import * as z from 'zod';

import type { FormErrors, TouchedFields } from '../useAuthForm';

const registerFieldSchema = {
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

const loginFieldSchema = {
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

type MessageResult = {
    success: boolean;
    error?: {
        issues: Array<{ message: string }>;
    };
};

type FlattenedFieldResult = {
    success: boolean;
    error?: {
        flatten: () => {
            fieldErrors: Record<string, string[] | undefined>;
        };
    };
};

const getFirstMessage = (result: MessageResult) => {
    if (result.success) {
        return undefined;
    }

    return result.error?.issues[0]?.message;
};

const mapSchemaErrors = <T extends Record<string, string>>(
    result: FlattenedFieldResult
) => {
    if (result.success) {
        return {} as FormErrors<T>;
    }

    const errors = {} as FormErrors<T>;
    const fieldErrors = result.error?.flatten().fieldErrors ?? {};

    Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages?.[0]) {
            errors[field as keyof T] = messages[0];
        }
    });

    return errors;
};

const hasValue = (value: string) => value.trim().length > 0;

export const validateRegisterForm = (values: RegisterSchemaType) =>
    mapSchemaErrors(registerSchema.safeParse(values));

export const validateLoginForm = (values: LoginSchemaType) =>
    mapSchemaErrors(loginSchema.safeParse(values));

export const validateRegisterField = (
    field: keyof RegisterSchemaType,
    values: RegisterSchemaType,
    touched: TouchedFields<RegisterSchemaType>
) => {
    const errors: FormErrors<RegisterSchemaType> = {};

    if (field === 'confirm_password') {
        if (!hasValue(values.confirm_password)) {
            errors.confirm_password = undefined;
            return errors;
        }

        const confirmMessage = getFirstMessage(
            registerFieldSchema.confirm_password.safeParse(values.confirm_password)
        );

        errors.confirm_password =
            confirmMessage ||
            (values.password !== values.confirm_password
                ? 'Passwords do not match'
                : undefined);

        return errors;
    }

    if (!hasValue(values[field])) {
        errors[field] = undefined;

        if (field === 'password' && touched.confirm_password) {
            errors.confirm_password = undefined;
        }

        return errors;
    }

    errors[field] = getFirstMessage(registerFieldSchema[field].safeParse(values[field]));

    if (field === 'password' && touched.confirm_password) {
        if (!hasValue(values.confirm_password)) {
            errors.confirm_password = undefined;
            return errors;
        }

        const confirmMessage = getFirstMessage(
            registerFieldSchema.confirm_password.safeParse(values.confirm_password)
        );

        errors.confirm_password =
            confirmMessage ||
            (values.password !== values.confirm_password
                ? 'Passwords do not match'
                : undefined);
    }

    return errors;
};

export const validateLoginField = (
    field: keyof LoginSchemaType,
    values: LoginSchemaType
) => {
    if (!hasValue(values[field])) {
        return {
            [field]: undefined,
        };
    }

    return {
        [field]: getFirstMessage(loginFieldSchema[field].safeParse(values[field])),
    };
};
