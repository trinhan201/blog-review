export const formatVNDateTime = (dateTimeToFormat) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    };
    const date = new Date(dateTimeToFormat || null);
    let intl = new Intl.DateTimeFormat('it-IT', options);
    const formatedDate = intl.format(date);
    return formatedDate;
};
