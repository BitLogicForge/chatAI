interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface StreamOptions {
  messages: Message[];
  onChunk: (content: string) => void;
  signal?: AbortSignal;
}

export const streamChatResponse = async ({ messages, onChunk, signal }: StreamOptions): Promise<string> => {
  let fullResponse = '';

  try {
    // Convert all messages to LangChain format including history
    const langchainMessages = messages.map(msg => ({
      type: msg.role === 'user' ? 'human' : 'ai',
      content: msg.content,
    }));

    console.log('🚀 Sending request with messages:', langchainMessages);

    // Stream from LangServe using direct fetch
    const response = await fetch('http://localhost:8000/agent/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          messages: langchainMessages,
        },
        config: {},
        kwargs: {},
      }),
      signal,
    });

    console.log('📡 Response status:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No reader available');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('✅ Stream completed');
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      console.log('📦 Raw chunk:', chunk);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            console.log('📨 Parsed data:', data);

            // Extract content from nested structure: model.messages[0].content
            let content = '';
            if (data?.model?.messages?.[0]?.content) {
              content = data.model.messages[0].content;
            } else if (data?.content) {
              content = data.content;
            } else if (data?.output) {
              content = data.output;
            }

            if (content) {
              console.log('💬 Content chunk:', content);
              // Append the chunk to build up the full response progressively
              fullResponse += content;
              onChunk(fullResponse);
            }
          } catch (parseError) {
            console.warn('⚠️ Parse error for line:', line, parseError);
          }
        }
      }
    }

    console.log('🎉 Full response:', fullResponse);
    return fullResponse;
  } catch (error) {
    console.error('❌ Stream error:', error);
    throw error;
  } finally {
    console.log('🔚 Stream cleanup');
  }
};
