import { SpeechOptions, Voice } from 'react-native-speak';
export interface ProviderInterface {
    getVoices: () => Promise<Voice[]>;
    getAudioContent?: (utterance: string, options: SpeechOptions) => Promise<any>;
    playAudioContent: (content: string, utterance: string, options: SpeechOptions) => void;
    speak?: (utterance: string, options: SpeechOptions) => void;
}
export declare abstract class Provider implements ProviderInterface {
    protected static baseURL: string;
    protected accessToken: string | null;
    protected native: import("react-native-speak").NativeSpeechModuleInterface;
    constructor(accessToken: string | null);
    readonly bufferSize: number;
    abstract getVoices(): Promise<any>;
    getAudioContent?(utterance: string, options: SpeechOptions): Promise<any>;
    speak?(utterance: string, options: SpeechOptions): void;
    /**
     * Plays a base64 encoded string on the native platform
     * @param content base64 encoded string
     * @param options
     */
    playAudioContent(content: string, utterance: string, options: SpeechOptions): void;
    /**
     * Convenience method for getting the class name
     * we use this as a UUID essentially
     */
    getClassName(): string;
    /**
     * Check if this provider is the same as the one passed
     * @param provider
     */
    isEqualToProvider(provider: Provider): boolean;
    /**
     * Check if the options are compatible with the provider
     * Mostly a precheck to ensure that we have no problems with voiceId
     */
    optionsCompatible(options: SpeechOptions): SpeechOptions;
    /**
     * VoiceId prefix, used to ensure we aren't accidentally setting voiceId's that can't work with a provider
     */
    protected getVoiceIdSlug(): string;
    /**
     * Adds slug to voiceId, ignores if the slug has already been added
     */
    protected sluggifyVoiceId(voiceId: string): string;
    /**
     * Verify the voiceId
     * @param voiceId
     */
    protected isValidVoiceId(voiceId: string): boolean;
    /**
     * String the voiceId slug, also enforces correctness
     * @param voiceId
     */
    protected stripVoiceIdSlug(voiceId: string): string;
    /**
     * Convenience method for request URL
     * @param endpoint
     */
    protected getBaseURL(endpoint: string): string;
    /**
     * Generate's an SSML wrapped utterance string based on the options provided
     * SSML is fairly standardized (w3c) so we shouldn't have too much trouble
     * with basic wrapping for adjustments.
     * @param utterance
     * @param options
     */
    protected getSSML(utterance: string, options: SpeechOptions): string;
}
