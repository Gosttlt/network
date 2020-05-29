export const required = value => {
    if (value) return undefined;
    return 'Заполните поле';
}

export const maxLengthCreator = (maxLength) => {
    return (value) => {
        if (value.length > maxLength) return `Максимальное количество ${maxLength} символов`;
        return undefined;
    }
}

