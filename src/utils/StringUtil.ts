// Get initials for the avatar
export const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};


// Calculate background color for the avatar
// This is a simple hash function to generate consistent colors
export const getColor = (name: string) => {
        const colors = [
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800',
            'bg-indigo-100 text-indigo-800',
            'bg-pink-100 text-pink-800',
            'bg-purple-100 text-purple-800',
        ];

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        hash = Math.abs(hash) % colors.length;
        return colors[hash];
    };


// Password strength checker
export const getPasswordStrength = (password: string) => {
    let score = 0;

    if (!password) {
        return score;
    }

    // Length check
    if (password.length > 5) score += 20;
    if (password.length > 8) score += 10;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 20; // Has uppercase
    if (/[a-z]/.test(password)) score += 15; // Has lowercase
    if (/[0-9]/.test(password)) score += 20; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 15; // Has special char

    return Math.min(100, score);
};


export const getPasswordStrengthLabel = (password: string) => {
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength === 0) return "";
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 70) return "Fair";
    if (passwordStrength < 90) return "Good";
    return "Strong";
};

export const getPasswordStrengthColor = (password: string) => {
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-500";
    if (passwordStrength < 90) return "bg-blue-500";
    return "bg-green-500";
};