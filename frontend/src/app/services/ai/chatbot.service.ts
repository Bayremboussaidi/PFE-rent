/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

import { environment } from '../../../../src/environments/environment';



const token = environment.githubToken;
console.log('GitHub Token:', token);

//const token = process.env['GITHUB_TOKEN'] ?? '';



const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

interface AiResponse {
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  //    private apiUrl = 'http://localhost:8084/ai/chat';
  private client: any;

  constructor(private http: HttpClient) {
    this.client = ModelClient(endpoint, new AzureKeyCredential(token));
  }

  sendPrompt(prompt: string): Observable<AiResponse> {
    const _subscriber = function (client: any) {
      return function (observer: Observer<AiResponse>) {
        let cleanup: { unsubscribe(): void } | null = null;

        async function runQuery() {
          const response = await client.path('/chat/completions').post({
            body: {
              messages: [
                { role: 'system', content: '' },
                { role: 'user', content: prompt },
              ],
              temperature: 1,
              top_p: 1,
              model: model,
            },
          });

          if (isUnexpected(response)) {
            throw response.body.error;
          }

          const result = response.body.choices[0].message.content;
          observer.next({ response: result });
          observer.complete();
        }

        runQuery().then((result: any) => {
          cleanup = result;
        });

        return () => {
          if (cleanup) {
            cleanup.unsubscribe();
          }
        };
      };
    };

    return new Observable(_subscriber(this.client));
    //    return this.http.post<AiResponse>(this.apiUrl, { prompt });
  }
}
*/




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AiResponse {
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8000/chat'; // FastAPI endpoint

  constructor(private http: HttpClient) {}

  sendPrompt(prompt: string): Observable<AiResponse> {
    return this.http.post<AiResponse>(this.apiUrl, { prompt });
  }
}
