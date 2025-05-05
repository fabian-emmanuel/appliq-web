
export const passwordRequirements = [
    {
        test: (password: string) => password.length >= 8,
        text: "At least 8 characters"
    },
    {
        test: (password: string) => /[A-Z]/.test(password),
        text: "Contains uppercase letter"
    },
    {
        test: (password: string) => /[0-9]/.test(password),
        text: "Contains number"
    },
    {
        test: (password: string) => /[^A-Za-z0-9]/.test(password),
        text: "Contains special character"
    }
];
