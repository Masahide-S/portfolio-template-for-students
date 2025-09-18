"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Preview from '@/components/admin/Preview';
import Editor, { OnMount } from '@monaco-editor/react';

export default function DashboardPage() {
  const [content, setContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const editorRef = useRef<any>(null);
  // 👇 この行が抜けていました
  const [initialValue, setInitialValue] = useState<string>(''); 

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch content');
        }
        return res.json();
      })
      .then(data => {
        setContent(data);
        if (data) {
          setInitialValue(JSON.stringify(data, null, 2));
        }
      })
      .catch(error => {
        console.error("Dashboard fetch error:", error);
        router.push('/admin/login');
      });
  }, [router]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    try {
      setContent(JSON.parse(value));
    } catch (error) {
      //
    }
  };

  const handleSave = async () => {
    if (!editorRef.current) return;
    await editorRef.current.getAction('editor.action.formatDocument').run();
    const formattedContent = editorRef.current.getValue();
    
    setIsSaving(true);
    try {
      const parsedContent = JSON.parse(formattedContent);
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedContent),
      });
      setContent(parsedContent);
      alert('保存しました！');
    } catch (error) {
      alert('JSONの形式が正しくないため、保存できませんでした。');
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
  };

  if (!content) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-base text-text-main">
      <div className="w-1/2 border-r border-primary/10 overflow-hidden">
        <Preview content={content} />
      </div>
      <div className="w-1/2 grid grid-rows-[auto,1fr]">
        <div className="p-4 border-b border-surface flex-shrink-0 flex justify-between items-center">
          <h1 className="text-xl font-bold">Content Editor</h1>
          <div className="flex items-center gap-4">
            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-primary text-white rounded-md">
              {isSaving ? '保存中...' : '保存'}
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded-md">
              ログアウト
            </button>
          </div>
        </div>
        <div className="relative">
          <Editor
            height="100%"
            language="json"
            theme="vs-dark"
            defaultValue={initialValue}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              wordWrap: 'on',
              minimap: { enabled: false },
              formatOnType: true,
              formatOnPaste: true,
              autoIndent: 'full',
            }}
          />
        </div>
      </div>
    </div>
  );
}