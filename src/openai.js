import OpenAI from 'openai';
import config from 'config';
import { createReadStream } from 'fs';

class Openai {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }


  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

 async chat(messages) {
    try {
      const completion = await this.openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
      });
      return completion?.choices[0]?.message;
    } catch (error) {
      console.log('error while gpt chat', error.message)
    }
    // Implement your chat method here
  }

  async transcription(filepath) {
    try {
      // Transcribe audio using the "asr" endpoint
      const response = await this.openai.audio.transcriptions.create({
        file: createReadStream(filepath),
        model: 'whisper-1'
      });

      return response.text;
    } catch (error) {
      console.log('Error while transcription', error.message);
      return null;
    }
  }
}

export const openai = new Openai(config.get('OPENAI_KEY'));
