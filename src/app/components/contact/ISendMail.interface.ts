/**
 * ISendMail is the interface that will be sent to the API to send the email.
 */
export interface ISendMail {
    email: string;
    asunto: string;
    mensaje: string;
}
