const common = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    getRole: (roleId: number | undefined) => {
        switch (roleId) {
            case 1:
                return "Admin";
            case 2:
                return "Driver";
            default:
                return "Unknown";
        }
    }
}

export default common;