// Get company initials for the avatar
export const getCompanyInitials = (company: string) => {
    return company
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};


// Calculate background color for company avatar
// This is a simple hash function to generate consistent colors
export const getCompanyColor = (company: string) => {
        const colors = [
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800',
            'bg-indigo-100 text-indigo-800',
            'bg-pink-100 text-pink-800',
            'bg-purple-100 text-purple-800',
        ];

        let hash = 0;
        for (let i = 0; i < company.length; i++) {
            hash = company.charCodeAt(i) + ((hash << 5) - hash);
        }

        hash = Math.abs(hash) % colors.length;
        return colors[hash];
    };