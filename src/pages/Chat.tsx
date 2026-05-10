import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fakeApi } from '../services/api';
import { ChatMessage } from '../types';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');

  useEffect(() => { fakeApi.getMessages().then(setMessages); }, []);

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    setMessages((current) => [...current, { id: crypto.randomUUID(), sender: 'me', text, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    setText('');
    window.setTimeout(() => setMessages((current) => [...current, { id: crypto.randomUUID(), sender: 'other', text: 'Mensagem recebida! Já te respondo com os detalhes.', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]), 900);
  }

  return <section className="container-page py-10"><div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-premium dark:border-slate-800 dark:bg-slate-900"><header className="flex items-center gap-4 border-b border-slate-200 p-5 dark:border-slate-800"><img className="h-12 w-12 rounded-2xl object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"/><div><strong>Carlos Almeida</strong><p className="text-sm text-emerald-500">online agora</p></div></header><main className="h-[520px] space-y-4 overflow-y-auto bg-slate-50 p-5 dark:bg-slate-950">{messages.map((message)=><div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[78%] rounded-3xl px-5 py-3 shadow-sm ${message.sender === 'me' ? 'rounded-br-md bg-brand-600 text-white' : 'rounded-bl-md bg-white dark:bg-slate-800'}`}><p>{message.text}</p><span className="mt-1 block text-right text-xs opacity-70">{message.time}</span></div></div>)}</main><form onSubmit={sendMessage} className="flex gap-3 border-t border-slate-200 p-4 dark:border-slate-800"><input className="input" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Digite uma mensagem"/><button className="btn-primary px-5"><FiSend /></button></form></div></section>;
}
