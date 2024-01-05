const getContent = (text) => {
    const plainString = text.replace(/<[^>]+>/g, '');
    return plainString;
};

export default getContent;
