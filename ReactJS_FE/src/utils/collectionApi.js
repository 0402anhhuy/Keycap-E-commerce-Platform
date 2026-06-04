export const fetchAllCollections = async ({ apiBase, signal, headers = {} }) => {
    const res = await fetch(`${apiBase}/api/collections`, {
        signal,
        headers,
    });
    
    if (!res.ok) {
        const error = new Error("Không tải được danh sách bộ sưu tập");
        error.status = res.status;
        throw error;
    }
    
    return await res.json();
};
