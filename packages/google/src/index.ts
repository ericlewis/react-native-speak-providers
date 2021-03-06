import invariant from 'invariant';
import { SpeechOptions, Voice } from 'react-native-speak';
import { Provider } from "@react-native-speak/base";

export class GoogleProvider extends Provider {
  protected static baseURL = 'https://texttospeech.googleapis.com/v1beta1/';

  public get bufferSize() {
    return 24000;
  }

  public async getVoices(): Promise<Voice[]> {
    invariant(this.accessToken, 'No access token provided');

    const res = await fetch(this.getBaseURL('voices?languageCode=en-US'), {
      headers: {
        'X-Goog-Api-Key': this.accessToken!,
      },
    });

    const json = await res.json();
    
    // don't crash!
    try {
      const { voices }: { voices: Array<{ name: string }> } = json
      return voices.map(({ name }) => ({
        id: this.sluggifyVoiceId(name),
        name,
      }));
    } catch (error) {
      return []
    }
  }

  public async getAudioContent(utterance: string, options: SpeechOptions) {
    invariant(this.accessToken, 'No access token provided');

    const ssml = this.getSSML(utterance, options);
    const raw = await this.fetch(this.getBaseURL('text:synthesize'), {
      method: 'POST',
      body: JSON.stringify({
        input: {
          ssml,
        },
        voice: {
          ...(options.voiceId
            ? { name: this.stripVoiceIdSlug(options.voiceId) }
            : {}),
          languageCode: 'en-US',
        },
        audioConfig: {
          volumeGainDb: options.gain || 0,
          audioEncoding:
            options.codec && options.codec === 'pcm' ? 'LINEAR16' : 'mp3',
        },
      }),
      headers: {
        'X-Goog-Api-Key': this.accessToken || "BADKEY",
      },
    });

    const { audioContent }: { audioContent: string } = await raw.json();
    return audioContent;
  }
}
