export const getBookmarks = () => {
    return JSON.parse(localStorage.getItem("itihaas_bookmarks") || "[]");
};

export const saveBookmark = (item) => {
    const bookmarks = getBookmarks();
    if (!bookmarks.find(b => b.id === item.id)) {
        const updated = [...bookmarks, { ...item, timestamp: Date.now() }];
        localStorage.setItem("itihaas_bookmarks", JSON.stringify(updated));
        return true;
    }
    return false;
};

export const removeBookmark = (id) => {
    const bookmarks = getBookmarks();
    const updated = bookmarks.filter(b => b.id !== id);
    localStorage.setItem("itihaas_bookmarks", JSON.stringify(updated));
    return true;
};

export const isBookmarked = (id) => {
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.id === id);
};

export const toggleBookmark = (item) => {
    if (isBookmarked(item.id)) {
        removeBookmark(item.id);
        return false;
    } else {
        saveBookmark(item);
        return true;
    }
};
