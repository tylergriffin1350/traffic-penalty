export function jsonToFormData(json: Record<string, any>): FormData {
    const formData = new FormData();

    const appendToFormData = (key: string, value: any) => {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                appendToFormData(`${key}[${index}]`, item);
            });
        } else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach(subKey => {
                appendToFormData(`${key}[${subKey}]`, value[subKey]);
            });
        } else {
            formData.append(key, value);
        }
    };

    Object.keys(json).forEach(key => {
        appendToFormData(key, json[key]);
    });

    return formData;
}
