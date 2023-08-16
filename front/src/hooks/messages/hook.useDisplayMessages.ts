import { messageToast } from '../../utils/helpers';

export const useDisplayMessages = () => {
    const displayErrors = (messages: string[]) => {
        messages.forEach((m) => {
            messageToast(m, 'error');
        });
    };

    const displayMessage = (message: string, type: string = 'success') => {
        messageToast(message, type);
    };

    return {
        displayErrors,
        displayMessage
    };
};
