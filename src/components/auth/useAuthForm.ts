import { useState } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type TouchedFields<T> = Partial<Record<keyof T, boolean>>;

type UseAuthFormParams<T extends Record<string, string>> = {
    initialValues: T;
    validateField: (
        field: keyof T,
        values: T,
        touched: TouchedFields<T>
    ) => FormErrors<T>;
    validateForm: (values: T) => FormErrors<T>;
    onSubmit: (values: T) => void;
};

export function useAuthForm<T extends Record<string, string>>({
    initialValues,
    validateField,
    validateForm,
    onSubmit,
}: UseAuthFormParams<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});
    const [touched, setTouched] = useState<TouchedFields<T>>({});

    const handleChange = (field: keyof T, value: string) => {
        const nextValues = {
            ...values,
            [field]: value,
        };

        setValues(nextValues);

        if (!touched[field]) {
            return;
        }

        const nextFieldErrors = validateField(field, nextValues, touched);
        setErrors((current) => ({
            ...current,
            ...nextFieldErrors,
        }));
    };

    const handleBlur = (field: keyof T) => {
        const nextTouched = {
            ...touched,
            [field]: true,
        };

        setTouched(nextTouched);

        const nextFieldErrors = validateField(field, values, nextTouched);
        setErrors((current) => ({
            ...current,
            ...nextFieldErrors,
        }));
    };

    const handleSubmit = () => {
        const nextErrors = validateForm(values);
        const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key as keyof T] = true;
            return acc;
        }, {} as TouchedFields<T>);

        setTouched(allTouched);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        onSubmit(values);
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}
