import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { getMyRequests } from '../services/requestService';
import { createMessage, getMessages } from '../services/messageService';
import { ChatMessage } from '../types';

type RequestItem = {
  id: number;
  title: string;
  status: string;
};

export default function Chat() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getMyRequests();
        setRequests(data);
        if (data.length > 0) {
          setSelectedRequestId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  useEffect(() => {
    if (!selectedRequestId) {
      setMessages([]);
      return;
    }

    getMessages(selectedRequestId)
      .then((data) => {
        setMessages(
          data.map((message) => ({
            id: String(message.id),
            sender: message.sender_id === Number(localStorage.getItem('auth:user') ? JSON.parse(localStorage.getItem('auth:user') || '{}').id : 0) ? 'me' : 'other',
            text: message.content,
            time: new Date(message.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          }))
        );
      })
      .catch(console.error);
  }, [selectedRequestId]);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    if (!text.trim() || !selectedRequestId) return;

    try {
      const created = await createMessage(selectedRequestId, text.trim());
      setMessages((current) => [
        ...current,
        {
          id: String(created.id),
          sender: 'me',
          text: created.content,
          time: new Date(created.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setText('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="container-page py-10">
      <div className="card-elevated mx-auto max-w-4xl overflow-hidden">
        <header className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img className="h-12 w-12 rounded-2xl object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" />
            <div>
              <strong>Chat de atendimento</strong>
              <p className="text-sm text-brand-500 dark:text-brand-400">Conectado</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500">Selecione um pedido</label>
            <select
              className="input mt-2 w-full sm:w-auto"
              value={selectedRequestId ?? ''}
              onChange={(e) => setSelectedRequestId(Number(e.target.value))}
              disabled={loading || requests.length === 0}
            >
              {requests.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.title}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="h-[520px] space-y-4 overflow-y-auto bg-graphite-50 p-5 dark:bg-navy-950">
          {loading && <p className="text-slate-500">Carregando conversas...</p>}
          {!loading && requests.length === 0 && <p className="text-slate-500">Nenhum pedido encontrado para chat.</p>}
          {!loading && requests.length > 0 && messages.length === 0 && <p className="text-slate-500">Nenhuma mensagem no pedido selecionado.</p>}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-3xl px-5 py-3 shadow-sm ${
                  message.sender === 'me'
                    ? 'rounded-br-md bg-brand-600 text-white'
                    : 'rounded-bl-md bg-white dark:bg-slate-800'
                }`}
              >
                <p>{message.text}</p>
                <span className="mt-1 block text-right text-xs opacity-70">{message.time}</span>
              </div>
            </div>
          ))}
        </main>

        <form onSubmit={sendMessage} className="flex gap-3 border-t border-slate-200 p-4 dark:border-slate-800">
          <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite uma mensagem" />
          <button className="btn-primary px-5"> <FiSend /> </button>
        </form>
      </div>
    </section>
  );
}
